const StatCard = ({
  icon: Icon,
  title,
  value,
  iconColor,
  iconBg,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white dark:bg-[#111827]/80 backdrop-blur-md rounded-2xl shadow-sm dark:shadow-md border border-slate-100/90 dark:border-slate-800/90 p-5 sm:p-6 flex items-center gap-4 
      hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-100 dark:hover:border-indigo-500/30 
      active:scale-[0.98] transition-all duration-300 text-left cursor-pointer group"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={22} className={iconColor} />
      </div>

      {/* Content */}
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </button>
  );
};

export default StatCard;