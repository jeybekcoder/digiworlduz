/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css" // ✅ Fixed glob pattern
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      fontSize: {
        '13px': ['13px', {
          lineHeight: '24px',
          letterSpacing: '0.00111em', // 🔍 Harf orasidagi nozik masofa
        }],
      },
      letterSpacing: {
        tightest: '-.00111em',
        tighter: '-.0005em',
        tight: '-.00025em',
        normal: '0em',
        wide: '0.00025em',
        wider: '0.0005em',
        widest: '0.00111em',
      },
      animation: {
        'spin-slow': 'spin 2.5s linear infinite',
        'ping-slow': 'ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'soft-radial': 'radial-gradient(circle, #fefce8 0%, #fef3c7 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
