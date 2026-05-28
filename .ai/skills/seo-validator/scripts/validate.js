#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

console.log('=== Khởi động SEO Validator (Kiểm tra chất lượng SEO của bài viết) ===\n');

const blogsDir = path.join(process.cwd(), 'src', 'blogs');

if (!fs.existsSync(blogsDir)) {
  console.error(`❌ Lỗi: Thư mục chứa bài viết không tồn tại: ${blogsDir}`);
  process.exit(1);
}

const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('ℹ️ Không tìm thấy bài viết Markdown nào để kiểm tra.');
  process.exit(0);
}

let hasErrors = false;

files.forEach(file => {
  const filePath = path.join(blogsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  console.log(`Checking file: ${file}...`);
  let fileErrors = 0;

  // 1. Kiểm tra độ dài nội dung
  if (content.trim().length < 50) {
    console.error(`  ❌ [Lỗi] Bài viết quá ngắn hoặc trống (ít hơn 50 ký tự).`);
    fileErrors++;
  }

  // 2. Phân tích bậc tiêu đề và kiểm tra alt hình ảnh
  let lastHeadingLevel = 1; // Giả sử tiêu đề chính là h1 (mức 1)
  
  lines.forEach((line, lineIndex) => {
    const trimmedLine = line.trim();
    const lineNum = lineIndex + 1;

    // Check heading level
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];

      if (level > lastHeadingLevel + 1) {
        console.error(
          `  ❌ [Lỗi SEO] Nhảy bậc heading tại Dòng ${lineNum}:Từ H${lastHeadingLevel} nhảy sang H${level} ("${headingText}").`
        );
        fileErrors++;
      }
      lastHeadingLevel = level;
    }

    // Check image alt tags
    // Matches markdown image: ![alt](url)
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const matches = [...trimmedLine.matchAll(imgRegex)];
    matches.forEach(match => {
      const altText = match[1].trim();
      const imageUrl = match[2].trim();
      if (!altText) {
        console.error(
          `  ❌ [Lỗi SEO] Ảnh thiếu thẻ mô tả (alt text) tại Dòng ${lineNum} (URL: "${imageUrl}").`
        );
        fileErrors++;
      }
    });

    // Check wiki-style image alt tags: ![[Pasted image...]]
    const wikiImgRegex = /!\[\[(.*?)\]\]/g;
    const wikiMatches = [...trimmedLine.matchAll(wikiImgRegex)];
    wikiMatches.forEach(match => {
      const altText = match[1].trim();
      if (!altText) {
        console.error(
          `  ❌ [Lỗi SEO] Ảnh wiki-link thiếu mô tả tại Dòng ${lineNum}.`
        );
        fileErrors++;
      }
    });
  });

  if (fileErrors > 0) {
    console.log(`  ➡️ Kết quả: ${fileErrors} lỗi được tìm thấy.\n`);
    hasErrors = true;
  } else {
    console.log(`  ✅ Hợp lệ! Không phát hiện lỗi SEO.\n`);
  }
});

if (hasErrors) {
  console.error('❌ Kiểm thử SEO thất bại! Vui lòng khắc phục các lỗi trên trước khi build/deploy.');
  process.exit(1);
} else {
  console.log('🎉 Toàn bộ bài viết đã vượt qua bài kiểm tra chất lượng SEO!');
  process.exit(0);
}
