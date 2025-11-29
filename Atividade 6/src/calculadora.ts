class Calculadora {
  private _valorA: number;
  private _valorB: number;

  constructor(valorA: number, valorB: number) {
    this._valorA = valorA;
    this._valorB = valorB;
  }

  public somar(): number {
    return this._valorA + this._valorB;
  }

  public subtrair(): number {
    return this._valorA - this._valorB;
  }

  public multiplicar(): number {
    return this._valorA * this._valorB;
  }

  public dividir(): number {
    return this._valorA / this._valorB;
  }
}

let calculadora: Calculadora = new Calculadora(8, 1);

console.log("Soma:", calculadora.somar());
console.log("Subtração:", calculadora.subtrair());
console.log("Multiplicação:", calculadora.multiplicar());
console.log("Divisão:", calculadora.dividir());
