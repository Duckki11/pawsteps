/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { hand: ['Huninn', '"Noto Sans TC"', '"PingFang TC"', 'sans-serif'] },
      colors: {
        paper: '#F2F9F4',   // 淡薄荷紙
        ink: '#2F3E4E',     // 藍黑墨水
        grass: '#9ADBB5',
        sunny: '#FFD966',
        blossom: '#FF9FB5',
        sky: '#A8D8F0',
      },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pop: { '0%': { transform: 'scale(.6)', opacity: 0 }, '70%': { transform: 'scale(1.1)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
      },
      animation: { bob: 'bob 2.4s ease-in-out infinite', pop: 'pop .35s ease-out' },
    },
  },
  plugins: [],
}
