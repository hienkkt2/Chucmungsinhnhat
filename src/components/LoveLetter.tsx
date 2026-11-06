import React, { useState, useEffect } from 'react';
import { Heart, Feather, Edit3, Check, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_LETTER = `Bảo Ngọc yêu thương của anh,

Khi anh ngồi viết những dòng này, ngày 06 tháng 11 năm 2026 đang đến thật gần. Một ngày thật đặc biệt và thiêng liêng nhất trong cuộc đời anh — bởi đó vừa là ngày thiên thần nhỏ Bùi Bảo Ngọc cất tiếng khóc chào đời, vừa là ngày anh có được may mắn lớn nhất đời mình: được cùng em nắm tay bước vào lễ đường hôn nhân, chính thức trở thành vợ chồng của nhau (06/11/2019 - 06/11/2026).

Thoáng chốc mà chúng mình đã đi bên nhau trọn vẹn 7 năm — 2,557 ngày ngập tràn yêu thương và bình yên. 7 năm không quá dài với một đời người, nhưng với anh, đó là 7 năm đáng trân trọng và hạnh phúc nhất.

Anh biết 7 năm qua, vì mải mê bận rộn lo toan cho cuộc sống và gia đình, vợ chồng mình chưa có dịp đi chơi, đi du lịch nhiều nơi xa xôi như bao người khác. Nhưng em có biết không, với anh, chỉ cần mỗi buổi chiều được trở về nhà bên em, cùng em ngồi bên mâm cơm ấm nóng, cùng sẻ chia những vui buồn sau ngày dài mệt mỏi — thì đó đã là chuyến hành trình hạnh phúc và trọn vẹn nhất trần đời.

Cảm ơn em vì đã luôn thấu hiểu, chắt chiu và vun vén cho mái ấm nhỏ từng li từng tí. Cảm ơn sự dịu dàng và nụ cười của em luôn là bến đỗ bình yên nhất của anh. Và anh hứa, những năm tháng sắp tới, anh sẽ nỗ lực nhiều hơn nữa để bù đắp cho em, sẽ nắm tay đưa Bảo Ngọc đi đến những nơi em thích!

Hôm nay, mừng sinh nhật tuổi mới của người vợ tuyệt vời nhất, và mừng kỷ niệm 7 năm ngày cưới của đôi ta — kỷ niệm đám cưới Đồng, son sắt và bền chặt. Anh hứa sẽ luôn ở đây, yêu thương, che chở và đồng hành cùng em thêm 70 năm nữa.

Chúc vợ yêu của anh sinh nhật thật rực rỡ, luôn vui tươi, xinh đẹp và ngập tràn hạnh phúc bên anh!`;

export const LoveLetter: React.FC = () => {
  const [letterContent, setLetterContent] = useState<string>(DEFAULT_LETTER);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftContent, setDraftContent] = useState<string>(DEFAULT_LETTER);

  useEffect(() => {
    const saved = localStorage.getItem('hien_ngoc_love_letter');
    if (saved) {
      setLetterContent(saved);
      setDraftContent(saved);
    }
  }, []);

  const handleSave = () => {
    setLetterContent(draftContent);
    localStorage.setItem('hien_ngoc_love_letter', draftContent);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (confirm('Khôi phục lại bức thư gốc của anh Hiển?')) {
      setLetterContent(DEFAULT_LETTER);
      setDraftContent(DEFAULT_LETTER);
      localStorage.removeItem('hien_ngoc_love_letter');
      setIsEditing(false);
    }
  };

  const handleSendKiss = () => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#ec4899', '#fda4af'],
    });
  };

  return (
    <div className="w-full">
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#23121e] via-[#1a0c16] to-[#140810] border border-rose-500/25 shadow-2xl overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-rose-500/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-rose-300 font-medium uppercase tracking-wider">
                Bức Thư Tình Yêu Vĩnh Cửu
              </p>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Gửi Vợ Yêu: Bùi Bảo Ngọc
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleSendKiss}
                  className="px-3.5 py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Gửi Nụ Hôn</span>
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Chỉnh sửa hoặc viết thêm lời nhắn"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Viết Thêm</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Gốc</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-rose-900/40"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu Thư</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              rows={14}
              className="w-full bg-[#160a12] border border-rose-500/30 rounded-2xl p-4 text-sm sm:text-base text-rose-100 focus:outline-none focus:border-rose-400 font-light leading-relaxed"
              placeholder="Nhập tâm sự yêu thương của anh gửi Bảo Ngọc..."
            />
            <p className="text-xs text-rose-300/70">
              * Nội dung thư sẽ được lưu trữ an toàn trong trình duyệt của hai vợ chồng.
            </p>
          </div>
        ) : (
          <div className="relative bg-[#1a0a14]/60 border border-rose-500/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            {/* Watermark / Vintage stamp accent */}
            <div className="absolute top-4 right-6 opacity-15 pointer-events-none text-rose-300 text-6xl font-script select-none">
              7th Anniversary
            </div>

            <div className="text-rose-100/90 text-sm sm:text-base sm:leading-loose leading-relaxed space-y-4 font-light whitespace-pre-line">
              {letterContent}
            </div>

            <div className="mt-8 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-rose-300/80">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Viết bằng trọn vẹn tình yêu và sự trân quý</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-rose-300/80 font-medium">Chồng của em</p>
                <p className="font-script text-2xl sm:text-3xl text-rose-200 mt-1">
                  Đoàn Đình Hiển
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
