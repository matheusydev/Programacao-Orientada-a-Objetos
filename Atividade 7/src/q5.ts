class Empregado {
  salario: number = 500;

  calcularSalario(): number {
    return this.salario;
  }
}

class Diarista extends Empregado {
  calcularSalario(): number {
    return super.calcularSalario() / 30;
  }
}

class Horista extends Diarista {
  calcularSalario(): number {
    return super.calcularSalario() / 24;
  }
}

let empregado1: Empregado = new Empregado();
console.log(empregado1.calcularSalario());

let diarista1: Diarista = new Diarista();
console.log(diarista1.calcularSalario());

let horista1: Horista = new Horista();
console.log(horista1.calcularSalario());
