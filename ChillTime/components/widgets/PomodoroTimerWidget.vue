<template>
  <div class="widget pomodoro-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="mode-buttons">
        <button
          :class="{ active: mode === 'pomodoro' }"
          @click="setMode('pomodoro')"
        >
          Pomodoro
        </button>
        <button
          :class="{ active: mode === 'shortBreak' }"
          @click="setMode('shortBreak')"
        >
          Short Break
        </button>
        <button
          :class="{ active: mode === 'longBreak' }"
          @click="setMode('longBreak')"
        >
          Long Break
        </button>
      </div>
      <div class="timer-display">{{ formattedTime }}</div>
      <button class="control-button" @click="toggleTimer">
        {{ isRunning ? "STOP" : "START" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWidgetsStore } from "~/store/widget";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "updateOptions"]);

const widgetStore = useWidgetsStore();

const title = ref("Pomodoro Timer");
const mode = ref<keyof typeof timeSettings>("pomodoro");
const time = ref(1500); // Default to 25 minutes
const timer = ref<ReturnType<typeof setInterval> | null>(null);
const isRunning = ref(false);

const timeSettings = {
  pomodoro: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 900, // 15 minutes
};

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

const setMode = (newMode: keyof typeof timeSettings) => {
  mode.value = newMode;
  resetTimer();
};

const toggleTimer = () => {
  if (isRunning.value) {
    stopTimer();
  } else {
    startTimer();
  }
};

const startTimer = () => {
  if (timer.value) return;
  isRunning.value = true;
  timer.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      stopTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  isRunning.value = false;
};

const resetTimer = () => {
  stopTimer();
  time.value = timeSettings[mode.value];
};

const removeWidget = () => {
  emit("remove", props.id);
};
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.pomodoro-widget {
  text-align: center;

  .mode-buttons {
    margin-bottom: $spacing-unit;

    button {
      background: none;
      border: none;
      font-weight: bold;
      margin: 0 $spacing-unit / 2;
      padding: $spacing-unit / 2;
      cursor: pointer;
      transition: opacity 0.3s;

      &.active {
        opacity: 1;
      }

      &:not(.active) {
        opacity: 0.6;
      }
    }
  }

  .timer-display {
    font-size: 3em;
    margin: $spacing-unit 0;
  }

  .control-button {
    background-color: #fff;
    color: var(--theme-color);
    border: none;
    border-radius: 8px;
    padding: $spacing-unit;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
