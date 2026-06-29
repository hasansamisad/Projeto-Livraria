const VARIANTS = {
  primary: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 text-white",
  secondary: "bg-slate-700 hover:bg-slate-600 focus-visible:outline-slate-700 text-slate-200",
  danger: "bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-600 text-white",
  outline: "border border-slate-600 hover:bg-slate-700/50 text-slate-300"
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-4 text-base"
};

export function Button({ 
  children, 
  type = 'submit', 
  isLoading = false, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-full flex justify-center items-center gap-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]}`}
      {...props}
    >
      {isLoading ? (
        <span className="animate-pulse">Carregando...</span>
      ) : children}
    </button>
  );
}