/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // 明亮的紫色
        'primary-hover': '#4f46e5', // 深一点的紫色用于hover状态
        'primary-dark': '#818cf8', // 暗模式下的紫色
      }
    },
  },
  plugins: [],
};
