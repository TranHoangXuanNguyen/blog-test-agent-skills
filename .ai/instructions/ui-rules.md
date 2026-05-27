# Quy tắc code React cho Blog (Strict Rules)

Mọi UI/Component bạn sinh ra PHẢI tuân thủ các luật sau:

1. **Functional Components:** CHỈ sử dụng Functional Components và Hooks (`useState`, `useEffect`). Không dùng Class Components.
2. **Semantic HTML (Chuẩn SEO cho Blog):** - Bài viết phải được bọc trong thẻ `<article>`.
   - Tiêu đề bài viết dùng `<h1>`, các mục con dùng `<h2>`, `<h3>`.
   - Phân đoạn nội dung dùng `<section>`.
3. **Responsive bằng Tailwind:** Luôn mặc định code giao diện cho điện thoại trước (Mobile-first), sau đó dùng tiền tố `md:`, `lg:` cho màn hình lớn.
4. **Tối ưu hình ảnh:** Thẻ `<img>` luôn phải có thuộc tính `alt` mô tả nội dung ảnh để tốt cho SEO.
