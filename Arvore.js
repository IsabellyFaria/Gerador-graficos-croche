class No{
    constructor(valor){
        this.valor=valor;
        this.primogenito = null;
        this.proxIrmao = null;
        this.pai=null
    }
}
class Arvore{
    constructor(){
        this.raiz=null
    }
    criaNo(valor){
        var novoNo = new No(valor);
        if (this.raiz==null){
            this.raiz = novoNo
        }
        return novoNo
    }
    adicionaNo(valor,pai=null){
        var novoNo = criaNo(valor)
        if(pai){
            if(!pai.primogenito){
                pai.primogenito
            }
        }
    }
}