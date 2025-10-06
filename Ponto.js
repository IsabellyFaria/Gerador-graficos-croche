class Ponto {
    constructor(Cx, Cy, angulo = 0, cor = "black",raio=5) {
        this.Cx = Cx;
        this.Cy = Cy;
        this.angulo = angulo
        this.cor = cor
        this.raio = raio
    }
    desenhar(ctx) { }
    rotacionar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angulo + Math.PI / 2);
        ctx.strokeStyle = this.cor;
        desenhar(ctx);
        ctx.restore();
    }
}
class PontoBaixo extends Ponto {
    desenhar(ctx) {
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.lineTo(7, 0);              // linha horizontal (agora rotacionada)
        ctx.moveTo(0, -7);
        ctx.lineTo(0, 7);              // linha vertical
        ctx.stroke();
    }
}