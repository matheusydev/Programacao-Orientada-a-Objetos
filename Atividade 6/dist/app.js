"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const banco_1 = require("./banco");
let input = (0, prompt_sync_1.default)();
let b = new banco_1.Banco();
b.carregarDados();
let opcao = '';
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
function inserirConta() {
    console.log("\nCadastrar conta:");
    let numero = input('Digite o número da conta: ');
    let saldo = parseFloat(input('Digite o saldo inicial da conta: '));
    let conta = new banco_1.Conta(numero, saldo); // Cliente será associado posteriormente
    b.inserirConta(conta);
    console.log("Conta cadastrada com sucesso!");
}
function sacar() {
    console.log("\nSaque:");
    let numero = input('Digite o número da conta: ');
    let valor = parseFloat(input('Digite o valor do saque: '));
    b.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}
function depositar() {
    console.log("\nDepósito:");
    let numero = input('Digite o número da conta: ');
    let valor = parseFloat(input('Digite o valor do depósito: '));
    b.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}
function transferir() {
    console.log("\nTransferência:");
    let numeroOrigem = input('Digite o número da conta de origem: ');
    let numeroDestino = input('Digite o número da conta de destino: ');
    let valor = parseFloat(input('Digite o valor da transferência: '));
    b.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}
function consultarConta() {
    console.log("\nConsultar conta:");
    let numero = input('Digite o número da conta: ');
    exibirExtrato(numero);
}
function exibirExtrato(numero) {
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
        }
        else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    }
    else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}
function excluirConta() {
    console.log("\nExcluir conta:");
    let numero = input('Digite o número da conta: ');
    b.excluir(numero);
    console.log("Conta excluída com sucesso.");
}
function totalizacoes() {
    console.log("\nTotalizações:");
    console.log(`Quantidade de contas: ${b.obterQuantidadeDeContas()}`);
    console.log(`Total depositado no banco: ${b.obterTotalDinheiroDepositado()}`);
    console.log(`Média de saldo das contas: ${b.calcularMediaSaldoContas()}`);
}
function inserirCliente() {
    console.log("\nCadastrar cliente:");
    let nome = input('Digite o nome do cliente: ');
    let cpf = input('Digite o CPF do cliente: ');
    let dataNascimento = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    let cliente = new banco_1.Cliente(nome, cpf, dataNascimento);
    b.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso");
}
function consultarCliente() {
    console.log("\nConsultar cliente:");
    let cpf = input('Digite o CPF do cliente: ');
    let cliente = b.consultarCliente(cpf);
    if (cliente) {
        console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
    }
    else {
        console.log("Cliente não encontrado.");
    }
}
function associarContaCliente() {
    console.log("\nAssociar conta a cliente:");
    let numeroConta = input('Digite o número da conta: ');
    let cpfCliente = input('Digite o CPF do cliente: ');
    b.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso");
}
function totalizarSaldoCliente() {
    console.log("\Totalizar saldo por cliente:");
    let cpfCliente = input('Digite o CPF do cliente: ');
    let total = b.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}
function realizarOrdemBancaria() {
    console.log("\Realizar ordem bancária");
    let numeroConta = input('Digite o número da conta de origem: ');
    let valor = Number(input('Valor a ser transferido para cada conta: '));
    let numeros = input('Digite os números das constas separadas por espaço: ').split(" ");
    b.realizarOrdemBancaria(numeroConta, numeros, valor);
    console.log(numeros);
    console.log("\Conta de origem");
    exibirExtrato(numeroConta);
    console.log("\Contas de destino");
    for (let numero of numeros) {
        exibirExtrato(numero);
    }
    console.log("Ordem bancária realizada com sucesso.");
}
function transferirTitularidade() {
    console.log("\Transferir titularidade de conta");
    let numeroConta = input('Digite o número da conta: ');
    let cpfCliente = input('Digite o CPF do cliente: ');
    b.transferirTitularidade(numeroConta, cpfCliente);
    exibirExtrato(numeroConta);
    console.log("Transferência de titularidade realizada com sucesso");
}
function listarContasSemClientes() {
    console.log("\Listar contas sem clientes");
    let contas = b.listarContasSemCliente();
    for (let conta of contas) {
        exibirExtrato(conta.numero);
    }
}
function listarContasCliente() {
    let cpfCliente = input('Digite o CPF do cliente: ');
    let contas = b.listarContasCliente(cpfCliente);
    for (let conta of contas) {
        exibirExtrato(conta.numero);
    }
}
