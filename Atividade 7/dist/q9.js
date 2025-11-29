"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q6_1 = require("./q6");
const q7_1 = require("./q7");
const q8_1 = require("./q8");
class FolhaPagamento {
    pessoas;
    constructor(pessoas) {
        this.pessoas = pessoas;
    }
    calcularPagamentos() {
        let total = 0;
        for (const pessoa of this.pessoas) {
            if (pessoa instanceof q7_1.Funcionario) {
                total += pessoa.salario;
            }
        }
        return total;
    }
}
