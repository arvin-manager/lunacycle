(function () {
  var STORAGE_KEY = "lc-lang";
  var SUPPORTED = ["zh", "zh-TW", "ja", "ko", "en"];
  var BUTTON_LABEL = { zh: "中文", "zh-TW": "繁體中文", ja: "日本語", ko: "한국어", en: "EN" };
  var HTML_LANG = { zh: "zh-CN", "zh-TW": "zh-TW", ja: "ja", ko: "ko", en: "en" };
  var root = document.documentElement;

  // Map the browser's language list to one of SUPPORTED, falling back to English.
  function detectLang() {
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i].toLowerCase();
      if (l.indexOf("zh-tw") === 0 || l.indexOf("zh-hk") === 0 || l.indexOf("zh-hant") === 0) return "zh-TW";
      if (l.indexOf("zh") === 0) return "zh";
      if (l.indexOf("ja") === 0) return "ja";
      if (l.indexOf("ko") === 0) return "ko";
      if (l.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", HTML_LANG[lang]);
    var nextLang = SUPPORTED[(SUPPORTED.indexOf(lang) + 1) % SUPPORTED.length];
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.textContent = BUTTON_LABEL[nextLang];
    });
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable (e.g. privacy mode); fall back to default */
  }
  apply(stored && SUPPORTED.indexOf(stored) !== -1 ? stored : detectLang());

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-lang-toggle]");
    if (!btn) return;
    var current = root.getAttribute("data-lang");
    var idx = SUPPORTED.indexOf(current);
    var next = SUPPORTED[idx === -1 ? 0 : (idx + 1) % SUPPORTED.length];
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore persistence failure */
    }
  });
})();
