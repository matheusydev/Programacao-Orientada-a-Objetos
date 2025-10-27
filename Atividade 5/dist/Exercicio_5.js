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
    constructor(id, numeroConta, dataDeAbertura) {
        this.id = id;
        this.numeroConta = numeroConta;
        this.dataDeAbertura = dataDeAbertura;
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
}
