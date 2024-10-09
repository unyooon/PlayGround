import { defineNuxtPlugin } from "#app";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Font AwesomeのCSSを自動追加しない
config.autoAddCss = false;

// 必要なアイコンをインポート
import {
  faPlus,
  faCog,
  faQuestionCircle,
  faClock,
  faCalendarAlt,
  faTasks,
  faStickyNote,
  faChartLine,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// アイコンをライブラリに追加
library.add(
  faPlus,
  faCog,
  faQuestionCircle,
  faClock,
  faCalendarAlt,
  faTasks,
  faStickyNote,
  faChartLine,
  faTimes
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
