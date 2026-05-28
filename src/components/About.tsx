import { 
  Code2, 
  Briefcase, 
  Award, 
  GraduationCap, 
  BrainCircuit, 
  Users, 
  MessageSquare 
} from 'lucide-react';
import { 
  FaReact, 
  FaNodeJs, 
  FaCss3Alt, 
  FaFigma, 
  FaGitAlt, 
  FaAws, 
  FaDocker 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNestjs, 
  SiSpringboot 
} from 'react-icons/si';

import avatar from '../assets/avt.jpg';

export default function About() {
  const experiences = [
    {
      id: 1,
      time: '2026 - Present',
      title: 'Software Engineer Intern',
      company: 'Enosta | Digital Product Consultancy',
      description: 'Working on building a new feature for a client project, which involves developing a new user interface and backend logic.',
      icon: <Briefcase size={16} />,
    },
    {
      id: 2,
      time: '2025 - 2025',
      title: 'Software Engineer Intern',
      company: 'Nab invovation center Vietnam - NICV',
      description: 'Participant on starcamp batch 15, a 3-month intensive program for young Vietnamese talents in Software Engineering.',
      icon: <Award size={16} />,
    },
    {
      id: 3,
      time: '2023 - 2026',
      title: 'Bachelor of Information Technology',
      company: 'Passerelles Numériques Vietnam - PNV',
      description: 'Graduated with honors. Specialized in Software Engineering. Winner of the 2025 moment of truth award.',
      icon: <GraduationCap size={16} />,
    }
  ];

  const skills = [
    { name: 'React', icon: <FaReact size={24} /> },
    { name: 'TypeScript', icon: <SiTypescript size={24} /> },
    { name: 'Node.js', icon: <FaNodeJs size={24} /> },
    { name: 'Nest.js', icon: <SiNestjs size={24} /> },
    { name: 'CSS / SCSS', icon: <FaCss3Alt size={24} /> },
    { name: 'Figma', icon: <FaFigma size={24} /> },
    { name: 'Git & CI/CD', icon: <FaGitAlt size={24} /> },
    { name: 'AWS Cloud', icon: <FaAws size={24} /> },
    { name: 'Docker', icon: <FaDocker size={24} /> },
    { name: 'Spring Boot', icon: <SiSpringboot size={24} /> },
  ];

  const characteristics = [
    {
      title: 'Problem Solving',
      description: 'Passionate about tackling complex technical challenges.',
      icon: <BrainCircuit size={28} className="text-indigo-500" />
    },
    {
      title: 'Engineering',
      description: 'Scalable, maintainable, and modern codebases.',
      icon: <Code2 size={28} className="text-violet-500" />
    },
    {
      title: 'Team Work',
      description: 'Highly collaborative, agile, and an active listener.',
      icon: <Users size={28} className="text-pink-500" />
    },
    {
      title: 'Communication',
      description: 'Effective in sharing ideas, pitching solutions, and syncing up.',
      icon: <MessageSquare size={28} className="text-emerald-500" />
    }
  ];

  return (
    <article className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/40 rounded-3xl border border-gray-150/80 dark:border-slate-800/80 shadow-xl overflow-hidden my-8 p-6 md:p-12 text-left backdrop-blur-md animate-in fade-in duration-300 space-y-12">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 dark:border-slate-850 pb-10">
        {/* Avatar with Double Glow Rings */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-1 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-75 group-hover:scale-102 transition-transform duration-500" />
          <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900" />
          <img
            src={avatar}
            alt="Trần Hoàng Xuân Nguyên"
            className="relative w-full h-full object-cover rounded-full z-10"
          />
        </div>
        
        <div className="space-y-3.5 text-center md:text-left flex-grow">
          <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3.5 py-1.5 text-xs font-bold text-indigo-650 dark:text-indigo-450 uppercase tracking-wider">
            Software Engineer Intern
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Trần Hoàng Xuân Nguyên
          </h1>
          <p className="text-gray-650 dark:text-gray-400 leading-relaxed text-sm md:text-base max-w-2xl">
            I am an eager student with a strong passion for exploring and adopting 
            the newest technologies into my workflow. Moving beyond just writing code,
            I consider myself a digital problem-solver who enjoys transforming innovative 
            ideas into robust applications.
          </p>
        </div>
      </div>

      {/* Personal Characteristics Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          My Strengths
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characteristics.map((char, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-gray-100 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm p-5 space-y-3 shadow-sm hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 glow-border"
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

      {/* Main 2-Column Section */}
      <div className="grid gap-10 md:grid-cols-2 pt-4">
        {/* Left Column: Skills */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Code2 className="text-indigo-600 dark:text-indigo-400" size={20} />
            Tech Stack
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-slate-850/30 border border-gray-150/70 dark:border-slate-800 hover:border-indigo-450 dark:hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 group"
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

        {/* Right Column: Work Experience */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="text-indigo-600 dark:text-indigo-400" size={20} />
            Experience &amp; Education
          </h2>
          
          <div className="space-y-8 relative border-l border-gray-200 dark:border-slate-800 pl-6 ml-3 pt-2">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative space-y-2 animate-in slide-in-from-left-2 duration-300 group">
                {/* Timeline dot with glowing effect and custom icon */}
                <div className="absolute -left-[38px] top-0.5 h-7 w-7 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/5 group-hover:scale-105 group-hover:border-indigo-500 transition-all">
                  {exp.icon}
                </div>
                
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base leading-tight">
                      {exp.title}
                    </h3>
                    <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 rounded-md border border-indigo-100/10 px-2 py-0.5 whitespace-nowrap self-start sm:self-auto">
                      {exp.time}
                    </span>
                  </div>
                  
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-1">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mt-1.5">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
