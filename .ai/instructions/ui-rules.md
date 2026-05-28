# Quy tắc code React cho Blog (Strict Rules)

Mọi UI/Component bạn sinh ra PHẢI tuân thủ các luật sau:

1. **Functional Components:** CHỈ sử dụng Functional Components và Hooks (`useState`, `useEffect`). Không dùng Class Components.
2. **Semantic HTML (Chuẩn SEO cho Blog):** - Bài viết phải được bọc trong thẻ `<article>`.
   - Tiêu đề bài viết dùng `<h1>`, các mục con dùng `<h2>`, `<h3>`.
   - Phân đoạn nội dung dùng `<section>`.
3. **Responsive bằng Tailwind:** Luôn mặc định code giao diện cho điện thoại trước (Mobile-first), sau đó dùng tiền tố `md:`, `lg:` cho màn hình lớn.
4. **Tối ưu hình ảnh:** Thẻ `<img>` luôn phải có thuộc tính `alt` mô tả nội dung ảnh để tốt cho SEO.
5. **Cấu trúc & Căn lề Layout (Markdown Flow & Alignment):**
   - Bố cục của trang chi tiết phải bám sát cấu trúc của tệp Markdown gốc.
   - Toàn bộ văn bản, danh sách, bảng biểu và khối mã nguồn (code block) phải được căn lề trái (left-aligned) theo mặc định, không tự động căn giữa để đảm bảo tính dễ đọc.
   - Bổ sung style CSS/Tailwind chi tiết cho từng thành phần (bảng biểu có border nhẹ, zebra stripes; blockquote có đường viền màu nhấn và nền nhạt; code block có bo góc và shadow) để tạo cảm giác cao cấp và chuyên nghiệp.
