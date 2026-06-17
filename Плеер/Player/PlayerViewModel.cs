using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;
using Avalonia.Media.Imaging;
using Avalonia.Platform.Storage;
using Avalonia.Threading;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using NAudio.Wave;
using TagLibFile = TagLib.File;

namespace Player;

public partial class PlayerViewModel : ObservableObject
{
    private WaveOutEvent? outputDevice;
    private AudioFileReader? audioFile;
    private EqualizerSampleProvider? equalizer;
    private DispatcherTimer timer = new() { Interval = TimeSpan.FromMilliseconds(500) };
    private int currentIndex = -1;
    private bool _isDragging;
    private Random rng = new();
    private CancellationTokenSource? scanCts;
    private List<PlaylistItem> fullPlaylist = new();

    public ObservableCollection<PlaylistItem> Playlist { get; } = new();

    [ObservableProperty]
    private PlaylistItem? selectedPlaylistItem;

    [ObservableProperty]
    private bool isPlaying;

    [ObservableProperty]
    private bool isPaused;

    [ObservableProperty]
    private double volume = 50;

    [ObservableProperty]
    private double bass = 50;

    [ObservableProperty]
    private double treble = 50;

    [ObservableProperty]
    private double seekValue;

    [ObservableProperty]
    private double seekMaximum;

    [ObservableProperty]
    private string currentTimeText = "00:00";

    [ObservableProperty]
    private string totalTimeText = "00:00";

    [ObservableProperty]
    private string statusText = "ГОТОВ | 0 ТРЕКОВ";

    [ObservableProperty]
    private string searchQuery = "";

    [ObservableProperty]
    private bool isRepeatEnabled;

    [ObservableProperty]
    private bool isShuffleEnabled;

    [ObservableProperty]
    private bool isAutoPlayEnabled = true;

    [ObservableProperty]
    private string currentTrackName = "STREET PLAYER";

    [ObservableProperty]
    private string currentTrackArtist = "";

    [ObservableProperty]
    private string currentAlbumText = "";

    [ObservableProperty]
    private Bitmap? currentCoverArt;

    [ObservableProperty]
    private bool isLoading;

    [ObservableProperty]
    private double loadingProgress;

    public bool ShowPlayIcon => !IsPlaying || IsPaused;
    public bool ShowPauseIcon => IsPlaying && !IsPaused;
    public bool HasCoverArt => CurrentCoverArt != null;
    public bool HasAlbumText => !string.IsNullOrEmpty(CurrentAlbumText);

    public PlayerViewModel()
    {
        timer.Tick += TimerTick;
        LoadPlaylist();
    }

    partial void OnVolumeChanged(double value)
    {
        if (outputDevice != null)
            outputDevice.Volume = (float)(value / 100);
    }

    partial void OnBassChanged(double value)
    {
        if (equalizer != null) equalizer.BassGain = (float)((value - 50) * 0.48);
    }

    partial void OnTrebleChanged(double value)
    {
        if (equalizer != null) equalizer.TrebleGain = (float)((value - 50) * 0.48);
    }

    partial void OnSearchQueryChanged(string value)
    {
        UpdateFilter();
    }

    partial void OnIsPlayingChanged(bool value)
    {
        OnPropertyChanged(nameof(ShowPlayIcon));
        OnPropertyChanged(nameof(ShowPauseIcon));
        if (value && !IsPaused) timer.Start();
        else timer.Stop();
    }

    partial void OnIsPausedChanged(bool value)
    {
        OnPropertyChanged(nameof(ShowPlayIcon));
        OnPropertyChanged(nameof(ShowPauseIcon));
    }

    partial void OnIsRepeatEnabledChanged(bool value)
    {
        if (value) IsAutoPlayEnabled = false;
    }

    partial void OnIsAutoPlayEnabledChanged(bool value)
    {
        if (value) IsRepeatEnabled = false;
    }

    public void SetDragging(bool dragging) => _isDragging = dragging;

    private void TimerTick(object? sender, EventArgs e)
    {
        if (audioFile != null && !_isDragging)
        {
            SeekValue = audioFile.CurrentTime.TotalSeconds;
            CurrentTimeText = audioFile.CurrentTime.ToString(@"mm\:ss");
        }
    }

    [RelayCommand]
    private void PlayPause()
    {
        if (Playlist.Count == 0) return;
        if (IsPlaying && !IsPaused)
        {
            outputDevice?.Pause();
            IsPaused = true;
        }
        else if (IsPaused)
        {
            outputDevice?.Play();
            IsPaused = false;
        }
        else
        {
            if (currentIndex < 0) currentIndex = 0;
            PlayCur();
        }
    }

    [RelayCommand]
    private void PlayNext()
    {
        if (Playlist.Count == 0) return;
        if (IsShuffleEnabled) currentIndex = rng.Next(Playlist.Count);
        else
        {
            currentIndex++;
            if (currentIndex >= Playlist.Count) currentIndex = 0;
        }
        PlayCur();
    }

    [RelayCommand]
    private void PlayPrev()
    {
        if (Playlist.Count == 0) return;
        currentIndex--;
        if (currentIndex < 0) currentIndex = Playlist.Count - 1;
        PlayCur();
    }

    public void PlaySelected()
    {
        if (SelectedPlaylistItem == null) return;
        currentIndex = Playlist.IndexOf(SelectedPlaylistItem);
        PlayCur();
    }

    private void PlayCur()
    {
        if (currentIndex < 0 || currentIndex >= Playlist.Count) return;
        StopPlayback();

        try
        {
            var item = Playlist[currentIndex];
            foreach (var p in Playlist) p.IsCurrent = false;
            item.IsCurrent = true;

            audioFile = new AudioFileReader(item.Path);
            equalizer = new EqualizerSampleProvider(audioFile)
            {
                BassGain = (float)((Bass - 50) * 0.48),
                TrebleGain = (float)((Treble - 50) * 0.48)
            };
            outputDevice = new WaveOutEvent();
            outputDevice.PlaybackStopped += OnPlaybackStopped;

            outputDevice.Init(equalizer);
            outputDevice.Volume = (float)(Volume / 100);
            outputDevice.Play();

            IsPlaying = true;
            IsPaused = false;

            CurrentTrackName = (item.Name != Path.GetFileName(item.Path) ? item.Name : Path.GetFileNameWithoutExtension(item.Path)).ToUpper();
            CurrentTrackArtist = !string.IsNullOrEmpty(item.Artist) ? item.Artist : "СЕЙЧАС ИГРАЕТ";
            CurrentAlbumText = !string.IsNullOrEmpty(item.Album) ? item.Album : "";
            CurrentCoverArt = LoadCoverArt(item.CoverArt);
            OnPropertyChanged(nameof(HasCoverArt));
            OnPropertyChanged(nameof(HasAlbumText));
            TotalTimeText = audioFile.TotalTime.ToString(@"mm\:ss");
            SeekMaximum = audioFile.TotalTime.TotalSeconds;
            SeekValue = 0;

            SelectedPlaylistItem = item;
        }
        catch (Exception ex)
        {
            StatusText = $"ОШИБКА: {ex.Message}";
            _ = Task.Delay(500).ContinueWith(_ => Dispatcher.UIThread.Post(() => PlayNext()));
        }
    }

    private void OnPlaybackStopped(object? sender, StoppedEventArgs e)
    {
        if (IsPlaying && !IsPaused)
        {
            _ = Dispatcher.UIThread.InvokeAsync(() => {
                if (IsRepeatEnabled) PlayCur();
                else if (IsAutoPlayEnabled) PlayNext();
                else StopPlayback();
            });
        }
    }

    private void StopPlayback()
    {
        if (outputDevice != null)
        {
            outputDevice.PlaybackStopped -= OnPlaybackStopped;
            outputDevice.Stop();
            outputDevice.Dispose();
            outputDevice = null;
        }
        if (audioFile != null)
        {
            audioFile.Dispose();
            audioFile = null;
        }
        equalizer = null;
        IsPlaying = false;
        IsPaused = false;
        SeekValue = 0;
        CurrentTimeText = "00:00";
        CurrentCoverArt = null;
        CurrentAlbumText = "";
        OnPropertyChanged(nameof(HasCoverArt));
        OnPropertyChanged(nameof(HasAlbumText));
    }

    private static Bitmap? LoadCoverArt(byte[]? data)
    {
        if (data == null || data.Length == 0) return null;
        try { using var ms = new MemoryStream(data); return Bitmap.DecodeToWidth(ms, 200); }
        catch { return null; }
    }

    [RelayCommand]
    private async Task ScanDrives()
    {
        scanCts?.Cancel();
        scanCts = new CancellationTokenSource();
        var ct = scanCts.Token;

        var drives = DriveInfo.GetDrives()
            .Where(d => d.IsReady && (d.DriveType == DriveType.Fixed || d.DriveType == DriveType.Removable))
            .Select(d => d.RootDirectory.FullName).ToList();
        if (drives.Count > 0)
            await ScanPathsAsync(drives, ct);
    }

    [RelayCommand]
    private async Task SelectFolder(TopLevel? topLevel)
    {
        if (topLevel == null) return;
        var folders = await topLevel.StorageProvider.OpenFolderPickerAsync(
            new FolderPickerOpenOptions { Title = "Выберите папку с музыкой" });
        if (folders.Count > 0)
        {
            scanCts?.Cancel();
            scanCts = new CancellationTokenSource();
            _ = ScanPathsAsync(new[] { folders[0].Path.LocalPath }, scanCts.Token);
        }
    }

    [RelayCommand]
    private async Task AddFiles(TopLevel? topLevel)
    {
        if (topLevel == null) return;
        var files = await topLevel.StorageProvider.OpenFilePickerAsync(
            new FilePickerOpenOptions { AllowMultiple = true, Title = "Выберите аудиофайлы" });
        if (files.Count > 0)
        {
            AddFilesInner(files.Select(f => f.Path.LocalPath).ToArray());
            UpdateFilter();
        }
    }

    [RelayCommand]
    private void ClearPlaylist()
    {
        StopPlayback();
        fullPlaylist.Clear();
        Playlist.Clear();
        currentIndex = -1;
        SearchQuery = "";
        SavePlaylist();
    }

    public void SeekCompleted()
    {
        if (audioFile != null)
        {
            audioFile.CurrentTime = TimeSpan.FromSeconds(SeekValue);
            CurrentTimeText = audioFile.CurrentTime.ToString(@"mm\:ss");
        }
    }

    private async Task ScanPathsAsync(IEnumerable<string> paths, CancellationToken ct)
    {
        StatusText = "СКАНИРОВАНИЕ...";
        try
        {
            var exts = new HashSet<string>(new[] { ".mp3", ".wav", ".flac", ".ogg", ".aac", ".wma", ".m4a" }, StringComparer.OrdinalIgnoreCase);
            var found = new List<string>();
            await Task.Run(() =>
            {
                foreach (var path in paths)
                {
                    try
                    {
                        foreach (var f in Directory.EnumerateFiles(path, "*", new EnumerationOptions { IgnoreInaccessible = true, MaxRecursionDepth = 4 }))
                        {
                            if (ct.IsCancellationRequested) break;
                            if (exts.Contains(Path.GetExtension(f))) lock (found) found.Add(f);
                        }
                    }
                    catch { }
                }
            }, ct);
            AddFilesInner(found.ToArray());
            UpdateFilter();
        }
        catch { }
        finally
        {
            StatusText = $"ГОТОВ | {fullPlaylist.Count} ТРЕКОВ";
        }
    }

    internal void AddFilesInner(string[] files)
    {
        foreach (var f in files)
        {
            if (!fullPlaylist.Any(p => p.Path == f))
            {
                var item = new PlaylistItem
                {
                    Path = f,
                    Name = Path.GetFileName(f),
                    Index = (fullPlaylist.Count + 1).ToString("D2")
                };
                fullPlaylist.Add(item);
                ParseTagsAsync(item);
            }
        }
        SavePlaylist();
    }

    private void ParseTagsAsync(PlaylistItem item)
    {
        _ = Task.Run(() =>
        {
            try
            {
                using var tagFile = TagLibFile.Create(item.Path);
                var tag = tagFile.Tag;
                var title = tag.Title;
                if (!string.IsNullOrEmpty(title)) item.Name = title;
                if (!string.IsNullOrEmpty(tag.FirstPerformer)) item.Artist = tag.FirstPerformer;
                if (!string.IsNullOrEmpty(tag.Album)) item.Album = tag.Album;
                var pic = tag.Pictures.FirstOrDefault();
                if (pic?.Data?.Data != null) item.CoverArt = pic.Data.Data;
            }
            catch { }
        });
    }

    internal void UpdateFilter()
    {
        var filter = SearchQuery?.Trim();
        Playlist.Clear();
        foreach (var item in fullPlaylist)
        {
            if (string.IsNullOrEmpty(filter) ||
                item.Name.Contains(filter, StringComparison.OrdinalIgnoreCase) ||
                item.Path.Contains(filter, StringComparison.OrdinalIgnoreCase))
            {
                Playlist.Add(item);
            }
        }
        StatusText = $"ГОТОВ | {fullPlaylist.Count} ТРЕКОВ";
    }

    private string GetPlaylistPath()
    {
        var dir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "STREET PLAYER");
        Directory.CreateDirectory(dir);
        return Path.Combine(dir, "playlist.json");
    }

    private void SavePlaylist()
    {
        try
        {
            var paths = fullPlaylist.Select(i => i.Path).ToList();
            var json = System.Text.Json.JsonSerializer.Serialize(paths);
            File.WriteAllText(GetPlaylistPath(), json);
        }
        catch { }
    }

    private void LoadPlaylist()
    {
        try
        {
            var path = GetPlaylistPath();
            if (!File.Exists(path)) return;
            var json = File.ReadAllText(path);
            var paths = System.Text.Json.JsonSerializer.Deserialize<List<string>>(json);
            if (paths == null || paths.Count == 0) return;
            var existing = paths.Where(p => File.Exists(p)).ToArray();
            AddFilesInner(existing);
            UpdateFilter();
            StatusText = $"ЗАГРУЖЕНО | {fullPlaylist.Count} ТРЕКОВ";
        }
        catch { }
    }
}
