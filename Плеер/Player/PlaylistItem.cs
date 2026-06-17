using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Player;

public class PlaylistItem : INotifyPropertyChanged
{
    private bool isCurrent;
    public string Path { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string Album { get; set; } = string.Empty;
    public string Index { get; set; } = string.Empty;
    public byte[]? CoverArt { get; set; }
    public bool IsCurrent { get => isCurrent; set { isCurrent = value; OnPropertyChanged(); } }
    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? name = null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
