"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    id;
    nome;
    cpf;
    dataNascimento;
    contas;
}
class Conta {
    id;
    cliente;
    dataDeAbertura;
}
class Banco {
    contas;
    clientes;
    inserirCliente(cliente) {
        this.clientes.push(cliente);
    }
    consultarCliente(cpf) {
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }
}
