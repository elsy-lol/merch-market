package com.streetplayer.music.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.streetplayer.music.data.Track
import com.streetplayer.music.ui.theme.*
import kotlinx.coroutines.launch
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlayerScreen(
    viewModel: PlayerViewModel,
    modifier: Modifier = Modifier
) {
    val tracks by viewModel.filteredTracks
    val currentTrack by viewModel.currentTrack
    val isPlaying by viewModel.isPlaying
    val currentTime by viewModel.currentTime
    val totalDuration by viewModel.totalDuration
    val isShuffle by viewModel.isShuffleEnabled
    val isRepeat by viewModel.isRepeatEnabled
    val isAutoPlay by viewModel.isAutoPlayEnabled
    val searchQuery by viewModel.searchQuery

    val listState = rememberLazyListState()
    val coroutineScope = rememberCoroutineScope()

    // Smoothly scroll the list to highlight the playing track
    LaunchedEffect(currentTrack) {
        currentTrack?.let { active ->
            val index = tracks.indexOfFirst { it.id == active.id }
            if (index >= 0) {
                coroutineScope.launch {
                    listState.animateScrollToItem(index)
                }
            }
        }
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(CyberBg, Color(0xFF020205))
                )
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .navigationBarsPadding()
        ) {
            // 1. Header with Lbl and Search
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .statusBarsPadding()
                    .padding(horizontal = 24.dp, vertical = 16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "STREET",
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White,
                            letterSpacing = 1.sp
                        )
                        Text(
                            text = "PLAYER - MOBILE",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = CyberAccent,
                            letterSpacing = 2.sp
                        )
                    }

                    // Track count bubble
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0x10FFFFFF))
                            .border(BorderStroke(1.dp, Color(0x15FFFFFF)), RoundedCornerShape(12.dp))
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = "${tracks.size} ТРЕКОВ",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = TextSecondary
                        )
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Search Bar
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { viewModel.updateSearchQuery(it) },
                    placeholder = { 
                        Text(
                            "Поиск треков...", 
                            color = TextSecondary.copy(alpha = 0.5f),
                            fontSize = 14.sp
                        ) 
                    },
                    leadingIcon = {
                        Icon(
                            imageVector = Icons.Rounded.Search,
                            contentDescription = "Search",
                            tint = TextSecondary.copy(alpha = 0.6f)
                        )
                    },
                    trailingIcon = {
                        if (searchQuery.isNotEmpty()) {
                            IconButton(onClick = { viewModel.updateSearchQuery("") }) {
                                Icon(
                                    imageVector = Icons.Rounded.Close,
                                    contentDescription = "Clear",
                                    tint = TextSecondary
                                )
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    shape = RoundedCornerShape(26.dp),
                    colors = TextFieldDefaults.outlinedTextFieldColors(
                        focusedTextColor = TextPrimary,
                        unfocusedTextColor = TextPrimary,
                        containerColor = Color(0x15FFFFFF),
                        focusedBorderColor = CyberAccent.copy(alpha = 0.8f),
                        unfocusedBorderColor = Color(0x15FFFFFF)
                    ),
                    singleLine = true
                )
            }

            // 2. Tracks Playlist
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x05FFFFFF))
                    .border(BorderStroke(1.dp, Color(0x08FFFFFF)), RoundedCornerShape(20.dp))
            ) {
                if (tracks.isEmpty()) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                imageVector = Icons.Rounded.LibraryMusic,
                                contentDescription = null,
                                tint = TextSecondary.copy(alpha = 0.2f),
                                modifier = Modifier.size(64.dp)
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Text(
                                text = if (searchQuery.isEmpty()) "Список пуст\nВыполните сканирование" else "Ничего не найдено",
                                color = TextSecondary,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Medium,
                                textAlign = androidx.compose.ui.text.style.TextAlign.Center
                            )
                        }
                    }
                } else {
                    LazyColumn(
                        state = listState,
                        contentPadding = PaddingValues(12.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.fillMaxSize()
                    ) {
                        itemsIndexed(
                            items = tracks,
                            key = { _, track -> track.id }
                        ) { index, track ->
                            val isCurrent = currentTrack?.id == track.id
                            TrackItem(
                                index = index + 1,
                                track = track,
                                isCurrent = isCurrent,
                                isPlaying = isPlaying && isCurrent,
                                onClick = { viewModel.playTrack(track) }
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(15.dp))

            // 3. Floating Bottom Control Panel
            Card(
                shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp),
                colors = CardDefaults.cardColors(containerColor = CyberSurfaceTransparent),
                border = BorderStroke(1.dp, Color(0x15FFFFFF)),
                modifier = Modifier
                    .fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 24.dp, vertical = 20.dp)
                ) {
                    // Current track name
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = currentTrack?.title?.uppercase(Locale.getDefault()) ?: "STREET PLAYER",
                                color = Color.White,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Text(
                                text = currentTrack?.artist ?: "СЕЙЧАС НЕ ИГРАЕТ",
                                color = if (currentTrack != null) CyberAccent else TextSecondary,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Progress seek slider
                    var sliderPosition by remember { mutableFloatStateOf(0f) }
                    var userIsDragging by remember { mutableStateOf(false) }

                    val progressValue = if (userIsDragging) {
                        sliderPosition
                    } else {
                        if (totalDuration > 0) currentTime.toFloat() / totalDuration else 0f
                    }

                    Column(modifier = Modifier.fillMaxWidth()) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = formatTime(if (userIsDragging) (sliderPosition * totalDuration).toLong() else currentTime),
                                fontSize = 10.sp,
                                color = TextSecondary,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = formatTime(totalDuration),
                                fontSize = 10.sp,
                                color = TextSecondary,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Slider(
                            value = progressValue.coerceIn(0f, 1f),
                            onValueChange = {
                                userIsDragging = true
                                sliderPosition = it
                            },
                            onValueChangeFinished = {
                                viewModel.seekTo((sliderPosition * totalDuration).toLong())
                                userIsDragging = false
                            },
                            colors = SliderDefaults.colors(
                                thumbColor = Color.White,
                                activeTrackColor = CyberAccent,
                                inactiveTrackColor = Color(0x15FFFFFF)
                            ),
                            modifier = Modifier.padding(vertical = 0.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Control buttons
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Toggles
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Shuffle
                            IconButton(
                                onClick = { viewModel.toggleShuffle() },
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (isShuffle) CyberAccent.copy(alpha = 0.2f) else Color.Transparent)
                                    .border(
                                        BorderStroke(
                                            1.dp,
                                            if (isShuffle) CyberAccent else Color.Transparent
                                        ), RoundedCornerShape(8.dp)
                                    )
                            ) {
                                Icon(
                                    imageVector = Icons.Rounded.Shuffle,
                                    contentDescription = "Shuffle",
                                    tint = if (isShuffle) Color.White else TextSecondary,
                                    modifier = Modifier.size(16.dp)
                                )
                            }

                            // Repeat
                            IconButton(
                                onClick = { viewModel.toggleRepeat() },
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (isRepeat) CyberAccent.copy(alpha = 0.2f) else Color.Transparent)
                                    .border(
                                        BorderStroke(
                                            1.dp,
                                            if (isRepeat) CyberAccent else Color.Transparent
                                        ), RoundedCornerShape(8.dp)
                                    )
                            ) {
                                Icon(
                                    imageVector = Icons.Rounded.Repeat,
                                    contentDescription = "Repeat",
                                    tint = if (isRepeat) Color.White else TextSecondary,
                                    modifier = Modifier.size(16.dp)
                                )
                            }

                            // Autoplay / Queue
                            IconButton(
                                onClick = { viewModel.toggleAutoPlay() },
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (isAutoPlay) CyberAccent.copy(alpha = 0.2f) else Color.Transparent)
                                    .border(
                                        BorderStroke(
                                            1.dp,
                                            if (isAutoPlay) CyberAccent else Color.Transparent
                                        ), RoundedCornerShape(8.dp)
                                    )
                            ) {
                                Icon(
                                    imageVector = Icons.Rounded.PlayCircle,
                                    contentDescription = "Autoplay",
                                    tint = if (isAutoPlay) Color.White else TextSecondary,
                                    modifier = Modifier.size(16.dp)
                                )
                            }
                        }

                        // Media Control buttons (Prev, Play/Pause, Next)
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            IconButton(
                                onClick = { viewModel.playPrevious() },
                                modifier = Modifier
                                    .size(42.dp)
                                    .clip(RoundedCornerShape(21.dp))
                                    .background(Color(0xFF202030))
                            ) {
                                Icon(
                                    imageVector = Icons.Rounded.SkipPrevious,
                                    contentDescription = "Previous",
                                    tint = Color.White,
                                    modifier = Modifier.size(18.dp)
                                )
                            }

                            IconButton(
                                onClick = { viewModel.togglePlayPause() },
                                modifier = Modifier
                                    .size(56.dp)
                                    .clip(RoundedCornerShape(28.dp))
                                    .background(CyberAccent)
                            ) {
                                Icon(
                                    imageVector = if (isPlaying) Icons.Rounded.Pause else Icons.Rounded.PlayArrow,
                                    contentDescription = "Play/Pause",
                                    tint = Color.White,
                                    modifier = Modifier.size(24.dp)
                                )
                            }

                            IconButton(
                                onClick = { viewModel.playNext() },
                                modifier = Modifier
                                    .size(42.dp)
                                    .clip(RoundedCornerShape(21.dp))
                                    .background(Color(0xFF202030))
                            ) {
                                Icon(
                                    imageVector = Icons.Rounded.SkipNext,
                                    contentDescription = "Next",
                                    tint = Color.White,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TrackItem(
    index: Int,
    track: Track,
    isCurrent: Boolean,
    isPlaying: Boolean,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(if (isCurrent) CyberAccent.copy(alpha = 0.15f) else Color.Transparent)
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Track number or active play icon
        if (isCurrent) {
            Icon(
                imageVector = if (isPlaying) Icons.Rounded.VolumeUp else Icons.Rounded.PlayArrow,
                contentDescription = null,
                tint = CyberAccent,
                modifier = Modifier
                    .size(24.dp)
                    .padding(end = 6.dp)
            )
        } else {
            Text(
                text = String.format("%02d", index),
                color = TrackIndex,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .width(24.dp)
                    .padding(end = 6.dp)
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        // Title and Artist
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = track.title,
                color = if (isCurrent) Color.White else TextPrimary,
                fontSize = 15.sp,
                fontWeight = if (isCurrent) FontWeight.Bold else FontWeight.Medium,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = track.artist,
                color = if (isCurrent) CyberAccent else TextSecondary,
                fontSize = 12.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        // Time length
        Text(
            text = formatTime(track.duration),
            color = if (isCurrent) CyberAccent else TextSecondary.copy(alpha = 0.8f),
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

private fun formatTime(milliseconds: Long): String {
    val totalSeconds = milliseconds / 1000
    val minutes = totalSeconds / 60
    val seconds = totalSeconds % 60
    return String.format(Locale.getDefault(), "%02d:%02d", minutes, seconds)
}
