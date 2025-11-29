class Calculadora {
  private _op1: number;
  private _op2: number;

  constructor(op1: number, op2: number) {
    this._op1 = op1;
    this._op2 = op2;
  }

  public somar(): number {
    return this._op1 + this._op2;
  }

  protected get operando1(): number {
    return this._op1;
  }

  protected get operando2(): number {
    return this._op2;
  }
}

const calculadora = new Calculadora(10, 5);
console.log("Soma:", calculadora.somar());
