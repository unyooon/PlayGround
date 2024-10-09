<template>
  <div class="editable-title">
    <span v-if="!isEditing" @click="startEditing" class="title-text">
      {{ title }}
    </span>
    <input
      v-if="isEditing"
      type="text"
      v-model="localTitle"
      ref="titleInput"
      @blur="finishEditing"
      class="title-input"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String, // 親コンポーネントから受け取る初期タイトル
});

const emit = defineEmits(["updateTitle"]);

const isEditing = ref(false);
const localTitle = ref(props.title);
const titleInput = ref<HTMLInputElement | null>(null);

watch(
  () => props.title,
  (newVal) => {
    localTitle.value = newVal;
  }
);

function startEditing() {
  isEditing.value = true;
  nextTick(() => {
    // DOM 更新後にフォーカスを当てる
    if (titleInput.value) {
      titleInput.value.focus();
    }
  });
}

function finishEditing() {
  isEditing.value = false;
  emit("updateTitle", localTitle.value); // タイトル変更を親に通知
}
</script>

<style scoped lang="scss">
.editable-title {
  display: flex;
  align-items: center;
  gap: 8px;

  .title-text {
    font-weight: bold;
    cursor: pointer;
    font-family: "Montserrat", sans-serif; // モダンなフォントに変更
    color: #2c3e50;
    transition: color 0.3s ease;
    padding-top: 4px;
    padding-left: 4px;
  }

  .title-input {
    border: none;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: inherit;
    background: rgba(255, 255, 255, 0.8); // 透明感のある背景
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // シャドウを追加
    transition: box-shadow 0.3s ease, background 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); // フォーカス時のシャドウを強調
      background: rgba(255, 255, 255, 1); // フォーカス時の背景色を変更
    }
  }
}
</style>
