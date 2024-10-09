<template>
  <div class="widget clock-widget">
    <div class="widget-header">
      <span class="widget-title">時計</span>
      <div class="widget-controls">
        <button class="control-button" @click="removeWidget">
          <FontAwesomeIcon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>
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

const emit = defineEmits(["remove"]);

const time = ref(new Date());

const formattedTime = ref("");

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
  }
}
</style>
