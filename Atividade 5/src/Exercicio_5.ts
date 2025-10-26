class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[] = [];
}

class Conta {
    id: number;
    clientes: Cliente[] = [];
    dataDeAbertura: Date;

}

class Banco {
    contas: Conta[] = [];
    clientes: Cliente[] = [];
}