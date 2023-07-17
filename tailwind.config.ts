import { type Config } from "tailwindcss"

// noinspection JSUnusedGlobalSymbols
export default {
  content: ["app/**/*.{js,jsx,ts,tsx}", "blog/**/*.{md,svg}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {},
  },
} satisfies Config
