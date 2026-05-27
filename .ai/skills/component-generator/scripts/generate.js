#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import process from 'process';

const componentName = process.argv[2];

if (!componentName) {
  console.error('Lỗi: Vui lòng cung cấp tên Component. Ví dụ: node generate.js MyComponent');
  process.exit(1);
}

// Chuẩn hóa tên component (chữ cái đầu viết hoa)
const formattedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

const targetDir = path.join(process.cwd(), 'src', 'components');
const targetFile = path.join(targetDir, `${formattedName}.tsx`);

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Kiểm tra xem component đã tồn tại chưa
if (fs.existsSync(targetFile)) {
  console.warn(`Cảnh báo: Component ${formattedName} đã tồn tại tại ${targetFile}. Không ghi đè.`);
  process.exit(0);
}

const template = `/**
 * Copyright (c) ${new Date().getFullYear()} MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

interface ${formattedName}Props {
  className?: string;
}

export default function ${formattedName}({ className = '' }: ${formattedName}Props) {
  return (
    <div className={\`p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 \${className}\`}>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
        ${formattedName} Component
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Được khởi tạo tự động bằng AI Skill. Hãy chỉnh sửa file này để xây dựng giao diện của bạn.
      </p>
    </div>
  );
}
`;

try {
  fs.writeFileSync(targetFile, template, 'utf8');
  console.log(`Đã khởi tạo thành công Component: ${formattedName}`);
  console.log(`Đường dẫn: src/components/${formattedName}.tsx`);
} catch (error) {
  console.error('Lỗi khi ghi tệp component:', error);
  process.exit(1);
}
