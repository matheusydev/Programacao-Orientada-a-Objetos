"use strict";
// 3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
// do exercício passado e:
Object.defineProperty(exports, "__esModule", { value: true });
// a. Implemente um método chamado exponenciar que retorne o primeiro
// operando elevado ao segundo;
const questao02_1 = require("./questao02");
class CalculadoraCientifica extends questao02_1.Calculadora {
    constructor(num1, num2) {
        super(num1, num2);
    }
    exponenciar() {
        return Math.pow(this.num1, this.num2);
    }
}
// b. Teste a classe;
let calculo2 = new CalculadoraCientifica(2, 3);
console.log(calculo2.exponenciar());
// c. Foi necessária alguma modificação em Calculadora para o acesso aos atributos?
// Sim. pois será necessários criar os métodos de leitura (gets)
