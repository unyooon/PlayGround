<template>
  <div :style="backgroundStyle">
    <!-- ウィジェットエリア -->
    <NuxtPage />
    <!-- 設定モーダル -->
    <SettingsModal
      v-if="isSettingsModalOpen"
      :is-open="isSettingsModalOpen"
      @close="isSettingsModalOpen = false"
      @updateSettings="updateSettings"
    />
    <!-- ウィジェット追加パネル -->
    <WidgetAddPanel
      v-if="isWidgetPanelOpen"
      :is-open="isWidgetPanelOpen"
      @close="isWidgetPanelOpen = false"
      @addWidget="addWidget"
    />
    <!-- 設定ボタン -->
    <button class="settings-button theme" @click="isSettingsModalOpen = true">
      <FontAwesomeIcon :icon="['fas', 'cog']" />
    </button>
    <!-- ウィジェット追加ボタン -->
    <button class="widget-add-button theme" @click="isWidgetPanelOpen = true">
      <FontAwesomeIcon :icon="['fas', 'plus']" />
    </button>
    <!-- ウィジェット削除 -->
    <button class="widget-delete-button theme" @click="clearWidgets()">
      <FontAwesomeIcon :icon="['fas', 'trash']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useWidgetsStore, useSettingsStore } from "~/store";

import SettingsModal from "@/components/SettingsModal.vue";
import WidgetAddPanel from "@/components/WidgetAddPanel.vue";

import type { WidgetName } from "~/store/widget";
import type { Settings } from "~/store/settings";

const isSettingsModalOpen = ref(false);
const isWidgetPanelOpen = ref(false);

const widgetStore = useWidgetsStore();
const settingsStore = useSettingsStore();

function updateSettings(settings: Settings) {
  settingsStore.updateSettings(settings);
}

function addWidget(
  widgetName: WidgetName,
  size: { width: number; height: number }
) {
  widgetStore.addWidget({ name: widgetName, size });
  isWidgetPanelOpen.value = false;
}

function clearWidgets() {
  widgetStore.clearWidget();
}

const backgroundStyle = computed(() => {
  const backgroundImage = settingsStore.backgroundImage;
  return backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }
    : { backgroundColor: "#F8F8FF" };
});

window.addEventListener("beforeunload", () => {
  widgetStore.saveWidgets();
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/assets/styles/variables.scss";

.settings-button,
.widget-add-button,
.widget-delete-button {
  position: fixed;
  bottom: calc($spacing-unit * 2);
  width: 50px;
  height: 50px;
  background-color: var(--theme-color);
  color: $white-color;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--theme-color-dark);
  }
}

.settings-button {
  right: calc($spacing-unit * 2);
}

.widget-add-button {
  right: calc($spacing-unit * 2 + 120px);
}

.widget-delete-button {
  right: calc($spacing-unit * 2 + 60px);
}
</style>
