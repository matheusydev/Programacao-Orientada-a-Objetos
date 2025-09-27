class Circulo {
    raio: number = 0;

    calcularArea(): number {
        return 3.14 * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * 3.14 * this.raio;
    }
}

let circulo1 = new Circulo();
circulo1.raio = 5;

console.log(`Área = ${circulo1.calcularArea()}`);
console.log(`Perímetro = ${circulo1.calcularPerimetro()}`);