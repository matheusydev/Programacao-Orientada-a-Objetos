"use strict";
// 4. Considerando a implementação da aplicação bancária, implemente:
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.ContaImposto = exports.Poupanca = exports.Cliente = exports.Conta = void 0;
// a. Implemente na classe Banco o método renderJuros(numero: string): void, onde:
// i. É passado por parâmetro o número de uma poupança e feita uma consulta para ver se a conta existe. Note que a consulta não se altera sendo Conta ou Poupança;
// ii. Caso a poupança seja encontrada, teste se realmente se trata de uma poupança com o operador instanceof, desconsidere a operação caso contrário;
// iii. Caso seja, faça um cast e invoque o método renderJuros da própria instância encontrada;
// iv. Teste o método da classe Banco passando tanto um número de poupança como de conta passados inseridos anteriormente;
// v. Altere a aplicação anteriormente sugerida para ter a opção de menu “Render Juros”.
class Conta {
    _id;
    _numero;
    _saldo;
    _cliente;
    _dataDeAbertura;
    constructor(numero, saldo) {
        this._id = 0;
        this._numero = numero;
        this._saldo = saldo;
        this._dataDeAbertura = new Date();
    }
    sacar(valor) {
        this._saldo = this._saldo - valor;
    }
    depositar(valor) {
        this._saldo = this._saldo + valor;
    }
    get saldo() {
        return this._saldo;
    }
    transferir(contaDestino, valor) {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    get numero() {
        return this._numero;
    }
    get id() {
        return this._id;
    }
    set id(umId) {
        this._id = umId;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(umCliente) {
        if (umCliente) {
            this._cliente = umCliente;
        }
    }
}
exports.Conta = Conta;
class Poupanca extends Conta {
    _taxaJuros;
    constructor(numero, saldo, taxaJuros) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    }
    renderJuros() {
        let juros = (this.saldo * this._taxaJuros) / 100;
        this.depositar(juros);
    }
}
exports.Poupanca = Poupanca;
class ContaImposto extends Conta {
    _taxaDesconto;
    constructor(numero, saldo, taxaDesconto) {
        super(numero, saldo);
        this._taxaDesconto = taxaDesconto;
    }
    //reescrevi o método modificando seu comportamento
    sacar(valor) {
        let desconto = (this.saldo * this._taxaDesconto) / 100;
        let total = valor + desconto;
        super.sacar(total);
    }
}
exports.ContaImposto = ContaImposto;
class Cliente {
    _id;
    _nome;
    _cpf;
    _dataNascimento;
    _contas;
    constructor(nome, cpf, dataNascimento) {
        this._id = 0;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }
    get id() {
        return this._id;
    }
    set id(umId) {
        this._id = umId;
    }
    get cpf() {
        return this._cpf;
    }
    get nome() {
        return this._nome;
    }
    get contas() {
        return this._contas;
    }
}
exports.Cliente = Cliente;
class Banco {
    _contas;
    _clientes;
    _idClienteAtual;
    _idContaAtual;
    constructor() {
        this._contas = [];
        this._clientes = [];
        this._idClienteAtual = 1;
        this._idContaAtual = 1;
    }
    inserirConta(conta) {
        conta.id = this._idContaAtual++;
        if (!this.consultarConta(conta.numero)) {
            this._contas.push(conta);
        }
    }
    consultarConta(numero) {
        let contaProcurada;
        for (let conta of this._contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }
    consultarContaPorIndice(numero) {
        let indiceProcurado = -1;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    }
    excluir(numero) {
        let indiceProcurado = this.consultarContaPorIndice(numero);
        if (indiceProcurado != -1) {
            if (this.consultarConta("numero").cliente) {
                return;
            }
            for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }
    alterar(conta) {
        let contaProcurada = this.consultarConta(conta.numero);
        if (contaProcurada) {
            contaProcurada = conta;
        }
    }
    inserirCliente(cliente) {
        cliente.id = this._idClienteAtual++;
        if (!this.consultarCliente(cliente.cpf)) {
            this._clientes.push(cliente);
        }
    }
    consultarCliente(cpf) {
        let clienteProcurado;
        for (let cliente of this._clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    }
    excluirCliente(cpf) {
        let indice = this._clientes.findIndex((c) => c.cpf == cpf);
        if (indice >= 0 && this._clientes[indice].contas.length == 0) {
            this._clientes.splice(indice, 1);
        }
    }
    sacar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }
    depositar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        let contaOrigem = this.consultarConta(numeroOrigem);
        let contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }
    renderJuros(numero) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            if (contaProcurada instanceof Poupanca) {
                contaProcurada.renderJuros();
                /* o cast é desnecessário após o if conforme abaixo.
                           Cortesia do typescript
                           contaProcurada.renderJuros();
                        */
            }
        }
    }
    associarContaCliente(numeroConta, cpfCliente) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfCliente);
        if (contaProcurada &&
            clienteProcurado &&
            !this.jaExisteContaParaCliente(clienteProcurado.cpf, contaProcurada.numero)) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.contas.push(contaProcurada);
        }
    }
    jaExisteContaParaCliente(cpf, numero) {
        let contaProcurada = this.consultarConta(numero);
        let clienteProcurado = this.consultarCliente(cpf);
        if (!contaProcurada && !clienteProcurado) {
            return false;
        }
        if (contaProcurada.cliente == null) {
            return false;
        }
        if (contaProcurada.cliente.cpf == clienteProcurado.cpf) {
            return true;
        }
        for (let contaAssociada of clienteProcurado.contas) {
            if (contaAssociada.numero == contaProcurada.numero) {
                return true;
                break;
            }
        }
        /*
        let conta2 = this.pesquisarContaPorCPF(clienteProcurado.cpf)
        if (conta2) {
                if (conta2.numero = contaProcurada.numero) {
                    return true;
                    }
                    }*/
        return false;
    }
    pesquisarContaPorCPF(cpf) {
        let contaProcurada;
        for (let conta of this._contas) {
            if (conta.cliente && conta.cliente.cpf == cpf) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }
    listarContasSemCliente() {
        let contas = [];
        for (let conta of this._contas) {
            if (!conta.cliente) {
                contas.push(conta);
            }
        }
        return contas;
    }
    listarContasCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let contas = [];
        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }
    totalizarSaldoCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let total = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo;
            }
        }
        return total;
    }
    obterQuantidadeDeContas() {
        return this._contas.length;
    }
    obterTotalDinheiroDepositado() {
        let total = 0;
        for (let conta of this._contas) {
            total = total + conta.saldo;
        }
        return total;
    }
    calcularMediaSaldoContas() {
        return this.obterTotalDinheiroDepositado() / this.obterQuantidadeDeContas();
    }
    realizarOrdemBancaria(numeroContaOrigem, numerosContasDestino, valor) {
        let contaOrigem = this.consultarConta(numeroContaOrigem);
        //TODO: validar se o saldo suporta as n transferências
        if (!contaOrigem) {
            return;
        }
        for (let numeroDestino of numerosContasDestino) {
            let contaDestino = this.consultarConta(numeroDestino);
            if (contaDestino) {
                contaOrigem.sacar(valor);
                contaDestino.depositar(valor);
            }
        }
    }
    transferirTitularidade(numeroConta, cpf) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpf);
        if (!contaProcurada && !clienteProcurado) {
            return;
        }
        if (this.jaExisteContaParaCliente(clienteProcurado.cpf, contaProcurada.numero)) {
            return;
        }
        this.associarContaCliente(contaProcurada.numero, clienteProcurado.cpf);
    }
    carregarDados() {
        let conta1 = new Conta("111-1", 300);
        let conta2 = new Conta("222-2", 0);
        let conta3 = new Conta("333-3", 0);
        let conta4 = new Conta("444-4", 0);
        this.inserirConta(conta1);
        this.inserirConta(conta2);
        this.inserirConta(conta3);
        this.inserirConta(conta4);
        let cliente1 = new Cliente("Ely", "825", new Date(1979, 6, 29));
        let cliente2 = new Cliente("Nicolas", "999", new Date(2004, 4, 24));
        this.inserirCliente(cliente1);
        this.inserirCliente(cliente2);
        this.associarContaCliente("111-1", "825");
        this.associarContaCliente("222-2", "999");
        this.associarContaCliente("333-3", "825");
    }
}
exports.Banco = Banco;
// b. Adicione a aplicação a possibilidade de ter o cadastro de ContaImposto feita em sala de aula. Foi necessário alterar alguma coisa na classe Banco ou apenas na classe App?
// Não foi necessário alterar a classe Banco. Graças ao polimorfismo, os métodos da classe Banco que recebem um parâmetro do tipo Conta também aceitam qualquer uma de suas subclasses.
// A única alteração necessária foi na classe App, no método inserirConta(), para adicionar a lógica que permite ao usuário escolher criar uma ContaImposto e instanciar o objeto correspondente.
