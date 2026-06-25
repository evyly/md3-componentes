(function(){
  const _css = `
    :host {
      display: block;
      width: 100%;
      position: relative;
      overflow: hidden;
      border-radius: 3px;
      background: #e8def8;
      height: 4px;
    }
    svg {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      overflow: visible;
    }
    .fundo {
      fill: #e8def8;
    }
    .preenchimento {
      fill: #6750a4;
    }
  `;

  const _svg = `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <clipPath id="clipOnda">
          <path id="caminhoOnda" d=""/>
        </clipPath>
      </defs>
      <rect class="fundo" x="0" y="0" width="100%" height="100%"/>
      <rect class="preenchimento" x="0" y="0" width="100%" height="100%" clip-path="url(#clipOnda)"/>
    </svg>
  `;

  class ProgressoLinear extends HTMLElement {
    static get observedAttributes() { return ['valor','maximo','variante','indeterminado']; }

    constructor() {
      super();
      this._sombra = this.attachShadow({ mode: 'open' });
      const estilo = document.createElement('style');
      estilo.textContent = _css;
      this._sombra.appendChild(estilo);
      const moldura = document.createElement('div');
      moldura.innerHTML = _svg;
      this._sombra.appendChild(moldura.firstElementChild);
      this._quadro = null;
      this._tempo = 0;
      this._porcentagem = 0;
    }

    connectedCallback() { this._iniciar(); }
    disconnectedCallback() { cancelAnimationFrame(this._quadro); }
    attributeChangedCallback() { this._atualizar(); }

    get valor() { return parseFloat(this.getAttribute('valor')) || 0; }
    set valor(v) { this.setAttribute('valor', v); }
    get maximo() { return parseFloat(this.getAttribute('maximo')) || 100; }
    set maximo(v) { this.setAttribute('maximo', v); }

    _atualizar() {
      const max = this.maximo;
      const val = this.valor;
      this._porcentagem = Math.min(Math.max(val / max, 0), 1);
    }

    _iniciar() {
      this._atualizar();
      const svg = this._sombra.querySelector('svg');
      const caminho = this._sombra.getElementById('caminhoOnda');
      const variante = this.getAttribute('variante');

      if (variante === 'wavy') {
        const animar = (ts) => {
          const w = svg.clientWidth || 480;
          const h = svg.clientHeight || 4;
          const pct = this._porcentagem;
          const larguraPreench = w * pct;

          const amp = h * 1.1;
          const freq = 2 * Math.PI / (w * 0.18);
          const fase = (ts / 300) * 2 * Math.PI;
          const pontos = [];
          const passos = Math.ceil(larguraPreench) + 2;

          for (let x = 0; x <= passos; x++) {
            const y = h / 2 + amp * Math.sin(freq * x + fase);
            pontos.push(x === 0 ? `M ${x},${y}` : `L ${x},${y}`);
          }

          pontos.push(`L ${larguraPreench},${h * 3}`);
          pontos.push(`L 0,${h * 3}`);
          pontos.push('Z');

          caminho.setAttribute('d', pontos.join(' '));
          this._quadro = requestAnimationFrame(animar);
        };
        this._quadro = requestAnimationFrame(animar);
      } else {
        const animar = () => {
          const w = svg.clientWidth || 480;
          const h = svg.clientHeight || 4;
          const pct = this._porcentagem;
          caminho.setAttribute('d', `M 0,0 L ${w * pct},0 L ${w * pct},${h} L 0,${h} Z`);
          this._quadro = requestAnimationFrame(animar);
        };
        this._quadro = requestAnimationFrame(animar);
      }
    }
  }

  customElements.define('progresso-linear', ProgressoLinear);
})();
