#!/usr/bin/env node

import { execSync } from 'child_process';
import process from 'process';

console.log('=== Khởi động tiến trình Deploy lên GitHub Pages ===\n');

// Hàm phân tích Remote URL để lấy URL GitHub Pages
function getGithubPagesUrl() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    let username = '';
    let repo = '';
    
    // Khớp dạng git@github.com:username/repo.git
    if (remoteUrl.startsWith('git@github.com:')) {
      const match = remoteUrl.match(/git@github\.com:(.+)\/(.+)\.git/);
      if (match) {
        username = match[1];
        repo = match[2];
      }
    } 
    // Khớp dạng https://github.com/username/repo.git hoặc https://github.com/username/repo
    else if (remoteUrl.startsWith('https://github.com/')) {
      const match = remoteUrl.match(/https:\/\/github\.com\/(.+)\/(.+)/);
      if (match) {
        username = match[1];
        repo = match[2].replace(/\.git$/, '');
      }
    }
    
    if (username && repo) {
      return `https://${username.toLowerCase()}.github.io/${repo}/`;
    }
  } catch (e) {
    // Không lấy được cấu hình remote git
  }
  return null;
}

// 1. Kiểm tra trạng thái Git
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (gitStatus) {
    console.log('\x1b[33mCảnh báo: Bạn đang có những thay đổi chưa commit trong Git:\x1b[0m');
    console.log(gitStatus);
    console.log('\n[Khuyên dùng]: Bạn nên commit các thay đổi trước khi deploy để tránh deploy nhầm code chưa hoàn thiện.\n');
  }
} catch (e) {
  console.log('Không thể kiểm tra trạng thái Git. Vẫn tiếp tục...');
}

// 2. Chạy lệnh npm run deploy
console.log('Đang chạy lệnh "npm run deploy" (tiến hành build dự án và đẩy lên GitHub Pages)...');
try {
  execSync('npm run deploy', { stdio: 'inherit' });
  console.log('\n\x1b[32mDeploy thành công rực rỡ! 🎉\x1b[0m');
  
  // 3. Hiển thị URL GitHub Pages
  const pagesUrl = getGithubPagesUrl();
  if (pagesUrl) {
    console.log(`\nTrang web của bạn hiện đang live tại:`);
    console.log(`👉 \x1b[36m\x1b[4m${pagesUrl}\x1b[0m`);
  } else {
    console.log('\nKhông thể tự động xác định URL GitHub Pages. Vui lòng kiểm tra cấu hình trong GitHub Settings > Pages.');
  }
} catch (error) {
  console.error('\n\x1b[31m❌ Lỗi khi thực hiện deploy:\x1b[0m', error.message);
  process.exit(1);
}
