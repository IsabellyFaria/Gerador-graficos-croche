class Ponto {
    constructor(angulo = 0, cor = "black", raio = 5) {
        this.Cx = 0;
        this.Cy = 0;
        this.angulo = angulo
        this.cor = cor
        this.raio = raio
    }
    setXY(Cx, Cy) {
        this.Cx = Cx;
        this.Cy = Cy;
    }
    setAngulo(angulo) {
        this.angulo = angulo;
    }
    setRaio(raio) {
        this.raio = raio;
    }
    desenhar(ctx) { }
    rotacionar(ctx) {
        ctx.save();
        ctx.translate(this.Cx, this.Cy);
        ctx.rotate(this.angulo); // não soma PI/2 aqui, deixe o ângulo natural
        ctx.strokeStyle = this.cor;
        this.desenhar(ctx);
        ctx.restore();
    }

}
class PontoBaixo extends Ponto {
    desenhar(ctx) {
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.lineTo(7, 0);
        ctx.moveTo(0, -7);
        ctx.lineTo(0, 7);
        ctx.stroke();
    }
}
class CirculoMagico extends Ponto {
    desenhar(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.raio, 0, 2 * Math.PI); // <-- trocar Cx,Cy por 0,0
        ctx.stroke();
    }
}