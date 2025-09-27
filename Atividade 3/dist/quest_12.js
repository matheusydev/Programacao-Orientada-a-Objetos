"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JogoParImpar {
    numeroJogador;
    numeroMaquina;
    constructor(numeroJogador) {
        this.numeroJogador = numeroJogador;
        this.numeroMaquina = 0;
    }
    sortearMaquina() {
        this.numeroMaquina = Math.floor(Math.random() * 10) + 1; // 1 a 10
    }
    resultado() {
        const soma = this.numeroJogador + this.numeroMaquina;
        return soma % 2 === 0 ? "par" : "ímpar";
    }
    vencedor() {
        const resultado = this.resultado();
        return resultado === "par" ? "Jogador" : "Máquina";
    }
}
const jogo = new JogoParImpar(4);
jogo.sortearMaquina();
console.log(`Número da máquina: ${jogo.numeroMaquina}`);
console.log(`Resultado: ${jogo.resultado()}`);
console.log(`Vencedor: ${jogo.vencedor()}`);
