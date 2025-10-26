"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    id;
    nome;
    cpf;
    dataNascimento;
    contas = [];
}
class Conta {
    id;
    clientes = [];
    dataDeAbertura;
}
class Banco {
    contas = [];
    clientes = [];
}
