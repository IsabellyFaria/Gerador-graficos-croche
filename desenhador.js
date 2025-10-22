const formulario = document.getElementById('form-receita');
let canvas = document.getElementById("crocheCanvas");
let ctx = canvas.getContext("2d");
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;

function encontraRaio(numPontos, maiorPonto = 5) {
  const circunferenciaMinima = numPontos * maiorPonto;
  return Math.ceil(circunferenciaMinima / (2 * Math.PI));
}

function pontosCircunferencia(cx, cy, r, n) {
  const pontos = [];
  for (let k = 0; k < n; k++) {
    const theta = (2 * Math.PI / n) * k;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    pontos.push({ x, y, theta });
  }
  return pontos;
}

function descobrePonto(tipo_ponto) {
  if (!tipo_ponto) return null;
  const tp = tipo_ponto.trim().toLowerCase().replace("á", "a");
  switch (tp) {
    case "circulo-magico":
      return new CirculoMagico();
    case "pb":
      return new PontoBaixo();
    default:
      console.warn("Tipo de ponto desconhecido:", tipo_ponto);
      return null;
  }
}

function encontraPai(carreiraAnterior, indice) {
  return carreiraAnterior[indice] || null;
}

function organizaArvore(receita) {
  const linhas = receita.split(";");
  const arvore = new Arvore();
  let carreiraAnterior = [];

  linhas.forEach(linha => {
    if (!linha.trim()) return;

    const pontos_por_separacao = linha.split(",");
    let carreiraAtual = [];
    let shell = false;
    let shell_pontos = [];
    let shellPai = null;
    let indice = 0;

    pontos_por_separacao.forEach(ponto_sp => {
      let segmento = ponto_sp.trim();
      if (!segmento) return;

      // Detecta início ou fim do shell
      const isShellStart = segmento.includes("(");
      const isShellEnd = segmento.includes(")");

      // Remove '(' e ')' para processar o tipo corretamente
      segmento = segmento.replace(/[()]/g, "").trim();

      const conjunto = segmento.split(" ");
      const numero = parseInt(conjunto[0]);
      const tipo_ponto_raw = conjunto.slice(1).join(" ");
      if (!tipo_ponto_raw) return;

      // Início do shell
      if (isShellStart) {
        shell = true;
        shell_pontos = [];
        shellPai = carreiraAnterior[indice] || arvore.raiz;
      }

      // Criação dos pontos
      for (let i = 0; i < numero; i++) {
        const ponto = descobrePonto(tipo_ponto_raw);
        if (!arvore.raiz) {
          const raizNo = new No(ponto);
          arvore.raiz = raizNo;
          carreiraAtual.push(raizNo);
        } else if (shell) {
          shell_pontos.push(ponto);
        } else {
          const pai = carreiraAnterior[indice] || arvore.raiz;
          const novoNo = arvore.adicionaNo(ponto, pai);
          carreiraAtual.push(novoNo);
        }
      }

      // Fim do shell
      if (isShellEnd) {
        shell = false;
        shell_pontos.forEach(ponto => {
          const novoNo = arvore.adicionaNo(ponto, shellPai);
          carreiraAtual.push(novoNo);
        });
        shell_pontos = [];
        indice += 1; // agora incrementa índice do pai
      } else if (!shell) {
        indice += 1;
      }
    });

    carreiraAnterior = carreiraAtual;
  });

  return arvore.getRaiz();
}
// Ajuste em rotacionar (garanta que esteja assim)
Ponto.prototype.rotacionar = function (ctx) {
  ctx.save();
  ctx.translate(this.Cx, this.Cy);
  ctx.rotate(this.angulo); // angulo já vem como "voltado pra fora"
  ctx.strokeStyle = this.cor;
  this.desenhar(ctx);
  ctx.restore();
};

// Nova versão de desenhaArvore: percorre nó-a-nó, filhos em torno do próprio nó
function desenhaArvore(no, ctx, cx = centroX, cy = centroY, anguloBase = 0, nivel = 0, debug = false) {
  if (!no || !no.valor) return;

  const ponto = no.valor;

  // define posição e ângulo do nó atual
  ponto.setXY(cx, cy);
  ponto.setAngulo(anguloBase + Math.PI / 2); // ponto "olhando" radialmente pra fora
  ponto.rotacionar(ctx);

  // opcional: marca o centro do nó para depurar
  if (debug) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3);
    ctx.restore();
  }

  // processa filhos um a um
  let filho = no.primogenito;
  if (!filho) return;

  // conta filhos do pai atual
  let contador = 0;
  let tmp = filho;
  while (tmp) { contador++; tmp = tmp.proxIrmao; }

  // raio relativo ao pai
  let raio = encontraRaio(contador, filho.valor.raio || 5) + 18;
  if (contador >= 3) raio += 10; // mais espaço para filhos >=3

  // cálculo de ângulos
  let anguloFilhoInicial, anguloEntre;

  if (contador === 1) {
    anguloFilhoInicial = anguloBase;
    anguloEntre = 0;
  } else if (nivel === 0) {
    // primeiro nível: círculo completo
    anguloEntre = (2 * Math.PI) / contador;
    anguloFilhoInicial = 0; // começa do topo
  } else {
    // níveis >0: leque limitado
    let spanPorFilho = 0.6;
    if (contador === 3) spanPorFilho = 0.9; // leque maior para 3 filhos
    else if (contador > 3) spanPorFilho = 0.7; // ajuste para mais filhos
    const span = Math.min(Math.PI, (contador - 1) * spanPorFilho);
    anguloEntre = span / (contador - 1);
    anguloFilhoInicial = anguloBase - span / 2;
  }

  // itera filhos
  let i = 0;
  let f = filho;
  while (f) {
    const anguloRelativo = anguloFilhoInicial + i * anguloEntre;
    const xFilho = cx + raio * Math.cos(anguloRelativo);
    const yFilho = cy + raio * Math.sin(anguloRelativo);

    // linha de debug opcional
    if (debug) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(xFilho, yFilho);
      ctx.strokeStyle = "rgba(100,100,100,0.3)";
      ctx.stroke();
      ctx.restore();
    }

    // chama recursivamente
    desenhaArvore(f, ctx, xFilho, yFilho, anguloRelativo, nivel + 1, debug);

    f = f.proxIrmao;
    i++;
  }
}
function limparCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  const receita = formulario.elements['receita'].value;
  const arvore = organizaArvore(receita);
  printArvore(arvore);
  limparCanvas(ctx)
  desenhaArvore(arvore, ctx);
});
document.getElementById('form-btn-clear').addEventListener('click', function() {
  limparCanvas(ctx);
});

function printArvore(no, nivel = 0) {
  if (!no) return;

  const prefixo = "  ".repeat(nivel);
  console.log(`${prefixo}- Nó: ${no.valor.constructor.name} (Raio: ${no.valor.raio || 0})`);

  let filho = no.primogenito;
  while (filho) {
    printArvore(filho, nivel + 1);
    filho = filho.proxIrmao;
  }
}
