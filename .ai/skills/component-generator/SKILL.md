---
name: component-generator
description: Tự động khởi tạo cấu trúc và mã nguồn cơ bản cho một React Component viết bằng TypeScript/Vite kèm Tailwind CSS và các icon từ lucide-react.
---

# Skill: Khởi tạo React Component chuẩn

## Hướng dẫn thực thi (Execution Instructions)
Khi người dùng yêu cầu tạo một React component mới, hãy thực hiện các bước sau:

1. **Sử dụng Script tạo Component tự động:**
   Chạy script Node.js được cung cấp để khởi tạo khung xương cho component:
   ```bash
   node .ai/skills/component-generator/scripts/generate.js <ComponentName>
   ```

2. **Hoàn thiện giao diện & logic:**
   - Mở tệp component vừa tạo trong thư mục `src/components/<ComponentName>.tsx`.
   - Bổ sung code giao diện Responsive bằng Tailwind CSS tuân theo [ui-rules.md](file:///home/ikiguyz/Documents/Learning/React-AI-Test/.ai/instructions/ui-rules.md).
   - Nếu component hiển thị danh sách (ví dụ danh sách bài viết blog, bình luận), tạo mock data có cấu trúc chặt chẽ ở đầu file.
   - Thêm thuộc tính `loading="lazy"` cho các thẻ `<img>` nếu không hiển thị ở màn hình đầu tiên (above the fold) theo quy định trong [performance-rules.md](file:///home/ikiguyz/Documents/Learning/React-AI-Test/.ai/instructions/performance-rules.md).

3. **Kiểm tra và Xuất khẩu (Export):**
   - Đảm bảo component sử dụng `export default`.
   - Import component vào `src/App.tsx` hoặc trang cha tương ứng để hiển thị kiểm thử.

4. **Thông báo kết quả:**
   Thông báo cho người dùng: *"Đã khởi tạo thành công Component [Tên Component] bằng công cụ tự động. Bạn có thể kiểm tra tệp tại [Đường dẫn tệp] và giao diện hiển thị trên màn hình."*
