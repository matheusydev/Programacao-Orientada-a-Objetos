class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[];
}

class Conta {
    id: number;
    cliente: Cliente;
    dataDeAbertura: Date;

}

class Banco {
    contas: Conta[];
    clientes: Cliente[];


    inserirCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }


    consultarCliente(cpf: string): Cliente{
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }
}