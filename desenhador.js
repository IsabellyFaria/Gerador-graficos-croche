const formulario = document.getElementById('form-receita');

let canvas = document.getElementById("crocheCanvas");
let ctx = canvas.getContext("2d"); // contexto 2D
function encontraRaio(numPontos, maiorPonto) {
  var circunferenciaMinima = numPontos * maiorPonto
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
function descobrePonto(tipo_ponto){
  var ponto;
  switch (tipo_ponto){
    case "corr":

    case "pbx":

    case "pb":
      ponto = new PontoBaixo()      
    case "mpa":

    case "pa":
            
  }  
  return ponto;
}
function encontraPai(carreiraAnterior, indice){
  if (carreiraAnterior.length > 0) {
    return carreiraAnterior[indice]
  }
}
function organizaArvore(receita) {
  linhas = receita.split(";");
  var receitaArvore = new Arvore();
  linhas.forEach(linha => {
    var pontos_por_separacao = linha.split(",");
    var carreiraAtual = [];
    var carreiraAnterior = [];
    var shell_pontos =[];
    var indice = 0;
    var shell = false;
    pontos_por_separacao.forEach(ponto_sp => {
      var conjunto_ponto = ponto_sp.slit(" ");
      var numero = int(conjunto_ponto[0]);
      var tipo_ponto = conjunto_ponto[1];
      //descobre pai
      var pai;
      if (len(carreiraAnterior)>0){
        pai = encontraPai(carreiraAnterior, indice);
      }else{
        pai = null
      }    
      if("(" in tipo_ponto){
        shell = true;
        indice =+1;
      }else if(")" in tipo_ponto){
        shell = false;
        
      }else{
        if(shell){
          var shell_ponto = descobrePonto(ponto_sp);
          carreiraAtual.push(ponto)
          shell_pontos.push();
          var contador = 0;
          while(contador < numero){
            receitaArvore.adicionaNo(ponto,encontraPai(carreiraAnterior, indice))
            contador=+1;
          }
        }else{
          var ponto = descobrePonto(ponto_sp);
          carreiraAtual.push(ponto)
          var contador = 0;
          while(contador < numero){
            receitaArvore.adicionaNo(ponto,encontraPai(carreiraAnterior, indice))
            indice=+1;
            contador=+1;
          }
          
        }
      }
    });
  });
  return receitaArvore[0]
}
function desenhaArvore(arvore){

}
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // impede o envio tradicional
  // Pega valor da receita
  const receita = formulario.elements['receita'].value;
  var arvore = organizaArvore(receita)
  
});