<template>
  <div class="widget memo-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <textarea
        :value="memoContent"
        placeholder="Enter your memo here"
        @change="(e: Event) => updateMemo(e.target?.value || '')"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWidgetsStore } from "~/store/widget";
import type { WidgetOptions } from "~/store/widget";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "updateOptions"]);

const widgetStore = useWidgetsStore();

const memoContent = ref(
  widgetStore.widgets.find((widget) => widget.id === props.id)
    ?.MemoWidgetOptions?.text || ""
);
const title = ref("Memo");

const removeWidget = () => {
  emit("remove", props.id);
};

const updateMemo = (memo: string) => {
  memoContent.value = memo;

  const options: WidgetOptions = {
    MemoWidgetOptions: {
      text: memo,
    },
  };
  emit("updateOptions", props.id, options);
};
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
      outline: none;
    }
  }
}
</style>
