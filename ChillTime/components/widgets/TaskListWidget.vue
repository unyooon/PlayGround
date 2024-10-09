<template>
  <div class="widget tasklist-widget">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <ul class="task-list">
        <li
          v-for="task in tasks"
          :key="task.id"
          :class="{ completed: task.completed }"
        >
          <input type="checkbox" v-model="task.completed" />
          <span>{{ task.text }}</span>
          <button class="delete-button" @click="deleteTask(task.id)">
            <FontAwesomeIcon :icon="['fas', 'trash']" />
          </button>
        </li>
      </ul>
      <div class="task-input">
        <input
          type="text"
          v-model="newTaskText"
          @keyup.enter="addTask"
          placeholder="新しいタスク"
        />
        <button @click="addTask">
          <FontAwesomeIcon :icon="['fas', 'plus']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove"]);

function removeWidget() {
  emit("remove", props.id);
}

const tasks = ref<Task[]>([]);
const newTaskText = ref("");
const title = ref("タスクリスト");

function addTask() {
  if (newTaskText.value.trim() !== "") {
    tasks.value.push({
      id: Date.now(),
      text: newTaskText.value.trim(),
      completed: false,
    });
    newTaskText.value = "";
  }
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.tasklist-widget {
  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: calc($spacing-unit / 2);
      border-bottom: 1px solid color.adjust($text-color, $lightness: 80%);

      &.completed span {
        text-decoration: line-through;
        color: color.adjust($text-color, $lightness: 40%);
      }

      input[type="checkbox"] {
        margin-right: $spacing-unit;
      }

      .delete-button {
        background: none;
        border: none;
        color: $text-color;
        cursor: pointer;

        &:hover {
          color: $accent-color;
        }
      }
    }
  }

  .task-input {
    display: flex;
    margin-top: $spacing-unit;

    input[type="text"] {
      flex: 1;
      padding: calc($spacing-unit / 2);
      border: 1px solid color.adjust($text-color, $lightness: 60%);
      border-radius: $border-radius-base 0 0 $border-radius-base;
    }

    button {
      padding: 0 $spacing-unit;
      background-color: var(--theme-color);
      border: none;
      color: $white-color;
      border-radius: 0 $border-radius-base $border-radius-base 0;
      cursor: pointer;
    }
  }
}
</style>
