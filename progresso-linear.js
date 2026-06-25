(function () {
  const mapa = document.createElement('script');
  mapa.type = 'importmap';
  mapa.textContent = JSON.stringify({
    imports: {
      "tslib": "https://cdn.jsdelivr.net/npm/tslib@2.8.1/+esm",
      "lit": "https://cdn.jsdelivr.net/npm/lit@3.3.0/+esm",
      "lit/": "https://cdn.jsdelivr.net/npm/lit@3.3.0/",
      "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@3.3.0/+esm",
      "lit-html/directive.js": "https://cdn.jsdelivr.net/npm/lit-html@3.3.0/directive.js",
      "lit-html/directives/if-defined.js": "https://cdn.jsdelivr.net/npm/lit-html@3.3.0/directives/if-defined.js",
      "lit-html/directives/class-map.js": "https://cdn.jsdelivr.net/npm/lit-html@3.3.0/directives/class-map.js",
      "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.4/+esm",
      "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.4/",
      "@m3e/web/core": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core.js",
      "@m3e/web/core/a11y": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core-a11y.js",
      "@m3e/web/core/anchoring": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core-anchoring.js",
      "@m3e/web/core/bidi": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core-bidi.js",
      "@m3e/web/core/layout": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core-layout.js",
      "@m3e/web/core/platform": "https://cdn.jsdelivr.net/npm/@m3e/web/dist/core-platform.js"
    }
  });

  const modulo = document.createElement('script');
  modulo.type = 'module';
  modulo.textContent = 'import "https://cdn.jsdelivr.net/npm/@m3e/web/dist/progress-indicator.js";';

  if (document.currentScript) {
    document.currentScript.parentNode.insertBefore(mapa, document.currentScript);
    document.currentScript.parentNode.insertBefore(modulo, document.currentScript);
  } else {
    document.head.appendChild(mapa);
    document.head.appendChild(modulo);
  }
})();
