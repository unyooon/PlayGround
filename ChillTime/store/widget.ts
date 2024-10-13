import { defineStore } from "pinia";

export type WidgetName =
  | "ClockWidget"
  | "CalendarWidget"
  | "TaskListWidget"
  | "MemoWidget"
  | "ProgressBarWidget";

export interface Widget extends WidgetOptions {
  id: string;
  name: WidgetName;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface WidgetAddOptions extends WidgetOptions {
  name: WidgetName;
  size: {
    width: number;
    height: number;
  };
}

export interface WidgetOptions {
  name?: WidgetName;
  position?: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
  YouTubePlayerOptions?: {
    videoUrls: string[];
  };
}

export const useWidgetsStore = defineStore("widgets", {
  state: () => ({
    widgets: [] as Widget[],
  }),
  actions: {
    addWidget(options: WidgetAddOptions) {
      const id = Date.now().toString();
      this.widgets.push({
        id,
        name: options.name,
        position: { x: 100, y: 100 },
        size: options.size,
      });
    },
    removeWidget(id: string) {
      this.widgets = this.widgets.filter((widget) => widget.id !== id);
    },
    updateWidget(id: string, options: WidgetOptions) {
      const widgetIndex = this.widgets.findIndex((widget) => widget.id === id);
      if (widgetIndex !== -1) {
        this.widgets[widgetIndex] = {
          ...this.widgets[widgetIndex],
          ...options,
        };
      }
    },
    clearWidget() {
      this.widgets = [];
    },
    saveWidgets() {
      saveToLocalStorage("widgets", this.widgets);
    },
    loadWidgets() {
      const widgets = loadFromLocalStorage<Widget[]>("widgets");
      if (widgets) {
        this.widgets = widgets;
      }
    },
  },
});
