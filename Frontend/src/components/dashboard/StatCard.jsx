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
      className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4 
      hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 
      active:scale-[0.98] transition-all duration-300 text-left cursor-pointer"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon size={22} className={iconColor} />
      </div>

      {/* Content */}
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </button>
  );
};

export default StatCard;