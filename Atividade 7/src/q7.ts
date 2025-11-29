import Pessoa from "./q6"

class Funcionario extends Pessoa {
  private _matricula: string;
  private _salario: number;

  constructor(nome: string, sobrenome: string, matricula: string, salario: number) {
    super(nome, sobrenome);

    if (salario < 0) {
      throw new Error("Salário não pode ser negativo.");
    }

    this._matricula = matricula;
    this._salario = salario;
  }

  public get matricula(): string {
    return this._matricula;
  }

  public get salario(): number {
    return this._salario;
  }

  public calcularSalarioPrimeiraParcela(): number {
    return this._salario * 0.6;
  }

  public calcularSalarioSegundaParcela(): number {
    return this._salario * 0.4;
  }
}

export {Funcionario};