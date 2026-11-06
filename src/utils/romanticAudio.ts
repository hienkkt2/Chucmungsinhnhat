/**
 * Romantic Audio Engine using the Web Audio API.
 * Synthesizes warm, soothing acoustic piano & music box tones with natural decay and gentle reverb.
 * Provides guaranteed instant playback without external network or broken file dependencies.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.45;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private trackChangeListeners: Set<(index: number) => void> = new Set();

  public readonly tracks = [
    {
      id: 'seven-years',
      title: 'Bản Tình Ca 7 Năm (Seven Years of Us)',
      description: 'Giai điệu piano lãng mạn, ấm áp dành riêng cho kỷ niệm ngày cưới',
      tempo: 82,
      // Chord progression in F major / D minor (Romantic, hopeful, tender)
      notes: [
        { note: 'F4', duration: 1.0 }, { note: 'A4', duration: 1.0 }, { note: 'C5', duration: 1.0 }, { note: 'F5', duration: 2.0 },
        { note: 'D4', duration: 1.0 }, { note: 'F4', duration: 1.0 }, { note: 'A4', duration: 1.0 }, { note: 'D5', duration: 2.0 },
        { note: 'Bb3', duration: 1.0 }, { note: 'D4', duration: 1.0 }, { note: 'F4', duration: 1.0 }, { note: 'Bb4', duration: 2.0 },
        { note: 'C4', duration: 1.0 }, { note: 'E4', duration: 1.0 }, { note: 'G4', duration: 1.0 }, { note: 'C5', duration: 2.0 },
        { note: 'A4', duration: 1.5 }, { note: 'G4', duration: 0.5 }, { note: 'F4', duration: 2.0 },
        { note: 'G4', duration: 1.0 }, { note: 'A4', duration: 1.0 }, { note: 'C5', duration: 2.0 },
        { note: 'D5', duration: 1.5 }, { note: 'C5', duration: 0.5 }, { note: 'A4', duration: 2.0 },
        { note: 'G4', duration: 2.0 }, { note: 'F4', duration: 3.0 }
      ]
    },
    {
      id: 'birthday-waltz',
      title: 'Khúc Nhạc Sinh Nhật Em (Birthday Waltz for Bảo Ngọc)',
      description: 'Nhịp điệu waltz 3/4 trong trẻo như hộp nhạc tình yêu',
      tempo: 96,
      notes: [
        { note: 'C4', duration: 0.75 }, { note: 'C4', duration: 0.25 }, { note: 'D4', duration: 1.0 }, { note: 'C4', duration: 1.0 }, { note: 'F4', duration: 1.0 }, { note: 'E4', duration: 2.0 },
        { note: 'C4', duration: 0.75 }, { note: 'C4', duration: 0.25 }, { note: 'D4', duration: 1.0 }, { note: 'C4', duration: 1.0 }, { note: 'G4', duration: 1.0 }, { note: 'F4', duration: 2.0 },
        { note: 'C4', duration: 0.75 }, { note: 'C4', duration: 0.25 }, { note: 'C5', duration: 1.0 }, { note: 'A4', duration: 1.0 }, { note: 'F4', duration: 1.0 }, { note: 'E4', duration: 1.0 }, { note: 'D4', duration: 1.5 },
        { note: 'Bb4', duration: 0.75 }, { note: 'Bb4', duration: 0.25 }, { note: 'A4', duration: 1.0 }, { note: 'F4', duration: 1.0 }, { note: 'G4', duration: 1.0 }, { note: 'F4', duration: 3.0 }
      ]
    },
    {
      id: 'candlelight-serenade',
      title: 'Ánh Nến Ngọt Ngào (Candlelight Serenade)',
      description: 'Những nốt nhạc acoustic êm đềm như lời thì thầm bên tai',
      tempo: 75,
      notes: [
        { note: 'E4', duration: 1.0 }, { note: 'G#4', duration: 1.0 }, { note: 'B4', duration: 1.0 }, { note: 'E5', duration: 2.0 },
        { note: 'C#4', duration: 1.0 }, { note: 'E4', duration: 1.0 }, { note: 'A4', duration: 1.0 }, { note: 'C#5', duration: 2.0 },
        { note: 'A3', duration: 1.0 }, { note: 'C#4', duration: 1.0 }, { note: 'E4', duration: 1.0 }, { note: 'A4', duration: 2.0 },
        { note: 'B3', duration: 1.0 }, { note: 'D#4', duration: 1.0 }, { note: 'F#4', duration: 1.0 }, { note: 'B4', duration: 2.0 },
        { note: 'G#4', duration: 1.5 }, { note: 'F#4', duration: 0.5 }, { note: 'E4', duration: 2.5 }
      ]
    }
  ];

  private noteFrequencies: Record<string, number> = {
    'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
    'C6': 1046.50
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle piano note with rich harmonics and natural acoustic decay
  private playPianoNote(freq: number, durationSeconds: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental oscillator (Warm sine + triangle blend)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time); // 1st harmonic (octave)

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, time); // Bell shimmer harmonic

    // Note envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, time);
    // Instant soft hammer attack
    noteGain.gain.exponentialRampToValueAtTime(0.35, time + 0.035);
    // Exponential piano decay
    const decayTime = Math.max(durationSeconds * 1.4, 1.2);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + decayTime);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(450, time + decayTime);

    osc1.connect(noteGain);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, time);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);

    const osc3Gain = this.ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.08, time);
    osc3.connect(osc3Gain);
    osc3Gain.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc3.start(time);

    osc1.stop(time + decayTime + 0.1);
    osc2.stop(time + decayTime + 0.1);
    osc3.stop(time + decayTime + 0.1);
  }

  private loopMelody() {
    if (!this.isPlaying || !this.ctx) return;

    const track = this.tracks[this.currentTrackIndex];
    const beatSec = 60 / track.tempo;
    let currentTime = this.ctx.currentTime + 0.05;

    for (const item of track.notes) {
      if (!this.isPlaying) break;
      const freq = this.noteFrequencies[item.note] || 440;
      this.playPianoNote(freq, item.duration * beatSec, currentTime);

      // Play soft bass root note for fullness every few beats
      if (item.duration >= 1.5) {
        const rootBass = freq / 2;
        this.playPianoNote(rootBass, item.duration * beatSec * 1.5, currentTime);
      }

      currentTime += item.duration * beatSec;
    }

    const totalDuration = (currentTime - this.ctx.currentTime) * 1000;

    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.loopMelody();
      }
    }, totalDuration + 800);
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.isPlaying = true;
      this.notifyListeners();
      this.loopMelody();
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notifyListeners();
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return Promise.resolve(false);
    }
    return this.start();
  }

  public setTrack(index: number) {
    if (index >= 0 && index < this.tracks.length) {
      const wasPlaying = this.isPlaying;
      if (wasPlaying) {
        this.stop();
      }
      this.currentTrackIndex = index;
      this.notifyTrackListeners();
      if (wasPlaying) {
        this.start();
      }
    }
  }

  public nextTrack() {
    this.setTrack((this.currentTrackIndex + 1) % this.tracks.length);
  }

  public prevTrack() {
    this.setTrack((this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public subscribeTrack(cb: (index: number) => void) {
    this.trackChangeListeners.add(cb);
    return () => this.trackChangeListeners.delete(cb);
  }

  private notifyListeners() {
    for (const cb of this.listeners) {
      cb(this.isPlaying);
    }
  }

  private notifyTrackListeners() {
    for (const cb of this.trackChangeListeners) {
      cb(this.currentTrackIndex);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
