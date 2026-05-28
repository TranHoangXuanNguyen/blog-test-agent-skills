## Đưa sản phẩm của bạn ra thế giới
Sau khi đã hoàn thiện trang web React tuyệt vời của mình trên localhost, bước tiếp theo là triển khai (deploy) nó lên mạng để mọi người cùng truy cập. 

**GitHub Pages** là dịch vụ lưu trữ trang web tĩnh miễn phí hàng đầu từ GitHub. Bài viết này hướng dẫn bạn deploy ứng dụng React sử dụng Vite lên GitHub Pages chỉ trong 5 phút.

---

## 1. Cài đặt thư viện gh-pages
Đầu tiên, bạn cần cài đặt thư viện `gh-pages` như một dependency phát triển trong dự án. Thư viện này giúp tự động tạo nhánh `gh-pages` trên GitHub và đẩy mã nguồn sau khi build lên đó.

```bash
npm install gh-pages --save-dev
```

---

## 2. Cấu hình file package.json
Mở file `package.json` ở thư mục gốc dự án và bổ sung cấu hình sau:

### A. Thêm trường homepage
Thêm thuộc tính `"homepage"` chỉ định URL live của dự án. Định dạng URL sẽ là: `https://[username].github.io/[repository-name]/`

```json
"homepage": "https://tranhoangxuannguyen.github.io/blog-test-agent-skills/",
```

### B. Bổ sung các lệnh scripts deploy
Thêm hai lệnh `predeploy` và `deploy` vào đối tượng `scripts`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
*Lưu ý*: Lệnh `predeploy` sẽ tự động chạy trước lệnh `deploy` để đảm bảo dự án được biên dịch ra code tĩnh mới nhất nằm trong thư mục `dist` trước khi đẩy lên Github.

---

## 3. Chạy lệnh phát hành và xác minh
Sau khi đã cấu hình đầy đủ, hãy mở terminal lên và chạy lệnh duy nhất:

```bash
npm run deploy
```

Thư viện sẽ tự động chạy build dự án, tạo một nhánh mới tên là `gh-pages` trong kho lưu trữ của bạn, tải thư mục `dist` lên nhánh đó và báo cáo: `Published`.

![Deploying Application to GitHub Pages](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60)

Hãy đợi khoảng 1-2 phút để GitHub Pages kích hoạt và cập nhật máy chủ. Sau đó, truy cập vào liên kết trang homepage bạn đã cấu hình để xem kết quả!
