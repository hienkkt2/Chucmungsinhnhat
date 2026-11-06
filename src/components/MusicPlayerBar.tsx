import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

export const MusicPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(romanticAudio.getPlaying());
  const [trackIndex, setTrackIndex] = useState<number>(romanticAudio.getCurrentTrackIndex());
  const [volume, setVolume] = useState<number>(romanticAudio.getVolume());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const unsubPlay = romanticAudio.subscribe((playing) => setIsPlaying(playing));
    const unsubTrack = romanticAudio.subscribeTrack((idx) => setTrackIndex(idx));
    return () => {
      unsubPlay();
      unsubTrack();
    };
  }, []);

  const handleTogglePlay = async () => {
    await romanticAudio.toggle();
  };

  const handleNext = () => {
    romanticAudio.nextTrack();
  };

  const handlePrev = () => {
    romanticAudio.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      romanticAudio.setVolume(volume || 0.45);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const currentTrack = romanticAudio.getCurrentTrack();

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-auto">
      <div className="romantic-glass rounded-2xl p-3 border border-rose-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 transition-all">
        {/* Animated Music Disc */}
        <button
          onClick={handleTogglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform ${
            isPlaying
              ? 'bg-gradient-to-tr from-rose-600 to-pink-500 shadow-md shadow-rose-900/50 animate-spin'
              : 'bg-white/10 text-rose-300'
          }`}
          style={{ animationDuration: '8s' }}
          title={isPlaying ? 'Tạm dừng nhạc' : 'Phát bản tình ca'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-rose-200 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Track Info */}
        <div className="min-w-0 pr-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-rose-100 truncate block max-w-[140px] sm:max-w-[180px]">
              {currentTrack.title}
            </span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-1 bg-rose-400 rounded-full animate-bounce h-2" style={{ animationDuration: '0.6s' }} />
                <span className="w-1 bg-pink-400 rounded-full animate-bounce h-3" style={{ animationDuration: '0.8s' }} />
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-1.5" style={{ animationDuration: '0.7s' }} />
              </span>
            )}
          </div>
          <p className="text-[10px] text-rose-300/70 truncate block max-w-[140px] sm:max-w-[180px]">
            {isPlaying ? 'Đang phát du dương · Nhấn để đổi' : 'Giai điệu piano lãng mạn'}
          </p>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleNext}
            className="p-1.5 text-rose-300/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Đổi bài tiếp theo"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMute}
            className="p-1.5 text-rose-300/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title={isMuted ? 'Bật âm' : 'Tắt âm'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Track Selection Sheet */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-72 rounded-2xl bg-[#1d0e19] border border-rose-500/30 p-4 shadow-2xl backdrop-blur-xl animate-fade-in text-left">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-500/15">
            <span className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              <span>Giai Điệu Tình Yêu</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[11px] text-rose-300/70 hover:text-white"
            >
              Đóng
            </button>
          </div>

          <div className="space-y-1.5 mb-3">
            {romanticAudio.tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  romanticAudio.setTrack(idx);
                  if (!isPlaying) romanticAudio.start();
                }}
                className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  trackIndex === idx
                    ? 'bg-rose-600/30 text-rose-200 border border-rose-500/30'
                    : 'hover:bg-white/5 text-rose-300/80'
                }`}
              >
                <div className="truncate pr-2">
                  <p className="font-medium truncate">{t.title}</p>
                </div>
                {trackIndex === idx && <Heart className="w-3 h-3 text-rose-400 fill-current shrink-0" />}
              </button>
            ))}
          </div>

          {/* Volume slider */}
          <div className="pt-2 border-t border-rose-500/15 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-rose-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
