import { defineStore } from "pinia";

export interface Settings {
  backgroundImage: string;
  themeColor: string;
  fontSize: number;
}

export const useSettingsStore = defineStore("settings", {
  state: (): Settings => ({
    backgroundImage: "",
    themeColor: "#8C7B75",
    fontSize: 16,
  }),
  actions: {
    updateSettings(settings: Partial<Settings>) {
      this.$state = { ...this.$state, ...settings };
      this.saveSettings();
    },
    saveSettings() {
      saveToLocalStorage("settings", this.$state);
    },
    loadSettings() {
      const settings = loadFromLocalStorage<Settings>("settings");
      if (settings) {
        this.$state = settings;
      }
    },
  },
});
