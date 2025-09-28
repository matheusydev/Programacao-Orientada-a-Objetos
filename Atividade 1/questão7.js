"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Retangulo {
    l1 = 0;
    l2 = 0;
    calcularArea() {
        return this.l1 * this.l2;
    }
    calcularPerimetro() {
        return this.l1 * 2 + this.l2 * 2;
    }
}
let retangulo1 = new Retangulo();
retangulo1.l1 = 3;
retangulo1.l2 = 4;
console.log(`area = ${retangulo1.calcularArea()}`);
console.log(`area = ${retangulo1.calcularPerimetro()}`);
