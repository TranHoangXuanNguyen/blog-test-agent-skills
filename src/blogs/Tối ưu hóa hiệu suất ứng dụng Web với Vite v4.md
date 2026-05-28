## Sức mạnh tốc độ của Vite
Vite đã thay đổi cuộc chơi build tool trong hệ sinh thái Frontend, vượt qua Webpack để trở thành lựa chọn mặc định của đa số lập trình viên. 

Bài viết này khám phá các kỹ thuật tối ưu hóa hiệu suất ứng dụng Web của bạn lên mức tối đa khi làm việc với Vite.

---

## 1. Cơ chế hoạt động của Vite trong môi trường Dev
Vite sử dụng Native ESM trên trình duyệt để nạp các module khi lập trình, giúp tốc độ khởi động server dev gần như ngay lập tức bất kể kích thước dự án:

- **Pre-bundling**: Sử dụng `esbuild` viết bằng Go (nhanh hơn các bundler JS từ 10-100 lần) để gộp các node_modules thành các file ESM chuẩn.
- **HMR (Hot Module Replacement)**: Chỉ render lại các module thực sự thay đổi, giữ nguyên trạng thái ứng dụng.

---

## 2. Các kỹ thuật tối ưu hóa khi Build Production
Khi build ứng dụng cho môi trường production, Vite sử dụng Rollup dưới nền tảng để tạo ra các bundle được tối ưu hóa sâu:

### A. Tách mã nguồn (Code-Splitting)
Sử dụng dynamic import (`import()`) để chia tách các route hoặc component lớn thành các file JS nhỏ hơn, chỉ tải khi cần thiết:

```javascript
// Thay vì import tĩnh
// import HeavyComponent from './HeavyComponent';

// Hãy dùng import động (lazy load)
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### B. Cấu hình Rollup Manual Chunks
Bạn có thể cấu hình chi tiết cách chia nhỏ bundle trong `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Tách thư viện bên thứ ba thành chunk riêng để tận dụng cache trình duyệt
          }
        }
      }
    }
  }
});
```

---

## 3. Quản lý tài nguyên hình ảnh hiệu quả
Để tránh Layout Shift (CLS) và giảm thời gian tải trang ban đầu:

- **Lazy loading**: Luôn thêm thuộc tính `loading="lazy"` cho các ảnh không nằm ở màn hình đầu tiên.
- **Aspect-ratio**: Cấu hình kích thước rộng cao rõ ràng cho các khung ảnh.

![Performance Testing & Optimization](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60)

Áp dụng đầy đủ các kỹ thuật trên sẽ giúp ứng dụng web của bạn đạt điểm hiệu năng tuyệt đối trên Google Lighthouse!
