export default function ChartBlock({ title, subtitle, children, className = "" }) {
  return (
    <div className={`glass-panel rounded-[30px] p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
