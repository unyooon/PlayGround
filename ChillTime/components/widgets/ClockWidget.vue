<template>
  <div class="widget clock-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="time-display">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "update:title"]);

const time = ref(new Date());
const formattedTime = ref("");
const title = ref("時計");

let timer: NodeJS.Timeout;

function updateTime() {
  time.value = new Date();
  formattedTime.value = time.value.toLocaleTimeString();
}

function removeWidget() {
  emit("remove", props.id);
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.clock-widget {
  .time-display {
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: "Roboto", sans-serif; // モダンなフォントに変更
  }
}
</style>
