class No {
    constructor(valor) {
        this.valor = valor;
        this.primogenito = null;
        this.proxIrmao = null;
        this.pai = null;
    }
}
class Arvore {
    constructor() {
        this.raiz = null;
    }
    criaNo(valor) {
        var novoNo = new No(valor);
        if (this.raiz == null) {
            this.raiz = novoNo;
        }
        return novoNo;
    }
    adicionaNo(valor, pai = null) {
    if (!valor) {
        console.warn("Tentativa de adicionar nó sem valor!");
        return null;
    }
    const novoNo = this.criaNo(valor);
    if (pai) {
        if (!pai.primogenito) {
            pai.primogenito = novoNo;
        } else {
            let irmao = pai.primogenito;
            while (irmao.proxIrmao) {
                irmao = irmao.proxIrmao;
            }
            irmao.proxIrmao = novoNo;
        }
    }
    return novoNo;
}
    getRaiz() {
        return this.raiz;
    }
    getPrimogenito(no) {
        return no.primogenito
    }
    getProxIrmao(no) {
        return no.proxIrmao
    }
    
}