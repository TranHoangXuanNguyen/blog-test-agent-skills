---
name: blog-crawler
description: Tự động crawl nội dung bài viết kỹ thuật từ liên kết Dev.to (sử dụng Dev.to public API) và lưu trữ trực tiếp dưới dạng Markdown/TSX vào dự án.
---

# Skill: Crawl bài viết từ Dev.to tự động (Dev.to Blog Crawler)

Skill này giúp tự động hóa việc lấy dữ liệu (cào bài viết) từ một URL bài viết của trang cộng đồng lập trình viên Dev.to, chuyển đổi thành file Markdown và tích hợp tự động vào mã nguồn Blog.

## Hướng dẫn thực thi (Execution Instructions)

Khi người dùng yêu cầu crawl bài viết từ một liên kết Dev.to, thực hiện các bước sau:

1. **Chạy Script Crawl:**
   Chạy script Node.js được cung cấp kèm tham số là đường dẫn bài viết Dev.to:
   ```bash
   node .ai/skills/blog-crawler/scripts/crawl.js "<URL_Dev.to>"
   ```
   *Ví dụ:*
   ```bash
   node .ai/skills/blog-crawler/scripts/crawl.js "https://dev.to/mcp/model-context-protocol-mcp-quick-start-guide-for-beginners-5apc"
   ```

2. **Cách thức hoạt động của Script:**
   - Sử dụng API công khai của Dev.to để lấy thông tin chi tiết bài viết dưới dạng JSON có chứa dữ liệu Markdown (`body_markdown`).
   - Tách lọc tiêu đề, ảnh đại diện bìa (`cover_image`), mô tả ngắn (`description`), thời gian đọc (`reading_time_minutes`), và chuyên mục (`tags`).
   - Gọi script `create-post.js` để:
     - Tạo tệp tin `.md` trong thư mục `src/blogs/` chứa nội dung bài viết.
     - Thêm khai báo `import` tương ứng ở đầu file `src/data/posts.ts` và đưa post object vào mảng `posts` để hiển thị trên UI.
     - Tự động đăng ký tác quyền bài viết mới vào tệp bản quyền chung `COPYRIGHT.txt`.

3. **Xác nhận thành công:**
   Báo cáo cho người dùng bài viết mới đã được crawl về thành công và có thể chạy thử localhost để kiểm tra.
