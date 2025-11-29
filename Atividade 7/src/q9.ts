

import { Pessoa } from "./q6";
import { Funcionario } from "./q7";
import { Professor } from "./q8";

class FolhaPagamento {
  private pessoas: Pessoa[];

  constructor(pessoas: Pessoa[]) {
    this.pessoas = pessoas;
  }

  public calcularPagamentos(): number {
    let total = 0;

    for (const pessoa of this.pessoas) {
      if (pessoa instanceof Funcionario) {
        total += pessoa.salario;
      }
    }

    return total;
  }
}

