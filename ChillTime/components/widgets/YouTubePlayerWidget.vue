<template>
  <div class="widget youtube-widget" :id="id">
    <WidgetHeader
      :title="title"
      @remove="removeWidget"
      @update:title="(v) => (title = v)"
    />
    <div class="widget-content">
      <div class="input-group">
        <input
          type="text"
          v-model="videoUrl"
          placeholder="YouTubeのURLを入力"
          class="url-input"
          @keyup.enter="() => (isValidUrl ? addToQueue() : {})"
        />
        <button
          @click="addToQueue"
          class="queue-button"
          :disabled="!isValidUrl"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" />
        </button>
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%">
        <div class="control-button-group">
          <button
            @click="togglePlayPause"
            class="control-button"
            :disabled="videoQueue.length === 0"
          >
            <FontAwesomeIcon
              :icon="isPlaying ? ['fas', 'pause'] : ['fas', 'play']"
            />
          </button>
          <button
            @click="skipToNext"
            class="control-button"
            :disabled="videoQueue.length <= 1"
          >
            <FontAwesomeIcon :icon="['fas', 'forward']" />
          </button>
        </div>
        <button
          v-if="!isHiddenPlayer"
          @click="hiddenPlayer"
          class="control-button"
        >
          <FontAwesomeIcon :icon="['fas', 'eye-slash']" />
        </button>
        <button
          v-if="isHiddenPlayer"
          @click="showPlayer"
          class="control-button"
        >
          <FontAwesomeIcon :icon="['fas', 'eye']" />
        </button>
      </div>
      <div ref="playerContainer" class="player-container"></div>
      <ul v-show="videoQueue.length > 0" class="queue-list">
        <li
          v-for="(videoId, index) in videoQueue"
          :key="index"
          :class="{ playing: index === 0 && isPlaying }"
        >
          <FontAwesomeIcon
            v-if="index === 0 && isPlaying"
            :icon="['fas', 'play-circle']"
            class="playing-icon"
          />
          <div v-else class="playing-icon"></div>
          {{ videoId }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWidgetsStore } from "~/store/widget";

const widgetStore = useWidgetsStore();

const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(["remove", "updateOptions"]);

const widget = widgetStore.widgets.find((widget) => widget.id === props.id);
const defaultOptions = widget?.YouTubePlayerOptions || {
  videoUrls: [],
};

const title = ref("YouTube Player");
const videoUrl = ref("");
let player: YT.Player | null = null;
const playerContainer = ref<HTMLElement | null>(null);
const isPlaying = ref(false);
const videoQueue = ref<string[]>(defaultOptions.videoUrls);
const isHiddenPlayer = ref(false);

const isValidUrl = computed(() => {
  return extractVideoId(videoUrl.value) !== null;
});

function hiddenPlayer() {
  const iframeEl = document.getElementsByTagName("iframe")[0];
  if (iframeEl && !isHiddenPlayer.value) {
    iframeEl.style.width = "0";
    iframeEl.style.height = "0";
    iframeEl.style.opacity = "0";
    isHiddenPlayer.value = true;
  }

  updateOptions();
}

function showPlayer() {
  const iframeEl = document.getElementsByTagName("iframe")[0];
  if (iframeEl && isHiddenPlayer.value) {
    iframeEl.style.width = "100%";
    iframeEl.style.height = "100%";
    iframeEl.style.opacity = "1";
    isHiddenPlayer.value = false;
  }

  updateOptions();
}

function updateOptions() {
  emit("updateOptions", props.id, {
    YouTubePlayerOptions: {
      videoUrls: videoQueue.value,
    },
  });
}

function removeWidget() {
  if (player) {
    player.destroy();
    player = null;
  }
  emit("remove", props.id);
  resetState();
}

function resetState() {
  videoUrl.value = "";
  isPlaying.value = false;
  videoQueue.value = [];
}

function addToQueue() {
  videoQueue.value.push(videoUrl.value);
  videoUrl.value = "";
  updateOptions();
}

function playNextVideo() {
  if (videoQueue.value.length > 0 && player) {
    const nextVideoUrl = videoQueue.value.shift();
    if (nextVideoUrl) {
      player.loadVideoById(extractVideoId(nextVideoUrl));
      isPlaying.value = true;
    }
  }
}

function togglePlayPause() {
  if (player) {
    if (isPlaying.value) {
      player.pauseVideo();
    } else {
      if (videoQueue.value.length > 0) {
        if (player.getPlayerState() === YT.PlayerState.PAUSED) {
          player.playVideo();
        } else {
          const nextVideoUrl = videoQueue.value[0];
          player.loadVideoById(extractVideoId(nextVideoUrl));
        }
        isPlaying.value = true;
      }
    }
    isPlaying.value = !isPlaying.value;
  }
}

function skipToNext() {
  if (videoQueue.value.length > 1) {
    playNextVideo();
  }
}

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  );
  return match ? match[1] : null;
}

function onPlayerStateChange(event: YT.OnStateChangeEvent) {
  if (event.data === YT.PlayerState.ENDED) {
    playNextVideo();
  } else if (event.data === YT.PlayerState.PLAYING) {
    isPlaying.value = true;
  } else if (event.data === YT.PlayerState.PAUSED) {
    isPlaying.value = false;
  }
}

function onPlayerError(event: YT.OnErrorEvent) {
  console.error("Error occurred:", event.data);
}

onMounted(() => {
  if (
    !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
  ) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }

  // APIがロードされるまで待機
  const checkYTReady = setInterval(() => {
    if (window.YT && window.YT.Player) {
      clearInterval(checkYTReady);
      initializePlayer();
    }
  }, 100);
});

function initializePlayer() {
  if (playerContainer.value) {
    player = new YT.Player(playerContainer.value, {
      videoId: "",
      playerVars: { autoplay: 1, controls: 0 },
      events: {
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  } else {
    console.error("Player container is not available.");
  }
}

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
});
</script>

<style scoped lang="scss">
.youtube-widget {
  min-width: 400px;

  .widget-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .input-group {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
  }

  .control-button-group {
    display: flex;
    width: 100%;
    gap: 12px;
  }

  .url-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      box-shadow: 0 0 8px var(--theme-color);
    }
  }

  .queue-button {
    padding: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #218838;
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .control-button {
    padding: 12px 20px;
    background-color: var(--theme-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: var(--theme-color-dark);
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .player-container {
    width: 100%;
    background-color: #000;
    margin-top: 15px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .queue-list {
    width: 100%;
    margin-top: 15px;
    padding: 0;
    list-style: none;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    white-space: nowrap;
    overflow: hidden;

    li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out,
        margin-right 0.2s ease-in-out, opacity 0.3s ease-in-out;

      &:last-child {
        border-bottom: none;
      }

      &.playing {
        background-color: var(--theme-color-light-8);
        font-weight: bold;
      }

      .playing-icon {
        margin-right: 8px;
        color: var(--theme-color-dark);
      }
    }
  }
}
</style>
