#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import process from 'process';

console.log('=== Khởi động Sitemap & Robots Generator ===\n');

// 1. Xác định URL trang web trên GitHub Pages
function getSiteUrl() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    let username = '';
    let repo = '';
    
    if (remoteUrl.startsWith('git@github.com:')) {
      const match = remoteUrl.match(/git@github\.com:(.+)\/(.+)\.git/);
      if (match) {
        username = match[1];
        repo = match[2];
      }
    } else if (remoteUrl.startsWith('https://github.com/')) {
      const match = remoteUrl.match(/https:\/\/github\.com\/(.+)\/(.+)/);
      if (match) {
        username = match[1];
        repo = match[2].replace(/\.git$/, '');
      }
    }
    
    if (username && repo) {
      return `https://${username.toLowerCase()}.github.io/${repo}`;
    }
  } catch (e) {
    // Bỏ qua lỗi và dùng fallback
  }
  return 'https://tranhoangxuannguyen.github.io/blog-test-agent-skills';
}

const siteUrl = getSiteUrl();
// Cần chuẩn hóa: bỏ dấu / ở cuối nếu có
const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

console.log(`- Web URL phát hiện được: ${baseUrl}`);

// 2. Đọc danh sách các ID bài viết từ posts.ts
const postsFile = path.join(process.cwd(), 'src', 'data', 'posts.ts');
let postIds = [];

try {
  if (fs.existsSync(postsFile)) {
    const fileContent = fs.readFileSync(postsFile, 'utf8');
    const idMatches = [...fileContent.matchAll(/id:\s*(\d+)/g)];
    postIds = [...new Set(idMatches.map(m => parseInt(m[1], 10)))];
    console.log(`- Tìm thấy các ID bài viết hoạt động: ${postIds.join(', ')}`);
  } else {
    console.log('- Không tìm thấy posts.ts. Chỉ sinh sitemap cho trang chủ.');
  }
} catch (error) {
  console.warn('- Cảnh báo: Lỗi khi phân tích posts.ts. Dùng danh sách trống.', error.message);
}

// 3. Sinh file sitemap.xml
const today = new Date().toISOString().split('T')[0];

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Trang chủ -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

postIds.forEach(id => {
  sitemapContent += `  <!-- Bài viết ID ${id} -->
  <url>
    <loc>${baseUrl}/?post=${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemapContent += `</urlset>\n`;

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`✅ Đã sinh tệp sitemap thành công tại: public/sitemap.xml`);

// 4. Sinh file robots.txt
const robotsContent = `User-agent: *
Allow: /

# Sơ đồ trang web chính thức
Sitemap: ${baseUrl}/sitemap.xml
`;

const robotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsContent, 'utf8');
console.log(`✅ Đã sinh tệp robots thành công tại: public/robots.txt\n`);
