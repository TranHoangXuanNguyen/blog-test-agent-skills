/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { useState, useMemo, useCallback } from 'react';
import { GitCommit, Coffee, Code2, Cpu, Calendar, ChevronRight, Terminal, Plus } from 'lucide-react';

interface CommitLog {
  id: string;
  message: string;
  time: string;
  type: 'feat' | 'fix' | 'refactor' | 'style';
}

// Sinh dữ liệu commit tĩnh bên ngoài component để tránh gọi impure functions (Math.random) trong lúc render.
const generateContributionGrid = () => {
  const grid = [];
  const today = new Date();
  // Tạo ma trận 24 tuần, mỗi tuần 7 ngày
  for (let w = 0; w < 24; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      // Tính lùi ngày
      const dayOffset = (23 - w) * 7 + (6 - d);
      const date = new Date(today);
      date.setDate(today.getDate() - dayOffset);
      
      // Ngẫu nhiên số commit
      let commitCount = 0;
      const rand = Math.random();
      if (rand > 0.8) commitCount = Math.floor(Math.random() * 8) + 1; // 1-8 commit
      else if (rand > 0.5) commitCount = Math.floor(Math.random() * 3) + 1; // 1-3 commit
      
      week.push({
        date: date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short', year: 'numeric' }),
        commits: commitCount,
      });
    }
    grid.push(week);
  }
  return grid;
};

const INITIAL_CONTRIBUTION_GRID = generateContributionGrid();

export default function DevDashboard() {
  // Trạng thái cho các chỉ số đếm
  const [commits, setCommits] = useState(24);
  const [coffee, setCoffee] = useState(3);
  const [linesCode, setLinesCode] = useState(12840);
  const [aiQueries, setAiQueries] = useState(89);

  // Trạng thái Tooltip cho biểu đồ đóng góp
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    commits: number;
    x: number;
    y: number;
  } | null>(null);

  // Trạng thái nhật ký git log
  const [gitLogs, setGitLogs] = useState<CommitLog[]>([
    { id: '1', message: 'feat: tích hợp tìm kiếm thông minh Command Palette', time: '5 phút trước', type: 'feat' },
    { id: '2', message: 'fix: sửa lỗi rò rỉ bộ nhớ timer trên React 19', time: '40 phút trước', type: 'fix' },
    { id: '3', message: 'refactor: cấu trúc lại toàn bộ hệ thống CSS Variables', time: '2 giờ trước', type: 'refactor' },
    { id: '4', message: 'feat: phát triển mục lục tự động Table of Contents', time: '1 ngày trước', type: 'feat' },
  ]);

  // Sử dụng dữ liệu commit tĩnh đã sinh sẵn bên ngoài component
  const contributionGrid = INITIAL_CONTRIBUTION_GRID;

  // Tính tổng số đóng góp
  const totalContributions = useMemo(() => {
    return contributionGrid.reduce((sum, week) => {
      return sum + week.reduce((wSum, day) => wSum + day.commits, 0);
    }, 0) + (commits - 24); // Đồng bộ với số commits cộng thêm
  }, [contributionGrid, commits]);

  // Hàm xử lý tăng chỉ số với hiệu ứng động
  const handleAddCommit = useCallback(() => {
    setCommits((prev) => prev + 1);
    
    // Thêm log commit mới vào đầu terminal
    const featTypes = ['feat', 'fix', 'refactor', 'style'] as const;
    const featMessages = [
      'feat: bổ sung animation mượt mà cho Git Dashboard',
      'refactor: tối ưu hóa rendering ma trận đóng góp',
      'style: cải tiến viền phát sáng của thẻ thống kê',
      'fix: tinh chỉnh responsiveness trên màn hình di động',
      'feat: tích hợp âm thanh click nhẹ nhàng',
    ];
    
    const randomType = featTypes[Math.floor(Math.random() * featTypes.length)];
    const randomMsg = featMessages[Math.floor(Math.random() * featMessages.length)];
    
    const newLog: CommitLog = {
      id: Date.now().toString(),
      message: randomMsg,
      time: 'Vừa xong',
      type: randomType,
    };
    
    setGitLogs((prev) => [newLog, ...prev.slice(0, 5)]); // Giới hạn tối đa 6 dòng
    setLinesCode((prev) => prev + Math.floor(Math.random() * 80) + 20); // Tự động tăng lines of code
  }, []);

  const handleAddCoffee = useCallback(() => {
    setCoffee((prev) => prev + 1);
    setAiQueries((prev) => prev + Math.floor(Math.random() * 5) + 3); // Thêm cafe tăng hiệu suất AI
  }, []);

  const handleWriteCode = useCallback(() => {
    const linesToAdd = Math.floor(Math.random() * 150) + 50;
    setLinesCode((prev) => prev + linesToAdd);
    if (Math.random() > 0.6) {
      setCommits((prev) => prev + 1);
    }
  }, []);

  const handleRunAi = useCallback(() => {
    setAiQueries((prev) => prev + 1);
  }, []);

  // Xác định màu sắc của ô đóng góp dựa trên số lượng commit
  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-slate-800/80';
    if (count <= 2) return 'bg-emerald-250 dark:bg-emerald-900/60 text-emerald-800';
    if (count <= 4) return 'bg-emerald-400 dark:bg-emerald-700/80 text-white';
    if (count <= 6) return 'bg-emerald-500 dark:bg-emerald-650/90 text-white';
    return 'bg-emerald-650 dark:bg-emerald-500 text-white'; // Rất nhiều commit
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-gray-150/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-xl p-6 md:p-8 space-y-8 text-left relative overflow-hidden transition-all duration-300">
      {/* Decorative Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-850 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Calendar size={12} />
            <span>Developer Metrics Dashboard</span>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-2">Nhật Ký Lập Trình Thống Kê</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dữ liệu hoạt động code, commit và mức độ tương tác thực tế.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Hoạt Động Live (DOM Synced)</span>
        </div>
      </div>

      {/* Grid 4 Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Commits Card */}
        <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 hover:shadow-md transition-all duration-200 group relative">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400">
              <GitCommit size={20} />
            </div>
            <button 
              onClick={handleAddCommit}
              className="rounded-lg p-1 text-indigo-650 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Thêm Commit"
            >
              <Plus size={16} />
            </button>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Git Commits (Hôm nay)</span>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {commits}
            </h4>
          </div>
        </div>

        {/* Coffee Card */}
        <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 hover:shadow-md transition-all duration-200 group relative">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
              <Coffee size={20} />
            </div>
            <button 
              onClick={handleAddCoffee}
              className="rounded-lg p-1 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Thêm Cốc Cafe"
            >
              <Plus size={16} />
            </button>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Lượng Caffein (Cốc)</span>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
              {coffee}
            </h4>
          </div>
        </div>

        {/* Lines of Code Card */}
        <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 hover:shadow-md transition-all duration-200 group relative">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-405">
              <Code2 size={20} />
            </div>
            <button 
              onClick={handleWriteCode}
              className="rounded-lg p-1 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Viết thêm Code"
            >
              <Plus size={16} />
            </button>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Dòng Code đã gõ</span>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
              {linesCode.toLocaleString()}
            </h4>
          </div>
        </div>

        {/* AI Queries Card */}
        <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 hover:shadow-md transition-all duration-200 group relative">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/20 text-pink-500 dark:text-pink-400">
              <Cpu size={20} />
            </div>
            <button 
              onClick={handleRunAi}
              className="rounded-lg p-1 text-pink-500 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-slate-900 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Gửi AI Query"
            >
              <Plus size={16} />
            </button>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">AI Agent Queries</span>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 group-hover:text-pink-550 dark:group-hover:text-pink-400 transition-colors">
              {aiQueries}
            </h4>
          </div>
        </div>
      </div>

      {/* GitHub Contribution Heatmap */}
      <div className="rounded-2xl border border-gray-150/80 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 space-y-4 shadow-sm relative">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Biểu đồ đóng góp GitHub (24 tuần qua)
          </h4>
          <span className="text-xs text-gray-450 dark:text-gray-500 font-semibold">
            Tổng cộng: <strong className="text-gray-800 dark:text-gray-300">{totalContributions} đóng góp</strong>
          </span>
        </div>

        {/* Heatmap Grid Container */}
        <div className="relative overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <div className="flex gap-[3px] min-w-[380px] justify-between relative">
            {contributionGrid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dIdx) => {
                  const colorClass = getContributionColor(day.commits);
                  return (
                    <div
                      key={dIdx}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                        if (parentRect) {
                          setHoveredCell({
                            date: day.date,
                            commits: day.commits,
                            x: rect.left - parentRect.left + rect.width / 2,
                            y: rect.top - parentRect.top - 42,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[2px] transition-colors duration-250 cursor-pointer hover:scale-110 ${colorClass}`}
                    />
                  );
                })}
              </div>
            ))}

            {/* Custom Tooltip */}
            {hoveredCell && (
              <div 
                className="absolute z-10 bg-slate-950 text-white border border-slate-800 text-[10px] py-1.5 px-2.5 rounded-lg shadow-lg font-sans pointer-events-none -translate-x-1/2 whitespace-nowrap animate-in fade-in zoom-in-95 duration-200"
                style={{ left: `${hoveredCell.x}px`, top: `${hoveredCell.y}px` }}
              >
                <strong>{hoveredCell.commits === 0 ? 'No commits' : `${hoveredCell.commits} commits`}</strong> vào {hoveredCell.date}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400">
          <span>Ít</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-100 dark:bg-slate-800/80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-250 dark:bg-emerald-900/60" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-700/80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-650/90" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-650 dark:bg-emerald-500" />
          <span>Nhiều</span>
        </div>
      </div>

      {/* Lower Section: Tech Stack & Git Terminal Log */}
      <div className="grid gap-6 md:grid-cols-5">
        
        {/* Tech Stack usage percentage (Col 1-2) */}
        <div className="md:col-span-2 rounded-2xl border border-gray-150/80 dark:border-slate-850 bg-white dark:bg-slate-950 p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Ngôn ngữ & Công nghệ sử dụng
          </h4>
          <div className="space-y-3.5 pt-1 text-xs">
            {/* React */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-gray-700 dark:text-gray-300">
                <span>React / JSX</span>
                <span>92%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            {/* TypeScript */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-gray-700 dark:text-gray-300">
                <span>TypeScript</span>
                <span>85%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Agentic AI */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-gray-700 dark:text-gray-300">
                <span>Agentic AI / MCP</span>
                <span>78%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Tailwind CSS */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-gray-700 dark:text-gray-300">
                <span>Tailwind CSS v4</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Terminal git log console (Col 3-5) */}
        <div className="md:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 flex flex-col h-[230px] font-mono text-[11px] text-slate-350 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
            <div className="flex items-center gap-1.5 text-gray-400 font-bold">
              <Terminal size={12} className="text-indigo-400" />
              <span>Git Commit Console Logs</span>
            </div>
            <span className="text-[10px] text-gray-500 select-none">branch: main</span>
          </div>

          <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 select-text">
            {gitLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-1 leading-normal animate-in fade-in duration-300">
                <ChevronRight size={12} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-500 font-bold select-none whitespace-nowrap">[{log.time}]</span>
                <span className={`font-semibold ${
                  log.type === 'feat' ? 'text-indigo-400' :
                  log.type === 'fix' ? 'text-rose-400' : 'text-slate-300'
                }`}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[9px] text-gray-600 mt-2 text-right">
            Click "+ Log Commit" để tự động sinh commit mới.
          </div>
        </div>

      </div>
    </div>
  );
}
