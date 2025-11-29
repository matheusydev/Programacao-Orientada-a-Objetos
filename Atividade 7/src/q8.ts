import Funcionario from "./q7"

class Professor extends Funcionario {
  private _titulacao: string;

  constructor(
    nome: string,
    sobrenome: string,
    matricula: string,
    salario: number,
    titulacao: string
  ) {
    super(nome, sobrenome, matricula, salario);
    this._titulacao = titulacao;
  }

  public get titulacao(): string {
    return this._titulacao;
  }


  public calcularSalarioPrimeiraParcela(): number {
    return this.salario;
  }

  public calcularSalarioSegundaParcela(): number {
    return 0;
  }
}

export { Professor};

