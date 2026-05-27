# Quy tắc SEO & Dữ liệu cấu trúc (SEO & Structured Data Rules)

Để bài viết và trang Blog đạt thứ hạng cao trên Google, bạn PHẢI tuân thủ các quy tắc SEO kỹ thuật dưới đây:

## 1. Tiêu đề và Mô tả Meta
- Mọi trang phải có thẻ tiêu đề `<title>` chứa từ khóa chính, tối ưu từ 50-60 ký tự.
- Meta description (`<meta name="description">`) phải tóm tắt nội dung hấp dẫn, dài từ 150-160 ký tự và chứa từ khóa mục tiêu.

## 2. Thẻ Open Graph (Mạng xã hội)
- Đảm bảo các thẻ meta sau luôn sẵn sàng cho việc chia sẻ link:
  - `<meta property="og:type" content="article" />` (đối với trang bài viết) hoặc `website` (đối với trang chủ).
  - `<meta property="og:title" content="[Tiêu đề]" />`
  - `<meta property="og:description" content="[Mô tả]" />`
  - `<meta property="og:image" content="[Link ảnh bìa đại diện]" />`
  - `<meta property="og:url" content="[Đường dẫn chính thức - Canonical URL]" />`

## 3. Cấu trúc HTML Ngữ nghĩa (Semantic Layout)
- Trang chủ/Danh sách: Thẻ `<h1>` dành cho tên Blog.
- Trang chi tiết bài viết: Thẻ `<h1>` dành riêng cho tiêu đề bài viết. Các tiểu mục con dùng `<h2>`, `<h3>` tăng dần, tuyệt đối không được nhảy cóc (ví dụ từ `<h1>` nhảy thẳng sang `<h3>`).

## 4. Dữ liệu cấu trúc Schema JSON-LD
- Đối với bài viết chi tiết, hãy nhúng đoạn script JSON-LD Schema `BlogPosting` vào `<head>` hoặc cuối trang để công cụ tìm kiếm crawl dữ liệu bài viết chuẩn xác:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Tiêu đề bài viết",
  "image": ["đường_dẫn_ảnh_bìa"],
  "datePublished": "Ngày_xuất_bản",
  "dateModified": "Ngày_cập_nhật_gần_nhất",
  "author": [{
      "@type": "Person",
      "name": "Tên tác giả",
      "url": "Đường dẫn trang cá nhân"
    }]
}
</script>
```
