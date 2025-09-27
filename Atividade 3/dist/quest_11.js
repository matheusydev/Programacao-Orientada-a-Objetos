"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sorteio {
    nomes = [];
    adicionar(nome) {
        this.nomes.push(nome);
    }
    sortear() {
        if (this.nomes.length === 0)
            return "Nenhum nome no sorteio";
        const indice = Math.floor(Math.random() * this.nomes.length);
        return this.nomes[indice];
    }
}
const s = new Sorteio();
s.adicionar("Matheus");
s.adicionar("Ylan");
s.adicionar("Araujo");
s.adicionar("Moraes");
console.log(s.sortear());
