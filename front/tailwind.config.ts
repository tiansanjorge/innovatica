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
        customGreen: "#81aaa2",
        customBlue: "#34394f",
        customPink: "#e66d85",
      },
      boxShadow: {
        inset: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
        "inset-md": "inset 0 0 10px rgba(0, 0, 0, 0.5)",
        "inset-lg": "inset 0 0 15px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
} satisfies Config;
