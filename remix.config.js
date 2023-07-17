/** @type {import("@remix-run/dev").AppConfig} */
const cfg = {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  watchPaths: ["public/blog/*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  tailwind: true,
  postcss: true,
}

export default cfg
