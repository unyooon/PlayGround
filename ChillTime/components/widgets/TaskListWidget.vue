<template>
  <div class="widget tasklist-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="task-input">
        <input
          type="text"
          v-model="newTaskText"
          @keypress.enter="addTask"
          placeholder="新しいタスク"
        />
        <button @click="addTask">
          <FontAwesomeIcon :icon="['fas', 'plus']" />
        </button>
      </div>
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
    margin-top: 12px;
    max-height: calc(100% - 40px);
    overflow-y: auto;

    li {
      display: flex;
      align-items: center;
      padding: $spacing-unit;
      border-bottom: 1px solid #e0e0e0;
      transition: background 0.3s;

      &:hover {
        background: #f9f9f9;
      }

      &.completed span {
        text-decoration: line-through;
        color: #b0b0b0;
      }

      input[type="checkbox"] {
        margin-right: $spacing-unit;
        accent-color: $accent-color;
      }

      span {
        flex-grow: 2;
      }

      .delete-button {
        background: none;
        border: none;
        color: #888;
        cursor: pointer;
        transition: color 0.3s, transform 0.3s;

        &:hover {
          color: $accent-color;
          transform: scale(1.1);
        }
      }
    }
  }

  .task-input {
    display: flex;
    margin-top: $spacing-unit;
    gap: $spacing-unit;

    input[type="text"] {
      flex: 1;
      padding: $spacing-unit;
      border: 1px solid #ddd;
      border-radius: $border-radius-base;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s, box-shadow 0.3s;

      &:focus {
        box-shadow: 0 0 8px var(--theme-color);
      }
    }

    button {
      padding: 0 $spacing-unit;
      background: var(--theme-color);
      border: none;
      color: #fff;
      border-radius: $border-radius-base;
      cursor: pointer;
      transition: background 0.3s, transform 0.3s;

      &:hover {
        background: var(--theme-color-dark);
        transform: scale(1.05);
      }
    }
  }
}
</style>
