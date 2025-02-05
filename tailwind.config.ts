import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#7209B7",
        blue: "#0055FF",
        green: "#00DA16",
        red: { 100: "#CB0000", 90: "#CF0000" },
        black: {
          100: "#353535",
          75: "#676767",
          50: "#9B9B9B",
          25: "#CDCDCD",
        },
        white: {
          base: "#FFFFFF",
          98: "#FAFAFA",
          97: "#F7F7F8",
        },
        hover: "#550788",
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        sm: "15px",
        md: "18px",
        lg: "32px",
      },
    },
  },
  plugins: [],
} satisfies Config;
