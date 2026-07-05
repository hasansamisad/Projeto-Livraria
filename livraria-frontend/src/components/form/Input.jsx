export function Input({ label, id, type = 'text', placeholder, value, onChange, required = false }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-app-muted mb-1 transition-colors duration-200">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-app-border bg-app-surface px-3 py-2.5 text-app-text placeholder-app-muted/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all duration-200"
      />
    </div>
  );
}