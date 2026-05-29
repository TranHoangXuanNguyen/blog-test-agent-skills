import { 
  Code2, 
  BrainCircuit, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { 
  FaReact, 
  FaNodeJs, 
  FaFigma, 
  FaGitAlt, 
  FaAws, 
  FaDocker 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiSpringboot,
  SiPython,
  SiPostgresql
} from 'react-icons/si';

export default function About() {
  const authors = [
    {
      name: 'Võ Đức Tài',
      role: 'Backend Engineer & Cloud Architect',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver',
      bio: 'Đam mê tối ưu hóa cơ sở dữ liệu, xây dựng API hiệu năng cao và triển khai hạ tầng đám mây tin cậy với Docker, AWS, PostgreSQL.',
      skills: ['Spring Boot', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      name: 'Lê Kỳ Bá',
      role: 'AI Specialist & Fullstack Developer',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
      bio: 'Chuyên gia tích hợp các mô hình AI Agents và Model Context Protocol (MCP). Đam mê ứng dụng AI để tối ưu hóa quy trình phát triển phần mềm.',
      skills: ['Python', 'Nest.js', 'AI Agents', 'LangChain', 'TypeScript']
    },
    {
      name: 'Trần Hoàng Xuân Nguyên',
      role: 'Frontend Engineer & UI/UX Designer',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sam',
      bio: 'Chuyên gia thiết kế và lập trình giao diện người dùng (UI/UX). Tập trung phát triển các ứng dụng React, Next.js mượt mà, tối ưu SEO và tương tác cao.',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Figma']
    }
  ];

  const sharedSkills = [
    { name: 'React / Next.js', icon: <FaReact size={24} /> },
    { name: 'TypeScript', icon: <SiTypescript size={24} /> },
    { name: 'Node.js / NestJS', icon: <FaNodeJs size={24} /> },
    { name: 'Spring Boot', icon: <SiSpringboot size={24} /> },
    { name: 'Python', icon: <SiPython size={24} /> },
    { name: 'PostgreSQL', icon: <SiPostgresql size={24} /> },
    { name: 'AWS Cloud', icon: <FaAws size={24} /> },
    { name: 'Docker', icon: <FaDocker size={24} /> },
    { name: 'Git & CI/CD', icon: <FaGitAlt size={24} /> },
    { name: 'Figma UI/UX', icon: <FaFigma size={24} /> },
  ];

  const characteristics = [
    {
      title: 'Problem Solving',
      description: 'Đam mê chinh phục các bài toán kỹ thuật phức tạp từ giao diện đến hệ thống backend.',
      icon: <BrainCircuit size={28} className="text-indigo-500" />
    },
    {
      title: 'Modern Engineering',
      description: 'Viết mã nguồn sạch, dễ bảo trì, dễ mở rộng và tuân thủ các chuẩn mực công nghệ.',
      icon: <Code2 size={28} className="text-violet-500" />
    },
    {
      title: 'High Collaboration',
      description: 'Phối hợp Agile ăn ý, giao tiếp hiệu quả và hỗ trợ lẫn nhau trong mọi hoàn cảnh.',
      icon: <Users size={28} className="text-pink-500" />
    },
    {
      title: 'AI Integration',
      description: 'Tiên phong ứng dụng AI Agents và các công nghệ mới để tăng 300% hiệu suất phát triển.',
      icon: <MessageSquare size={28} className="text-emerald-500" />
    }
  ];

  return (
    <article className="max-w-6xl mx-auto bg-white/70 dark:bg-slate-900/40 rounded-3xl border border-gray-150/80 dark:border-slate-800/80 shadow-xl overflow-hidden my-8 p-6 md:p-12 text-left backdrop-blur-md animate-in fade-in duration-300 space-y-16">
      
      {/* Intro Header Section */}
      <div className="text-center space-y-4 border-b border-gray-100 dark:border-slate-850 pb-10">
        <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3.5 py-1.5 text-xs font-bold text-indigo-650 dark:text-indigo-405 uppercase tracking-wider">
          Đội ngũ sáng lập
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Gặp gỡ các tác giả của MyBlog
        </h1>
        <p className="text-gray-650 dark:text-gray-400 leading-relaxed text-sm md:text-base max-w-3xl mx-auto">
          Chúng tôi là một nhóm gồm 3 lập trình viên đầy nhiệt huyết, cùng chung chí hướng chia sẻ những kiến thức lập trình thực chiến, tối ưu hóa hệ thống và cách tích hợp AI Agents vào quy trình phát triển phần mềm hiện đại.
        </p>
      </div>

      {/* Authors Grid Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="text-indigo-600 dark:text-indigo-400" size={24} />
          Thành viên nhóm
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {authors.map((author, idx) => (
            <div 
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-gray-150/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md p-6 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 glow-border"
            >
              <div className="space-y-5">
                {/* Avatar with Double Glow Rings */}
                <div className="relative w-28 h-28 mx-auto rounded-full p-1 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-75" />
                  <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="relative w-full h-full object-cover rounded-full z-10 p-1"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {author.name}
                  </h3>
                  <span className="inline-block text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-full px-2.5 py-1">
                    {author.role}
                  </span>
                  <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed pt-2">
                    {author.bio}
                  </p>
                </div>
              </div>

              {/* Skills badges */}
              <div className="mt-6 pt-4 border-t border-gray-105 dark:border-slate-850">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {author.skills.map((s, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[10px] font-semibold bg-gray-50/60 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-md px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shared Characteristics Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Thế mạnh &amp; Giá trị cốt lõi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {characteristics.map((char, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-gray-100 dark:border-slate-850 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm p-5 space-y-3 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 glow-border"
            >
              <div className="inline-flex p-2 rounded-xl bg-gray-50 dark:bg-slate-800/50 group-hover:scale-110 transition-transform">
                {char.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {char.title}
              </h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed">
                {char.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Shared Tech Stack Section */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Code2 className="text-indigo-600 dark:text-indigo-400" size={24} />
          Hệ sinh thái Công nghệ (Tech Stack)
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {sharedSkills.map((skill, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-slate-850/30 border border-gray-150/70 dark:border-slate-800 hover:border-indigo-450 dark:hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <div className="text-gray-650 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:scale-105 transition-all duration-350">
                {skill.icon}
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
