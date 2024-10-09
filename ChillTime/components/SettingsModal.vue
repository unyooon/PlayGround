<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <h2>設定</h2>
      <!-- 背景設定 -->
      <div class="setting-group">
        <label>背景画像のアップロード</label>
        <input type="file" @change="uploadBackground" />
      </div>
      <!-- テーマカラー選択 -->
      <div class="setting-group">
        <label>テーマカラー</label>
        <input
          :value="settings.themeColor"
          type="color"
          @change="changeColor"
        />
      </div>
      <!-- フォントサイズ設定 -->
      <div class="setting-group">
        <label>フォントサイズ</label>
        <input
          type="number"
          v-model.number="settings.fontSize"
          min="12"
          max="24"
        />
      </div>
      <!-- ボタン -->
      <div class="modal-actions">
        <button @click="saveSettings">保存</button>
        <button @click="closeModal">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { useSettingsStore } from "~/store";

const settingsStore = useSettingsStore();

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "updateSettings"]);

const settings = ref(settingsStore.$state);

function uploadBackground(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    // 背景画像のアップロード処理
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      // ストアやローカルストレージに保存、または親コンポーネントに伝達
      emit("updateSettings", { backgroundImage: imageData });
    };
    reader.readAsDataURL(file);
  }
}

function changeColor(event: Event) {
  const target = event.target as HTMLInputElement;
  settingsStore.updateSettings({ themeColor: target.value });
}

function saveSettings() {
  // 設定の保存処理
  emit("updateSettings", {
    backgroundImage: settings.value.backgroundImage,
    themeColor: settings.value.themeColor,
    fontSize: settings.value.fontSize,
  });
  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black-color, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index-modal;

  .modal-content {
    background-color: $white-color;
    padding: calc($spacing-unit * 2);
    border-radius: $border-radius-base;
    width: 80%;
    max-width: 600px;

    h2 {
      margin-bottom: calc($spacing-unit * 2);
    }

    .setting-group {
      margin-bottom: calc($spacing-unit * 2);

      label {
        display: block;
        margin-bottom: calc($spacing-unit / 2);
        font-weight: bold;
      }

      input[type="file"],
      input[type="color"],
      input[type="number"] {
        width: 100%;
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: $spacing-unit;

      button {
        padding: $spacing-unit calc($spacing-unit * 2);
        border: none;
        border-radius: $border-radius-base;
        cursor: pointer;

        &:first-child {
          background-color: var(--theme-color);
          color: $white-color;
        }

        &:last-child {
          background-color: var(--theme-color-light);
          color: $white-color;
        }
      }
    }
  }
}
</style>
