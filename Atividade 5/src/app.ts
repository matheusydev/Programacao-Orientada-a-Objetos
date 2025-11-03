import promptSync from "prompt-sync";
import { Banco, Cliente, Conta } from "./banco";

export class App {
    private banco: Banco;
    private input = promptSync();

    constructor() {
        this.banco = new Banco();
        this.banco.carregarDados();
    }

    public menu(): void {
        let opcao: string = "";

        do {
            console.log("\n=== Bem-vindo ao Banco ===\n");

            console.log("Contas:\n" +
                "01 - Inserir\n" +
                "02 - Consultar\n" +
                "03 - Sacar\n" +
                "04 - Depositar\n" +
                "05 - Excluir\n" +
                "06 - Transferir\n" +
                "07 - Transferir p/ vários\n" +
                "08 - Totalizações\n" +
                "09 - Mudar titularidade\n" +
                "10 - Listar contas sem cliente\n" +
                "11 - Atribuir titularidade\n" +
                "12 - Atualizar conta\n"
            );

            console.log("Clientes:\n" +
                "20 - Inserir\n" +
                "21 - Consultar\n" +
                "22 - Associar\n" +
                "23 - Excluir\n" +
                "24 - Listar contas de cliente\n" +
                "25 - Totalizar saldo de cliente\n" +
                "26 - Atualizar cliente\n"
            );

            console.log("0 - Sair\n");

            opcao = this.input("Opção: ");

            switch (opcao) {
                case "01": this.inserirConta(); break;
                case "02": this.consultarConta(); break;
                case "03": this.sacarConta(); break;
                case "04": this.depositarConta(); break;
                case "05": this.excluirConta(); break;
                case "06": this.transferir(); break;
                case "07": this.transferirParaVarios(); break;
                case "08": this.totalizacoes(); break;
                case "09": this.mudarTitularidade(); break;
                case "10": this.listarContasSemCliente(); break;
                case "11": this.atribuirTitularidade(); break;
                case "12": this.atualizarConta(); break;
                case "20": this.inserirCliente(); break;
                case "21": this.consultarCliente(); break;
                case "22": this.associarContaCliente(); break;
                case "23": this.excluirCliente(); break;
                case "24": this.listarContasCliente(); break;
                case "25": this.totalizarSaldoCliente(); break;
                case "26": this.atualizarCliente(); break;
                case "0":
                    console.log("Aplicação encerrada."); break;
                default:
                    console.log("Opção inválida!"); break;
            }

            if (opcao !== "0") this.input("\nOperação finalizada. Pressione <enter> para continuar...");

        } while (opcao !== "0");
    }

    private inserirConta(): void {
        const numero = this.input("Número da conta: ");
        const saldo = parseFloat(this.input("Saldo inicial: "));
        const id = this.banco.contas.length + 1;
        this.banco.inserirConta(new Conta(id, numero, new Date(), saldo));
    }

    private consultarConta(): void {
        const numero = this.input("Número da conta: ");
        const conta = this.banco.contas.find(c => c.numeroConta === numero);
        if (conta) {
            console.log(`Conta: ${conta.numeroConta}, Saldo: ${conta.saldo.toFixed(2)}, Cliente: ${conta.cliente?.nome ?? "Sem titular"}`);
        } else console.log("Conta não encontrada.");
    }

    private sacarConta(): void {
        const numero = this.input("Número da conta: ");
        const valor = parseFloat(this.input("Valor para sacar: "));
        this.banco.sacar(numero, valor);
    }

    private depositarConta(): void {
        const numero = this.input("Número da conta: ");
        const valor = parseFloat(this.input("Valor para depositar: "));
        this.banco.depositar(numero, valor);
    }

    private excluirConta(): void {
        const numero = this.input("Número da conta: ");
        this.banco.excluirConta(numero, true);
    }

    private transferir(): void {
        const origem = this.input("Conta de origem: ");
        const destino = this.input("Conta de destino: ");
        const valor = parseFloat(this.input("Valor da transferência: "));
        this.banco.transferir(origem, destino, valor);
    }

    private transferirParaVarios(): void {
        const origem = this.input("Conta de origem: ");
        const destinos = this.input("Contas destino (separadas por vírgula): ").split(",");
        const valor = parseFloat(this.input("Valor da transferência: "));
        this.banco.transferirParaVarios(origem, destinos, valor);
    }

    private totalizacoes(): void {
        console.log("Quantidade de contas:", this.banco.quantidadeContas());
        console.log("Total saldo todas contas:", this.banco.totalSaldoTodasContas().toFixed(2));
        console.log("Média saldo contas:", this.banco.mediaSaldoContas().toFixed(2));
    }

    private mudarTitularidade(): void {
        const numero = this.input("Número da conta: ");
        const cpf = this.input("CPF do novo titular: ");
        this.banco.mudarTitularidade(numero, cpf);
    }

    private listarContasSemCliente(): void {
        const contasSem = this.banco.listarContasSemCliente();
        console.log("Contas sem titular:", contasSem.map(c => c.numeroConta).join(", "));
    }

    private atribuirTitularidade(): void {
        const cpf = this.input("CPF do cliente: ");
        const contasNums = this.input("Números das contas sem titular (vírgula separadas): ").split(",");
        this.banco.atribuirTitularidade(contasNums, cpf);
    }

    private atualizarConta(): void {
        const numeroConta = this.input("Número da conta a atualizar: ");
        const novoNumero = this.input("Novo número da conta (ou vazio): ");
        const novoSaldo = this.input("Novo saldo (ou vazio): ");
        const novaData = this.input("Nova data de abertura (AAAA-MM-DD) (ou vazio): ");
        this.banco.atualizarConta(numeroConta, {
            numeroConta: novoNumero || undefined,
            saldo: novoSaldo ? parseFloat(novoSaldo) : undefined,
            dataDeAbertura: novaData ? new Date(novaData) : undefined
        });
    }

    private inserirCliente(): void {
        const id = this.banco.clientes.length + 1;
        const nome = this.input("Nome do cliente: ");
        const cpf = this.input("CPF do cliente: ");
        const data = new Date(this.input("Data de nascimento (AAAA-MM-DD): "));
        this.banco.inserirCliente(new Cliente(id, nome, cpf, data));
    }

    private consultarCliente(): void {
        const cpf = this.input("CPF do cliente: ");
        const cliente = this.banco.consultarCliente(cpf);
        if (cliente) {
            console.log(`Cliente: ${cliente.nome}, CPF: ${cliente.cpf}, Contas: ${cliente.contas.map(c => c.numeroConta).join(", ")}`);
        } else console.log("Cliente não encontrado.");
    }

    private associarContaCliente(): void {
        const numeroConta = this.input("Número da conta: ");
        const cpf = this.input("CPF do cliente: ");
        this.banco.associarContaCliente(numeroConta, cpf);
    }

    private excluirCliente(): void {
        const cpf = this.input("CPF do cliente: ");
        const removerContas = this.input("Remover contas associadas? (s/n): ").toLowerCase() === "s";
        this.banco.excluirCliente(cpf, removerContas);
    }

    private listarContasCliente(): void {
        const cpf = this.input("CPF do cliente: ");
        const contas = this.banco.listarContasCliente(cpf);
        if (contas.length === 0) console.log("Nenhuma conta encontrada para este cliente.");
        else console.log("Contas do cliente:", contas.map(c => c.numeroConta).join(", "));
    }

    private totalizarSaldoCliente(): void {
        const cpf = this.input("CPF do cliente: ");
        this.banco.totalizarSaldoCliente(cpf);
    }

    private atualizarCliente(): void {
        const cpf = this.input("CPF do cliente a atualizar: ");
        const novoNome = this.input("Novo nome (ou deixe vazio para não alterar): ");
        const novoCpf = this.input("Novo CPF (ou deixe vazio): ");
        const novaData = this.input("Nova data de nascimento (AAAA-MM-DD) (ou vazio): ");
        this.banco.atualizarCliente(cpf, {
            nome: novoNome || undefined,
            cpf: novoCpf || undefined,
            dataNascimento: novaData ? new Date(novaData) : undefined
        });
    }
}


const app = new App();
app.menu();
