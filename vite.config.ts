import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dev = () => {
  return {
    plugins: [react()],
  };
};

const buildProd = () => {
  return {
    plugins: [react()],
  };
};

const buildDev = () => {
  return {
    plugins: [react(), bundleAnalyzer({})],
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
