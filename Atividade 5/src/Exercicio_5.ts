class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[];

    constructor(id: number, nome: string, cpf: string, dataNascimento: Date) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = []; 
    }
}

class Conta {
    id: number;
    cliente: Cliente;
    dataDeAbertura: Date;
    numeroConta: string;

    constructor(id: number, numeroConta: string, dataDeAbertura: Date) {
        this.id = id;
        this.numeroConta = numeroConta;
        this.dataDeAbertura = dataDeAbertura;
    }
}

class Banco {
    contas: Conta[];
    clientes: Cliente[];

    constructor() {
        this.contas = [];  
        this.clientes = []; 
    }

    inserirCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    consultarCliente(cpf: string): Cliente {
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }

    associarContaCliente(numeroConta: string, cpf: string): void {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);
        const contaEncontrada = this.contas.find((conta) => conta.numeroConta === numeroConta);

        if (!clienteEncontrado) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return;
        }

        if (!contaEncontrada) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return;
        }

        if (clienteEncontrado.contas.includes(contaEncontrada)) {
            console.log(`Conta já associada a este cliente.`);
            return;
        }

        clienteEncontrado.contas.push(contaEncontrada);
        contaEncontrada.cliente = clienteEncontrado;

        console.log(`Conta ${numeroConta} associada ao cliente ${clienteEncontrado.nome}.`);
    }
}