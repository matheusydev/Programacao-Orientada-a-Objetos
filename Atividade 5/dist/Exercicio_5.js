"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    id;
    nome;
    cpf;
    dataNascimento;
    contas;
    constructor(id, nome, cpf, dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }
}
class Conta {
    id;
    cliente;
    dataDeAbertura;
    numeroConta;
    saldo;
    constructor(id, numeroConta, dataDeAbertura, saldo) {
        this.id = id;
        this.numeroConta = numeroConta;
        this.dataDeAbertura = dataDeAbertura;
        this.saldo = saldo;
    }
}
class Banco {
    contas;
    clientes;
    constructor() {
        this.contas = [];
        this.clientes = [];
    }
    inserirCliente(cliente) {
        this.clientes.push(cliente);
    }
    consultarCliente(cpf) {
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }
    associarContaCliente(numeroConta, cpf) {
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
    listarContasCliente(cpf) {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);
        if (!clienteEncontrado) {
            return [];
        }
        return clienteEncontrado.contas;
    }
    totalizarSaldoCliente(cpf) {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);
        if (!clienteEncontrado) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return 0;
        }
        const total = clienteEncontrado.contas.reduce((soma, conta) => soma + conta.saldo, 0);
        console.log(`Saldo total do cliente ${clienteEncontrado.nome}: R$ ${total.toFixed(2)}`);
        return total;
    }
    inserirCliente(cliente) {
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
    inserirConta(conta) {
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
}
