const formulario = document.getElementById('form-receita');

let canvas = document.getElementById("crocheCanvas");
let ctx = canvas.getContext("2d"); // contexto 2D
function encontraRaio(pontos, maiorPonto) {
  var circunferenciaMinima = len(pontos) * maiorPonto
  var raio = Math.ceil(circunferenciaMinima / (2 * Math.PI))
  return raio
}
function pontosCircunferencia(cx, cy, r, n) {
  let pontos = [];
  for (let k = 0; k < n; k++) {
    let theta = (2 * Math.PI / n) * k;
    let x = cx + r * Math.cos(theta);
    let y = cy + r * Math.sin(theta);
    pontos.push({ x, y, theta });
  }
  return pontos;
}
function pontosArco() { }
function adicionaPontoCircunferencia(cx, cy, raio, nPontos) {
  const pontos = pontosCircunferencia(cx, cy, raio, nPontos);
  pontos.forEach(p => {
    pontoBaixo(p.x, p.y, p.theta);
  });
}
function distribuirPontosEmArco(pontoBase, quantidade, raio = 40, abertura = Math.PI / 3) {
  const pontos = [];

  if (quantidade === 1) {
    // apenas um: segue alinhado com o ângulo do ponto base
    const x = pontoBase.x + Math.cos(pontoBase.angulo) * raio;
    const y = pontoBase.y + Math.sin(pontoBase.angulo) * raio;
    pontos.push({ x, y, angulo: pontoBase.angulo });
    return pontos;
  }

  // vários: distribui em arco
  const inicio = pontoBase.angulo - abertura / 2;
  const passo = abertura / (quantidade - 1);

  for (let i = 0; i < quantidade; i++) {
    const ang = inicio + passo * i;
    const x = pontoBase.x + Math.cos(ang) * raio;
    const y = pontoBase.y + Math.sin(ang) * raio;
    pontos.push({ x, y, angulo: ang });
  }

  return pontos;
}
function descobrePonto(ponto){
  switch (tipo_ponto){
    case "corr":

    case "pbx":

    case "pb":
            
    case "mpa":

    case "pa":
            
  }  
}
function organizaArvore(receita) {
  linhas = receita.split(";");
  var receitaArvore = new Arvore();
  linhas.forEach(linha => {
    var pontos_por_separacao = linha.split(",");
    pontos_por_separacao.forEach(ponto_sp => {
      var conjunto_ponto = ponto_sp.slit(" ");
      var numero = int(conjunto_ponto[0]);
      var tipo_ponto = conjunto_ponto[1];
      if("(" in tipo_ponto){

      }else{
        
      }
      

    });
  });
}
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // impede o envio tradicional
  // Pega valor da receita
  const receita = formulario.elements['receita'].value;
  var arvore = organizaArvore(receita)

});