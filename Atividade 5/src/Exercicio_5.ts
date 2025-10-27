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
    saldo: number;

    constructor(id: number, numeroConta: string, dataDeAbertura: Date, saldo: number) {
        this.id = id;
        this.numeroConta = numeroConta;
        this.dataDeAbertura = dataDeAbertura;
        this.saldo = saldo;
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


    listarContasCliente(cpf: string): Conta[] {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);

        if (!clienteEncontrado) {
            return[]
        }
        return clienteEncontrado.contas;
    }


    totalizarSaldoCliente(cpf: string): number {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);

        if (!clienteEncontrado) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return 0;
        }

        const total = clienteEncontrado.contas.reduce((soma, conta) => soma + conta.saldo,0);

        console.log(`Saldo total do cliente ${clienteEncontrado.nome}: R$ ${total.toFixed(2)}`);
        return total;
    }


    inserirCliente(cliente: Cliente): void {
        const clienteEncontradoID = this.clientes.find((c) => c.id === cliente.id);

        if (clienteEncontradoID) {
            console.log(`Cliente com ID ${cliente.id} já existe.`);
            return;
        }

        const clienteEncontradoCPF = this.consultarCliente(cliente.cpf);
        if (clienteEncontradoCPF) {
            console.log(`Erro: Já existe um cliente com o CPF ${cliente.cpf}.`);
            return;
        }  

        this.clientes.push(cliente);
        console.log(`Cliente ${cliente.id} inserido com sucesso.`);
    }


    inserirConta(conta: Conta): void {
    const clienteEncontradoID = this.contas.find((c) => c.id === conta.id);
    if (clienteEncontradoID) {
        console.log(`Já existe uma conta com o ID ${conta.id}.`);
        return;
    }

    const clienteEncontradoNumero = this.contas.find((c) => c.numeroConta === conta.numeroConta);
    if (clienteEncontradoNumero) {
        console.log(`Já existe uma conta com o número ${conta.numeroConta}.`);
        return;
    }

    this.contas.push(conta);
    console.log(`Conta ${conta.numeroConta} (ID: ${conta.id}) criada com sucesso.`);

}