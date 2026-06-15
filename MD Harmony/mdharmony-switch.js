class MdharmonySwitch extends HTMLElement {
  static get observedAttributes() {
    return ['marcado', 'desativado'];
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._render();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  _render() {
    const marcado = this.hasAttribute('marcado');
    const desativado = this.hasAttribute('desativado');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          position: relative;
          width: 52px;
          height: 32px;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          --cor-primaria: #6750A4;
          --cor-sobre-primaria: #FFFFFF;
          --cor-variante-superficie: #E7E0EC;
          --cor-contorno: #79747E;
          --duracao-movimento: 350ms;
          --curva-movimento-expressivo: cubic-bezier(0.34, 1.56, 0.64, 1);
          --curva-movimento-esticado: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        :host([desativado]) {
          cursor: not-allowed;
          opacity: 0.38;
        }

        .interruptor {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          margin: 0;
          cursor: pointer;
          z-index: 2;
        }

        :host([desativado]) input {
          cursor: not-allowed;
        }

        .trilha {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--cor-variante-superficie);
          border: 2px solid var(--cor-contorno);
          border-radius: 16px;
          box-sizing: border-box;
          transition: background-color var(--duracao-movimento) linear,
                      border-color var(--duracao-movimento) linear;
          z-index: 1;
        }

        .marcador {
          position: absolute;
          left: 6px;
          top: 50%;
          width: 16px;
          height: 16px;
          transform: translateY(-50%);
          background-color: var(--cor-contorno);
          border-radius: 100px;
          z-index: 3;
          transition:
            left var(--duracao-movimento) var(--curva-movimento-expressivo),
            width var(--duracao-movimento) var(--curva-movimento-esticado),
            height var(--duracao-movimento) var(--curva-movimento-esticado),
            background-color var(--duracao-movimento) linear;
          transform-origin: center left;
        }

        input:checked ~ .trilha {
          background-color: var(--cor-primaria);
          border-color: var(--cor-primaria);
        }

        input:checked ~ .marcador {
          left: calc(100% - 24px - 4px);
          width: 24px;
          height: 24px;
          background-color: var(--cor-sobre-primaria);
          transform-origin: center right;
        }

        input:active ~ .marcador {
          width: 28px;
        }

        input:focus-visible ~ .trilha {
          outline: 2px solid var(--cor-primaria);
          outline-offset: 2px;
        }
      </style>
      <label class="interruptor">
        <input type="checkbox" role="switch" aria-checked="${marcado}" ${marcado ? 'checked' : ''} ${desativado ? 'disabled' : ''}>
        <span class="trilha"></span>
        <span class="marcador"></span>
      </label>
    `;

    const entrada = this.shadowRoot.querySelector('input');
    entrada.addEventListener('change', () => {
      if (entrada.checked) {
        this.setAttribute('marcado', '');
      } else {
        this.removeAttribute('marcado');
      }
      this.dispatchEvent(new Event('mudanca'));
    });
  }
}

customElements.define('mdharmony-switch', MdharmonySwitch);