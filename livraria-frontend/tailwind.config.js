/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Suas novas classes semânticas utilitárias!
        app: {
          bg: 'var(--background)',
          surface: 'var(--surface)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',
          border: 'var(--border)',
        }
      }
    },
  },
  plugins: [],
}