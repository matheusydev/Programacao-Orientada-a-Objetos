"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testes = void 0;
const Drone_1 = require("./Drone");
const DroneEntrega_1 = require("./DroneEntrega");
const CentralDrones_1 = require("./CentralDrones");
const Excecoes_1 = require("./Excecoes");
/**
 * testes.ts
 * Execute com ts-node (ou compile com tsc e rode com node).
 */
class Testes {
    _notaTotal = 0;
    _notaMaxima = 10;
    executar() {
        console.log("=== INÍCIO DOS TESTES ===");
        console.log(`Nota máxima: ${this._notaMaxima}\n`);
        this.executarTeste(1, 1, "Voo em Drone e DroneEntrega", () => this.teste1());
        this.executarTeste(2, 1, "Drone com autonomia insuficiente", () => this.teste2());
        this.executarTeste(3, 1, "DroneEntrega com autonomia insuficiente", () => this.teste3());
        this.executarTeste(4, 1, "Central.consultar inexistente", () => this.teste4());
        this.executarTeste(5, 1, "Central.voar simples em Drone", () => this.teste5());
        this.executarTeste(6, 1, "Central.voar com carga em Drone inválido", () => this.teste6());
        this.executarTeste(7, 1, "Sequência de voos acumulados", () => this.teste7());
        // NOVO TESTE 8 (mais complexo que listar)
        this.executarTeste(8, 1, "Central.voar com carga em DroneEntrega + checar tipo e autonomia", () => this.teste8());
        // TESTE MAIS VALIOSO POR ÚLTIMO
        this.executarTeste(9, 2, "Fluxo completo integrado do sistema", () => this.teste9());
        console.log("\n=== RESULTADO FINAL ===");
        console.log(`Nota final: ${this._notaTotal}/${this._notaMaxima}`);
    }
    /* =======================
       MÉTODOS DE APOIO
       ======================= */
    executarTeste(numero, valor, descricao, teste) {
        console.log(`Teste ${numero} (${valor} ponto(s)) — ${descricao}`);
        try {
            teste();
            this._notaTotal += valor;
            console.log(`✅ PASSOU (+${valor}) | Parcial: ${this._notaTotal}/${this._notaMaxima}\n`);
        }
        catch (e) {
            console.log(`❌ FALHOU | Motivo: ${e.message}`);
            console.log(`Parcial: ${this._notaTotal}/${this._notaMaxima}\n`);
        }
    }
    assert(condicao, mensagem) {
        if (!condicao)
            throw new Error(mensagem);
    }
    consumoDrone(minVoo, minFilm) {
        return (2 * minVoo) + minFilm;
    }
    consumoEntrega(minVoo, minFilm, cargaKg) {
        return (2 * minVoo) + minFilm + (3 * cargaKg);
    }
    /* =======================
       TESTES
       ======================= */
    teste1() {
        const d = new Drone_1.Drone(1, "D1", 100);
        const e = new DroneEntrega_1.DroneEntrega(2, "E1", 100);
        d.voar(10, 5); // consumo 25
        e.voar(10, 5, 2); // consumo 31
        this.assert(d.autonomiaBateria === 75, "Autonomia incorreta do Drone");
        this.assert(e.autonomiaBateria === 69, "Autonomia incorreta do DroneEntrega");
    }
    teste2() {
        const d = new Drone_1.Drone(3, "D2", 10);
        const before = d.autonomiaBateria;
        try {
            d.voar(6, 0); // consumo 12
            throw new Error("Exceção não lançada");
        }
        catch (e) {
            this.assert(e instanceof Excecoes_1.AutonomiaBateriaException, "Exceção incorreta");
            this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
        }
    }
    teste3() {
        const e = new DroneEntrega_1.DroneEntrega(4, "E2", 20);
        const before = e.autonomiaBateria;
        try {
            e.voar(10, 0, 1); // consumo 23
            throw new Error("Exceção não lançada");
        }
        catch (err) {
            this.assert(err instanceof Excecoes_1.AutonomiaBateriaException, "Exceção incorreta");
            this.assert(e.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
        }
    }
    teste4() {
        const c = new CentralDrones_1.CentralDrones();
        try {
            c.consultar(999);
            throw new Error("Exceção não lançada");
        }
        catch (e) {
            this.assert(e instanceof Excecoes_1.DroneNaoEncontradoException, "Exceção incorreta");
        }
    }
    teste5() {
        const c = new CentralDrones_1.CentralDrones();
        const d = new Drone_1.Drone(10, "D3", 100);
        c.cadastrar(d);
        c.voar(10, 10, 5, 0); // consumo 25
        this.assert(d.autonomiaBateria === 75, "Autonomia incorreta após voo via Central");
    }
    teste6() {
        const c = new CentralDrones_1.CentralDrones();
        const d = new Drone_1.Drone(11, "D4", 100);
        c.cadastrar(d);
        const before = d.autonomiaBateria;
        try {
            c.voar(11, 5, 5, 1);
            throw new Error("Exceção não lançada");
        }
        catch (e) {
            this.assert(e instanceof Excecoes_1.DroneInvalidoException, "Exceção incorreta");
            this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
        }
    }
    teste7() {
        const d = new Drone_1.Drone(12, "D5", 100);
        d.voar(5, 0);
        d.voar(3, 2);
        d.voar(1, 1);
        const esperado = 100 - (this.consumoDrone(5, 0) +
            this.consumoDrone(3, 2) +
            this.consumoDrone(1, 1));
        this.assert(d.autonomiaBateria === esperado, "Autonomia incorreta após sequência de voos");
    }
    // NOVO TESTE 8 (mais complexo)
    teste8() {
        const c = new CentralDrones_1.CentralDrones();
        const e = new DroneEntrega_1.DroneEntrega(30, "E-Central", 100);
        c.cadastrar(e);
        // confirmar tipo ao consultar
        const consultado = c.consultar(30);
        this.assert(consultado instanceof DroneEntrega_1.DroneEntrega, "Drone consultado não é DroneEntrega");
        // voo com carga via central
        const mv = 8, mf = 4, carga = 2; // consumo = 16 + 4 + 6 = 26
        c.voar(30, mv, mf, carga);
        const esperado = 100 - this.consumoEntrega(mv, mf, carga);
        this.assert(e.autonomiaBateria === esperado, "Autonomia incorreta após voo com carga via Central");
    }
    // TESTE MAIS VALIOSO
    teste9() {
        const c = new CentralDrones_1.CentralDrones();
        const d = new Drone_1.Drone(20, "D6", 100);
        const e = new DroneEntrega_1.DroneEntrega(21, "E6", 100);
        c.cadastrar(d);
        c.cadastrar(e);
        // voo simples
        c.voar(20, 10, 5, 0);
        this.assert(d.autonomiaBateria === 75, "Autonomia incorreta no voo simples");
        // voo com carga
        const mv2 = 8, mf2 = 4, carga2 = 2;
        c.voar(21, mv2, mf2, carga2);
        const esperadoE = 100 - this.consumoEntrega(mv2, mf2, carga2);
        this.assert(e.autonomiaBateria === esperadoE, "Autonomia incorreta no voo com carga");
        // tentativa inválida: carga em drone básico
        const before = d.autonomiaBateria;
        try {
            c.voar(20, 1, 0, 1);
            throw new Error("Exceção não lançada");
        }
        catch (err) {
            this.assert(err instanceof Excecoes_1.DroneInvalidoException, "Exceção incorreta");
            this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
        }
    }
}
exports.Testes = Testes;
// Execução
new Testes().executar();
