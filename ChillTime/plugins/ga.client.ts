export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV !== "production") return;

  const router = useRouter();

  /*
   ** Google Analytics のスクリプトを挿入
   */
  (function (
    i: any,
    s: Document,
    o: string,
    g: string,
    r: string,
    a?: HTMLScriptElement,
    m?: Element
  ) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = Date.now());
    (a = s.createElement(o) as HTMLScriptElement),
      (m = s.getElementsByTagName(o)[0]);
    if (a) {
      a.async = true;
      a.src = g;
    }
    if (m && m.parentNode) {
      m.parentNode.insertBefore(a, m);
    }
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );

  const ga = (window as any).ga;
  ga("create", "G-H7K48HGGER", "auto"); // 'G-XXXXXXXXXX' を取得したIDに置き換える

  /*
   ** ルーティングごとに Google Analytics にページビューを送信
   */
  router.afterEach((to) => {
    ga("set", "page", to.fullPath);
    ga("send", "pageview");
  });
});
