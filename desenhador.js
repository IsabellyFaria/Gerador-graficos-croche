const formulario = document.getElementById('form-receita');
let canvas = document.getElementById("crocheCanvas");
let ctx = canvas.getContext("2d"); // contexto 2D
function circuloMagico(){
  ctx.beginPath();
  ctx.arc(150, 300, 4, 0, 2 * Math.PI); // x, y, raio, ângulo inicial, final
  ctx.stroke(); // borda
}
circuloMagico()
function organizaFila(receita){
  var instrucoes_receita=[]
  var linhas_receita = receita.split(";").map(item => item.trim()).filter(item => item !== "");
  linhas_receita.forEach(linha => {
      grupo_pontos_receita = linha.split(",").map(item => item.trim()).filter(item => item !== "")
      instrucoes_receita.push(grupo_pontos_receita)
    });
    return instrucoes_receita
}
function organizaArvore(receita){
  
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // impede o envio tradicional
  // Pega valor da receita
  const receita = formulario.elements['receita'].value;
  // Organiza os dados numa lista
  var instrucoes_receita=organizaDados(receita)
  // Inicia um foreach para percorrer cada linha
  
});
