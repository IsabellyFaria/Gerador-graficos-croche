const formulario = document.getElementById('form-receita');

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