<template>
  <div class="widget youtube-widget">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <input
        type="text"
        v-model="videoUrl"
        placeholder="YouTubeのURLを入力"
        class="url-input"
        @blur="loadVideo"
      />
      <button
        @click="togglePlayPause"
        class="control-button"
        :disabled="!isValidUrl"
      >
        <FontAwesomeIcon
          :icon="isPlaying ? ['fas', 'pause'] : ['fas', 'play']"
        />
        {{ isPlaying ? "停止" : "再生" }}
      </button>
      <div ref="playerContainer" class="player-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "update:title"]);

const title = ref("YouTube Player");
const videoUrl = ref("");
let player: YT.Player | null = null;
const playerContainer = ref<HTMLElement | null>(null);
const isPlaying = ref(false);

const isValidUrl = computed(() => {
  return extractVideoId(videoUrl.value) !== null;
});

function removeWidget() {
  if (player) {
    player.destroy(); // プレイヤーを破棄
    player = null; // プレイヤーをnullにリセット
  }
  emit("remove", props.id);
  resetState(); // 状態をリセット
}

function resetState() {
  videoUrl.value = "";
  isPlaying.value = false;
}

function togglePlayPause() {
  if (player && isValidUrl.value) {
    if (isPlaying.value) {
      player.stopVideo();
    } else {
      player.playVideo();
    }
    isPlaying.value = !isPlaying.value;
  }
}

function loadVideo() {
  if (isValidUrl.value) {
    const videoId = extractVideoId(videoUrl.value);
    if (videoId && player) {
      player.loadVideoById(videoId);
      isPlaying.value = true;
    }
  } else {
    alert("無効なYouTubeのURLです。");
  }
}

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  );
  return match ? match[1] : null;
}

function onPlayerReady(event: YT.PlayerEvent) {
  console.log("Player is ready");
}

function onPlayerPlaybackQualityChange(event: YT.OnPlaybackQualityChangeEvent) {
  console.log("Playback quality changed to", event.data);
}

function onPlayerStateChange(event: YT.OnStateChangeEvent) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying.value = true;
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    isPlaying.value = false;
  }
  console.log("Player state changed to", event.data);
}

function onPlayerError(event: YT.OnErrorEvent) {
  console.error("Error occurred:", event.data);
}

onMounted(() => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    if (playerContainer.value) {
      player = new YT.Player(playerContainer.value, {
        videoId: "",
        playerVars: { autoplay: 1, controls: 0 },
        events: {
          onReady: onPlayerReady,
          onPlaybackQualityChange: onPlayerPlaybackQualityChange,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    } else {
      console.error("Player container is not available.");
    }
  };
});

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
});
</script>

<style scoped lang="scss">
.youtube-widget {
  .widget-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px; // ギャップを少し広げる
  }

  .url-input {
    width: 80%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
    }
  }

  .control-button {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .player-container {
    width: 100%;
    height: 390px;
    background-color: #000;
    margin-top: 15px; // マージンを少し広げる
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
