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
    cliente?: Cliente;
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
        const existeId = this.clientes.find((c) => c.id === cliente.id);
        if (existeId) {
            console.log(`Cliente com ID ${cliente.id} já existe.`);
            return;
        }
        const existeCPF = this.consultarCliente(cliente.cpf);
        if (existeCPF) {
            console.log(`Erro: Já existe um cliente com o CPF ${cliente.cpf}.`);
            return;
        }
        this.clientes.push(cliente);
        console.log(`Cliente ${cliente.id} inserido com sucesso.`);
    }

    consultarCliente(cpf: string): Cliente | undefined {
        return this.clientes.find((cliente) => cliente.cpf === cpf);
    }

    inserirConta(conta: Conta): void {
        const existeId = this.contas.find((c) => c.id === conta.id);
        if (existeId) {
            console.log(`Já existe uma conta com o ID ${conta.id}.`);
            return;
        }
        const existeNumero = this.contas.find((c) => c.numeroConta === conta.numeroConta);
        if (existeNumero) {
            console.log(`Já existe uma conta com o número ${conta.numeroConta}.`);
            return;
        }
        this.contas.push(conta);
        console.log(`Conta ${conta.numeroConta} (ID: ${conta.id}) criada com sucesso.`);
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
        if (contaEncontrada.cliente && contaEncontrada.cliente !== clienteEncontrado) {
            contaEncontrada.cliente.contas = contaEncontrada.cliente.contas.filter(c => c.numeroConta !== contaEncontrada.numeroConta);
        }
        clienteEncontrado.contas.push(contaEncontrada);
        contaEncontrada.cliente = clienteEncontrado;
        console.log(`Conta ${numeroConta} associada ao cliente ${clienteEncontrado.nome}.`);
    }

    listarContasCliente(cpf: string): Conta[] {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);
        if (!clienteEncontrado) return [];
        return clienteEncontrado.contas;
    }

    totalizarSaldoCliente(cpf: string): number {
        const clienteEncontrado = this.clientes.find((cliente) => cliente.cpf === cpf);
        if (!clienteEncontrado) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return 0;
        }
        const total = clienteEncontrado.contas.reduce((soma, conta) => soma + conta.saldo, 0);
        console.log(`Saldo total do cliente ${clienteEncontrado.nome}: R$ ${total.toFixed(2)}`);
        return total;
    }

    excluirCliente(cpf: string): boolean {
        const idx = this.clientes.findIndex(c => c.cpf === cpf);
        if (idx === -1) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return false;
        }
        const cliente = this.clientes[idx];
        cliente.contas.forEach(conta => {
            conta.cliente = undefined;
        });
        this.clientes.splice(idx, 1);
        console.log(`Cliente com CPF ${cpf} excluído com sucesso.`);
        return true;
    }

    excluirConta(numeroConta: string): boolean {
        const idx = this.contas.findIndex(c => c.numeroConta === numeroConta);
        if (idx === -1) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return false;
        }
        const conta = this.contas[idx];
        if (conta.cliente) {
            const cliente = conta.cliente;
            cliente.contas = cliente.contas.filter(c => c.numeroConta !== numeroConta);
        }
        this.contas.splice(idx, 1);
        console.log(`Conta ${numeroConta} excluída com sucesso.`);
        return true;
    }

    atualizarCliente(cpf: string, novosDados: { id?: number; nome?: string; cpf?: string; dataNascimento?: Date; }): boolean {
        const cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return false;
        }
        if (novosDados.nome !== undefined) cliente.nome = novosDados.nome;
        if (novosDados.dataNascimento !== undefined) cliente.dataNascimento = novosDados.dataNascimento;
        if (novosDados.id !== undefined) cliente.id = novosDados.id;
        if (novosDados.cpf !== undefined) {
            const outro = this.clientes.find(c => c.cpf === novosDados.cpf && c !== cliente);
            if (outro) {
                console.log(`Não é possível atualizar: já existe cliente com CPF ${novosDados.cpf}.`);
                return false;
            }
            cliente.cpf = novosDados.cpf;
        }
        console.log(`Cliente ${cliente.nome} atualizado.`);
        return true;
    }

    atualizarConta(numeroConta: string, novosDados: { id?: number; numeroConta?: string; saldo?: number; dataDeAbertura?: Date; }): boolean {
        const conta = this.contas.find(c => c.numeroConta === numeroConta);
        if (!conta) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return false;
        }
        if (novosDados.numeroConta !== undefined) {
            const duplicada = this.contas.find(c => c.numeroConta === novosDados.numeroConta && c !== conta);
            if (duplicada) {
                console.log(`Não é possível atualizar: já existe conta com número ${novosDados.numeroConta}.`);
                return false;
            }
            const antigoNumero = conta.numeroConta;
            conta.numeroConta = novosDados.numeroConta;
            if (conta.cliente) {
                conta.cliente.contas = conta.cliente.contas.map(c => c === conta ? conta : c);
            }
            this.contas = this.contas.map(c => c === conta ? conta : c);
            if (antigoNumero !== conta.numeroConta) {
                console.log(`Número da conta alterado de ${antigoNumero} para ${conta.numeroConta}.`);
            }
        }
        if (novosDados.saldo !== undefined) conta.saldo = novosDados.saldo;
        if (novosDados.dataDeAbertura !== undefined) conta.dataDeAbertura = novosDados.dataDeAbertura;
        if (novosDados.id !== undefined) conta.id = novosDados.id;
        console.log(`Conta ${conta.numeroConta} atualizada.`);
        return true;
    }

    sacar(numeroConta: string, valor: number): boolean {
        if (valor <= 0) {
            console.log(`Valor de saque inválido: ${valor}.`);
            return false;
        }
        const conta = this.contas.find(c => c.numeroConta === numeroConta);
        if (!conta) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return false;
        }
        if (conta.saldo < valor) {
            console.log(`Saldo insuficiente. Saldo atual: R$ ${conta.saldo.toFixed(2)}.`);
            return false;
        }
        conta.saldo -= valor;
        console.log(`Saque de R$ ${valor.toFixed(2)} realizado na conta ${numeroConta}. Saldo atual: R$ ${conta.saldo.toFixed(2)}.`);
        return true;
    }

    depositar(numeroConta: string, valor: number): boolean {
        if (valor <= 0) {
            console.log(`Valor de depósito inválido: ${valor}.`);
            return false;
        }
        const conta = this.contas.find(c => c.numeroConta === numeroConta);
        if (!conta) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return false;
        }
        conta.saldo += valor;
        console.log(`Depósito de R$ ${valor.toFixed(2)} realizado na conta ${numeroConta}. Saldo atual: R$ ${conta.saldo.toFixed(2)}.`);
        return true;
    }

    transferir(numeroContaOrigem: string, numeroContaDestino: string, valor: number): boolean {
        if (valor <= 0) {
            console.log(`Valor de transferência inválido: ${valor}.`);
            return false;
        }
        if (numeroContaOrigem === numeroContaDestino) {
            console.log(`Conta de origem e destino iguais.`);
            return false;
        }
        const contaOrigem = this.contas.find(c => c.numeroConta === numeroContaOrigem);
        const contaDestino = this.contas.find(c => c.numeroConta === numeroContaDestino);
        if (!contaOrigem) {
            console.log(`Conta de origem ${numeroContaOrigem} não encontrada.`);
            return false;
        }
        if (!contaDestino) {
            console.log(`Conta de destino ${numeroContaDestino} não encontrada.`);
            return false;
        }
        if (contaOrigem.saldo < valor) {
            console.log(`Saldo insuficiente na conta de origem. Saldo atual: R$ ${contaOrigem.saldo.toFixed(2)}.`);
            return false;
        }
        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
        console.log(`Transferência de R$ ${valor.toFixed(2)} de ${numeroContaOrigem} para ${numeroContaDestino} concluída.`);
        console.log(`Saldo origem: R$ ${contaOrigem.saldo.toFixed(2)} | Saldo destino: R$ ${contaDestino.saldo.toFixed(2)}.`);
        return true;
    }
}
