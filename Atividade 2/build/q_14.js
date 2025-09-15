"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numero = /** @class */ (function () {
    function numero(valor) {
        this.valor = valor;
    }
    numero.prototype.ehpar = function () {
        if (this.valor % 2 === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    numero.prototype.ehimpar = function () {
        if (this.valor % 2 !== 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return numero;
}());
var num1 = new numero(12);
console.log("".concat(num1.valor, " \u00E9 par? ").concat(num1.ehpar()));
console.log("".concat(num1.valor, " \u00E9 \u00EDmpar? ").concat(num1.ehimpar()));
var num2 = new numero(7);
console.log("".concat(num2.valor, " \u00E9 par? ").concat(num2.ehpar()));
console.log("".concat(num2.valor, " \u00E9 \u00EDmpar? ").concat(num2.ehimpar()));
//# sourceMappingURL=q_14.js.map