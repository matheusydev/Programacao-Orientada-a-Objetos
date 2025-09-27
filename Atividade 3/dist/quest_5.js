"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exibir(...lista) {
    let resultado = "";
    for (let atual of lista) {
        resultado += atual;
    }
    return resultado;
}
console.log(exibir("a", "b"));
console.log(exibir("a", "b", "c"));
console.log(exibir("a", "b", "c", "d"));
