(function () {
  var STORAGE_KEY = "lc-lang";
  var root = document.documentElement;

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.textContent = lang === "zh" ? "EN" : "中文";
    });
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable (e.g. privacy mode); fall back to default */
  }
  apply(stored === "en" ? "en" : "zh");

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-lang-toggle]");
    if (!btn) return;
    var current = root.getAttribute("data-lang") === "en" ? "en" : "zh";
    var next = current === "zh" ? "en" : "zh";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore persistence failure */
    }
  });
})();
