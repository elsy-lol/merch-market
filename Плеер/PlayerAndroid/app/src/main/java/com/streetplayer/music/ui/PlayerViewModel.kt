package com.streetplayer.music.ui

import android.app.Application
import android.content.ComponentName
import android.net.Uri
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.session.MediaController
import androidx.media3.session.SessionToken
import com.google.common.util.concurrent.ListenableFuture
import com.google.common.util.concurrent.MoreExecutors
import com.streetplayer.music.data.Track
import com.streetplayer.music.service.PlaybackService
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class PlayerViewModel(application: Application) : AndroidViewModel(application) {

    private var controllerFuture: ListenableFuture<MediaController>? = null
    private var mediaController: MediaController? = null

    // Tracks Lists State
    private val _tracks = mutableStateOf<List<Track>>(emptyList())
    val tracks: State<List<Track>> = _tracks

    private val _filteredTracks = mutableStateOf<List<Track>>(emptyList())
    val filteredTracks: State<List<Track>> = _filteredTracks

    private val _searchQuery = mutableStateOf("")
    val searchQuery: State<String> = _searchQuery

    // Player Playback States
    private val _currentTrack = mutableStateOf<Track?>(null)
    val currentTrack: State<Track?> = _currentTrack

    private val _isPlaying = mutableStateOf(false)
    val isPlaying: State<Boolean> = _isPlaying

    private val _currentTime = mutableLongStateOf(0L) // milliseconds
    val currentTime: State<Long> = _currentTime

    private val _totalDuration = mutableLongStateOf(0L) // milliseconds
    val totalDuration: State<Long> = _totalDuration

    private val _isShuffleEnabled = mutableStateOf(false)
    val isShuffleEnabled: State<Boolean> = _isShuffleEnabled

    private val _isRepeatEnabled = mutableStateOf(false)
    val isRepeatEnabled: State<Boolean> = _isRepeatEnabled

    private val _isAutoPlayEnabled = mutableStateOf(true) // Auto-advancing tracks
    val isAutoPlayEnabled: State<Boolean> = _isAutoPlayEnabled

    private var timerJob: Job? = null

    init {
        initializeController()
    }

    private fun initializeController() {
        val sessionToken = SessionToken(
            getApplication(),
            ComponentName(getApplication(), PlaybackService::class.java)
        )
        
        controllerFuture = MediaController.Builder(getApplication(), sessionToken).buildAsync()
        
        controllerFuture?.addListener({
            try {
                val controller = controllerFuture?.get() ?: return@addListener
                mediaController = controller
                
                // Add listener to sync states
                controller.addListener(object : Player.Listener {
                    override fun onIsPlayingChanged(isPlayingChanged: Boolean) {
                        _isPlaying.value = isPlayingChanged
                        if (isPlayingChanged) {
                            startTimer()
                        } else {
                            stopTimer()
                        }
                    }

                    override fun onMediaItemTransition(mediaItem: MediaItem?, reason: Int) {
                        super.onMediaItemTransition(mediaItem, reason)
                        updateCurrentTrack(mediaItem)
                    }

                    override fun onShuffleModeEnabledChanged(shuffleModeEnabled: Boolean) {
                        _isShuffleEnabled.value = shuffleModeEnabled
                    }

                    override fun onRepeatModeChanged(repeatMode: Int) {
                        _isRepeatEnabled.value = repeatMode == Player.REPEAT_MODE_ONE
                        _isAutoPlayEnabled.value = repeatMode == Player.REPEAT_MODE_ALL
                    }
                })

                // Initial status sync
                _isPlaying.value = controller.isPlaying
                _isShuffleEnabled.value = controller.shuffleModeEnabled
                _isRepeatEnabled.value = controller.repeatMode == Player.REPEAT_MODE_ONE
                _isAutoPlayEnabled.value = controller.repeatMode == Player.REPEAT_MODE_ALL || controller.repeatMode == Player.REPEAT_MODE_OFF
                
                updateCurrentTrack(controller.currentMediaItem)
                
                if (controller.isPlaying) {
                    startTimer()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }, MoreExecutors.directExecutor())
    }

    fun setTracks(tracksList: List<Track>) {
        _tracks.value = tracksList
        filterTracks()
    }

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
        filterTracks()
    }

    private fun filterTracks() {
        val query = _searchQuery.value.trim()
        _filteredTracks.value = if (query.isEmpty()) {
            _tracks.value
        } else {
            _tracks.value.filter {
                it.title.contains(query, ignoreCase = true) ||
                it.artist.contains(query, ignoreCase = true)
            }
        }
    }

    private fun updateCurrentTrack(mediaItem: MediaItem?) {
        val controller = mediaController ?: return
        if (mediaItem == null) {
            _currentTrack.value = null
            _totalDuration.longValue = 0L
            _currentTime.longValue = 0L
            return
        }
        
        // Match the current media item by URI path to our track data list
        val currentPath = mediaItem.requestMetadata.mediaUri?.path ?: ""
        val matchedTrack = _tracks.value.find { it.path == currentPath }
        _currentTrack.value = matchedTrack ?: Track(
            id = -1,
            title = mediaItem.mediaMetadata.title?.toString() ?: "Unknown Track",
            artist = mediaItem.mediaMetadata.artist?.toString() ?: "Unknown Artist",
            path = currentPath,
            duration = controller.duration.coerceAtLeast(0L),
            size = 0L
        )

        _totalDuration.longValue = controller.duration.coerceAtLeast(0L)
        _currentTime.longValue = controller.currentPosition.coerceAtLeast(0L)
    }

    fun playTrack(track: Track) {
        val controller = mediaController ?: return

        // Set up the tracks playlist in the Media3 controller
        controller.stop()
        controller.clearMediaItems()

        // We load our currently filtered list of tracks as the playing list
        val currentPlayList = _filteredTracks.value
        if (currentPlayList.isEmpty()) return

        var startIndex = 0
        val mediaItems = currentPlayList.mapIndexed { index, t ->
            if (t.id == track.id) {
                startIndex = index
            }
            
            val metadata = MediaMetadata.Builder()
                .setTitle(t.title)
                .setArtist(t.artist)
                .build()
                
            MediaItem.Builder()
                .setMediaId(t.id.toString())
                .setUri(Uri.parse(t.path))
                .setMediaMetadata(metadata)
                .setRequestMetadata(
                    androidx.media3.common.MediaItem.RequestMetadata.Builder()
                        .setMediaUri(Uri.parse(t.path))
                        .build()
                )
                .build()
        }

        controller.setMediaItems(mediaItems, startIndex, 0L)
        
        // Sync repeat settings
        syncRepeatMode()
        
        controller.prepare()
        controller.play()
    }

    fun togglePlayPause() {
        val controller = mediaController ?: return
        if (controller.isPlaying) {
            controller.pause()
        } else {
            if (controller.mediaItemCount == 0 && _filteredTracks.value.isNotEmpty()) {
                // Play first track if nothing is loaded yet
                playTrack(_filteredTracks.value.first())
            } else {
                controller.play()
            }
        }
    }

    fun playNext() {
        val controller = mediaController ?: return
        if (controller.hasNextMediaItem()) {
            controller.seekToNextMediaItem()
        } else if (controller.mediaItemCount > 0) {
            // Loop back to start
            controller.seekTo(0, 0L)
        }
    }

    fun playPrevious() {
        val controller = mediaController ?: return
        if (controller.hasPreviousMediaItem()) {
            controller.seekToPreviousMediaItem()
        } else if (controller.mediaItemCount > 0) {
            // Loop to the last track
            controller.seekTo(controller.mediaItemCount - 1, 0L)
        }
    }

    fun seekTo(milliseconds: Long) {
        val controller = mediaController ?: return
        controller.seekTo(milliseconds)
        _currentTime.longValue = milliseconds
    }

    fun toggleShuffle() {
        val controller = mediaController ?: return
        val nextMode = !controller.shuffleModeEnabled
        controller.shuffleModeEnabled = nextMode
        _isShuffleEnabled.value = nextMode
    }

    fun toggleRepeat() {
        _isRepeatEnabled.value = !_isRepeatEnabled.value
        if (_isRepeatEnabled.value) {
            _isAutoPlayEnabled.value = false
        }
        syncRepeatMode()
    }

    fun toggleAutoPlay() {
        _isAutoPlayEnabled.value = !_isAutoPlayEnabled.value
        if (_isAutoPlayEnabled.value) {
            _isRepeatEnabled.value = false
        }
        syncRepeatMode()
    }

    private fun syncRepeatMode() {
        val controller = mediaController ?: return
        controller.repeatMode = when {
            _isRepeatEnabled.value -> Player.REPEAT_MODE_ONE
            _isAutoPlayEnabled.value -> Player.REPEAT_MODE_ALL
            else -> Player.REPEAT_MODE_OFF
        }
    }

    private fun startTimer() {
        stopTimer()
        timerJob = viewModelScope.launch {
            while (true) {
                mediaController?.let { controller ->
                    _currentTime.longValue = controller.currentPosition.coerceAtLeast(0L)
                    _totalDuration.longValue = controller.duration.coerceAtLeast(0L)
                }
                delay(500)
            }
        }
    }

    private fun stopTimer() {
        timerJob?.cancel()
        timerJob = null
    }

    override fun onCleared() {
        stopTimer()
        controllerFuture?.let {
            MediaController.releaseFuture(it)
        }
        super.onCleared()
    }
}
