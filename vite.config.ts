import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // `~/*` path aliases come from tsconfig.json. Vite 8 resolves those natively,
  // so the vite-tsconfig-paths plugin is gone.
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [reactRouter(), tailwindcss()],
  server: {
    port: 5175,
  },
});
