"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function aleatorio(nomes) {
    const indice = Math.floor(Math.random() * nomes.length);
    return nomes[indice];
}
const lista = ["Matheus", "Ylan", "Araujo", "Moraes"];
console.log(aleatorio(lista));
