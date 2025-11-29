import { Calculadora } from "./q2";

class CalculadoraCientifica extends Calculadora {
  constructor(op1: number, op2: number) {
    super(op1, op2);
  }

  public exponenciar(): number {
    return Math.pow(this.op1, op2);
  }
}

let calculo2: CalculadoraCientifica = new CalculadoraCientifica(2, 3);
console.log(calculo2.exponenciar());

