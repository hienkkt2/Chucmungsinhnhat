import React, { useState } from 'react';
import { Sparkles, Heart, Flame, RotateCcw, AlertCircle, Coins, Laugh } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeCandleProps {
  onWishBlown?: () => void;
}

export const BirthdayCakeCandle: React.FC<BirthdayCakeCandleProps> = ({ onWishBlown }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);
  const [amountInput, setAmountInput] = useState<string>('');
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);

  // Parse raw number from input
  const numericValue = parseInt(amountInput.replace(/\D/g, '') || '0', 10);
  const isOverLimit = numericValue > 999999;
  const isEmpty = amountInput.trim() === '';
  const isZero = !isEmpty && numericValue <= 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setAmountInput(raw);
  };

  const handleQuickPick = (val: number) => {
    setAmountInput(val.toString());
  };

  const handleBlowCandles = () => {
    if (!candlesLit || isOverLimit || isZero) return;
    setCandlesLit(false);
    setBlown(true);
    setConfirmedAmount(numericValue);

    localStorage.setItem('ngoc_birthday_amount_2026', numericValue.toString());

    // Spectacular celebration burst
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff', '#fda4af'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff', '#fda4af'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    if (onWishBlown) onWishBlown();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setBlown(false);
  };

  return (
    <div className="w-full">
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#27101f] via-[#1a0a15] to-[#12060f] border border-rose-500/25 shadow-2xl overflow-hidden text-center">
        {/* Ambient backlight glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full transition-opacity duration-1000 pointer-events-none ${
            candlesLit ? 'bg-amber-500/15 blur-3xl opacity-100' : 'bg-rose-600/10 blur-3xl opacity-40'
          }`}
        />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Nghi Thức Sinh Nhật Đặc Biệt · 06/11/2026</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
          Thổi Nến Sinh Nhật &amp; Nhận Quà Ting Ting
        </h3>

        <p className="font-script text-2xl text-rose-300 mb-6">
          Dành riêng cho cô gái xinh đẹp nhất của anh — Bùi Bảo Ngọc
        </p>

        {/* Realistic Interactive Birthday Cake Illustration */}
        <div className="relative mx-auto my-6 w-64 h-56 flex flex-col items-center justify-end select-none">
          {/* Candles Container (7 glowing candles for 7th anniversary & birthday) */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 mb-1 z-10">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center group">
                {/* Flame */}
                <div
                  className={`relative w-3.5 h-5 transition-all duration-700 ${
                    candlesLit
                      ? 'scale-100 opacity-100'
                      : 'scale-0 opacity-0 translate-y-3'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full blur-[1px] animate-pulse" />
                  <div className="absolute inset-x-0.5 top-0.5 bottom-1 bg-yellow-100 rounded-full" />
                </div>

                {/* Candle Stick */}
                <div className="w-2.5 h-12 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 rounded-t-sm shadow-sm border border-rose-400/40" />
              </div>
            ))}
          </div>

          {/* Top Layer Frosting */}
          <div className="relative w-48 h-12 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-t-2xl shadow-inner border-t-2 border-white/60 flex items-center justify-center">
            <span className="text-[11px] font-serif font-semibold text-rose-800 tracking-wider">
              BẢO NGỌC &hearts; 06/11
            </span>
          </div>

          {/* Middle Cake Tier */}
          <div className="relative w-56 h-14 bg-gradient-to-r from-[#441a32] via-[#5c2444] to-[#441a32] border-t border-rose-300/40 flex items-center justify-center shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-rose-200/90 font-medium font-serif">
                7 Năm Son Sắt
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            </div>
          </div>

          {/* Cake Base Tier */}
          <div className="relative w-64 h-14 bg-gradient-to-r from-[#2b1020] via-[#3a142b] to-[#2b1020] rounded-b-xl border-t border-rose-400/20 shadow-2xl flex items-center justify-center">
            <div className="flex items-center gap-1.5 text-[11px] text-amber-200/90 font-serif">
              <span>Đoàn Đình Hiển</span>
              <span>&hearts;</span>
              <span>Bùi Bảo Ngọc</span>
            </div>
          </div>

          {/* Gold Plate Stand */}
          <div className="w-72 h-3.5 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-full shadow-2xl border-t border-amber-200" />
        </div>

        {/* Interactive Interaction Area */}
        {candlesLit ? (
          <div className="max-w-md mx-auto space-y-4 animate-fade-in text-center">
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm text-rose-200/90 font-medium">
                🎁 Nhập số tiền mong muốn chứa đựng tình cảm của vợ:
              </label>
            </div>

            {/* Money input box */}
            <div className="relative max-w-xs mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={numericValue > 0 ? numericValue.toLocaleString('vi-VN') : amountInput}
                  onChange={handleInputChange}
                  placeholder="Nhập số tiền vợ ước..."
                  className={`w-full bg-[#150711] border rounded-2xl px-4 py-3 text-center text-lg sm:text-xl font-bold font-serif tabular-nums tracking-wider focus:outline-none transition-colors ${
                    isOverLimit
                      ? 'border-red-500 text-red-300 focus:border-red-400'
                      : 'border-amber-400/50 text-amber-300 focus:border-amber-300'
                  }`}
                />
                <span className="absolute right-4 text-xs font-semibold text-rose-300">
                  VNĐ
                </span>
              </div>
            </div>

            {/* Quick-pick meaningful romantic amounts */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-[11px] text-rose-300/70 mr-1 flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-300" /> Gợi ý:
              </span>
              {[
                { label: '999.999đ (Cửu cửu)', val: 999999 },
                { label: '520.131đ (Yêu trọn đời)', val: 520131 },
                { label: '777.777đ (7 năm may mắn)', val: 777777 },
                { label: '131.420đ (Một đời yêu em)', val: 131420 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => handleQuickPick(item.val)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-200 border border-rose-500/20 text-[11px] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Funny & loving alert if amount exceeds 999,999 */}
            {isOverLimit && (
              <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-left animate-shake space-y-2">
                <div className="flex items-center gap-2 text-red-300 font-semibold text-sm">
                  <Laugh className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
                  <span>Ối vợ ơi! Quỹ đen của anh Hiển sắp toang rồi! 💸😱</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed font-light">
                  Nhập quá <strong>999.999đ</strong> là tháng này anh phải đi rửa bát, lau nhà trừ nợ đến năm sau đấy vợ ơi! 😂 Vợ thương anh thì nhập tối đa <strong>999.999đ</strong> thôi nàooo!
                </p>
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => handleQuickPick(999999)}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-medium border border-amber-400/30"
                  >
                    Thôi thương chồng, chọn mức 999.999đ nè! ❤️
                  </button>
                </div>
              </div>
            )}

            {isZero && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300/80">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Vợ hãy nhập một con số tình cảm lớn hơn 0 nhé!</span>
              </div>
            )}

            <button
              onClick={handleBlowCandles}
              disabled={isOverLimit || isZero || isEmpty}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm shadow-xl flex items-center justify-center gap-2 mx-auto transition-all duration-300 ${
                isOverLimit || isZero || isEmpty
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white shadow-rose-900/40 hover:scale-105 active:scale-95 cursor-pointer'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
              <span>Chạm Thổi Nến &amp; Nhận Lì Xì Tình Yêu</span>
            </button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto p-6 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center space-y-4 animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-300 mb-1">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200">
              Ting Ting! Chúc Mừng Sinh Nhật Bảo Ngọc! 🎉
            </h4>

            <div className="p-4 rounded-xl bg-[#140610] border border-amber-400/30 text-center space-y-1">
              <p className="text-xs uppercase tracking-wider text-rose-300 font-medium">
                Món quà tình cảm được anh Hiển duyệt 100%:
              </p>
              <p className="text-3xl font-bold font-serif text-amber-300 tabular-nums">
                {confirmedAmount.toLocaleString('vi-VN')} VNĐ
              </p>
              <p className="text-xs text-rose-200/80 italic pt-1">
                &ldquo;Tình yêu của anh Hiển dành cho Bảo Ngọc là vô giá, mãi mãi cửu cửu!&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-rose-200/90 font-light leading-relaxed">
              Lệnh chuyển khoản hạnh phúc đã được ghi nhận. Việc của vợ yêu hôm nay là chỉ cần luôn mỉm cười thật tươi, luôn xinh đẹp và hạnh phúc bên anh!
            </p>

            <button
              onClick={handleRelight}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thắp Sáng Lại Nến &amp; Chơi Tiếp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
