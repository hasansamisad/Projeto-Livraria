/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 Adicione essa extensão de cores aqui:
      colors: {
        slate: {
          850: '#1e293bfe', // Tom intermediário customizado
        }
      }
    },
  },
  plugins: [],
}