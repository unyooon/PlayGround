<template>
  <div class="widget-add-panel" v-if="isOpen">
    <h2>ウィジェット追加</h2>
    <ul class="widget-list">
      <li
        class="widget-item"
        v-for="widget in widgets"
        :key="widget.name"
        @click="addWidget(widget.name)"
      >
        <FontAwesomeIcon :icon="widget.icon" />
        <span>{{ widget.displayName }}</span>
      </li>
    </ul>
    <button class="close-button" @click="closePanel">閉じる</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Widget {
  name: string;
  displayName: string;
  icon: any;
}

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["addWidget", "close"]);

const widgets: Widget[] = [
  { name: "ClockWidget", displayName: "時計", icon: ["fas", "clock"] },
  {
    name: "CalendarWidget",
    displayName: "カレンダー",
    icon: ["fas", "calendar-alt"],
  },
  {
    name: "TaskListWidget",
    displayName: "タスクリスト",
    icon: ["fas", "tasks"],
  },
  { name: "MemoWidget", displayName: "メモ", icon: ["fas", "sticky-note"] },
  {
    name: "ProgressBarWidget",
    displayName: "進捗バー",
    icon: ["fas", "chart-line"],
  },
  {
    name: "YouTubePlayerWidget",
    displayName: "YouTuberプレーヤー",
    icon: ["fab", "youtube"],
  },
];

function addWidget(widgetName: string) {
  emit("addWidget", widgetName);
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
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: $white-color;
  border-left: 1px solid color.adjust($text-color, $lightness: 40%);
  box-shadow: -2px 0 4px rgba($black-color, 0.1);
  z-index: $z-index-modal;
  padding: calc($spacing-unit * 2);
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
      background-color: color.adjust($background-color, $lightness: 5%);
      border-radius: $border-radius-base;
      cursor: pointer;
      @include transition(background-color, 0.2s);

      &:hover {
        background-color: color.adjust($background-color, $lightness: 10%);
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
