class JogoParImpar {
    numeroJogador: number;
    numeroMaquina: number;

    constructor(numeroJogador: number) {
        this.numeroJogador = numeroJogador;
        this.numeroMaquina = 0;
    }

    sortearMaquina(): void {
        this.numeroMaquina = Math.floor(Math.random() * 10) + 1; // 1 a 10
    }

    resultado(): string {
        const soma = this.numeroJogador + this.numeroMaquina;
        return soma % 2 === 0 ? "par" : "ímpar";
    }

    vencedor(): string {
        const resultado = this.resultado();
        return resultado === "par" ? "Jogador" : "Máquina";
    }
}

const jogo = new JogoParImpar(4);
jogo.sortearMaquina();
console.log(`Número da máquina: ${jogo.numeroMaquina}`);
console.log(`Resultado: ${jogo.resultado()}`);
console.log(`Vencedor: ${jogo.vencedor()}`);
