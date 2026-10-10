/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Future Atlas Core Editorial Palette
        mustard: {
          DEFAULT: '#E8B949',
          light: '#FBF0D0',
          dark: '#D4A232',
        },
        coral: {
          DEFAULT: '#F07864',
          light: '#FDECE8',
          dark: '#D95E4A',
        },
        teal: {
          DEFAULT: '#155E63',
          dark: '#0E4347',
          light: '#1B737A',
          pale: '#EAF3F3',
        },
        deepTeal: '#155E63',
        ivory: {
          DEFAULT: '#FBF7ED',
          dark: '#F3ECDA',
        },
        ink: {
          DEFAULT: '#252B2A',
          light: '#545E5C',
          muted: '#7C8885',
        },
        sage: {
          DEFAULT: '#DCE7D8',
          light: '#EEF4EC',
          dark: '#C8D8C3',
        },
        paleSage: '#DCE7D8',
        surface: '#FFFFFF',

        // Compatibility mappings
        bgMain: '#FBF7ED',
        bgSecondary: '#DCE7D8',
        cardBg: '#FFFFFF',
        borderColor: '#E2DAC8',
        electricLime: '#E8B949', // Mapped to Mustard
        softLilac: '#155E63',    // Mapped to Deep Teal
        warmIvory: '#252B2A',    // Main text mapped to Ink
        mutedText: '#545E5C',    // Muted text mapped to Ink Light
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'atlas-sm': '0 1px 3px rgba(37, 43, 42, 0.05), 0 1px 2px rgba(37, 43, 42, 0.03)',
        'atlas': '0 4px 14px -2px rgba(21, 94, 99, 0.08), 0 2px 6px -1px rgba(37, 43, 42, 0.04)',
        'atlas-lg': '0 12px 28px -4px rgba(21, 94, 99, 0.12), 0 4px 12px -2px rgba(37, 43, 42, 0.06)',
      },
      borderRadius: {
        'atlas': '14px',
      }
    },
  },
  plugins: [],
}
