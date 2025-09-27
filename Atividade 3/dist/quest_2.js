"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function saudacao(nome = " ", saudacao = "Sr.") {
    return saudacao + " " + nome;
}
console.log(saudacao('Matheus'));
console.log(saudacao('Matheus', 'Doutor'));
