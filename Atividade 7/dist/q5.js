"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Empregado {
    salario = 500;
    calcularSalario() {
        return this.salario;
    }
}
class Diarista extends Empregado {
    calcularSalario() {
        return super.calcularSalario() / 30;
    }
}
class Horista extends Diarista {
    calcularSalario() {
        return super.calcularSalario() / 24;
    }
}
let empregado1 = new Empregado();
console.log(empregado1.calcularSalario());
let diarista1 = new Diarista();
console.log(diarista1.calcularSalario());
let horista1 = new Horista();
console.log(horista1.calcularSalario());
