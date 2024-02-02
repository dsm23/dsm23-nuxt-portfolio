// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/root.css"],
  image: {
    domains: ["images.ctfassets.net"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/test-utils/module", "@nuxt/image"],
  nitro: {
    preset: "netlify",
  },
});
