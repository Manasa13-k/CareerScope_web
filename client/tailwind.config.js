/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#120D18',
        bgSecondary: '#1B1422',
        cardBg: '#21182A',
        borderColor: '#3A2B43',
        electricLime: '#C8FF3D',
        softLilac: '#B9A7FF',
        warmIvory: '#F7F3EA',
        mutedText: '#B8AEBE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
