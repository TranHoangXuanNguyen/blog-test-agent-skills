import { Calendar, Clock, ChevronRight } from 'lucide-react';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl">
      {/* Image Container */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {post.category}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <a href="#">{post.title}</a>
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
          
          <a href="#" className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700">
            Đọc tiếp
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

// Mock data for demonstration
export const mockPosts: Post[] = [
      {
    id: 5,
    title: "Hướng dẫn Deploy React lên GitHub Pages",
    excerpt: "Học cách deploy ứng dụng của bạn trong 5 phút.",
    date: "27 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    category: "Performance"
  },
{
    id: 4,
    title: "Học Next.js 14 toàn tập",
    excerpt: "Hướng dẫn chi tiết cách tự xây dựng một ứng dụng Next.js từ đầu.",
    date: "27 Th5, 2026",
    readTime: "15 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Development"
  },
{
    id: 1,
    title: "Hướng dẫn học React cho người mới bắt đầu",
    excerpt: "Tìm hiểu các khái niệm cơ bản của React như Components, Hooks và Props thông qua các ví dụ thực tế cực kỳ dễ hiểu.",
    date: "24 Th5, 2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    category: "Development"
  },
  {
    id: 2,
    title: "Tại sao Tailwind CSS lại thay đổi cách chúng ta viết CSS?",
    excerpt: "Utility-first CSS không chỉ là một xu hướng, nó là một cuộc cách mạng trong việc xây dựng giao diện nhanh chóng và nhất quán.",
    date: "22 Th5, 2026",
    readTime: "8 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    category: "Design"
  },
  {
    id: 3,
    title: "Tối ưu hóa hiệu suất ứng dụng Web với Vite v4",
    excerpt: "Khám phá những tính năng mới nhất của Vite và cách cấu hình dự án để đạt tốc độ tải trang nhanh nhất có thể.",
    date: "20 Th5, 2026",
    readTime: "10 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    category: "Performance"
  }


];

export default BlogCard;
