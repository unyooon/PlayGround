<template>
  <div class="widget-area">
    <component
      v-for="widget in widgets"
      :is="widget.component"
      :key="widget.id"
      :id="widget.id"
      :style="{ left: widget.position.x + 'px', top: widget.position.y + 'px' }"
      v-draggable="{
        handle: '.widget-grab-bar',
        onDragend: (position: Position) => updateWidgetPosition(widget.id, position),
      }"
      @remove="removeWidget"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWidgetsStore } from "~/store";

import ClockWidget from "@/components/widgets/ClockWidget.vue";
import CalendarWidget from "@/components/widgets/CalendarWidget.vue";
import TaskListWidget from "@/components/widgets/TaskListWidget.vue";
import MemoWidget from "@/components/widgets/MemoWidget.vue";
import ProgressBarWidget from "@/components/widgets/ProgressBarWidget.vue";
import YouTubePlayerWidget from "~/components/widgets/YouTubePlayerWidget.vue";

import { type Widget } from "~/store/widget";

const widgetStore = useWidgetsStore();

interface Position {
  x: number;
  y: number;
}

const widgetComponents = {
  ClockWidget,
  CalendarWidget,
  TaskListWidget,
  MemoWidget,
  ProgressBarWidget,
  YouTubePlayerWidget,
};

const widgets = computed(() =>
  widgetStore.widgets.map((widget: Widget) => ({
    ...widget,
    component: widgetComponents[widget.name],
  }))
);

function updateWidgetPosition(id: string, position: { x: number; y: number }) {
  widgetStore.updateWidgetPosition(id, position);
}

function removeWidget(id: string) {
  widgetStore.removeWidget(id);
}
</script>

<style scoped lang="scss">
.widget-area {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
