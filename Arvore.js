class No{
    constructor(valor){
        this.valor=valor;
        this.primogenito = null;
        this.proxIrmao = null;
        this.pai=null;
    }
}
class Arvore{
    constructor(){
        this.raiz=null;
    }
    criaNo(valor){
        var novoNo = new No(valor);
        if (this.raiz==null){
            this.raiz = novoNo;
        }
        return novoNo;
    }
    adicionaNo(valor,pai=null){
        var novoNo = criaNo(valor);
        var primogenito = pai.primogenito;
        if(pai){
            if(primogenito == null){
                pai.primogenito = novoNo;
            }else if(primogenito.proxIrmao == null){
                primogenito.proxIrmao = novoNo;
            }else{
                var ultimoIrmao = primogenito.proxIrmao;
                while(ultimoIrmao.proxIrmao != null){
                    ultimoIrmao = ultimoIrmao.proxIrmao;
                }
                ultimoIrmao.proxIrmao= novoNo;
            }
        }
    }
    getRaiz(){
        return this.raiz;
    }
    getPrimogenito(no){
        return no.primogenito
    }
    getProxIrmao(no){
        return no.proxIrmao
    }
}