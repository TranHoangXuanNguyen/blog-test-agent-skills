# Quy tắc tạo Dữ liệu giả lập và Bảo vệ Bản quyền (Mock Data & Copyright Rules)

Mọi dữ liệu giả lập (mock data), bài viết kiểm thử hoặc mã nguồn tự động được sinh ra trong dự án này PHẢI tuân thủ các quy định nghiêm ngặt về bản quyền (Copyright):

## 1. Ghi nhận Bản quyền trong Mã nguồn
- Các file chứa dữ liệu mẫu lớn hoặc các component do AI/Công cụ tự động sinh ra bắt buộc phải có phần chú thích (header comment) ghi nhận bản quyền sở hữu trí tuệ:
  ```typescript
  /**
   * Copyright (c) 2026 MyBlog. All rights reserved.
   * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
   */
  ```

## 2. Quản lý tệp Bản quyền chung (`COPYRIGHT.txt`)
- Dự án duy trì một tệp tin bản quyền chung tên là `COPYRIGHT.txt` ở thư mục gốc của dự án.
- Khi các Skill tự động tạo thêm bài viết mới hoặc tài nguyên mẫu, các công cụ đó phải tự động cập nhật hoặc khởi tạo tệp `COPYRIGHT.txt` để bổ sung tên bài viết mới vào danh sách tác quyền được đăng ký.

## 3. Nội dung dữ liệu mẫu
- Dữ liệu mẫu (hình ảnh, trích dẫn bài viết, tác giả) phải sử dụng nguồn miễn phí bản quyền (ví dụ: hình ảnh từ Unsplash, Pexels; nội dung tự viết).
- Không sao chép nguyên bản từ các trang tin tức/blog khác mà không ghi rõ nguồn gốc (Source/Citation) trong thuộc tính dữ liệu (ví dụ: trường `sourceUrl` nếu có).
