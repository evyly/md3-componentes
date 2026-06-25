(function () {
  const folha = new CSSStyleSheet();
  folha.replaceSync(`
    :host {
      display: block;
      width: 100%;
      height: 4px;
      position: relative;
      overflow: hidden;
      border-radius: 2px;
      background: #e8def8;
    }
    .trilha {
      position: absolute;
      inset: 0;
      background: #e8def8;
    }
    .barra {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background: #6750a4;
      transition: width 0.04s linear;
      transform-origin: left center;
    }
    :host([variante="wavy"]) .barra {
      animation: ondulacao 0.6s linear infinite;
    }
    @keyframes ondulacao {
      0%   { border-radius: 0 2px 2px 0 / 0 50% 50% 0; }
      25%  { border-radius: 0 4px 4px 0 / 0 80% 80% 0; }
      50%  { border-radius: 0 2px 2px 0 / 0 50% 50% 0; }
      75%  { border-radius: 0 1px 1px 0 / 0 20% 20% 0; }
      100% { border-radius: 0 2px 2px 0 / 0 50% 50% 0; }
    }
    :host([indeterminado]) .barra {
      width: 40% !important;
      animation: deslizar 1.4s ease-in-out infinite;
    }
    @keyframes deslizar {
      0%   { left: -40%; }
      100% { left: 100%; }
    }
  `);

  class ProgressoLinear extends HTMLElement {
    static get observedAttributes() {
      return ['valor', 'maximo', 'variante', 'indeterminado'];
    }

    constructor() {
      super();
      this._sombra = this.attachShadow({ mode: 'open' });
      this._sombra.adoptedStyleSheets = [folha];

      this._trilha = document.createElement('div');
      this._trilha.className = 'trilha';

      this._barra = document.createElement('div');
      this._barra.className = 'barra';

      this._sombra.appendChild(this._trilha);
      this._sombra.appendChild(this._barra);
    }

    connectedCallback() {
      this._atualizar();
    }

    attributeChangedCallback() {
      this._atualizar();
    }

    get valor() {
      return parseFloat(this.getAttribute('valor')) || 0;
    }
    set valor(v) {
      this.setAttribute('valor', v);
    }

    get maximo() {
      return parseFloat(this.getAttribute('maximo')) || 100;
    }
    set maximo(v) {
      this.setAttribute('maximo', v);
    }

    _atualizar() {
      if (this.hasAttribute('indeterminado')) {
        this._barra.style.width = '';
        return;
      }
      const pct = Math.min(Math.max((this.valor / this.maximo) * 100, 0), 100);
      this._barra.style.width = pct + '%';
    }
  }

  customElements.define('progresso-linear', ProgressoLinear);
})();
