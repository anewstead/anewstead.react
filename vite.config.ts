import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function chunkPolicy(id) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
  return "index";
}

const baseCSS = {
  devSourcemap: true,
};

const dev = () => {
  return {
    plugins: [react()],
    css: baseCSS,
  };
};

const buildProd = () => {
  return {
    plugins: [react()],
    css: baseCSS,
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            return chunkPolicy(id);
          },
        },
      },
    },
  };
};

// same as buildProd but with analyzer
const buildDev = () => {
  const bp = buildProd();
  return {
    ...bp,
    plugins: [...bp.plugins, bundleAnalyzer({})],
  };
};

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return dev();
  }
  if (mode === "development") {
    return buildDev();
  }
  return buildProd();
});
