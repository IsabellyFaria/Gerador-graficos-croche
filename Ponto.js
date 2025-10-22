class Ponto {
    constructor(angulo = 0, cor = "black",raio=5) {
        this.Cx = 0;
        this.Cy = 0;
        this.angulo = angulo
        this.cor = cor
        this.raio = raio
    }
    setXY(Cx,Cy){
        this.Cx = Cx;
        this.Cy = Cy;
    }
    setAngulo(angulo){
        this.angulo = angulo;
    }
    setRaio(raio){
        this.raio = raio;
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
class CirculoMagico extends Ponto{
    desenhar(ctx){
        ctx.beginPath();
        ctx.arc(200, 300, raio, 0, 2 * Math.PI); 
        ctx.stroke(); 
    }
}