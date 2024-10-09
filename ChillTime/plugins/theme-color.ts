// plugins/theme-color.ts
import { useSettingsStore } from "~/store";
import Color from "color";

export default defineNuxtPlugin(() => {
  const settingsStore = useSettingsStore();

  // テーマカラーをHTMLのスタイルに反映
  watch(
    () => settingsStore.themeColor,
    (newColor) => {
      document.documentElement.style.setProperty("--theme-color", newColor);
      document.documentElement.style.setProperty(
        "--theme-color-light",
        Color(newColor).lighten(0.4).hex()
      );
      document.documentElement.style.setProperty(
        "--theme-color-light-5",
        Color(newColor).lighten(0.5).hex()
      );
      document.documentElement.style.setProperty(
        "--theme-color-light-6",
        Color(newColor).lighten(0.6).hex()
      );
      document.documentElement.style.setProperty(
        "--theme-color-dark",
        Color(newColor).darken(0.1).hex()
      );
    },
    { immediate: true }
  );
});
