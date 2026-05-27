
interface DemoComponentProps {
  className?: string;
}

export default function DemoComponent({ className = '' }: DemoComponentProps) {
  return (
    <div className={`p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 ${className}`}>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
        DemoComponent Component
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Được khởi tạo tự động bằng AI Skill. Hãy chỉnh sửa file này để xây dựng giao diện của bạn.
      </p>
    </div>
  );
}
