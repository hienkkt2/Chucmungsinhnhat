import React, { useState } from 'react';
import {
  Heart,
  Gift,
  Feather,
  Cake,
  Award,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FallingHeartsCanvas, HeartDensity } from './components/FallingHeartsCanvas';
import { SurpriseWelcomeModal } from './components/SurpriseWelcomeModal';
import { LoveCounter } from './components/LoveCounter';
import { LoveLetter } from './components/LoveLetter';
import { BirthdayCakeCandle } from './components/BirthdayCakeCandle';
import { AnniversaryCertificate } from './components/AnniversaryCertificate';
import { MusicPlayerBar } from './components/MusicPlayerBar';

export default function App() {
  const [showSurpriseModal, setShowSurpriseModal] = useState<boolean>(true);
  const [heartDensity, setHeartDensity] = useState<HeartDensity>('romantic');

  const triggerCelebration = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#fda4af', '#ffffff'],
    });
  };

  return (
    <div className="min-h-screen bg-[#0d070b] text-slate-100 relative selection:bg-rose-500 selection:text-white flex flex-col justify-between">
      {/* Falling Hearts & Rose Petals Canvas */}
      <FallingHeartsCanvas density={heartDensity} />

      {/* Floating Music Player */}
      <MusicPlayerBar />

      {/* Surprise Welcome Modal on First Open */}
      <SurpriseWelcomeModal
        isOpen={showSurpriseModal}
        onClose={() => setShowSurpriseModal(false)}
      />

      {/* Header Navigation with Smooth Scroll */}
      <header className="sticky top-0 z-30 w-full bg-[#12070f]/90 backdrop-blur-md border-b border-rose-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-200">
              Hiển &amp; Bảo Ngọc
            </span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-xs text-rose-300/70 hidden sm:inline">
              · 06/11/2026
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs text-rose-200/80 font-medium">
            <a href="#thu-tinh" className="hover:text-white transition-colors">
              Bức Thư Tình
            </a>
            <a href="#thoi-nen" className="hover:text-white transition-colors">
              Thổi Nến Sinh Nhật
            </a>
            <a href="#chung-nhan" className="hover:text-white transition-colors">
              Bản Chứng Nhận
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const modes: HeartDensity[] = ['romantic', 'festive', 'off', 'gentle'];
                const next = modes[(modes.indexOf(heartDensity) + 1) % modes.length];
                setHeartDensity(next);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 text-xs border border-rose-500/20 transition-colors"
            >
              {heartDensity === 'off' ? 'Mưa tim: Tắt' : 'Mưa tim: Bật'}
            </button>

            <button
              onClick={() => setShowSurpriseModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium shadow-md shadow-rose-900/30 flex items-center gap-1.5 transition-all"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Mở Lại Quà</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Natural Vertical Scroll Flow */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16 flex-1 w-full">
        {/* 1. Hero Card: Two Gold Wedding Bands & Candlelight Rose */}
        <section className="relative rounded-3xl overflow-hidden border border-rose-500/20 bg-gradient-to-br from-[#200e1b] via-[#160913] to-[#0f060c] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Hero Text */}
            <div className="p-6 sm:p-8 md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>06.11.2019 — 06.11.2026 · Hai Cột Mốc Diệu Kỳ</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Mừng Sinh Nhật Bảo Ngọc &amp; Kỷ Niệm 7 Năm Ngày Cưới
              </h1>

              <p className="font-script text-xl sm:text-2xl text-rose-300">
                &ldquo;Đoàn Đình Hiển &hearts; Bùi Bảo Ngọc — Trọn đời một tình yêu&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-rose-100/80 font-light leading-relaxed">
                2,557 ngày cùng chia ngọt sẻ bùi, cùng vun đắp tổ ấm bằng tất cả tình yêu và sự chung thủy. Chúc vợ yêu tuổi mới luôn bình an, mạnh khỏe và luôn nở nụ cười rạng ngời!
              </p>

              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={triggerCelebration}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium shadow-md shadow-rose-900/30 flex items-center gap-1.5 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Bắn Tim Chúc Mừng</span>
                </button>
              </div>
            </div>

            {/* Right Hero Image: Real Wedding Photo of Hiển & Bảo Ngọc */}
            <div className="relative md:col-span-5 h-80 sm:h-96 md:h-full min-h-[320px] overflow-hidden">
              <img
                src="/assets/aistudio/image_33ea8bc4.png"
                alt="Đoàn Đình Hiển và Bùi Bảo Ngọc trong ngày cưới"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#160913] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>

        {/* 2. Live Love Counter (2,557 ngày yêu) */}
        <section>
          <LoveCounter />
        </section>

        {/* 3. Bức Thư Tình (Love Letter) */}
        <section id="thu-tinh" className="scroll-mt-20">
          <LoveLetter />
        </section>

        {/* 4. Thổi Nến Sinh Nhật & Điều Ước Số Tiền (Birthday Cake & Money Wish) */}
        <section id="thoi-nen" className="scroll-mt-20">
          <BirthdayCakeCandle />
        </section>

        {/* 5. Bản Chứng Nhận Hạnh Phúc (Dưới cùng) */}
        <section id="chung-nhan" className="scroll-mt-20">
          <AnniversaryCertificate />
        </section>
      </main>

      {/* Minimal Romantic Footer */}
      <footer className="w-full border-t border-rose-500/10 py-6 px-4 text-center text-xs text-rose-300/60 bg-[#0a0408]">
        <p className="font-script text-lg text-rose-300">
          Đoàn Đình Hiển &hearts; Bùi Bảo Ngọc — 06/11/2026
        </p>
        <p className="text-[11px] mt-0.5">
          Kỷ niệm 7 năm ngày cưới &amp; Sinh nhật vợ yêu · Mãi mãi một tình yêu
        </p>
      </footer>
    </div>
  );
}
