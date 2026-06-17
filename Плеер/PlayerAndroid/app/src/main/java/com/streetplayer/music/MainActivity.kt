package com.streetplayer.music

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.streetplayer.music.data.MusicScanner
import com.streetplayer.music.ui.PlayerScreen
import com.streetplayer.music.ui.PlayerViewModel
import com.streetplayer.music.ui.theme.StreetPlayerTheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {

    private val viewModel: PlayerViewModel by viewModels()

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions: Map<String, Boolean> ->
        val allGranted = permissions.values.all { it }
        if (allGranted) {
            scanAndLoadMusic()
        } else {
            Toast.makeText(this, "Разрешения не предоставлены!", Toast.LENGTH_LONG).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            StreetPlayerTheme {
                PlayerScreen(viewModel = viewModel)
            }
        }

        checkAndRequestPermissions()
    }

    private fun checkAndRequestPermissions() {
        val permissions = mutableListOf<String>()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.READ_MEDIA_AUDIO)
            permissions.add(Manifest.permission.POST_NOTIFICATIONS)
        } else {
            permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE)
        }

        val allGranted = permissions.all {
            ContextCompat.checkSelfPermission(this, it) == PackageManager.PERMISSION_GRANTED
        }

        if (allGranted) {
            scanAndLoadMusic()
        } else {
            requestPermissionLauncher.launch(permissions.toTypedArray())
        }
    }

    private fun scanAndLoadMusic() {
        lifecycleScope.launch {
            val tracks = withContext(Dispatchers.IO) {
                MusicScanner(this@MainActivity).scanLocalAudio()
            }
            viewModel.setTracks(tracks)
            if (tracks.isEmpty()) {
                Toast.makeText(this@MainActivity, "Аудиофайлы не найдены!", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
