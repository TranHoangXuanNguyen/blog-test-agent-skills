---
name: blog-post-creator
description: Tự động khởi tạo bài viết Blog mới dưới dạng dữ liệu mock hoặc file Markdown chuẩn SEO với các metadata bắt buộc.
---

# Skill: Khởi tạo Bài viết Blog mới

## Hướng dẫn thực thi (Execution Instructions)
Khi người dùng yêu cầu tạo một bài viết blog mới, hãy thực hiện các bước sau:

1. **Sử dụng Script tạo Bài viết tự động:**
   Chạy script Node.js được cung cấp để chèn thêm bài viết mới vào danh sách dữ liệu mẫu:
   ```bash
   node .ai/skills/blog-post-creator/scripts/create-post.js "Tiêu đề bài viết" "Mô tả ngắn" "Chủ đề (ví dụ: Development, Design, Performance)" "Thời gian đọc (ví dụ: 5 phút đọc)"
   ```

2. **Cập nhật hình ảnh & nội dung:**
   - Script sẽ tự động lấy ảnh demo chất lượng từ Unsplash tương thích với chủ đề đã chọn.
   - Script tự động tính toán ID lớn nhất tiếp theo và ngày xuất bản là ngày hiện tại.

3. **Xác minh hiển thị:**
   - Mở file `src/components/BlogCard.tsx` và kiểm tra xem phần tử `mockPosts` đã được thêm bài viết mới thành công hay chưa.
   - Khởi động môi trường dev để xem bài viết mới xuất hiện trên trang chủ.

4. **Thông báo kết quả:**
   Thông báo cho người dùng: *"Đã tạo thành công bài viết mới '[Tiêu đề]' và cập nhật vào danh sách bài viết. Bạn có thể kiểm tra thay đổi trên trình duyệt."*
