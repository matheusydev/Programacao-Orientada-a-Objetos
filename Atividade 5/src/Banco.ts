export class Cliente {
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

export class Conta {
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

export class Banco {
    contas: Conta[];
    clientes: Cliente[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    carregarDados(): void {
    const cli1 = new Cliente(1, "Mitsuki Miyawaki", "111.111.111-11", new Date("1990-09-23"));
    const cli2 = new Cliente(2, "BeKarly Marina Loaizato", "222.222.222-22", new Date("1994-07-17"));
    const cli3 = new Cliente(3, "Laufey Lín Bing", "333.333.333-33", new Date("1999-04-23"));
    const cli4 = new Cliente(4, "Amala Ratna Zandile", "444.444.444-44", new Date("1995-10-21"));
    const cli5 = new Cliente(5, "Sia Kate Isobelle", "555.555.555-55", new Date("1975-12-18"));

    this.inserirCliente(cli1);
    this.inserirCliente(cli2);
    this.inserirCliente(cli3);
    this.inserirCliente(cli4);
    this.inserirCliente(cli5);

    const c1 = new Conta(1, "0001", new Date(), 1000);
    const c2 = new Conta(2, "0002", new Date(), 200);
    const c3 = new Conta(3, "0003", new Date(), 50);
    const c4 = new Conta(4, "0004", new Date(), 0);
    const c5 = new Conta(5, "0005", new Date(), 500);

    this.inserirConta(c1);
    this.inserirConta(c2);
    this.inserirConta(c3);
    this.inserirConta(c4);
    this.inserirConta(c5);

    this.associarContaCliente("0001", "111.111.111-11");
    this.associarContaCliente("0002", "111.111.111-11");
    this.associarContaCliente("0003", "111.111.111-11");
    this.associarContaCliente("0004", "111.111.111-11");
    this.associarContaCliente("0005", "222.222.222-22");
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

    excluirCliente(cpf: string, removerContasAssociadas: boolean = true): boolean {
        const idx = this.clientes.findIndex(c => c.cpf === cpf);
        if (idx === -1) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return false;
        }
        const cliente = this.clientes[idx];
        if (removerContasAssociadas) {
            cliente.contas.forEach(conta => {
                const idxConta = this.contas.findIndex(c => c.numeroConta === conta.numeroConta);
                if (idxConta !== -1) this.contas.splice(idxConta, 1);
            });
        } else {
            cliente.contas.forEach(conta => {
                conta.cliente = undefined;
            });
        }
        this.clientes.splice(idx, 1);
        console.log(`Cliente com CPF ${cpf} excluído com sucesso.`);
        return true;
    }

    excluirConta(numeroConta: string, removerClienteSeSemContas: boolean = false): boolean {
        const idx = this.contas.findIndex(c => c.numeroConta === numeroConta);
        if (idx === -1) {
            console.log(`Conta número ${numeroConta} não encontrada.`);
            return false;
        }
        const conta = this.contas[idx];
        if (conta.cliente) {
            const cliente = conta.cliente;
            cliente.contas = cliente.contas.filter(c => c.numeroConta !== numeroConta);
            if (removerClienteSeSemContas && cliente.contas.length === 0) {
                const idxCli = this.clientes.findIndex(c => c.cpf === cliente.cpf);
                if (idxCli !== -1) this.clientes.splice(idxCli, 1);
            }
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

    transferirParaVarios(numeroContaOrigem: string, destinos: string[], valor: number): { success: string[]; failed: { destino: string; motivo: string }[] } {
        const resultado = { success: [] as string[], failed: [] as { destino: string; motivo: string }[] };
        const contaOrigem = this.contas.find(c => c.numeroConta === numeroContaOrigem);
        if (!contaOrigem) {
            destinos.forEach(d => resultado.failed.push({ destino: d, motivo: `Conta de origem ${numeroContaOrigem} não encontrada` }));
            return resultado;
        }
        for (const dest of destinos) {
            if (valor <= 0) {
                resultado.failed.push({ destino: dest, motivo: `Valor inválido: ${valor}` });
                continue;
            }
            if (contaOrigem.saldo < valor) {
                resultado.failed.push({ destino: dest, motivo: `Saldo insuficiente para transferir R$ ${valor.toFixed(2)}` });
                continue;
            }
            const contaDestino = this.contas.find(c => c.numeroConta === dest);
            if (!contaDestino) {
                resultado.failed.push({ destino: dest, motivo: `Conta destino ${dest} não encontrada` });
                continue;
            }
            contaOrigem.saldo -= valor;
            contaDestino.saldo += valor;
            resultado.success.push(dest);
        }
        if (resultado.success.length > 0) {
            console.log(`Transferências concluídas para: ${resultado.success.join(", ")}.`);
        }
        if (resultado.failed.length > 0) {
            console.log(`Falhas em transferências: ${resultado.failed.map(f => `${f.destino} (${f.motivo})`).join("; ")}.`);
        }
        return resultado;
    }

    quantidadeContas(): number {
        return this.contas.length;
    }

    totalSaldoTodasContas(): number {
        return this.contas.reduce((s, c) => s + c.saldo, 0);
    }

    mediaSaldoContas(): number {
        const quantidade = this.quantidadeContas();
        if (quantidade === 0) return 0;
        return this.totalSaldoTodasContas() / quantidade;
    }

    mudarTitularidade(numeroConta: string, novoCpf: string): boolean {
        const conta = this.contas.find(c => c.numeroConta === numeroConta);
        if (!conta) {
            console.log(`Conta ${numeroConta} não encontrada.`);
            return false;
        }
        const novoCliente = this.consultarCliente(novoCpf);
        if (!novoCliente) {
            console.log(`Cliente com CPF ${novoCpf} não encontrado.`);
            return false;
        }
        if (conta.cliente) {
            conta.cliente.contas = conta.cliente.contas.filter(c => c.numeroConta !== numeroConta);
        }
        novoCliente.contas.push(conta);
        conta.cliente = novoCliente;
        console.log(`Titularidade da conta ${numeroConta} alterada para ${novoCliente.nome}.`);
        return true;
    }

    listarContasSemCliente(): Conta[] {
        return this.contas.filter(c => !c.cliente);
    }

    atribuirTitularidade(contasNumeros: string[], cpf: string): number {
        const cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.log(`Cliente com CPF ${cpf} não encontrado.`);
            return 0;
        }
        let contador = 0;
        for (const num of contasNumeros) {
            const conta = this.contas.find(c => c.numeroConta === num);
            if (!conta) continue;
            if (conta.cliente) continue;
            cliente.contas.push(conta);
            conta.cliente = cliente;
            contador++;
        }
        console.log(`${contador} contas atribuídas ao cliente ${cliente.nome}.`);
        return contador;
    }
}

