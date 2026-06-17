using NAudio.Dsp;
using NAudio.Wave;

namespace Player;

public class EqualizerSampleProvider : ISampleProvider
{
    private readonly ISampleProvider source;
    private BiQuadFilter? bassFilter;
    private BiQuadFilter? trebleFilter;
    private bool needUpdate = true;

    public float SampleRate => source.WaveFormat.SampleRate;

    private float _bassGain;
    public float BassGain
    {
        get => _bassGain;
        set { _bassGain = value; needUpdate = true; }
    }

    private float _trebleGain;
    public float TrebleGain
    {
        get => _trebleGain;
        set { _trebleGain = value; needUpdate = true; }
    }

    public EqualizerSampleProvider(ISampleProvider source)
    {
        this.source = source;
    }

    private void EnsureFilters()
    {
        if (!needUpdate && bassFilter != null) return;
        bassFilter = BiQuadFilter.PeakingEQ(SampleRate, 80f, _bassGain, 0.7f);
        trebleFilter = BiQuadFilter.PeakingEQ(SampleRate, 6000f, _trebleGain, 0.7f);
        needUpdate = false;
    }

    public WaveFormat WaveFormat => source.WaveFormat;

    public int Read(float[] buffer, int offset, int count)
    {
        int samplesRead = source.Read(buffer, offset, count);
        if (_bassGain == 0 && _trebleGain == 0) return samplesRead;

        EnsureFilters();
        for (int i = 0; i < samplesRead; i++)
            buffer[offset + i] = trebleFilter!.Transform(bassFilter!.Transform(buffer[offset + i]));
        return samplesRead;
    }
}
