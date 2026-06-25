# Olá Vocês! :)

> Bem-vindos ao meu cantinho dos componentes MD3 Expressive!

**md3-componentes** · :)

Aqui eu guardo os Web Components que eu vou criando, tudo bem simples e pronto pra usar em qualquer projeto.
Sem trocentas linhas de código, sem instalar um monte de coisa. É só copiar o link e ser feliz!

---

## 🌊 Progress Indicator Wave Circular

Um indicador de progresso giratório com um efeito ondulado muito lindo!

```html
<script src="https://cdn.jsdelivr.net/gh/evyly/md3-componentes@bd9b058b492c3d4d400b72195f0d03fffad27e0c/md3-expressive-progress-indicator-wave-circular.js"></script>
<md3-expressive-progress-indicator-wave-circular></md3-expressive-progress-indicator-wave-circular>
```

**Customizando do meu jeito:**

```html
<style>
  .minha-cor {
    --cor-primaria: #FF4081;
    --cor-container-secundario: #880E4F;
  }
  .tamanho-gg {
    width: 6rem;
    height: 6rem;
  }
</style>
<md3-expressive-progress-indicator-wave-circular class="minha-cor tamanho-gg"></md3-expressive-progress-indicator-wave-circular>
```

---

## 💫 Loading Indicator

Aquele loading clássico do Material 3 Expressive Morph, com animação de morphing (inclusive, é meu favorito)

```html
<script src="https://cdn.jsdelivr.net/gh/evyly/md3-componentes@cbd0f6b230a2f5a781ba480a3056e04bb8808e53/md3-expressive-loading-indicator.js"></script>
<md3-expressive-loading-indicator></md3-expressive-loading-indicator>
```

**Variantes e cores:**

```html
<style>
  .teal {
    --m3e-loading-indicator-active-indicator-color: #00897B;
    --m3e-loading-indicator-contained-active-indicator-color: #004D40;
    --m3e-loading-indicator-contained-container-color: #B2DFDB;
  }
  .grande {
    --m3e-loading-indicator-size: 5rem;
    --m3e-loading-indicator-container-size: 6rem;
  }
</style>

<!-- Contido (tem o fundinho atrás) -->
<md3-expressive-loading-indicator class="teal grande" variant="contained"></md3-expressive-loading-indicator>

<!-- Solto (só a animação) -->
<md3-expressive-loading-indicator class="teal"></md3-expressive-loading-indicator>
```

---

## 🌀 Fundo Orgânico

Formas fluidas e animadas que flutuam pelo background. Perfeito pra dar vida e profundidade pro app, seguindo a linguagem MD3 Expressive.

```html
<script src="https://cdn.jsdelivr.net/gh/evyly/md3-componentes@31f0b400e6669d7c6b2fcd4dfb26d2dcbe99e575/fundo-organico.js"></script>
<fundo-organico></fundo-organico>
```

**Customizando do meu jeito:**

```html
<style>
  .fundo-rosa {
    color: #FF4081; /* Controla a cor principal da forma */
    opacity: 0.15; /* Controla a transparência */
  }
</style>

<!-- Velocidade lenta e tamanho maior -->
<fundo-organico class="fundo-rosa" largura="600" velocidade="lenta"></fundo-organico>

<!-- Velocidade média e tamanho padrão -->
<fundo-organico velocidade="media"></fundo-organico>
```

---

## 📊 Progress Indicator Linear Wavy

Uma barra de progresso linear com efeito ondulado, seguindo o estilo do M3E. Perfeita pra mostrar progresso de carregamento, uploads, etapas de formulário e afins!

```html
<script src="https://cdn.jsdelivr.net/gh/evyly/md3-componentes@dd39fc3552019fcebc85b1f40d2415c54a8a2022/progresso-linear.js"></script>
<m3e-linear-progress-indicator variant="wavy" value="0" max="100"></m3e-linear-progress-indicator>
```

**Exemplo animado com JS:**

```html
<script src="https://cdn.jsdelivr.net/gh/evyly/md3-componentes@dd39fc3552019fcebc85b1f40d2415c54a8a2022/progresso-linear.js"></script>

<m3e-linear-progress-indicator id="barra" variant="wavy" value="0" max="100" style="width: 480px;"></m3e-linear-progress-indicator>
<span id="pct">0%</span>
<button onclick="play()">▶ Play</button>

<script>
  const barra = document.getElementById('barra');
  const pct = document.getElementById('pct');
  let rodando = false;

  function play() {
    if (rodando) return;
    rodando = true;
    let v = 0;
    barra.value = 0;
    const passo = () => {
      v++;
      barra.value = v;
      pct.textContent = v + '%';
      if (v < 100) setTimeout(passo, 40);
      else rodando = false;
    };
    setTimeout(passo, 40);
  }
</script>
```

---

## 📝 Tabela de Variáveis CSS e Atributos

Pra estilizar, é só sobrescrever essas variáveis na classe que você criar! Pros componentes com atributos, dá pra passar direto na tag.

**Loading Indicator**

| Variável | O que faz | Padrão |
|---|---|---|
| `--m3e-loading-indicator-size` | Tamanho do indicador solto | `2.375rem` |
| `--m3e-loading-indicator-container-size` | Tamanho do indicador contido | `3rem` |
| `--m3e-loading-indicator-active-indicator-color` | Cor da animação (solto) | `#6750A4` |
| `--m3e-loading-indicator-contained-active-indicator-color` | Cor da animação (contido) | `#4F378B` |
| `--m3e-loading-indicator-contained-container-color` | Cor do fundinho (contido) | `#E8DEF8` |

**Progress Indicator Wave**

| Variável | O que faz | Padrão |
|---|---|---|
| `--cor-primaria` | Cor da ondinha principal | `#6750A4` |
| `--cor-container-secundario` | Cor da trilha de fundo | `#E8DEF8` |

**Fundo Orgânico**

| Atributo/Variável | O que faz | Padrão / Exemplo |
|---|---|---|
| Atributo: `largura` | Tamanho da forma orgânica | `500` |
| Atributo: `velocidade` | Velocidade da animação (`lenta`, `media`) | `media` |
| Propriedade CSS: `color` | Define a cor do SVG | Herdada do tema |
| Propriedade CSS: `opacity` | Controla a transparência da forma | `0.12` |

**Progress Indicator Linear Wavy**

| Atributo | O que faz | Padrão |
|---|---|---|
| `value` | Valor atual do progresso | `0` |
| `max` | Valor máximo | `100` |
| `variant` | Estilo da barra (`wavy`) | — |

---

Feito com carinho por **Kimberly Victória** 💜
