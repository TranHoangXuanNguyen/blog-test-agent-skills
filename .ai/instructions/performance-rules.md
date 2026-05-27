# Quy tắc tối ưu hiệu năng React Blog (Performance Rules)

Mọi code React bạn sinh ra PHẢI tuân thủ các hướng dẫn tối ưu hiệu năng sau:

## 1. Tải chậm hình ảnh (Image Lazy Loading)
- Mọi thẻ `<img>` không thuộc phần hiển thị đầu tiên (above the fold) PHẢI có thuộc tính `loading="lazy"` để giảm thiểu băng thông khi tải trang ban đầu.
- Khuyến khích đặt kích thước chiều rộng và chiều cao cố định hoặc dùng tỉ lệ khung hình (aspect ratio) để tránh hiện tượng Layout Shift (CLS) khi ảnh tải xong.

## 2. Code-Splitting & Dynamic Imports
- Đối với các trang/routes khác ngoài trang chủ (ví dụ: Trang chi tiết bài viết, trang giới thiệu, trang liên hệ), hãy sử dụng `React.lazy()` và `Suspense` để tách bundle (code-splitting) nếu dự án có router.

## 3. Quản lý Render và Hooks
- Hạn chế thực hiện các tính toán nặng trực tiếp trong thân Component. Hãy sử dụng hook `useMemo` để ghi nhớ kết quả tính toán.
- Tránh tạo các hàm nặc danh trực tiếp trong prop của Component con (ví dụ: `onClick={() => doSomething()}`), thay vào đó hãy định nghĩa hàm riêng hoặc sử dụng `useCallback` nếu Component con được tối ưu bằng `React.memo`.

## 4. Tải Fonts và Resources
- Sử dụng font chữ hệ thống hoặc font chữ được tối ưu hóa. Nếu dùng Google Fonts, hãy tải bất đồng bộ hoặc kết nối trước (preconnect) đến server font để giảm thời gian phản hồi.
