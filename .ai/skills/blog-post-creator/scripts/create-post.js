#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

const title = process.argv[2];
const excerpt = process.argv[3] || 'Mô tả tóm tắt nội dung bài viết mới.';
const category = process.argv[4] || 'Development';
const readTime = process.argv[5] || '5 phút đọc';

if (!title) {
  console.error('Lỗi: Vui lòng cung cấp Tiêu đề bài viết. Ví dụ: node create-post.js "Tiêu đề bài viết"');
  process.exit(1);
}

const targetFile = path.join(process.cwd(), 'src', 'components', 'BlogCard.tsx');

if (!fs.existsSync(targetFile)) {
  console.error(`Lỗi: Không tìm thấy tệp tin ${targetFile}`);
  process.exit(1);
}

let content = fs.readFileSync(targetFile, 'utf8');

// Biểu thức chính quy tìm mảng mockPosts
const arrayRegex = /(export const mockPosts: Post\[] = \[\s*)([\s\S]*?)(\s*\];)/;
const match = content.match(arrayRegex);

if (!match) {
  console.error('Lỗi: Không tìm thấy mảng mockPosts trong file BlogCard.tsx');
  process.exit(1);
}

const prefix = match[1];
const arrayBody = match[2];
const suffix = match[3];

// Tìm ID lớn nhất hiện tại
const idMatches = [...arrayBody.matchAll(/id:\s*(\d+)/g)];
const ids = idMatches.map(m => parseInt(m[1], 10));
const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

// Định dạng ngày hôm nay (Ví dụ: 27 Th5, 2026)
const dateObj = new Date();
const months = ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"];
const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;

// Chọn ảnh mặc định dựa trên category
let imageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60";
const lowerCategory = category.toLowerCase();
if (lowerCategory.includes('dev') || lowerCategory.includes('code')) {
  imageUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60";
} else if (lowerCategory.includes('design') || lowerCategory.includes('ui') || lowerCategory.includes('ux')) {
  imageUrl = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60";
} else if (lowerCategory.includes('perf') || lowerCategory.includes('speed') || lowerCategory.includes('tối ưu')) {
  imageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60";
}

// Đối tượng bài viết mới
const newPostStr = `  {\n    id: ${nextId},\n    title: "${title}",\n    excerpt: "${excerpt}",\n    date: "${formattedDate}",\n    readTime: "${readTime}",\n    imageUrl: "${imageUrl}",\n    category: "${category}"\n  }`;

// Thêm bài viết mới vào đầu mảng
let newArrayBody = arrayBody.trim();
if (newArrayBody.length > 0) {
  newArrayBody = `${newPostStr},\n${newArrayBody}`;
} else {
  newArrayBody = newPostStr;
}

// Thay thế nội dung cũ bằng mảng mới cập nhật
const updatedContent = content.replace(arrayRegex, `${prefix}${newArrayBody}\n${suffix}`);

try {
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log(`Đã tạo bài viết mới thành công!`);
  console.log(`- ID: ${nextId}`);
  console.log(`- Tiêu đề: "${title}"`);
  console.log(`- Chuyên mục: "${category}"`);
  console.log(`- Ngày đăng: "${formattedDate}"`);

  // Xử lý tệp COPYRIGHT.txt ở thư mục gốc
  const copyrightFile = path.join(process.cwd(), 'COPYRIGHT.txt');
  const copyrightHeader = `Copyright (c) ${dateObj.getFullYear()} MyBlog. All rights reserved.\n\nDanh sách tác phẩm/bài viết được bảo hộ tác quyền:\n`;
  let copyrightContent = '';

  if (fs.existsSync(copyrightFile)) {
    copyrightContent = fs.readFileSync(copyrightFile, 'utf8');
  } else {
    copyrightContent = copyrightHeader;
  }

  const entry = `- [${formattedDate}] Bài viết ID ${nextId}: "${title}" (Chuyên mục: ${category}) - Tác quyền sở hữu bởi MyBlog.`;
  if (!copyrightContent.includes(entry)) {
    // Đảm bảo có dòng mới trước khi append
    if (!copyrightContent.endsWith('\n')) {
      copyrightContent += '\n';
    }
    copyrightContent += entry;
  }

  fs.writeFileSync(copyrightFile, copyrightContent, 'utf8');
  console.log(`- Đã cập nhật thông tin tác quyền vào tệp COPYRIGHT.txt`);

} catch (error) {
  console.error('Lỗi khi thực hiện tác vụ:', error);
  process.exit(1);
}
