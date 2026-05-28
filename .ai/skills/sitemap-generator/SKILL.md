---
name: sitemap-generator
description: Tự động phân tích git remote origin URL và danh sách bài viết blog để tự động sinh tệp sitemap.xml và robots.txt chuẩn SEO mỗi khi dự án chạy build.
---

# Skill: Tự động tạo Sitemap & Robots (Sitemap & Robots Generator)

Skill này hỗ trợ tự động hóa việc cấu hình lập chỉ mục cho các công cụ tìm kiếm (Google, Bing...) bằng cách sinh ra tệp sơ đồ trang web (`sitemap.xml`) và tệp chỉ dẫn robot (`robots.txt`) dựa trên các bài viết thực tế đang có trong dự án.

## Hướng dẫn thực thi (Execution Instructions)

Khi người dùng yêu cầu tạo sitemap hoặc trong tiến trình prebuild tự động, thực hiện các bước sau:

1. **Chạy Script sinh tệp:**
   Chạy script Node.js được cung cấp:
   ```bash
   node .ai/skills/sitemap-generator/scripts/generate.js
   ```

2. **Cách thức hoạt động:**
   - Script tự động đọc Remote Origin URL của Git để suy ra đường dẫn Live URL của trang web (hoặc sử dụng fallback mặc định nếu không chạy được lệnh Git).
   - Đọc danh sách các bài viết thực tế có trong `src/data/posts.ts` để lấy thông tin các ID bài viết đang hoạt động.
   - Tạo file `public/sitemap.xml` chứa danh sách đường dẫn:
     - URL trang chủ: `https://[username].github.io/[repo]/`
     - URL chi tiết từng bài viết: `https://[username].github.io/[repo]/?post=[id]` (tương ứng với cơ chế chọn bài viết trong state React).
   - Tạo file `public/robots.txt` chứa chỉ dẫn cho phép tất cả các bot tìm kiếm truy cập và liên kết trực tiếp tới file `sitemap.xml`.
