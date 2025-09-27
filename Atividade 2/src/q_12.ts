class pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

    apresentar(): string {
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
}

const pessoa1 = new pessoa("Ely", 46);
console.log(pessoa1.apresentar());

//Criar a classe com class.
//Declarar os atributos com seus tipos.
//Criar o construtor para inicializar os atributos.
//Criar o método apresentar() retornando a frase com template string.
//Criar uma instância da classe e chamar o método.
