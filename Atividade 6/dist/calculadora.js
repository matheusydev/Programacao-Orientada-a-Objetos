"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculadora {
    _valorA;
    _valorB;
    constructor(valorA, valorB) {
        this._valorA = valorA;
        this._valorB = valorB;
    }
    somar() {
        return this._valorA + this._valorB;
    }
    subtrair() {
        return this._valorA - this._valorB;
    }
    multiplicar() {
        return this._valorA * this._valorB;
    }
    dividir() {
        return this._valorA / this._valorB;
    }
}
let calculadora = new Calculadora(8, 1);
console.log("Soma:", calculadora.somar());
console.log("Subtração:", calculadora.subtrair());
console.log("Multiplicação:", calculadora.multiplicar());
console.log("Divisão:", calculadora.dividir());
