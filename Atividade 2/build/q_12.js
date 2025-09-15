"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pessoa = /** @class */ (function () {
    function pessoa(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    pessoa.prototype.apresentar = function () {
        return "Meu nome \u00E9 ".concat(this.nome, " e tenho ").concat(this.idade, " anos.");
    };
    return pessoa;
}());
var pessoa1 = new pessoa("Ely", 46);
console.log(pessoa1.apresentar());
//Criar a classe com class.
//Declarar os atributos com seus tipos.
//Criar o construtor para inicializar os atributos.
//Criar o método apresentar() retornando a frase com template string.
//Criar uma instância da classe e chamar o método.
//# sourceMappingURL=q_12.js.map