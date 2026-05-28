#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import process from 'process';

const url = process.argv[2];

if (!url) {
  console.error('Lỗi: Vui lòng cung cấp URL bài viết từ Dev.to. Ví dụ:\nnode crawl.js "https://dev.to/username/slug-1234"');
  process.exit(1);
}

console.log(`=== Bắt đầu tiến trình Crawl dữ liệu từ Dev.to ===`);
console.log(`- URL mục tiêu: ${url}`);

async function run() {
  try {
    // 1. Phân tích username và slug từ URL Dev.to để gọi API công khai
    const match = url.match(/https:\/\/dev\.to\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error("URL Dev.to không đúng định dạng. Cần có dạng: https://dev.to/username/slug");
    }
    const username = match[1];
    const slug = match[2];
    const apiUrl = `https://dev.to/api/articles/${username}/${slug}`;
    console.log(`- Đang gọi API: ${apiUrl}...`);

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Dev.to API phản hồi lỗi: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.title || !data.body_markdown) {
      throw new Error('Dữ liệu bài viết trả về không hợp lệ hoặc thiếu nội dung.');
    }

    const title = data.title.replace(/"/g, '\\"'); // escape quotes
    const excerpt = (data.description || 'Bài viết kỹ thuật từ cộng đồng Dev.to').replace(/"/g, '\\"');
    
    // Chuẩn hóa category từ tag đầu tiên
    let category = 'AI & Technology';
    if (data.tags && data.tags.length > 0) {
      const firstTag = data.tags[0];
      category = firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
    }

    const readingTime = `${data.reading_time_minutes || 5} phút đọc`;
    const coverImage = data.cover_image || data.social_image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800';

    console.log(`\n- Thông tin bài viết tìm thấy:`);
    console.log(`  + Tiêu đề: "${data.title}"`);
    console.log(`  + Chuyên mục: "${category}"`);
    console.log(`  + Thời gian đọc: "${readingTime}"`);
    console.log(`  + Ảnh bìa: "${coverImage}"`);

    // 2. Viết file markdown trước để create-post.js sử dụng trực tiếp nội dung này
    const blogsDir = path.join(process.cwd(), 'src', 'blogs');
    if (!fs.existsSync(blogsDir)) {
      fs.mkdirSync(blogsDir, { recursive: true });
    }

    const sanitizeFileName = (name) => name.replace(/[\/\\:\*\?"<>\|]/g, '-');
    const mdFileName = `${sanitizeFileName(data.title)}.md`;
    const mdFilePath = path.join(blogsDir, mdFileName);

    // Dọn dẹp sơ bộ markdown (xóa liquid tags thừa của dev.to nếu có)
    let cleanMarkdown = data.body_markdown;
    // Replace {% embed ... %} with simple message/link
    cleanMarkdown = cleanMarkdown.replace(/{%\s*embed\s+(https?:\/\/\S+)\s*%}/g, '[Tham khảo liên kết tại đây]($1)');

    fs.writeFileSync(mdFilePath, cleanMarkdown, 'utf8');
    console.log(`- Đã ghi nội dung Markdown chi tiết vào: src/blogs/${mdFileName}`);

    // 3. Gọi script create-post.js để tự động hóa chèn import, cập nhật posts.ts và COPYRIGHT.txt
    console.log(`- Đang tích hợp bài viết mới vào cấu trúc mã nguồn...`);
    
    // Vì ta đã tạo file md trước, ta truyền tham số thứ 6 (customContent) là một chuỗi rỗng
    // để create-post.js không ghi đè nội dung file md ta vừa tạo.
    const createPostScript = path.join(process.cwd(), '.ai', 'skills', 'blog-post-creator', 'scripts', 'create-post.js');
    
    // Sử dụng execFileSync truyền đối số dạng mảng để an toàn tuyệt đối, tránh lỗi dấu nháy shell
    execFileSync('node', [createPostScript, title, excerpt, category, readingTime, '', coverImage], { stdio: 'inherit' });

    console.log(`\n\x1b[32m🎉 Đã crawl và tích hợp thành công bài viết: "${data.title}"!\x1b[0m`);

  } catch (error) {
    console.error(`\n\x1b[31m❌ Tiến trình crawl thất bại:\x1b[0m`, error.message);
    process.exit(1);
  }
}

run();
