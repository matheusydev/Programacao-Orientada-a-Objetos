"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q2_1 = require("./q2");
class CalculadoraCientifica extends q2_1.Calculadora {
    constructor(op1, op2) {
        super(op1, op2);
    }
    exponenciar() {
        return Math.pow(this.op1, op2);
    }
}
let calculo2 = new CalculadoraCientifica(2, 3);
console.log(calculo2.exponenciar());
