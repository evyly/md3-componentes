class MdharmonySwitch extends HTMLElement {
  static get observedAttributes() {
    return ['marcado', 'desativado'];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._montar();
    }
    this._atualizar();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._atualizar();
  }

  _montar() {
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
          background-color: var(--md-sys-color-surface-variant);
          border: 2px solid var(--md-sys-color-outline);
          border-radius: 16px;
          box-sizing: border-box;
          transition: background-color var(--md-motion-duration) linear,
                      border-color var(--md-motion-duration) linear;
          z-index: 1;
        }
        .marcador {
          position: absolute;
          left: 6px;
          top: 50%;
          width: 16px;
          height: 16px;
          transform: translateY(-50%);
          background-color: var(--md-sys-color-outline);
          border-radius: 100px;
          z-index: 3;
          transition:
            left var(--md-motion-duration) var(--md-motion-easing-expressive),
            width var(--md-motion-duration) var(--md-motion-easing-stretch),
            height var(--md-motion-duration) var(--md-motion-easing-stretch),
            background-color var(--md-motion-duration) linear;
          transform-origin: center left;
        }
        input:checked ~ .trilha {
          background-color: var(--md-sys-color-primary);
          border-color: var(--md-sys-color-primary);
        }
        input:checked ~ .marcador {
          left: calc(100% - 24px - 4px);
          width: 24px;
          height: 24px;
          background-color: var(--md-sys-color-on-primary);
          transform-origin: center right;
        }
        input:active ~ .marcador {
          width: 28px;
        }
        input:focus-visible ~ .trilha {
          outline: 2px solid var(--md-sys-color-primary);
          outline-offset: 2px;
        }
      </style>
      <label class="interruptor">
        <input type="checkbox" role="switch">
        <span class="trilha"></span>
        <span class="marcador"></span>
      </label>
    `;

    const entrada = this.shadowRoot.querySelector('input');

    entrada.addEventListener('change', () => {
      this._sincronizando = true;
      if (entrada.checked) {
        this.setAttribute('marcado', '');
      } else {
        this.removeAttribute('marcado');
      }
      this._sincronizando = false;
      this.dispatchEvent(new Event('mudanca', { bubbles: true }));
    });
  }

  _atualizar() {
    const entrada = this.shadowRoot?.querySelector('input');
    if (!entrada) return;

    const marcado = this.hasAttribute('marcado');
    const desativado = this.hasAttribute('desativado');

    entrada.checked = marcado;
    entrada.disabled = desativado;
    entrada.setAttribute('aria-checked', String(marcado));
  }
}

customElements.define('mdharmony-switch', MdharmonySwitch);
