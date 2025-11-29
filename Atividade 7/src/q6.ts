class Pessoa {
  private _nome: string;
  private _sobrenome: string;

  constructor(nome: string, sobrenome: string) {
    this._nome = nome;
    this._sobrenome = sobrenome;
  }

  get nome(): string {
    return this._nome;
  }

  get sobrenome(): string {
    return this._sobrenome;
  }

  get nomeCompleto(): string {
    return `${this._nome} ${this._sobrenome}`;
  }
}

let pessoa1: Pessoa = new Pessoa("Francisco", "Cássio");
console.log(pessoa1.nomeCompleto);

export { Pessoa };
