import { Banco, Cliente, Conta } from "./banco";

const banco = new Banco();

const cli1 = new Cliente(1, "Mitsuki Miyawaki", "111.111.111-11", new Date("1990-09-23"));
const cli2 = new Cliente(2, "BeKarly Marina Loaizato", "222.222.222-22", new Date("1994-07-17"));
const cli3 = new Cliente(3, "Laufey Lín Bing", "333.333.333-33", new Date("1999-04-23"));
const cli4 = new Cliente(4, "Amala Ratna Zandile", "444.444.444-44", new Date("1995-10-21"));
const cli5 = new Cliente(5, "Sia Kate Isobelle", "555.555.555-55", new Date("1975-12-18"));

banco.inserirCliente(cli1);
banco.inserirCliente(cli2);
banco.inserirCliente(cli3);
banco.inserirCliente(cli4);
banco.inserirCliente(cli5);

const c1 = new Conta(1, "0001", new Date(), 1000);
const c2 = new Conta(2, "0002", new Date(), 200);
const c3 = new Conta(3, "0003", new Date(), 50);
const c4 = new Conta(4, "0004", new Date(), 0);
const c5 = new Conta(5, "0005", new Date(), 500);

banco.inserirConta(c1);
banco.inserirConta(c2);
banco.inserirConta(c3);
banco.inserirConta(c4);
banco.inserirConta(c5);

banco.associarContaCliente("0001", "111.111.111-11");
banco.associarContaCliente("0002", "111.111.111-11");
banco.associarContaCliente("0003", "111.111.111-11");
banco.associarContaCliente("0004", "111.111.111-11");
banco.associarContaCliente("0005", "222.222.222-22");

console.log("\n--- transferirParaVarios ---");
console.log("Saldos antes:", banco.contas.map(c => `${c.numeroConta}:${c.saldo}`));
const res = banco.transferirParaVarios("0001", ["0002", "0003", "0004"], 300);
console.log("Resultado:", res);
console.log("Saldos depois:", banco.contas.map(c => `${c.numeroConta}:${c.saldo}`));

console.log("\n--- quantidadeContas / totalSaldoTodasContas / mediaSaldoContas ---");
console.log("Quantidade de contas:", banco.quantidadeContas());
console.log("Total saldo todas contas:", banco.totalSaldoTodasContas());
console.log("Média saldo contas:", banco.mediaSaldoContas());

console.log("\n--- mudarTitularidade ---");
console.log("Titular antes de 0005:", c5.cliente?.nome ?? "sem titular");
banco.mudarTitularidade("0005", "333.333.333-33");
console.log("Titular depois de 0005:", c5.cliente?.nome ?? "sem titular");
console.log("Contas de Laufey:", banco.listarContasCliente("333.333.333-33").map(c => c.numeroConta));

console.log("\n--- excluirCliente (dessociar contas) ---");
banco.excluirCliente("111.111.111-11", false);
console.log("Clientes atuais:", banco.clientes.map(c => c.nome));
console.log("Contas sem titular:", banco.listarContasSemCliente().map(c => c.numeroConta));

console.log("\n--- atribuirTitularidade ---");
const sem = banco.listarContasSemCliente().map(c => c.numeroConta);
console.log("Contas sem titular antes:", sem);
banco.atribuirTitularidade(sem, "222.222.222-22");
console.log("Contas de Beto:", banco.listarContasCliente("222.222.222-22").map(c => c.numeroConta));

console.log("\n--- excluirConta (remover cliente se ficar sem contas) ---");
console.log("Clientes antes:", banco.clientes.map(c => `${c.nome}:${c.contas.length}`));
banco.excluirConta("0005", true);
console.log("Clientes depois:", banco.clientes.map(c => `${c.nome}:${c.contas.length}`));
console.log("Contas restantes:", banco.contas.map(c => c.numeroConta));

console.log("\n--- transferir simples / sacar / depositar ---");
banco.depositar("0002", 100);
banco.sacar("0002", 50);
banco.transferir("0002", "0003", 200);
console.log("Saldos finais:", banco.contas.map(c => `${c.numeroConta}:${c.saldo}`));