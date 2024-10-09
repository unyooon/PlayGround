import { defineStore } from "pinia";

interface Settings {
  backgroundImage: string;
  themeColor: string;
  fontSize: number;
}

export const useSettingsStore = defineStore("settings", {
  state: (): Settings => ({
    backgroundImage: "",
    themeColor: "#3498db",
    fontSize: 16,
  }),
  actions: {
    updateSettings(settings: Partial<Settings>) {
      Object.assign(this.$state, settings);
    },
  },
});
