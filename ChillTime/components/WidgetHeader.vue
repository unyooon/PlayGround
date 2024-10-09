<template>
  <div class="widget-grab-bar" />
  <div class="widget-header">
    <EditableTitle :title="title" @update-title="(v) => (localTitle = v)" />
    <div class="widget-controls">
      <button class="control-button" @click="remove">
        <FontAwesomeIcon :icon="['fas', 'times']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  title: String, // 初期タイトル
});

const emit = defineEmits(["update:title", "remove"]);

// タイトルを変更した際に親コンポーネントへ通知
const localTitle = ref(props.title);

function remove() {
  emit("remove");
}

watch(localTitle, (newTitle) => {
  emit("update:title", newTitle); // 親コンポーネントにタイトルの変更を通知
});
</script>
