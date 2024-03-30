// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      giphyKey: process.env.NUXT_PUBLIC_GIPHY_KEY,
    },
  },
  devtools: { enabled: true },
  css: ["ant-design-vue/dist/reset.css", "/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
