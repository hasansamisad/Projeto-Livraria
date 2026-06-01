export function Button({ children, type = 'submit', isLoading = false, ...props }) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}