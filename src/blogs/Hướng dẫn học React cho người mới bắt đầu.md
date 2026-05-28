## Giới thiệu về React
React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook (Meta) dùng để xây dựng giao diện người dùng (UI), đặc biệt là các ứng dụng đơn trang (Single Page Applications - SPA). 

Với triết lý thiết kế dựa trên các thành phần (Component-based) và luồng dữ liệu một chiều (One-way data flow), React đã nhanh chóng trở thành công nghệ phổ biến nhất thế giới trong phát triển Frontend.

---

## 1. Thành phần giao diện (Component)
Trong React, mọi phần của giao diện người dùng đều được coi là một Component. Một Component là một hàm JavaScript trả về mã JSX (sự kết hợp giữa HTML và JavaScript).

```jsx
function WelcomeCard({ name }) {
  return (
    <div className="p-6 bg-blue-50 border rounded-xl">
      <h2>Chào mừng bạn, {name}!</h2>
      <p>Chúc bạn có một ngày làm việc học tập React hiệu quả.</p>
    </div>
  );
}
```

---

## 2. Quản lý trạng thái với useState Hook
Trạng thái (State) đại diện cho dữ liệu nội bộ của một Component có khả năng thay đổi theo thời gian (ví dụ: số lượt click, trạng thái đóng mở menu, dữ liệu người dùng nhập). Khi State thay đổi, React sẽ tự động render lại giao diện để phản ánh dữ liệu mới.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-4 items-center">
      <span>Giá trị hiện tại: {count}</span>
      <button onClick={() => setCount(count + 1)}>Tăng số</button>
    </div>
  );
}
```

---

## 3. Quản lý vòng đời với useEffect Hook
`useEffect` là một Hook cực kỳ mạnh mẽ giúp bạn thực hiện các tác vụ bên lề (side effects) như call API lấy dữ liệu, lắng nghe sự kiện window, hoặc thiết lập bộ đếm thời gian.

```jsx
import { useEffect, useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/octocat')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // Mảng dependency rỗng nghĩa là effect chỉ chạy 1 lần sau khi mount

  if (!user) return <p>Đang tải dữ liệu...</p>;

  return (
    <div>
      <img src={user.avatar_url} alt={`Avatar của ${user.name}`} className="w-16 h-16 rounded-full" />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}
```

---

## 4. Truyền dữ liệu qua Props
Props (Properties) là các tham số được truyền từ Component cha xuống Component con. Props là dữ liệu chỉ đọc (read-only) và không thể bị sửa đổi trực tiếp bên trong Component con.

![React Props Flow](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60)

Hy vọng bài viết này sẽ giúp bạn có cái nhìn tổng quan và bước đệm vững chắc đầu tiên trên con đường chinh phục lập trình React!
