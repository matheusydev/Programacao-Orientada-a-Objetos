"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var produto = /** @class */ (function () {
    function produto(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    produto.prototype.aplicardesconto = function (percentual) {
        return this.preco * (1 - percentual / 100);
    };
    produto.prototype.emitirorcamento = function (percentual) {
        var novopreco = this.aplicardesconto(percentual);
        return "Produto: ".concat(this.nome, ", Pre\u00E7o: R$ ").concat(this.preco.toFixed(2), "\nDesconto: ").concat(percentual, "%, Novo pre\u00E7o: R$ ").concat(novopreco.toFixed(2));
    };
    return produto;
}());
var produto1 = new produto("celular", 2300);
console.log(produto1.emitirorcamento(10));
