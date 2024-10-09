// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // グローバルCSSの登録
  css: ["~/assets/styles/main.scss"],

  // プラグインの登録
  plugins: ["~/plugins/fontawesome.ts"],

  // モジュールの設定
  modules: ["@pinia/nuxt"],

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
