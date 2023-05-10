import type { Config } from "tailwindcss"

// noinspection JSUnusedGlobalSymbols
export default {
  content: ["app/**/*.{js,jsx,ts,tsx}", "blog/**/*.{md,svg}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
