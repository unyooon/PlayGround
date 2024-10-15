<template>
  <div class="widget progressbar-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="progress-info">
        <span>{{ progress }}%</span>
      </div>
      <div class="progress-bar" @click="updateProgress">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "update:title"]);

function removeWidget() {
  emit("remove", props.id);
}

const progress = ref(5);
const title = ref("Progress Bar");

watch([progress, title], () => {
  // 必要に応じてローカルストレージに保存
});

const min = 0;
const max = 100;

// クリックした位置に応じて進捗を更新する関数
function updateProgress(event: MouseEvent) {
  const bar = event.currentTarget as HTMLElement;
  const rect = bar.getBoundingClientRect();
  const clickPosition = event.clientX - rect.left;
  const newProgress = Math.round((clickPosition / rect.width) * 100);
  progress.value = Math.max(min, Math.min(max, newProgress)); // 0〜100に制限
}
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.progressbar-widget {
  min-width: 320px;

  .progress-info {
    display: flex;
    align-items: center;
    gap: $spacing-unit;
    margin-bottom: $spacing-unit;
  }

  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: var(--theme-color-light);
    border-radius: $border-radius-base;
    overflow: hidden;
    margin-bottom: $spacing-unit;
    cursor: pointer;
    position: relative;

    .progress-fill {
      height: 100%;
      background-color: var(--theme-color-dark);
      transition: width 0.2s ease;
    }
  }
}
</style>
