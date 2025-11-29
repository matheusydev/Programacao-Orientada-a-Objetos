"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
class Pessoa {
    _nome;
    _sobrenome;
    constructor(nome, sobrenome) {
        this._nome = nome;
        this._sobrenome = sobrenome;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
    get nomeCompleto() {
        return `${this._nome} ${this._sobrenome}`;
    }
}
exports.Pessoa = Pessoa;
let pessoa1 = new Pessoa("Francisco", "Cássio");
console.log(pessoa1.nomeCompleto);
