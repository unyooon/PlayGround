<template>
  <div class="widget memo-widget">
    <div class="widget-header">
      <span class="widget-title">メモ</span>
      <div class="widget-controls">
        <button class="control-button" @click="removeWidget">
          <FontAwesomeIcon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>
    <div class="widget-content">
      <textarea v-model="memoContent" placeholder="ここにメモを入力"></textarea>
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

const memoContent = ref(localStorage.getItem(`memo-${props.id}`) || "");

watch(memoContent, (newValue) => {
  localStorage.setItem(`memo-${props.id}`, newValue);
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.memo-widget {
  textarea {
    width: 100%;
    height: 200px;
    padding: $spacing-unit;
    border: 1px solid color.adjust($text-color, $lightness: 60%);
    border-radius: $border-radius-base;
    resize: none;
  }
}
</style>
