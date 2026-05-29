/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import agentsContent from '../blogs/Agents, Instructions, Skills.md?raw';
import agenticContent from '../blogs/Agentic AI vs Assistant AI.md?raw';

import StopUsinguseEffectforDataFetchingUnderstandingTanStackQueryContent from '../blogs/Stop Using useEffect for Data Fetching: Understanding TanStack Query.md?raw';
import HngdnhcReactchongimibtuContent from '../blogs/Hướng dẫn học React cho người mới bắt đầu.md?raw';
import TisaoTailwindCSSlithayicchchngtavitCSSContent from '../blogs/Tại sao Tailwind CSS lại thay đổi cách chúng ta viết CSS.md?raw';
import TiuhahiusutngdngWebviVitev4Content from '../blogs/Tối ưu hóa hiệu suất ứng dụng Web với Vite v4.md?raw';
import HcNextjs14tontpContent from '../blogs/Học Next.js 14 toàn tập.md?raw';
import HngdnDeployReactlnGitHubPagesContent from '../blogs/Hướng dẫn Deploy React lên GitHub Pages.md?raw';
import Top7FeaturedDEVPostsoftheWeekContent from '../blogs/Top 7 Featured DEV Posts of the Week.md?raw';
import Howthe8020RuleandGitHubCopilotSavedMyAbandonedAppFromCodeGraveyardContent from '../blogs/How the 80-20 Rule and GitHub Copilot Saved My Abandoned App From Code Graveyard.md?raw';
import GenAIvsAIAgentsvsAgenticAIContent from '../blogs/Gen AI vs AI Agents vs Agentic AI.md?raw';
export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
  content: string;
  views_count?: number;
  likes_count?: number;
}

export const posts: Post[] = [
                    {
    id: 11,
    title: "Gen AI vs AI Agents vs Agentic AI",
    excerpt: "Artificial Intelligence has evolved from simple rule-based systems to models that can create, reason and act independently.",
    date: "28 Th5, 2026",
    readTime: "8 phút đọc",
    imageUrl: "https://media.geeksforgeeks.org/wp-content/uploads/20251208144319106399/generative_al_with_only_llm2.webp",
    category: "AI & Technology",
    content: GenAIvsAIAgentsvsAgenticAIContent,
  },
  {
    id: 10,
    title: "How the 80/20 Rule and GitHub Copilot Saved My Abandoned App From Code Graveyard",
    excerpt: "This is a submission for the GitHub Finish-Up-A-Thon Challenge           What I Built   AlkaFocus is...",
    date: "28 Th5, 2026",
    readTime: "3 phút đọc",
    imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzilhcpmbqxfyy90udh2j.jpg",
    category: "Devchallenge",
    content: Howthe8020RuleandGitHubCopilotSavedMyAbandonedAppFromCodeGraveyardContent,
  },
  {
    id: 9,
    title: "Top 7 Featured DEV Posts of the Week",
    excerpt: "Welcome to this week's Top 7, where the DEV editorial team handpicks their favorite posts from the...",
    date: "28 Th5, 2026",
    readTime: "3 phút đọc",
    imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fre5xs0i3tusrwrpbaj3e.jpg",
    category: "Top7",
    content: Top7FeaturedDEVPostsoftheWeekContent,
  },
  {
    id: 8,
    title: "Hướng dẫn Deploy React lên GitHub Pages",
    excerpt: "Học cách deploy ứng dụng của bạn trong 5 phút.",
    date: "28 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    category: "Performance",
    content: HngdnDeployReactlnGitHubPagesContent,
  },
  {
    id: 7,
    title: "Học Next.js 14 toàn tập",
    excerpt: "Hướng dẫn chi tiết cách tự xây dựng một ứng dụng Next.js từ đầu.",
    date: "28 Th5, 2026",
    readTime: "15 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Development",
    content: HcNextjs14tontpContent,
  },
  {
    id: 6,
    title: "Tối ưu hóa hiệu suất ứng dụng Web với Vite v4",
    excerpt: "Khám phá những tính năng mới nhất của Vite và cách cấu hình dự án để đạt tốc độ tải trang nhanh nhất có thể.",
    date: "28 Th5, 2026",
    readTime: "10 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    category: "Performance",
    content: TiuhahiusutngdngWebviVitev4Content,
  },
  {
    id: 5,
    title: "Tại sao Tailwind CSS lại thay đổi cách chúng ta viết CSS",
    excerpt: "Utility-first CSS không chỉ là một xu hướng, nó là một cuộc cách mạng trong việc xây dựng giao diện nhanh chóng và nhất quán.",
    date: "28 Th5, 2026",
    readTime: "8 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    category: "Design",
    content: TisaoTailwindCSSlithayicchchngtavitCSSContent,
  },
  {
    id: 4,
    title: "Hướng dẫn học React cho người mới bắt đầu",
    excerpt: "Tìm hiểu các khái niệm cơ bản của React như Components, Hooks và Props thông qua các ví dụ thực tế cực kỳ dễ hiểu.",
    date: "28 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Development",
    content: HngdnhcReactchongimibtuContent,
  },
  {
    id: 3,
    title: "Stop Using useEffect for Data Fetching: Understanding TanStack Query",
    excerpt: "If you are still fetching data inside a useEffect hook, manually managing loading states, and storing...",
    date: "28 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftalrc85xf06mi5gdjltq.jpg",
    category: "React",
    content: StopUsinguseEffectforDataFetchingUnderstandingTanStackQueryContent,
  },
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
