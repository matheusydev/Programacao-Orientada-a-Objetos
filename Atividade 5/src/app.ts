import promptSync from "prompt-sync";
import { Banco, Cliente, Conta } from "./banco";

const input = promptSync();
const banco: Banco = new Banco();

banco.carregarDados();

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

    opcao = input("Opção: ");

    switch (opcao) {

        case "01": {
            const numero = input("Número da conta: ");
            const saldo = parseFloat(input("Saldo inicial: "));
            const id = banco.contas.length + 1;
            banco.inserirConta(new Conta(id, numero, new Date(), saldo));
            break;
        }

        case "02": {
            const numero = input("Número da conta: ");
            const conta = banco.contas.find(c => c.numeroConta === numero);
            if (conta) {
                console.log(`Conta: ${conta.numeroConta}, Saldo: ${conta.saldo.toFixed(2)}, Cliente: ${conta.cliente?.nome ?? "Sem titular"}`);
            } else console.log("Conta não encontrada.");
            break;
        }

        case "03": {
            const numero = input("Número da conta: ");
            const valor = parseFloat(input("Valor para sacar: "));
            banco.sacar(numero, valor);
            break;
        }

        case "04": {
            const numero = input("Número da conta: ");
            const valor = parseFloat(input("Valor para depositar: "));
            banco.depositar(numero, valor);
            break;
        }

        case "05": {
            const numero = input("Número da conta: ");
            banco.excluirConta(numero, true);
            break;
        }

        case "06": {
            const origem = input("Conta de origem: ");
            const destino = input("Conta de destino: ");
            const valor = parseFloat(input("Valor da transferência: "));
            banco.transferir(origem, destino, valor);
            break;
        }

        case "07": {
            const origem = input("Conta de origem: ");
            const destinos = input("Contas destino (separadas por vírgula): ").split(",");
            const valor = parseFloat(input("Valor da transferência: "));
            banco.transferirParaVarios(origem, destinos, valor);
            break;
        }

        case "08": {
            console.log("Quantidade de contas:", banco.quantidadeContas());
            console.log("Total saldo todas contas:", banco.totalSaldoTodasContas().toFixed(2));
            console.log("Média saldo contas:", banco.mediaSaldoContas().toFixed(2));
            break;
        }

        case "09": {
            const numero = input("Número da conta: ");
            const cpf = input("CPF do novo titular: ");
            banco.mudarTitularidade(numero, cpf);
            break;
        }

        case "10": {
            const contasSem = banco.listarContasSemCliente();
            console.log("Contas sem titular:", contasSem.map(c => c.numeroConta).join(", "));
            break;
        }

        case "11": {
            const cpf = input("CPF do cliente: ");
            const contasNums = input("Números das contas sem titular (vírgula separadas): ").split(",");
            banco.atribuirTitularidade(contasNums, cpf);
            break;
        }

        case "12": {
            const numeroConta = input("Número da conta a atualizar: ");
            const novoNumero = input("Novo número da conta (ou vazio): ");
            const novoSaldo = input("Novo saldo (ou vazio): ");
            const novaData = input("Nova data de abertura (AAAA-MM-DD) (ou vazio): ");
            banco.atualizarConta(numeroConta, {
                numeroConta: novoNumero || undefined,
                saldo: novoSaldo ? parseFloat(novoSaldo) : undefined,
                dataDeAbertura: novaData ? new Date(novaData) : undefined
            });
            break;
        }

        case "20": {
            const id = banco.clientes.length + 1;
            const nome = input("Nome do cliente: ");
            const cpf = input("CPF do cliente: ");
            const data = new Date(input("Data de nascimento (AAAA-MM-DD): "));
            banco.inserirCliente(new Cliente(id, nome, cpf, data));
            break;
        }

        case "21": {
            const cpf = input("CPF do cliente: ");
            const cliente = banco.consultarCliente(cpf);
            if (cliente) {
                console.log(`Cliente: ${cliente.nome}, CPF: ${cliente.cpf}, Contas: ${cliente.contas.map(c => c.numeroConta).join(", ")}`);
            } else console.log("Cliente não encontrado.");
            break;
        }

        case "22": {
            const numeroConta = input("Número da conta: ");
            const cpf = input("CPF do cliente: ");
            banco.associarContaCliente(numeroConta, cpf);
            break;
        }

        case "23": {
            const cpf = input("CPF do cliente: ");
            const removerContas = input("Remover contas associadas? (s/n): ").toLowerCase() === "s";
            banco.excluirCliente(cpf, removerContas);
            break;
        }

        case "24": {
            const cpf = input("CPF do cliente: ");
            const contas = banco.listarContasCliente(cpf);
            if (contas.length === 0) {
                console.log("Nenhuma conta encontrada para este cliente.");
            } else {
                console.log("Contas do cliente:", contas.map(c => c.numeroConta).join(", "));
            }
            break;
        }

        case "25": {
            const cpf = input("CPF do cliente: ");
            banco.totalizarSaldoCliente(cpf);
            break;
        }

        case "26": {
            const cpf = input("CPF do cliente a atualizar: ");
            const novoNome = input("Novo nome (ou deixe vazio para não alterar): ");
            const novoCpf = input("Novo CPF (ou deixe vazio): ");
            const novaData = input("Nova data de nascimento (AAAA-MM-DD) (ou vazio): ");
            banco.atualizarCliente(cpf, {
                nome: novoNome || undefined,
                cpf: novoCpf || undefined,
                dataNascimento: novaData ? new Date(novaData) : undefined
            });
            break;
        }

        case "0":
            console.log("Aplicação encerrada.");
            break;

        default:
            console.log("Opção inválida!");
            break;
    }

    if (opcao !== "0") input("\nOperação finalizada. Pressione <enter> para continuar...");

} while (opcao !== "0");
