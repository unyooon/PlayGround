<template>
  <div class="widget calendar-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="calendar">
        <div class="calendar-header">
          <button @click="prevMonth">&lt;</button>
          <span>{{ currentYear }}年 {{ currentMonth + 1 }}月</span>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div class="day-name" v-for="day in dayNames" :key="day">
            {{ day }}
          </div>
          <div
            class="day"
            v-for="day in calendarDays"
            :key="day.date"
            :class="{ today: day.isToday }"
          >
            {{ day.number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove"]);

function removeWidget() {
  emit("remove", props.id);
}

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const title = ref("Calendar");

const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

const calendarDays = computed(() => {
  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const totalDays = lastDay.getDate();
  const startWeekDay = firstDay.getDay();

  // 前月の空白を埋める
  for (let i = 0; i < startWeekDay; i++) {
    days.push({ number: "", date: "", isToday: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({
      number: i,
      date: date.toISOString(),
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
    });
  }

  return days;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.calendar-widget {
  .calendar {
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-unit;
      button {
        background: none;
        border: none;
        font-size: $font-size-large;
        cursor: pointer;
      }
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: calc($spacing-unit / 2);

      .day-name {
        font-weight: bold;
        text-align: center;
      }

      .day {
        text-align: center;
        padding: calc($spacing-unit / 2);
        border-radius: $border-radius-base;

        &.today {
          background-color: var(--theme-color);
          color: $white-color;
        }
      }
    }
  }
}
</style>
