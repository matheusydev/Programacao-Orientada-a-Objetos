import { Drone } from "./Drone";
import { DroneEntrega } from "./DroneEntrega";
import { CentralDrones } from "./CentralDrones";
import {
  AutonomiaBateriaException,
  DroneNaoEncontradoException,
  DroneInvalidoException
} from "./Excecoes";

/**
 * testes.ts
 * Execute com ts-node (ou compile com tsc e rode com node).
 */

export class Testes {

  private _notaTotal: number = 0;
  private _notaMaxima: number = 10;

  public executar(): void {
    console.log("=== INÍCIO DOS TESTES ===");
    console.log(`Nota máxima: ${this._notaMaxima}\n`);

    this.executarTeste(1, 1, "Voo em Drone e DroneEntrega",
      () => this.teste1());

    this.executarTeste(2, 1, "Drone com autonomia insuficiente",
      () => this.teste2());

    this.executarTeste(3, 1, "DroneEntrega com autonomia insuficiente",
      () => this.teste3());

    this.executarTeste(4, 1, "Central.consultar inexistente",
      () => this.teste4());

    this.executarTeste(5, 1, "Central.voar simples em Drone",
      () => this.teste5());

    this.executarTeste(6, 1, "Central.voar com carga em Drone inválido",
      () => this.teste6());

    this.executarTeste(7, 1, "Sequência de voos acumulados",
      () => this.teste7());

    // NOVO TESTE 8 (mais complexo que listar)
    this.executarTeste(8, 1, "Central.voar com carga em DroneEntrega + checar tipo e autonomia",
      () => this.teste8());

    // TESTE MAIS VALIOSO POR ÚLTIMO
    this.executarTeste(9, 2, "Fluxo completo integrado do sistema",
      () => this.teste9());

    console.log("\n=== RESULTADO FINAL ===");
    console.log(`Nota final: ${this._notaTotal}/${this._notaMaxima}`);
  }

  /* =======================
     MÉTODOS DE APOIO
     ======================= */

  private executarTeste(
    numero: number,
    valor: number,
    descricao: string,
    teste: () => void
  ): void {
    console.log(`Teste ${numero} (${valor} ponto(s)) — ${descricao}`);
    try {
      teste();
      this._notaTotal += valor;
      console.log(`✅ PASSOU (+${valor}) | Parcial: ${this._notaTotal}/${this._notaMaxima}\n`);
    } catch (e: any) {
      console.log(`❌ FALHOU | Motivo: ${e.message}`);
      console.log(`Parcial: ${this._notaTotal}/${this._notaMaxima}\n`);
    }
  }

  private assert(condicao: boolean, mensagem: string): void {
    if (!condicao) throw new Error(mensagem);
  }

  private consumoDrone(minVoo: number, minFilm: number): number {
    return (2 * minVoo) + minFilm;
  }

  private consumoEntrega(minVoo: number, minFilm: number, cargaKg: number): number {
    return (2 * minVoo) + minFilm + (3 * cargaKg);
  }

  /* =======================
     TESTES
     ======================= */

  private teste1(): void {
    const d = new Drone(1, "D1", 100);
    const e = new DroneEntrega(2, "E1", 100);

    d.voar(10, 5);          // consumo 25
    e.voar(10, 5, 2);       // consumo 31

    this.assert(d.autonomiaBateria === 75, "Autonomia incorreta do Drone");
    this.assert(e.autonomiaBateria === 69, "Autonomia incorreta do DroneEntrega");
  }

  private teste2(): void {
    const d = new Drone(3, "D2", 10);
    const before = d.autonomiaBateria;
    try {
      d.voar(6, 0); // consumo 12
      throw new Error("Exceção não lançada");
    } catch (e) {
      this.assert(e instanceof AutonomiaBateriaException, "Exceção incorreta");
      this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
    }
  }

  private teste3(): void {
    const e = new DroneEntrega(4, "E2", 20);
    const before = e.autonomiaBateria;
    try {
      e.voar(10, 0, 1); // consumo 23
      throw new Error("Exceção não lançada");
    } catch (err) {
      this.assert(err instanceof AutonomiaBateriaException, "Exceção incorreta");
      this.assert(e.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
    }
  }

  private teste4(): void {
    const c = new CentralDrones();
    try {
      c.consultar(999);
      throw new Error("Exceção não lançada");
    } catch (e) {
      this.assert(e instanceof DroneNaoEncontradoException, "Exceção incorreta");
    }
  }

  private teste5(): void {
    const c = new CentralDrones();
    const d = new Drone(10, "D3", 100);
    c.cadastrar(d);

    c.voar(10, 10, 5, 0); // consumo 25
    this.assert(d.autonomiaBateria === 75, "Autonomia incorreta após voo via Central");
  }

  private teste6(): void {
    const c = new CentralDrones();
    const d = new Drone(11, "D4", 100);
    c.cadastrar(d);
    const before = d.autonomiaBateria;

    try {
      c.voar(11, 5, 5, 1);
      throw new Error("Exceção não lançada");
    } catch (e) {
      this.assert(e instanceof DroneInvalidoException, "Exceção incorreta");
      this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
    }
  }

  private teste7(): void {
    const d = new Drone(12, "D5", 100);
    d.voar(5, 0);
    d.voar(3, 2);
    d.voar(1, 1);

    const esperado = 100 - (
      this.consumoDrone(5, 0) +
      this.consumoDrone(3, 2) +
      this.consumoDrone(1, 1)
    );

    this.assert(d.autonomiaBateria === esperado, "Autonomia incorreta após sequência de voos");
  }

  // NOVO TESTE 8 (mais complexo)
  private teste8(): void {
    const c = new CentralDrones();
    const e = new DroneEntrega(30, "E-Central", 100);
    c.cadastrar(e);

    // confirmar tipo ao consultar
    const consultado = c.consultar(30);
    this.assert(consultado instanceof DroneEntrega, "Drone consultado não é DroneEntrega");

    // voo com carga via central
    const mv = 8, mf = 4, carga = 2; // consumo = 16 + 4 + 6 = 26
    c.voar(30, mv, mf, carga);

    const esperado = 100 - this.consumoEntrega(mv, mf, carga);
    this.assert(e.autonomiaBateria === esperado, "Autonomia incorreta após voo com carga via Central");
  }

  // TESTE MAIS VALIOSO
  private teste9(): void {
    const c = new CentralDrones();
    const d = new Drone(20, "D6", 100);
    const e = new DroneEntrega(21, "E6", 100);

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
    } catch (err) {
      this.assert(err instanceof DroneInvalidoException, "Exceção incorreta");
      this.assert(d.autonomiaBateria === before, "Autonomia foi alterada indevidamente");
    }
  }
}

// Execução
new Testes().executar();
