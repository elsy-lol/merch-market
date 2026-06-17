package com.streetplayer.music.data

data class Track(
    val id: Long,
    val title: String,
    val artist: String,
    val path: String,
    val duration: Long, // Duration in milliseconds
    val size: Long      // File size in bytes
)
