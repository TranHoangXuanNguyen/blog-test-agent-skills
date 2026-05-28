---
name: deploy-to-github-pages
description: Thực hiện kiểm tra, xây dựng (build) và phát hành ứng dụng web React lên GitHub Pages.
---

# Skill: Deploy lên GitHub Pages

Skill này giúp tự động hóa quá trình triển khai (deploy) ứng dụng React Vite lên GitHub Pages. Nó chạy script kiểm tra trạng thái Git, build dự án và đẩy lên nhánh `gh-pages`.

## Hướng dẫn thực thi (Execution Instructions)

Khi người dùng yêu cầu deploy hoặc cập nhật ứng dụng lên GitHub Pages, hãy thực hiện các bước sau:

1. **Kiểm tra và chuẩn bị:**
   Đảm bảo rằng dự án không có thay đổi nào chưa được commit (nếu có, hãy khuyên người dùng commit hoặc lưu lại để tránh mất mát hoặc deploy nhầm code cũ).

2. **Chạy Script Deploy:**
   Sử dụng script Node.js được cung cấp để thực hiện toàn bộ tiến trình:
   ```bash
   node .ai/skills/deploy-to-github-pages/scripts/deploy.js
   ```

3. **Cách thức hoạt động của Script:**
   - Script sẽ chạy `git status` để kiểm tra các file chưa commit.
   - Script chạy `npm run deploy` (tự động chạy lệnh build `npm run build` trước nhờ cơ chế `predeploy` trong `package.json`).
   - Sau khi deploy thành công, script sẽ tự động tìm kiếm thông tin Remote URL của Git để sinh ra và hiển thị link trực tiếp của trang web trên GitHub Pages (Ví dụ: `https://tranhoangxuannguyen.github.io/blog-test-agent-skills/`).

4. **Xác nhận thành công:**
   Báo cáo lại cho người dùng liên kết trang web đã deploy và hướng dẫn kiểm tra trạng thái hoạt động.
