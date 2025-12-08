/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
        },
        // "primary": "#197fe6",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
        "background-dark-secondary": "#172336ff",
        "component-dark": "#1a2530",
        "border-dark": "#2c3a47",
        "text-main-dark": "#e5e7eb",
        "text-secondary-dark": "#9ca3af",
        "dark-border": "#2c3842",
        "background": "#0F172A",
        "surface": "#1E293B",
        "surface-accent": "#334155",
        "border": "#334155",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-placeholder": "#64748B",
        "text-light": "#E2E8F0",
        "text-light-secondary": "#94A3B8",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Noto Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
