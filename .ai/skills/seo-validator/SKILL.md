---
name: seo-validator
description: Tự động quét các bài viết Markdown trong thư mục src/blogs/ để phát hiện và ngăn chặn các lỗi vi phạm SEO trước khi build/deploy.
---

# Skill: Kiểm tra chất lượng SEO tự động (SEO Validator)

Skill này giúp tự động hóa quá trình kiểm thử chất lượng SEO của các bài viết blog được lưu dưới dạng file Markdown (`.md`) trước khi hệ thống thực hiện build hoặc deploy dự án.

## Hướng dẫn thực thi (Execution Instructions)

Khi người dùng yêu cầu kiểm tra SEO hoặc khi tiến trình prebuild tự động chạy, thực hiện các bước sau:

1. **Chạy Script kiểm tra:**
   Chạy script Node.js được cung cấp để thực hiện quét toàn bộ thư mục `src/blogs/`:
   ```bash
   node .ai/skills/seo-validator/scripts/validate.js
   ```

2. **Các quy tắc kiểm tra:**
   Script sẽ tự động phân tích cấu trúc từng file markdown và kiểm tra các tiêu chuẩn sau:
   - **Heading Hierarchy (Nhảy bậc tiêu đề):** Đảm bảo thứ tự tiêu đề tăng dần hợp lý (ví dụ: `h2` -> `h3`, không được từ `h2` nhảy thẳng sang `h4`).
   - **Image Alt Attributes (Thẻ mô tả ảnh):** Mọi cú pháp chèn ảnh markdown `![alt](url)` hoặc ảnh wiki `![[...]` (nếu có) bắt buộc phải có phần text mô tả `alt` (không được để trống `![](url)`).
   - **Content Length (Độ dài nội dung):** Đảm bảo bài viết có nội dung thực tế (không bị rỗng).

3. **Xử lý kết quả:**
   - Nếu phát hiện lỗi vi phạm, script sẽ in ra chi tiết lỗi (màu đỏ) kèm dòng và nội dung lỗi, sau đó thoát với mã lỗi `1` để dừng tiến trình build/deploy.
   - Nếu bài viết hợp lệ, script sẽ báo cáo thành công và cho phép tiếp tục tiến trình build.
