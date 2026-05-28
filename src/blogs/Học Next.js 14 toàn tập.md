## Bước nhảy vọt về kiến trúc của Next.js
Next.js 14 mang tới những cải tiến mang tính cách mạng cho thế giới lập trình React, tập trung tối ưu hóa tốc độ tải trang, đơn giản hóa luồng xử lý dữ liệu và cải thiện trải nghiệm lập trình viên (DX).

---

## 1. App Router dựa trên thư mục
Next.js 14 củng cố kiến trúc App Router (giới thiệu từ bản 13) sử dụng cấu trúc thư mục để định nghĩa các route, layout và template.

- **`layout.js`**: Định nghĩa giao diện chung được chia sẻ giữa nhiều trang (ví dụ: Sidebar, Header).
- **`page.js`**: Nội dung giao diện riêng biệt của trang đó.
- **`loading.js`**: Tự động hiển thị trạng thái loading thông qua React Suspense khi trang đang tải.

---

## 2. React Server Components (RSC) mặc định
Mọi component được tạo trong thư mục `app` đều mặc định là **React Server Components**. Chúng được render hoàn toàn trên máy chủ trước khi gửi HTML về cho trình duyệt.

- **Lợi ích**: Giảm kích thước bundle JavaScript tải về máy khách, tăng tốc độ FCP (First Contentful Paint), tốt cho SEO do HTML đã có sẵn nội dung.
- **Client Components**: Chỉ khi bạn cần dùng các tương tác như `useState`, `useEffect`, hoặc lắng nghe sự kiện người dùng, bạn mới thêm khai báo `"use client"` ở đầu file.

---

## 3. Server Actions - Đột phá luồng dữ liệu
Server Actions cho phép bạn định nghĩa các hàm chạy trực tiếp trên máy chủ nhưng có thể gọi được trực tiếp từ các tương tác phía Client (ví dụ: Submit form) mà không cần viết các API route trung gian.

```jsx
// actions.js
'use server'

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  // Thực hiện ghi vào cơ sở dữ liệu trên server trực tiếp
  await db.post.create({ data: { title, content } });
}
```

```jsx
// FormComponent.jsx
import { createPost } from './actions';

export default function FormComponent() {
  return (
    <form action={createPost} className="space-y-4">
      <input type="text" name="title" placeholder="Tiêu đề bài viết..." />
      <textarea name="content" placeholder="Nội dung..." />
      <button type="submit">Đăng bài</button>
    </form>
  );
}
```

---

## 4. Tối ưu hóa SEO mặc định với Metadata API
Next.js 14 cung cấp Metadata API mạnh mẽ cho phép bạn định nghĩa các thẻ meta SEO tĩnh hoặc động trực tiếp trong các file layout hoặc page:

```typescript
export const metadata = {
  title: 'Học Next.js 14 toàn tập | MyBlog',
  description: 'Hướng dẫn chi tiết xây dựng ứng dụng React từ đầu với Next.js App Router.',
};
```

![Next.js Developer Workspace](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60)

Next.js 14 không chỉ là nâng cấp, nó là tương lai của lập trình ứng dụng web React hiện đại!
