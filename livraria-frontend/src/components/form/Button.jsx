const VARIANTS = {
  primary: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 text-white shadow-xs",
  danger: "bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-600 text-white shadow-xs",
  secondary: "bg-app-bg hover:opacity-90 border border-app-border text-app-text focus-visible:outline-app-border",
  outline: "border border-app-border hover:bg-app-bg text-app-text"
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
      className={`w-full flex justify-center items-center gap-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          {/* Adicionado um spinner sutil para substituir o texto piscando antigo */}
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Carregando...</span>
        </div>
      ) : children}
    </button>
  );
}