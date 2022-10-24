import adapter from "@sveltejs/adapter-static";
import windicss from "vite-plugin-windicss";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
  },
};

export default config;
