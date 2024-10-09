import { defineStore } from "pinia";

export interface Settings {
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
      this.$state = { ...this.$state, ...settings };
    },
  },
});
