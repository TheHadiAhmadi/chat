import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [windicss(), sveltekit()],
  base: "/chat",
});
