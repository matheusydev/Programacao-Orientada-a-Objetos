"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculadora {
    _op1;
    _op2;
    constructor(op1, op2) {
        this._op1 = op1;
        this._op2 = op2;
    }
    somar() {
        return this._op1 + this._op2;
    }
    get operando1() {
        return this._op1;
    }
    get operando2() {
        return this._op2;
    }
}
const calculadora = new Calculadora(10, 5);
console.log("Soma:", calculadora.somar());
