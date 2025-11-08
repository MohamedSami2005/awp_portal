/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- This is where we add your custom animation ---
      keyframes: {
        sh02: {
          'from': {
            opacity: '0',
            left: '0%'
          },
          '50%': {
            opacity: '1'
          },
          'to': {
            opacity: '0',
            left: '100%'
          }
        }
      },
      animation: {
        sh02: 'sh02 0.5s 0s linear'
      }
      // --- End of animation ---
    },
  },
  plugins: [],
}