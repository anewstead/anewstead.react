import react from "@vitejs/plugin-react";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import { defineConfig } from "vite";
import codegen from "vite-plugin-graphql-codegen";
import graphqlLoader from "vite-plugin-graphql-loader";

function chunkPolicy(id) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
  return "index";
}

const dev = () => {
  return {
    plugins: [react(), graphqlLoader(), codegen()],
    css: {
      devSourcemap: true,
    },
  };
};

const buildProd = () => {
  return {
    plugins: [react(), graphqlLoader(), codegen()],
    css: {
      devSourcemap: false,
    },
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
