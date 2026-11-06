import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Music2, Gift, X } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface SurpriseWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurpriseWelcomeModal: React.FC<SurpriseWelcomeModalProps> = ({ isOpen, onClose }) => {
  const [openedEnvelope, setOpenedEnvelope] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  if (!isOpen) return null;

  const triggerLoveConfetti = () => {
    // Elegant rose gold & pink heart confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff', '#fda4af'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpenGift = async () => {
    setOpenedEnvelope(true);
    triggerLoveConfetti();

    // Start soothing romantic music
    try {
      await romanticAudio.start();
      setAudioStarted(true);
    } catch {
      // Audio playback on user click handled safely
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#24121d] via-[#1a0c16] to-[#12070f] border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl text-center overflow-hidden">
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {openedEnvelope && (
          <button
            onClick={onClose}
            aria-label="Đóng thông báo"
            className="absolute top-4 right-4 p-2 text-rose-300/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {!openedEnvelope ? (
          <div className="py-6 flex flex-col items-center">
            {/* Sealed Wax & Gift Icon */}
            <div className="relative mb-6 cursor-pointer group" onClick={handleOpenGift}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-rose-900/50 pulse-glow flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#1e0e17] flex items-center justify-center">
                  <Gift className="w-11 h-11 text-rose-300 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white rounded-full p-1.5 shadow-md border-2 border-[#12070f]">
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>

            <p className="text-xs tracking-widest uppercase text-rose-300 font-medium mb-2">
              Dành riêng cho Bùi Bảo Ngọc · 06/11/2026
            </p>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 mb-4 leading-tight">
              Món Quà Kỷ Niệm 7 Năm Ngày Cưới & Sinh Nhật Em
            </h2>

            <p className="text-sm sm:text-base text-rose-100/80 max-w-lg mb-8 leading-relaxed font-light">
              Anh chuẩn bị không gian số này để lưu giữ mãi mãi từng nụ cười, từng chuyến đi và tình yêu của vợ chồng mình. Chạm vào đây để mở ra món quà bất ngờ của anh nhé!
            </p>

            <button
              onClick={handleOpenGift}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white font-medium text-base shadow-xl shadow-rose-900/40 hover:from-rose-500 hover:to-pink-500 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Mở Món Quà Của Anh Hiển</span>
              <Heart className="w-5 h-5 fill-rose-200 text-rose-200 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center animate-fade-in">
            {/* Real Couple Photo Avatar */}
            <div className="relative mb-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 shadow-xl shadow-rose-900/50">
                <img
                  src="/assets/aistudio/image_33ea8bc4.png"
                  alt="Đoàn Đình Hiển và Bùi Bảo Ngọc"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white rounded-full p-1 shadow-md border-2 border-[#12070f]">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>06.11.2019 — 06.11.2026 · Tròn 7 Năm Son Sắt</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-serif font-bold text-rose-100 mb-1">
              Chúc Mừng Sinh Nhật Bảo Ngọc &amp; Kỷ Niệm 7 Năm Ngày Cưới!
            </h3>

            <p className="font-script text-xl sm:text-2xl text-rose-300 mb-4">
              &ldquo;Cảm ơn em vì đã là người vợ tuyệt vời nhất của anh&rdquo;
            </p>

            <div className="w-full bg-rose-950/40 border border-rose-500/20 rounded-2xl p-5 text-left text-sm sm:text-base text-rose-100/90 leading-relaxed max-h-[300px] overflow-y-auto mb-6 space-y-3 font-light">
              <p>
                <strong className="text-rose-300 font-normal">Bảo Ngọc thương yêu,</strong>
              </p>
              <p>
                Hôm nay là ngày 06/11/2026 — ngày vô cùng thiêng liêng và kỳ diệu đối với gia đình mình. Đó là ngày sinh nhật lần nữa của người phụ nữ anh yêu nhất, và cũng chính là tròn đúng <strong>7 năm ngày chúng mình nắm tay bước vào lễ đường hôn nhân</strong> (06/11/2019 - 06/11/2026).
              </p>
              <p>
                7 năm qua — 2,557 ngày cùng chia ngọt sẻ bùi, cùng vượt qua từng khó khăn thử thách, cùng nhau vun vén tổ ấm. Dù thời gian có trôi đi, thì trong mắt anh, Bảo Ngọc vẫn luôn dịu dàng, rạng ngời và là bến đỗ bình yên nhất.
              </p>
              <p>
                Chúc em tuổi mới luôn ngập tràn niềm vui, sức khỏe và luôn mỉm cười hạnh phúc. Anh hứa sẽ luôn ở bên cạnh, che chở, yêu thương và đồng hành cùng em mãi mãi!
              </p>
              <p className="text-right font-script text-xl text-rose-300 pt-2">
                — Chồng của em: Đoàn Đình Hiển —
              </p>
            </div>

            {audioStarted && (
              <div className="flex items-center gap-2 text-xs text-rose-300/80 mb-5">
                <Music2 className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Giai điệu piano lãng mạn đang được phát để dành tặng em</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-900/30 transition-all"
              >
                Khám Phá Toàn Bộ Ngôi Nhà Kỷ Niệm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
