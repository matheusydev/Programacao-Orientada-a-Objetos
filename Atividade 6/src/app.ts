import prompt from "prompt-sync";
import { Conta, Cliente, Banco } from "./banco";

let input = prompt();
let b: Banco = new Banco();
b.carregarDados()

let opcao: string = '';

do {
    console.log('\nBem-vindo! Escolha uma opção:');
    console.log('Contas:');
    console.log('01 - Inserir       02 - Consultar  03 - Sacar');
    console.log('04 - Depositar     05 - Excluir  06 - Transferir');
    console.log('07 - Totalizações  08 - Realizar ordem bancária');
    console.log('09 - Transferir Titularidade  10 - Contas sem clientes');
    console.log('Clientes:');
    console.log('20 - Inserir    21 - Consultar   22 - Associar ');
    console.log('23 - Total aplicado por cliente  24 - Listar contas');
    console.log('0 - Sair');
    opcao = input("Opção: ");
    switch (opcao) {
        case "01":
            inserirConta();
            break;
        case "02":
            consultarConta();
            break;
        case "03":
            sacar();
            break;
        case "04":
            depositar();
            break;
        case "05":
            excluirConta();
            break;
        case "06":
            transferir();
            break;
        case "07":
            totalizacoes();
            break;
        case "08":
            realizarOrdemBancaria();
            break;
        case "09":
            transferirTitularidade();
            break;

        case "10":
            listarContasSemClientes();
            break;
        case "20":
            inserirCliente();
            break;

        case "21":
            consultarCliente();
            break;
        case "22":
            associarContaCliente();
            break;
        case "23":
            totalizarSaldoCliente();
            break;
        case "24":
            listarContasCliente();
            break;            
        case "0":
            console.log("Saindo...");
            break;
        default:
            console.log("Opção inválida!");
    }
    input("Operação finalizada. Pressione <Enter> para continuar.");
} while (opcao != "0");

console.log("Aplicação encerrada.");

function inserirConta(): void {
    console.log("\nCadastrar conta:");
    let numero: string = input('Digite o número da conta: ');
    let saldo: number = parseFloat(input('Digite o saldo inicial da conta: '));
    let conta: Conta = new Conta(numero, saldo); // Cliente será associado posteriormente
    b.inserirConta(conta);
    console.log("Conta cadastrada com sucesso!");
}

function sacar(): void {
    console.log("\nSaque:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do saque: '));
    b.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}

function depositar(): void {
    console.log("\nDepósito:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do depósito: '));
    b.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}

function transferir(): void {
    console.log("\nTransferência:");
    let numeroOrigem: string = input('Digite o número da conta de origem: ');
    let numeroDestino: string = input('Digite o número da conta de destino: ');
    let valor: number = parseFloat(input('Digite o valor da transferência: '));
    b.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}

function consultarConta(): void {
    console.log("\nConsultar conta:");
    let numero: string = input('Digite o número da conta: ');
    exibirExtrato(numero);
}


function exibirExtrato(numero: string): void {
    const conta = b.consultarConta(numero);
    if (conta) {
        const cliente = conta.cliente;
        console.log("\n=== Extrato da Conta ===");
        console.log(`ID: ${conta.id}`);
        console.log(`Número da conta: ${conta.numero}`);
        console.log(`Saldo: ${conta.saldo}`);
        if (cliente) {
            console.log("\n=== Dados do Cliente ===");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.cpf}`);
            /*
            console.log("Contas associadas:");
            cliente.contas.forEach((c) =>
                console.log(`- Conta: ${c.numero}, Saldo: ${c.saldo}`)
            );
            */
        } else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    } else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}


function excluirConta(): void {
    console.log("\nExcluir conta:");
    let numero: string = input('Digite o número da conta: ');
    b.excluir(numero);
    console.log("Conta excluída com sucesso.");
}


function totalizacoes(): void {
    console.log("\nTotalizações:");
    console.log(`Quantidade de contas: ${b.obterQuantidadeDeContas()}`);
    console.log(`Total depositado no banco: ${b.obterTotalDinheiroDepositado()}`);
    console.log(`Média de saldo das contas: ${b.calcularMediaSaldoContas()}`);
}

function inserirCliente(): void {
    console.log("\nCadastrar cliente:");
    let nome: string = input('Digite o nome do cliente: ');
    let cpf: string = input('Digite o CPF do cliente: ');
    let dataNascimento: Date = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    let cliente: Cliente = new Cliente(nome, cpf, dataNascimento);
    b.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso");
}

function consultarCliente(): void {
    console.log("\nConsultar cliente:");
    let cpf: string = input('Digite o CPF do cliente: ');
    let cliente = b.consultarCliente(cpf);
    if (cliente) {
        console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
    } else {
        console.log("Cliente não encontrado.");
    }
}

function associarContaCliente(): void {
    console.log("\nAssociar conta a cliente:");
    let numeroConta: string = input('Digite o número da conta: ');
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    b.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso");
}

function totalizarSaldoCliente(): void {
    console.log("\Totalizar saldo por cliente:");
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    let total = b.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}



function realizarOrdemBancaria() {
    console.log("\Realizar ordem bancária");
    let numeroConta: string = input('Digite o número da conta de origem: ');
    let valor: number = Number(input('Valor a ser transferido para cada conta: '));
    let numeros: string[] = input('Digite os números das constas separadas por espaço: ').split(" ");
    b.realizarOrdemBancaria(numeroConta, numeros, valor);
    console.log(numeros);

    console.log("\Conta de origem");
    exibirExtrato(numeroConta);
    console.log("\Contas de destino");
    for (let numero of numeros) {
        exibirExtrato(numero);

    }

    console.log("Ordem bancária realizada com sucesso.")
}
function transferirTitularidade() {
    console.log("\Transferir titularidade de conta");
    let numeroConta: string = input('Digite o número da conta: ');
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    b.transferirTitularidade(numeroConta, cpfCliente);
    exibirExtrato(numeroConta);
    console.log("Transferência de titularidade realizada com sucesso");    
}

function listarContasSemClientes() {
    console.log("\Listar contas sem clientes");
    let contas: Conta[] = b.listarContasSemCliente();

    for (let conta of contas) {
        exibirExtrato(conta.numero);
    }
}

function listarContasCliente() {
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    let contas: Conta[] = b.listarContasCliente(cpfCliente);
    for (let conta of contas) {
        exibirExtrato(conta.numero);
    }
}
