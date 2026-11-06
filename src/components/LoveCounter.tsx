import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Sparkles } from 'lucide-react';

export const LoveCounter: React.FC = () => {
  // Wedding date: 06/11/2019 09:00:00 (November 6, 2019)
  const weddingDate = new Date('2019-11-06T09:00:00');

  const [timePassed, setTimePassed] = useState({
    years: 7,
    days: 2557,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 2557,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - weddingDate.getTime());

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365.25);
      const remainingDays = Math.floor(totalDays % 365.25);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimePassed({
        years,
        days: remainingDays,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="romantic-glass rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background ring */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-rose-500/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-rose-500/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-rose-300 text-xs font-medium tracking-wider uppercase mb-1">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Cột Mốc Hôn Nhân 06/11/2019 — 06/11/2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              <span>Hành Trình Yêu Thương Của Hiển &amp; Bảo Ngọc</span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kỷ Niệm 7 Năm Ngày Cưới</span>
          </div>
        </div>

        {/* Live Counter Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-[#1c0f18]/80 rounded-2xl p-4 sm:p-5 border border-rose-500/15 text-center flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-200 via-pink-200 to-amber-200 tabular-nums">
              {timePassed.totalDays.toLocaleString('vi-VN')}
            </span>
            <span className="text-xs uppercase tracking-wider text-rose-300/80 font-medium mt-1">
              Ngày Chung Đôi
            </span>
          </div>

          <div className="bg-[#1c0f18]/80 rounded-2xl p-4 sm:p-5 border border-rose-500/15 text-center flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-200 via-pink-200 to-amber-200 tabular-nums">
              {String(timePassed.hours).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider text-rose-300/80 font-medium mt-1">
              Giờ Hạnh Phúc
            </span>
          </div>

          <div className="bg-[#1c0f18]/80 rounded-2xl p-4 sm:p-5 border border-rose-500/15 text-center flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-200 via-pink-200 to-amber-200 tabular-nums">
              {String(timePassed.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider text-rose-300/80 font-medium mt-1">
              Phút Bình Yên
            </span>
          </div>

          <div className="bg-[#1c0f18]/80 rounded-2xl p-4 sm:p-5 border border-rose-500/15 text-center flex flex-col justify-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-300 via-rose-400 to-pink-500 tabular-nums">
              {String(timePassed.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider text-rose-300/80 font-medium mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-rose-400" /> Giây Nhịp Đập
            </span>
          </div>
        </div>

        {/* Milestone stats ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-rose-200/90 bg-rose-950/20 rounded-2xl p-4 border border-rose-500/10">
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-semibold text-sm">7 Năm</span>
            <span className="text-rose-300/60">·</span>
            <span>Đám cưới Len &amp; Đồng son sắt</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-semibold text-sm">06/11</span>
            <span className="text-rose-300/60">·</span>
            <span>Sinh nhật rạng rỡ của Bùi Bảo Ngọc</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-semibold text-sm">&infin;</span>
            <span className="text-rose-300/60">·</span>
            <span>Tình yêu và sự thủy chung của Hiển</span>
          </div>
        </div>
      </div>
    </div>
  );
};
