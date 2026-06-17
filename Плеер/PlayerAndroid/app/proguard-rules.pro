# Proguard rules for the application
# For more details, see http://developer.android.com/tools/help/proguard.html

# Keep Jetpack Media3 classes from shrinking
-keep class androidx.media3.session.** { *; }
-keep class androidx.media3.exoplayer.** { *; }
-keep class androidx.media3.common.** { *; }
