<template>
  <div class="widget-add-panel">
    <h2>Widgets</h2>
    <ul class="widget-list">
      <li
        class="widget-item"
        v-for="widget in widgets"
        :key="widget.name"
        @click="addWidget(widget.name, widget.defaultSize)"
      >
        <FontAwesomeIcon :icon="widget.icon" />
        <span>{{ widget.displayName }}</span>
      </li>
    </ul>
    <button class="close-button" @click="closePanel">Close</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Widget {
  name: string;
  displayName: string;
  icon: any;
  defaultSize: { width: number; height: number };
}

const props = defineProps<{
  id: boolean;
}>();

const emit = defineEmits(["addWidget", "close"]);

const widgets: Widget[] = [
  {
    name: "ClockWidget",
    displayName: "Clock",
    icon: ["fas", "clock"],
    defaultSize: { width: 320, height: 160 },
  },
  {
    name: "PomodoroTimerWidget",
    displayName: "Pomodoro Timer",
    icon: ["fas", "clock"],
    defaultSize: { width: 360, height: 440 },
  },
  {
    name: "CalendarWidget",
    displayName: "Calendar",
    icon: ["fas", "calendar-alt"],
    defaultSize: { width: 200, height: 300 },
  },
  {
    name: "TaskListWidget",
    displayName: "Tasks",
    icon: ["fas", "tasks"],
    defaultSize: { width: 400, height: 600 },
  },
  {
    name: "MemoWidget",
    displayName: "Memo",
    icon: ["fas", "sticky-note"],
    defaultSize: { width: 400, height: 400 },
  },
  {
    name: "ProgressBarWidget",
    displayName: "Progress",
    icon: ["fas", "chart-line"],
    defaultSize: { width: 320, height: 140 },
  },
  {
    name: "YouTubePlayerWidget",
    displayName: "YouTube",
    icon: ["fab", "youtube"],
    defaultSize: { width: 700, height: 600 },
  },
];

function addWidget(
  widgetName: string,
  size: { width: number; height: number }
) {
  emit("addWidget", widgetName, size);
}

function closePanel() {
  emit("close");
}
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.widget-add-panel {
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: calc($spacing-unit * 2);
  }

  .widget-list {
    flex: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;

    .widget-item {
      display: flex;
      align-items: center;
      gap: $spacing-unit;
      padding: $spacing-unit;
      margin-bottom: $spacing-unit;
      background-color: var(--theme-color-light-8);
      border-radius: $border-radius-base;
      cursor: pointer;
      @include transition(background-color, 0.2s);

      &:hover {
        background-color: var(--theme-color-light-6);
      }

      .fa-icon {
        font-size: 24px;
      }
    }
  }

  .close-button {
    margin-top: $spacing-unit;
    padding: $spacing-unit;
    background: none;
    border: none;
    color: $text-color;
    cursor: pointer;
    font-size: $font-size-base;
    text-align: center;

    &:hover {
      color: $accent-color;
    }
  }
}
</style>
