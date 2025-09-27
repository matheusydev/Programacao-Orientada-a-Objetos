"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numerotraco(lista) {
    let resultado = '';
    lista.forEach((numero, indice) => {
        resultado += numero;
        if (indice < lista.length - 1) {
            resultado += '-';
        }
    });
    return resultado;
}
console.log(numerotraco([4, 11, 2006, 29, 6, 2007]));
