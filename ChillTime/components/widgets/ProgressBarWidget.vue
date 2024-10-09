<template>
  <div class="widget progressbar-widget">
    <div class="widget-header">
      <span class="widget-title">{{ title }}</span>
      <div class="widget-controls">
        <button class="control-button" @click="removeWidget">
          <FontAwesomeIcon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>
    <div class="widget-content">
      <div class="progress-info">
        <span>{{ progress }}%</span>
        <input type="range" min="0" max="100" v-model.number="progress" />
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <input type="text" v-model="title" placeholder="タイトルを入力" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove"]);

function removeWidget() {
  emit("remove", props.id);
}

const progress = ref(0);
const title = ref("進捗バー");

watch([progress, title], () => {
  // 必要に応じてローカルストレージに保存
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.progressbar-widget {
  .progress-info {
    display: flex;
    align-items: center;
    gap: $spacing-unit;
    margin-bottom: $spacing-unit;

    input[type="range"] {
      flex: 1;
    }
  }

  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: color.adjust($background-color, $lightness: 10%);
    border-radius: $border-radius-base;
    overflow: hidden;
    margin-bottom: $spacing-unit;

    .progress-fill {
      height: 100%;
      background-color: $primary-color;
    }
  }

  input[type="text"] {
    width: 100%;
    padding: calc($spacing-unit / 2);
    border: 1px solid color.adjust($text-color, $lightness: 60%);
    border-radius: $border-radius-base;
  }
}
</style>
