import React, { useRef, useState } from 'react';
import { Award, Heart, Printer, Sparkles, Download, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

export const AnniversaryCertificate: React.FC = () => {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f43f5e', '#ec4899', '#ffffff'],
    });
  };

  const handleSaveAsImage = async () => {
    if (!certificateRef.current) return;
    try {
      setIsExporting(true);
      // Generate ultra high-res PNG image
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2.5, // 2.5x retina quality for printing and frame display
      });

      // Trigger instant download
      const link = document.createElement('a');
      link.download = 'Chung_Nhan_7_Nam_Hanh_Phuc_Hien_Bao_Ngoc.png';
      link.href = dataUrl;
      link.click();

      setIsSuccess(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error('Error exporting certificate image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="romantic-glass rounded-3xl p-6 sm:p-10 border border-rose-500/20 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-rose-500/15 pb-5">
          <div>
            <div className="flex items-center gap-2 text-rose-300 text-xs font-medium uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Chứng Thư Tình Yêu Vĩnh Cửu</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-white">
              Bản Chứng Nhận 7 Năm Hạnh Phúc
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCelebrate}
              className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Bắn Hoa</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-rose-500/20 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Bản Giấy</span>
            </button>

            <button
              onClick={handleSaveAsImage}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-amber-900/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang Tạo Ảnh...</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-300" />
                  <span>Đã Lưu Ảnh!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Lưu Về Dạng Ảnh (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Card to export as Image */}
        <div
          ref={certificateRef}
          className="relative mx-auto max-w-3xl rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#26121f] via-[#1f0d19] to-[#150711] border-4 border-double border-amber-400/50 shadow-2xl text-center overflow-hidden"
        >
          {/* Subtle ornate corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/50 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/50 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/50 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/50 rounded-br-xl pointer-events-none" />

          {/* Ornate Gold Emblem */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-xl shadow-amber-900/30 mb-6 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1b0a15] flex flex-col items-center justify-center">
              <span className="font-serif font-bold text-amber-300 text-lg sm:text-xl">7</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-200">Years</span>
            </div>
          </div>

          <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mb-2">
            Chứng Thư Hôn Nhân Hạnh Phúc &amp; Tình Yêu Son Sắt
          </p>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-100 to-amber-200 mb-6">
            BẢN CHỨNG NHẬN TRĂM NĂM
          </h2>

          <p className="text-xs sm:text-sm text-rose-200/80 max-w-md mx-auto mb-6 font-light">
            Trân trọng trao tặng cặp đôi đẹp nhất và tuyệt vời nhất:
          </p>

          {/* Names Lockup */}
          <div className="py-4 px-6 rounded-2xl bg-white/[0.03] border border-amber-400/20 max-w-lg mx-auto mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-xl sm:text-2xl font-serif font-bold text-rose-100">
                ĐOÀN ĐÌNH HIỂN
              </span>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-xl sm:text-2xl font-serif font-bold text-rose-100">
                BÙI BẢO NGỌC
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed max-w-xl mx-auto mb-8 font-light">
            Nhân dịp <strong className="text-amber-200 font-medium">Kỷ niệm 7 năm ngày cưới</strong> (06/11/2019 — 06/11/2026) và <strong className="text-rose-300 font-medium">Sinh nhật thiêng liêng của Bùi Bảo Ngọc</strong>. Đã cùng nhau trải qua <span className="text-amber-300 font-semibold">2,557 ngày</span> đong đầy sự quan tâm, thấu hiểu, bền bỉ bên nhau vượt qua muôn vàn thử thách và xây dựng một mái ấm ngập tràn tiếng cười.
          </p>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-amber-400/20 max-w-lg mx-auto">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-rose-300/70 mb-2">Người chồng son sắt</p>
              <p className="font-script text-2xl sm:text-3xl text-amber-200">
                Đoàn Đình Hiển
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-rose-300/70 mb-2">Người vợ dịu hiền</p>
              <p className="font-script text-2xl sm:text-3xl text-rose-300">
                Bùi Bảo Ngọc
              </p>
            </div>
          </div>

          <p className="mt-8 text-[11px] text-amber-200/60 uppercase tracking-widest">
            Vĩnh cửu theo thời gian · Mãi mãi một tình yêu
          </p>
        </div>
      </div>
    </div>
  );
};
