/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        foreground: "#1C1C1C",
        primary: {
          DEFAULT: "#9E7438",
          foreground: "#FAF7F2",
          hover: "#87622C",
        },
        card: {
          DEFAULT: "#F3EFE8",
          foreground: "#1C1C1C",
        },
        border: "#E2DCD2",
        muted: {
          DEFAULT: "#EBE5DC",
          foreground: "#6B6862",
        },
        bronze: {
          DEFAULT: "#9E7438",
          light: "#D4B685",
          dark: "#7A5722",
        },
        stone: {
          warm: "#F3EFE8",
          subtle: "#FAF7F2",
          dark: "#1C1C1C",
        },
        charcoal: "#1C1C1C",
        neo: {
          canvas: "#FFFDF5",
          black: "#000000",
          accent: "#FF6B6B",
          secondary: "#FFD93D",
          muted: "#C4B5FD",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px #000000',
        'neo': '6px 6px 0px 0px #000000',
        'neo-md': '8px 8px 0px 0px #000000',
        'neo-lg': '12px 12px 0px 0px #000000',
        'neo-xl': '16px 16px 0px 0px #000000',
      },
      fontFamily: {
        neo: ["'Space Grotesk'", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        serif: ["Cormorant Garamond", "serif"],
        body: ["DM Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        luxury: "0.25em",
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
      }
    },
  },
  plugins: [],
}
