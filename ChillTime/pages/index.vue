<template>
  <div class="widget-area">
    <component
      v-for="(widget, index) in widgets"
      :is="widget.component"
      :key="widget.id"
      :id="widget.id"
      :style="{
        left: widget.position.x + 'px',
        top: widget.position.y + 'px',
        width: widget.size.width + 'px',
        height: widget.size.height + 'px',
      }"
      :ref="(el: ComponentPublicInstance) => (widgetsRef[index] = el)"
      v-draggable="{
        handle: '.widget-grab-bar',
        onDragend: (position: Position) => updateWidgetPosition(widget.id, position),
      }"
      @remove="removeWidget"
      @updateOptions="updateOptions"
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
import PomodoroTimerWidget from "~/components/widgets/PomodoroTimerWidget.vue";

import type { Widget, WidgetOptions } from "~/store/widget";

const widgetStore = useWidgetsStore();
const widgetsRef = ref<ComponentPublicInstance[]>([]);

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
  PomodoroTimerWidget,
};

const widgets = computed(() =>
  widgetStore.widgets.map((widget: Widget) => ({
    ...widget,
    component: widgetComponents[widget.name],
  }))
);

function updateWidgetPosition(id: string, position: { x: number; y: number }) {
  widgetStore.updateWidget(id, { position });
}

function updateWidgetSize(id: string, size: { width: number; height: number }) {
  widgetStore.updateWidget(id, { size });
}

function removeWidget(id: string) {
  widgetStore.removeWidget(id);
}

function updateOptions(id: string, options: WidgetOptions) {
  widgetStore.updateWidget(id, options);
}

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const widgetElement = entry.target;
    const id = widgetElement.id;
    const borderSize = 0;
    const size = {
      width: entry.contentRect.width + borderSize,
      height: entry.contentRect.height + borderSize,
    };
    updateWidgetSize(id, size);
  }
});

// 初期ウィジェットに対して監視
onMounted(() => {
  nextTick(() => {
    setupResizeObserver();
  });
});

// ウィジェットの変更を監視し、追加されたウィジェットも監視
watch(
  () => widgetStore.widgets,
  () => {
    nextTick(() => {
      setupResizeObserver();
    });
  },
  { deep: true }
);

// ResizeObserverを適用する関数
function setupResizeObserver() {
  widgetsRef.value.forEach((el, index) => {
    if (el && el.$el) {
      observer.observe(el.$el); // ResizeObserverの適用
    } else {
      console.error(`No element found for index ${index}`);
    }
  });
}

onBeforeUnmount(() => {
  widgetsRef.value.forEach((el) => {
    if (el && el.$el) {
      observer.unobserve(el.$el);
    }
  });
});
</script>

<style scoped lang="scss">
.widget-area {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
