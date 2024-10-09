<template>
  <div class="widget memo-widget">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
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
const title = ref("メモ");

watch(memoContent, (newValue) => {
  localStorage.setItem(`memo-${props.id}`, newValue);
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.memo-widget {
  background-color: #ffffff; // 白を基調とした背景色
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  textarea {
    width: 100%;
    height: 100%;
    padding: $spacing-unit;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9; // 明るい背景色
    font-family: "Roboto", sans-serif; // モダンなフォント
    transition: box-shadow 0.3s, border-color 0.3s;

    &:focus {
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
      border-color: #007bff; // フォーカス時のボーダー色を変更
      outline: none;
    }
  }
}
</style>
