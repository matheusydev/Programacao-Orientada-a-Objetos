"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SituacaoFinanceira {
    valorCreditos = 0;
    valorDebitos = 0;
    calcularSaldo() {
        return this.valorCreditos - this.valorDebitos;
    }
}
let situacao1 = new SituacaoFinanceira();
situacao1.valorCreditos = 1500;
situacao1.valorDebitos = 750;
console.log(`Saldo = ${situacao1.calcularSaldo()}`);
