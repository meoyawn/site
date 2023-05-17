export const skills = {
  jvm: "Java Virtual Machine (JVM)",
  kotlin: "Kotlin",
  vertx: "Vert.x",
  android: "Android",

  node: "Node.js",
  d3: "D3.js",
  typescript: "TypeScript",
  next: "Next.js",
  tailwind: "Tailwind CSS",
  react: "React.js",

  git: "Git",
  docker: "Docker",
  ffmpeg: "FFmpeg",
  linux: "Linux",

  sqlite: "SQLite",
  postgres: "PostgreSQL",

  stripe: "Stripe (Software)",
  seo: "Search Engine Optimization (SEO)",

  crdt: "Conflict-free Replicated Data Types (CRDT)",
} as const

export type SkillID = keyof typeof skills
