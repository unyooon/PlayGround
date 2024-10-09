import { defineNuxtPlugin } from "#app";
import type { DirectiveBinding } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("draggable", {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      let startX: number;
      let startY: number;
      let initialLeft: number;
      let initialTop: number;
      let handle: HTMLElement | null = el;

      // ドラッグハンドルを指定
      if (binding.value && binding.value.handle) {
        handle = el.querySelector(binding.value.handle) as HTMLElement;
      }

      // ハンドルが見つからない場合はエラーを出力
      if (!handle) {
        console.error("ドラッグハンドルが見つかりませんでした。");
        return;
      }

      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        el.style.left = initialLeft + deltaX + "px";
        el.style.top = initialTop + deltaY + "px";
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // カーソルを「grab」に戻す
        handle!.style.cursor = "grab";

        // コールバック関数を呼び出す
        if (binding.value && binding.value.onDragend) {
          binding.value.onDragend({
            x: el.offsetLeft,
            y: el.offsetTop,
          });
        }
      };

      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();

        // マウスダウン時の位置を取得
        startX = e.clientX;
        startY = e.clientY;

        // 要素の初期位置を取得
        initialLeft = el.offsetLeft;
        initialTop = el.offsetTop;

        // カーソルを「grabbing」に変更
        handle!.style.cursor = "grabbing";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      // ハンドルにイベントリスナーを登録
      handle.style.cursor = "grab";
      handle.addEventListener("mousedown", onMouseDown);

      // 要素のスタイルを設定
      el.style.position = "absolute";
    },
  });
});
