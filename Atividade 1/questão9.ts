class SituacaoFinanceira {
    valorCreditos: number = 0;
    valorDebitos: number = 0;

    calcularSaldo(): number {
        return this.valorCreditos - this.valorDebitos;
    }
}

let situacao1 = new SituacaoFinanceira();
situacao1.valorCreditos = 1500;
situacao1.valorDebitos = 750;

console.log(`Saldo = ${situacao1.calcularSaldo()}`);