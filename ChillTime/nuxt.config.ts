// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // グローバルCSSの登録
  css: ["~/assets/styles/main.scss"],

  // モジュールの設定
  modules: ["@pinia/nuxt"],

  router: {
    middleware: ["load"],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
