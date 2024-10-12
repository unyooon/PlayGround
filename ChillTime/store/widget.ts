import { defineStore } from "pinia";

export type WidgetName =
  | "ClockWidget"
  | "CalendarWidget"
  | "TaskListWidget"
  | "MemoWidget"
  | "ProgressBarWidget";

export interface Widget {
  id: string;
  name: WidgetName;
  position: {
    x: number;
    y: number;
  };
}

export const useWidgetsStore = defineStore("widgets", {
  state: () => ({
    widgets: [] as Widget[],
  }),
  actions: {
    addWidget(widgetName: WidgetName) {
      const id = Date.now().toString();
      this.widgets.push({
        id,
        name: widgetName,
        position: { x: 100, y: 100 },
      });
    },
    removeWidget(id: string) {
      this.widgets = this.widgets.filter((widget) => widget.id !== id);
    },
    updateWidgetPosition(id: string, position: { x: number; y: number }) {
      const widget = this.widgets.find((widget) => widget.id === id);
      if (widget) {
        widget.position = position;
      }
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
