namespace Player.Tests;

public class PlayerViewModelTests
{
    private PlayerViewModel CreateVm()
    {
        return new PlayerViewModel();
    }

    [Fact]
    public void PlayPause_EmptyPlaylist_DoesNothing()
    {
        var vm = CreateVm();
        vm.PlayPauseCommand.Execute(null);
        Assert.False(vm.IsPlaying);
        Assert.False(vm.IsPaused);
    }

    [Fact]
    public void PlayNext_EmptyPlaylist_DoesNothing()
    {
        var vm = CreateVm();
        vm.PlayNextCommand.Execute(null);
        Assert.False(vm.IsPlaying);
    }

    [Fact]
    public void PlayPrev_EmptyPlaylist_DoesNothing()
    {
        var vm = CreateVm();
        vm.PlayPrevCommand.Execute(null);
        Assert.False(vm.IsPlaying);
    }

    [Fact]
    public void ClearPlaylist_RemovesAllTracks()
    {
        var vm = CreateVm();
        vm.AddFilesCommand.Execute(null);
        vm.ClearPlaylistCommand.Execute(null);
        Assert.Empty(vm.Playlist);
    }

    [Fact]
    public void ToggleShuffle_ChangesState()
    {
        var vm = CreateVm();
        Assert.False(vm.IsShuffleEnabled);
        vm.PlayPauseCommand.Execute(null);
    }

    [Fact]
    public void ShuffleAndRepeat_AreIndependent()
    {
        var vm = CreateVm();

        vm.IsShuffleEnabled = true;
        vm.IsRepeatEnabled = true;
        Assert.True(vm.IsShuffleEnabled);
        Assert.True(vm.IsRepeatEnabled);

        vm.IsShuffleEnabled = false;
        Assert.False(vm.IsShuffleEnabled);
    }

    [Fact]
    public void RepeatAndAutoPlay_MutuallyExclusive_RepeatDisablesAutoPlay()
    {
        var vm = CreateVm();
        vm.IsAutoPlayEnabled = true;
        vm.IsRepeatEnabled = true;
        Assert.False(vm.IsAutoPlayEnabled);
        Assert.True(vm.IsRepeatEnabled);
    }

    [Fact]
    public void RepeatAndAutoPlay_MutuallyExclusive_AutoPlayDisablesRepeat()
    {
        var vm = CreateVm();
        vm.IsRepeatEnabled = true;
        vm.IsAutoPlayEnabled = true;
        Assert.False(vm.IsRepeatEnabled);
        Assert.True(vm.IsAutoPlayEnabled);
    }

    [Fact]
    public void ShowPlayIcon_WhenNotPlaying_ReturnsTrue()
    {
        var vm = CreateVm();
        Assert.True(vm.ShowPlayIcon);
        Assert.False(vm.ShowPauseIcon);
    }

    [Fact]
    public void ShowPauseIcon_WhenPlaying_ReturnsTrue()
    {
        var vm = CreateVm();
        vm.IsPlaying = true;
        Assert.False(vm.ShowPlayIcon);
        Assert.True(vm.ShowPauseIcon);
    }

    [Fact]
    public void SearchQuery_FiltersPlaylist()
    {
        var vm = CreateVm();

        vm.AddFilesInner(new[] { @"C:\music\song1.mp3", @"C:\music\song2.flac", @"C:\podcast\episode1.mp3" });
        vm.UpdateFilter();

        Assert.Equal(3, vm.Playlist.Count);

        vm.SearchQuery = "song";
        Assert.Equal(2, vm.Playlist.Count);

        vm.SearchQuery = "podcast";
        Assert.Single(vm.Playlist);

        vm.SearchQuery = "";
        Assert.Equal(3, vm.Playlist.Count);
    }

    [Fact]
    public void Volume_RangeIsCorrect()
    {
        var vm = CreateVm();
        Assert.Equal(50, vm.Volume);

        vm.Volume = 0;
        Assert.Equal(0, vm.Volume);

        vm.Volume = 100;
        Assert.Equal(100, vm.Volume);
    }

    [Fact]
    public void DefaultState_IsCorrect()
    {
        var vm = CreateVm();
        Assert.False(vm.IsPlaying);
        Assert.False(vm.IsPaused);
        Assert.False(vm.IsLoading);
        Assert.False(vm.IsRepeatEnabled);
        Assert.False(vm.IsShuffleEnabled);
        Assert.True(vm.IsAutoPlayEnabled);
        Assert.Equal("ГОТОВ | 0 ТРЕКОВ", vm.StatusText);
        Assert.Equal("STREET PLAYER", vm.CurrentTrackName);
        Assert.Equal(50, vm.Volume);
        Assert.Empty(vm.Playlist);
    }

    [Fact]
    public void AddFilesInner_DuplicatesIgnored()
    {
        var vm = CreateVm();
        vm.AddFilesInner(new[] { @"C:\music\song.mp3" });
        vm.AddFilesInner(new[] { @"C:\music\song.mp3" });
        vm.UpdateFilter();
        Assert.Single(vm.Playlist);
    }

    [Fact]
    public void PlaySelected_WithNoSelection_DoesNothing()
    {
        var vm = CreateVm();
        vm.PlaySelected();
        Assert.False(vm.IsPlaying);

        vm.SelectedPlaylistItem = null;
        vm.PlaySelected();
        Assert.False(vm.IsPlaying);
    }

    [Fact]
    public void SeekCompleted_WithNoAudio_DoesNotCrash()
    {
        var vm = CreateVm();
        vm.SeekCompleted();
        Assert.Equal("00:00", vm.CurrentTimeText);
    }

    [Fact]
    public void HasCoverArt_InitiallyFalse()
    {
        var vm = CreateVm();
        Assert.False(vm.HasCoverArt);
    }

    [Fact]
    public void HasAlbumText_InitiallyFalse()
    {
        var vm = CreateVm();
        Assert.False(vm.HasAlbumText);
    }

    [Fact]
    public void Playlist_AfterClear_IsEmpty()
    {
        var vm = CreateVm();
        vm.AddFilesInner(new[] { @"C:\music\song1.mp3", @"C:\music\song2.flac" });
        vm.UpdateFilter();
        vm.ClearPlaylistCommand.Execute(null);
        Assert.Empty(vm.Playlist);
        Assert.False(vm.IsPlaying);
    }

    [Fact]
    public void SearchQuery_CaseInsensitive()
    {
        var vm = CreateVm();
        vm.AddFilesInner(new[] { @"C:\Music\Song Alpha.mp3", @"C:\music\song beta.flac" });
        vm.UpdateFilter();
        vm.SearchQuery = "SONG";
        Assert.Equal(2, vm.Playlist.Count);

        vm.SearchQuery = "ALPHA";
        Assert.Single(vm.Playlist);
    }

    [Fact]
    public void PlayPauseCommand_CanExecute_AlwaysTrue()
    {
        var vm = CreateVm();
        Assert.True(vm.PlayPauseCommand.CanExecute(null));
        Assert.True(vm.PlayNextCommand.CanExecute(null));
        Assert.True(vm.PlayPrevCommand.CanExecute(null));
        Assert.True(vm.ClearPlaylistCommand.CanExecute(null));
    }
}
