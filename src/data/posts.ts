/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import agentsContent from '../blogs/Agents, Instructions, Skills.md?raw';
import agenticContent from '../blogs/Agentic AI vs Assistant AI.md?raw';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Agents, Instructions, Skills",
    excerpt: "Tìm hiểu sự khác biệt cốt lõi giữa Agent (Tác nhân AI), Instruction (Chỉ thị hướng dẫn) và Skills (Kỹ năng đóng gói) trong hệ thống AI hiện đại.",
    date: "28 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: agentsContent,
  },
  {
    id: 2,
    title: "Agentic AI vs Assistant AI",
    excerpt: "So sánh chi tiết giữa Assistant AI (Trợ lý phản hồi tuyến tính) và Agentic AI (Tác nhân tự hoạt động, thực thi mục tiêu và tự sửa lỗi).",
    date: "28 Th5, 2026",
    readTime: "10 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: agenticContent,
  }
];
