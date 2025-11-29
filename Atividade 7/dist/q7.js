"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const q6_1 = __importDefault(require("./q6"));
class Funcionario extends q6_1.default {
    _matricula;
    _salario;
    constructor(nome, sobrenome, matricula, salario) {
        super(nome, sobrenome);
        if (salario < 0) {
            throw new Error("Salário não pode ser negativo.");
        }
        this._matricula = matricula;
        this._salario = salario;
    }
    get matricula() {
        return this._matricula;
    }
    get salario() {
        return this._salario;
    }
    calcularSalarioPrimeiraParcela() {
        return this._salario * 0.6;
    }
    calcularSalarioSegundaParcela() {
        return this._salario * 0.4;
    }
}
exports.Funcionario = Funcionario;
