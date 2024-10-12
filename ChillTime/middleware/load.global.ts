import { useSettingsStore, useWidgetsStore } from "~/store";

// middleware/checkLocalStorage.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const widgetsStore = useWidgetsStore();
    const settingsStore = useSettingsStore();

    widgetsStore.loadWidgets();
    settingsStore.loadSettings();
    console.log("Loaded widgets and settings");
  }
});
