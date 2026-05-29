/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { useState } from 'react';
import { Sparkles, Dices, AlertTriangle, Coffee, Compass, CheckCircle2, RefreshCw, Loader2 } from 'lucide-react';

interface Fortune {
  title: string;
  type: 'Thượng Cát' | 'Đại Cát' | 'Bình Hòa' | 'Hạ Cát' | 'Hạ Hạ';
  color: string;
  description: string;
  luck: number;
  focus: number;
  coffeeNeed: number;
  bugProbability: number;
  advice: string;
}

const FORTUNES: Fortune[] = [
  {
    title: 'Code Chạy Ngay Lần Đầu',
    type: 'Thượng Cát',
    color: 'from-emerald-500 to-teal-500 text-emerald-600 dark:text-emerald-400',
    description: 'Hôm nay thần linh độ trì, code của bạn viết ra sẽ chạy mượt mà ngay từ lần đầu tiên mà không gặp bất kỳ lỗi logic hay cú pháp nào.',
    luck: 99,
    focus: 90,
    coffeeNeed: 20,
    bugProbability: 1,
    advice: 'Hãy tranh thủ viết những task khó nhất hôm nay. Đừng ngần ngại commit thẳng lên nhánh main!',
  },
  {
    title: 'AI Agents Độ Trì',
    type: 'Đại Cát',
    color: 'from-indigo-500 to-purple-500 text-indigo-650 dark:text-indigo-400',
    description: 'Tác nhân AI đang có phong độ cực cao. Mọi prompt bạn đưa ra đều được AI hiểu chính xác 100% và tạo ra code sạch sẽ, tối ưu nhất.',
    luck: 88,
    focus: 85,
    coffeeNeed: 40,
    bugProbability: 5,
    advice: 'Hãy pair-programming tích cực với AI. Bạn chỉ cần ngồi review và tận hưởng tiến độ nhanh gấp 3 lần bình thường.',
  },
  {
    title: 'Bình Yên Qua Ngày',
    type: 'Bình Hòa',
    color: 'from-blue-500 to-cyan-500 text-blue-600 dark:text-blue-400',
    description: 'Một ngày làm việc trôi qua êm đềm. Không có bug lớn phát sinh, các cuộc họp diễn ra ngắn gọn, sếp không hỏi tiến độ đột xuất.',
    luck: 60,
    focus: 70,
    coffeeNeed: 60,
    bugProbability: 25,
    advice: 'Đây là cơ hội tốt để dọn dẹp các tệp thừa, refactor lại một vài dòng code cũ và viết thêm Unit Test.',
  },
  {
    title: 'Cơn Mưa Bug Ẩn Nấp',
    type: 'Hạ Cát',
    color: 'from-amber-500 to-orange-500 text-amber-600 dark:text-amber-400',
    description: 'Cẩn thận với lỗi chính tả! Một dấu chấm phẩy thừa hoặc thiếu đang trực chờ làm crash chương trình của bạn sau khi deploy.',
    luck: 35,
    focus: 50,
    coffeeNeed: 80,
    bugProbability: 60,
    advice: 'Hãy kiểm tra kỹ log console khi chạy thử. Hãy uống 1 cốc cà phê trước khi bấm nút Merge Pull Request.',
  },
  {
    title: 'NullPointerException Gọi Tên',
    type: 'Hạ Hạ',
    color: 'from-rose-500 to-pink-500 text-rose-600 dark:text-rose-400',
    description: 'Một lỗi tràn bộ nhớ (OutOfMemory) hoặc Null Pointer đang ẩn sâu trong thư viện bên thứ ba. Code chạy mượt ở máy bạn nhưng sẽ lăn ra lỗi ở staging.',
    luck: 10,
    focus: 30,
    coffeeNeed: 95,
    bugProbability: 90,
    advice: 'Backup toàn bộ code ngay lập tức! Hôm nay hãy hạn chế deploy trực tiếp lên live. Tốt nhất nên tắt máy đi uống trà sữa.',
  },
];

export default function DevFortune() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [rolling, setRolling] = useState(false);
  const [greedyCount, setGreedyCount] = useState(0);

  const handleRoll = () => {
    setRolling(true);
    setFortune(null);
    
    // Tạo cảm giác lắc quẻ bằng timeout
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * FORTUNES.length);
      setFortune(FORTUNES[randomIndex]);
      setRolling(false);
      setGreedyCount(prev => prev + 1);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-gray-150/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-xl p-6 md:p-8 text-left relative overflow-hidden transition-all duration-300">
      
      {/* Decorative Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-850 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3 py-1 text-xs font-bold text-indigo-650 dark:text-indigo-400">
            <Sparkles size={12} className="animate-spin text-indigo-500" />
            <span>Developer Entertainment</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">🔮 Gieo Quẻ Lập Trình Hôm Nay</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Hãy lắc quẻ để dự đoán độ may mắn của bạn trước khi gõ code!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center py-6">
        {/* Left column: Shake Area (Col 2) */}
        <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4">
          <div className={`relative h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-gradient-to-tr from-indigo-50 to-violet-50 dark:from-slate-900 dark:to-slate-950 border border-gray-200 dark:border-slate-800 shadow-inner flex items-center justify-center cursor-pointer group ${
            rolling ? 'animate-shake' : 'hover:scale-105'
          }`}
          onClick={!rolling ? handleRoll : undefined}
          >
            {rolling ? (
              <Dices size={48} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
            ) : (
              <div className="text-center space-y-2">
                <Dices size={48} className="text-indigo-500 dark:text-indigo-400 mx-auto group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Nhấn Để Gieo</span>
              </div>
            )}
            
            {/* Absolute light shine */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <button
            onClick={handleRoll}
            disabled={rolling}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-98"
          >
            <RefreshCw size={14} className={rolling ? 'animate-spin' : ''} />
            {fortune ? 'Gieo quẻ khác' : 'Gieo quẻ ngay'}
          </button>

          {greedyCount > 4 && (
            <p className="text-[10px] text-rose-500 font-semibold text-center animate-pulse">
              ⚠️ Cảnh báo: Gieo quẻ quá nhiều lần trong ngày có thể dẫn đến lỗi OutOfMemoryError!
            </p>
          )}
        </div>

        {/* Right column: Fortune Result (Col 3) */}
        <div className="md:col-span-3 min-h-[220px] flex items-center justify-center">
          {rolling ? (
            <div className="text-center space-y-2">
              <Loader2 className="animate-spin text-indigo-500 mx-auto" size={32} />
              <p className="text-xs text-gray-500 font-medium">Đang xin sâm từ vũ trụ lập trình...</p>
            </div>
          ) : fortune ? (
            <div className="w-full space-y-5 animate-in fade-in zoom-in-95 duration-300">
              {/* Badge & Title */}
              <div className="flex items-center gap-3">
                <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-extrabold uppercase bg-gradient-to-r text-white ${fortune.color.replace('text-', 'from-').replace('dark:text-', 'to-')}`}>
                  Quẻ: {fortune.type}
                </span>
                <h4 className="font-extrabold text-base md:text-lg text-gray-900 dark:text-white">
                  {fortune.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-650 dark:text-gray-400 leading-relaxed">
                {fortune.description}
              </p>

              {/* Stats Meters */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* Luck Level */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-500">
                    <span>Chỉ số may mắn</span>
                    <span>{fortune.luck}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${fortune.luck}%` }} />
                  </div>
                </div>

                {/* Focus Level */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-500">
                    <span>Mức tập trung</span>
                    <span>{fortune.focus}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${fortune.focus}%` }} />
                  </div>
                </div>

                {/* Coffee Need */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-500">
                    <span className="flex items-center gap-1"><Coffee size={12} /> Nhu cầu Cafe</span>
                    <span>{fortune.coffeeNeed}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${fortune.coffeeNeed}%` }} />
                  </div>
                </div>

                {/* Bug Probability */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-gray-500">
                    <span className="flex items-center gap-1"><AlertTriangle size={12} /> Tỷ lệ đẻ Bug</span>
                    <span>{fortune.bugProbability}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${fortune.bugProbability}%` }} />
                  </div>
                </div>
              </div>

              {/* Lời khuyên */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-gray-150/40 dark:border-slate-850/60 flex gap-2">
                <Compass className="text-indigo-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-normal">
                  <strong className="text-gray-900 dark:text-white">Lời khuyên:</strong> {fortune.advice}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2 text-gray-400">
              <CheckCircle2 size={36} className="mx-auto text-indigo-300 dark:text-indigo-850" />
              <p className="text-xs font-semibold">Nhấn nút bên trái để gieo quẻ may mắn lập trình!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
