import React, { useState } from 'react';
import { QrCode, Copy, Check, Gift, Heart, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BirthdayGiftQR: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(20000); // Default 20k as requested

  const bankName = 'MBBank (Ngân hàng TMCP Quân đội)';
  const bankCode = 'MB';
  const accountNumber = '061103686868';
  const accountHolder = 'BÙI BẢO NGỌC';
  const defaultMemo = 'Chúc mừng sinh nhật Bảo Ngọc';

  const suggestedAmounts = [
    { label: '10k', value: 10000 },
    { label: '20k', value: 20000 },
    { label: '50k', value: 50000 },
    { label: '100k', value: 100000 },
    { label: 'Tùy tâm ❤️', value: null },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#fbbf24', '#f43f5e', '#ec4899'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  // VietQR URL with live query params
  const qrUrl = selectedAmount
    ? `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${selectedAmount}&addInfo=${encodeURIComponent(
        defaultMemo
      )}&accountName=${encodeURIComponent(accountHolder)}`
    : `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?addInfo=${encodeURIComponent(
        defaultMemo
      )}&accountName=${encodeURIComponent(accountHolder)}`;

  return (
    <div className="w-full">
      <div className="romantic-glass rounded-3xl p-6 sm:p-10 border border-rose-500/20 shadow-2xl relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs font-medium mb-3">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>Góc Gửi Quà &amp; Lời Chúc Sinh Nhật</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            Gửi Ting Ting Chúc Mừng Bảo Ngọc
          </h3>

          <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            Mọi người có thể quét mã VietQR bên dưới hoặc sao chép STK để gửi lì xì và những lời chúc yêu thương nhất tới Bùi Bảo Ngọc nhân ngày sinh nhật 06/11 nhé!
          </p>
        </div>

        {/* Card Layout: Left QR Code, Right Account Details & Quick Picks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-2xl mx-auto">
          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-amber-300/40 relative group">
              <img
                src={qrUrl}
                alt={`Mã QR tài khoản ${accountNumber} - ${accountHolder}`}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
              />
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="px-3 py-0.5 rounded-full bg-rose-600 text-[10px] font-semibold text-white shadow-md flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Quét bằng App Ngân Hàng
                </span>
              </div>
            </div>
            <p className="text-[11px] text-rose-300/70 mt-4 text-center">
              Tự động điền số tiền &amp; nội dung chúc mừng
            </p>
          </div>

          {/* Account Details & Quick Amount Selector */}
          <div className="md:col-span-7 space-y-4">
            {/* Quick Amount Suggestion Buttons */}
            <div>
              <label className="block text-xs font-medium text-rose-200 mb-2">
                Chọn nhanh số tiền gửi chúc mừng:
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedAmounts.map((amt) => {
                  const isSelected = selectedAmount === amt.value;
                  return (
                    <button
                      key={amt.label}
                      onClick={() => setSelectedAmount(amt.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-rose-900/40 scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-rose-200 border border-rose-500/20'
                      }`}
                    >
                      {amt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bank Information Details */}
            <div className="p-4 rounded-2xl bg-[#170a13] border border-rose-500/20 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-rose-300/70 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-rose-400" /> Ngân hàng:
                </span>
                <span className="font-semibold text-white text-right">
                  MBBank
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-rose-500/10 pt-2">
                <span className="text-rose-300/70">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300 font-serif text-sm sm:text-base tracking-wider tabular-nums">
                    {accountNumber}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 transition-colors"
                    title="Sao chép số tài khoản"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-green-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-rose-300" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-rose-500/10 pt-2">
                <span className="text-rose-300/70">Chủ tài khoản:</span>
                <span className="font-semibold text-rose-100 uppercase">
                  {accountHolder}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-rose-500/10 pt-2">
                <span className="text-rose-300/70">Lời nhắn:</span>
                <span className="text-rose-200 italic">
                  &ldquo;{defaultMemo}&rdquo;
                </span>
              </div>
            </div>

            {/* Copy STK Big Action Button */}
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-medium shadow-md shadow-rose-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  <span>Đã sao chép STK: {accountNumber}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao Chép Số Tài Khoản MBBank</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 pt-4 border-t border-rose-500/10">
          <p className="text-[11px] text-rose-300/80 font-light flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Mọi tình cảm và lời chúc của bạn bè, người thân là món quà vô giá của Bảo Ngọc!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
