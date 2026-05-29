/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import agentsContent from '../blogs/Agents, Instructions, Skills.md?raw';
import agenticContent from '../blogs/Agentic AI vs Assistant AI.md?raw';
import contextEngineeringContent from '../blogs/Context Engineering.md?raw';
import howDoesAiWorkContent from '../blogs/How does AI work.md?raw';
import promptEngineeringContent from '../blogs/Prompt Engineering.md?raw';
import ragContent from '../blogs/RAG (Retrieval Augmented Generation).md?raw';
import mcpContent from '../blogs/MCP (Model Context Protocol).md?raw';

export interface Post {
  id: number;
  title: string;
  author?: string;
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
    id: 7,
    title: "MCP (Model Context Protocol)",
    author: "Vo Duc Tai",
    excerpt: "MCP is an open standard for connecting AI applications to external data sources, tools, and workflows.",
    date: "29 Th5, 2026",
    readTime: "6 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: mcpContent,
  },
  {
    id: 6,
    title: "RAG (Retrieval Augmented Generation)",
    author: "Vo Duc Tai",
    excerpt: "RAG is an AI framework that improves LLMs by fetching facts from an external, authoritative knowledge base.",
    date: "29 Th5, 2026",
    readTime: "7 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: ragContent,
  },
  {
    id: 5,
    title: "Prompt Engineering",
    author: "Vo Duc Tai",
    excerpt: "Prompt Engineering is the process of designing and refining prompts to guide LLMs to produce accurate and specific outputs.",
    date: "29 Th5, 2026",
    readTime: "10 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: promptEngineeringContent,
  },
  {
    id: 4,
    title: "How does AI work?",
    author: "Le Ky Ba",
    excerpt: "Explore the process of building a Traditional AI vs Generative AI, and how text generation works under the hood.",
    date: "29 Th5, 2026",
    readTime: "8 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: howDoesAiWorkContent,
  },
  {
    id: 3,
    title: "Context Engineering",
    author: "Le Ky Ba",
    excerpt: "Context engineering is the practice of designing, structuring and optimizing the context provided to LLMs to produce accurate outputs.",
    date: "29 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: contextEngineeringContent,
  },
  {
    id: 1,
    title: "Agents, Instructions, Skills",
    author: "Tran Hoang Xuan Nguyen",
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
    author: "Tran Hoang Xuan Nguyen",
    excerpt: "So sánh chi tiết giữa Assistant AI (Trợ lý phản hồi tuyến tính) và Agentic AI (Tác nhân tự hoạt động, thực thi mục tiêu và tự sửa lỗi).",
    date: "28 Th5, 2026",
    readTime: "10 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60",
    category: "AI & Technology",
    content: agenticContent,
  }
];
