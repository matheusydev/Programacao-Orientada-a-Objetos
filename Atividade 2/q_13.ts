class produto {
    nome: string;
    preco: number;

    constructor(nome: string, preco: number){
        this.nome = nome;
        this.preco = preco;
    }

    aplicardesconto(percentual: number): number{
        return this.preco * (1 - percentual / 100);
    }

    emitirorcamento(percentual: number): string {
        const novopreco = this.aplicardesconto(percentual);

        return `Produto: ${this.nome}, Preço: R$ ${this.preco.toFixed(2)}\nDesconto: ${percentual}%, Novo preço: R$ ${novopreco.toFixed(2)}`;

    }
}

const produto1 = new produto("celular", 2300);
console.log(produto1.emitirorcamento(10));