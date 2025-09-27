class Retangulo {
        l1: number = 0;
        l2: number = 0;
        

    calcularArea(): number {
        return this.l1 * this.l2;
    }

    calcularPerimetro(): number {
        return this.l1 * 2 + this.l2 * 2;
    }
}

let retangulo1 = new Retangulo();
retangulo1.l1 = 3;
retangulo1.l2 = 4;
console.log(`area = ${retangulo1.calcularArea()}`)
console.log(`area = ${retangulo1.calcularPerimetro()}`)