using System;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Interactivity;

namespace Player;

public partial class MainWindow : Window
{
    private readonly PlayerViewModel viewModel;

    public MainWindow()
    {
        InitializeComponent();

        viewModel = new PlayerViewModel();
        DataContext = viewModel;

        seekSlider.AddHandler(PointerPressedEvent, (s, e) => viewModel.SetDragging(true), RoutingStrategies.Tunnel);
        seekSlider.AddHandler(PointerReleasedEvent, (s, e) => {
            viewModel.SetDragging(false);
            viewModel.SeekCompleted();
        }, RoutingStrategies.Tunnel);

        playlistBox.DoubleTapped += (s, e) => viewModel.PlaySelected();

        HeaderBar.PointerPressed += (s, e) => BeginMoveDrag(e);
        MainDragHandle.PointerPressed += (s, e) => BeginMoveDrag(e);
    }
}
