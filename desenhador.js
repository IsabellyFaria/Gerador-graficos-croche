const formulario = document.getElementById('form-receita');
let canvas = document.getElementById("crocheCanvas");
let ctx = canvas.getContext("2d"); // contexto 2D
function circuloMagico(raio){
  ctx.beginPath();
  ctx.arc(200, 300, raio, 0, 2 * Math.PI); // x, y, raio, ângulo inicial, final
  ctx.stroke(); // borda
}
circuloMagico(40)
function organizaFila(receita){
  var instrucoes_receita=[]
  var linhas_receita = receita.split(";").map(item => item.trim()).filter(item => item !== "");
  linhas_receita.forEach(linha => {
      grupo_pontos_receita = linha.split(",").map(item => item.trim()).filter(item => item !== "")
      instrucoes_receita.push(grupo_pontos_receita)
    });
    return instrucoes_receita
}
function pontoBaixo(){
  ctx.beginPath();
  //FAZ TRAÇO HORIZINTAL
  ctx.moveTo(500, 300);       // Inicia um ponto
  ctx.lineTo(515, 300);       // Desenha uma linha
  ctx.closePath();          // Fecha o caminho (opcional)
  ctx.stroke();             // Desenha o contorno
  ctx.fill();               // Preenche a forma
  //FAZ TRAÇO VERTICAL
  ctx.beginPath();
  ctx.moveTo(508, 307);       // Inicia um ponto
  ctx.lineTo(508, 293);       // Desenha uma linha
  ctx.closePath();          // Fecha o caminho (opcional)
  ctx.stroke();             // Desenha o contorno
  ctx.fill();               // Preenche a forma
}
pontoBaixo()
function organizaArvore(receita){
  
}
function encontraRaio(pontos,maiorPonto){
  var circunferenciaMinima = len(pontos)*maiorPonto
  var raio = Math.roof(circunferenciaMinima/(2*Math.PI))
  return raio
}
function pontosCircunferencia(cx, cy, r, n) {
    let pontos = [];
    for (let k = 0; k < n; k++) {
        let theta = (2 * Math.PI / n) * k;
        let x = cx + r * Math.cos(theta);
        let y = cy + r * Math.sin(theta);
        pontos.push({x, y});
    }
    return pontos;
}
function adicionaPontoCircunferencia(Cx,Cy,raio,pontos){
  //Divide a circunferencia em n pontos de mesma distancia
  var posicaoPontos = pontosCircunferencia(Cx,Cy,raio,len(pontos))
  posicaoPontos.forEach(cirPonto => {

  });

}
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // impede o envio tradicional
  // Pega valor da receita
  const receita = formulario.elements['receita'].value;
  // Organiza os dados numa lista
  var instrucoes_receita=organizaDados(receita)
  // Inicia um foreach para percorrer cada linha
  
});
