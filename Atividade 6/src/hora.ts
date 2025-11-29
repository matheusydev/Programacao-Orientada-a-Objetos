class Hora {
  private _h: number;
  private _m: number;
  private _s: number;

  constructor(h: number, m: number, s: number) {
    this._h = h;
    this._m = m;
    this._s = s;
  }

  get h(): number {
    return this._h;
  }

  get m(): number {
    return this._m;
  }

  get s(): number {
    return this._s;
  }

  public mostrarHorario(): string {
    let hStr = String(this.h).padStart(2, "0");
    let mStr = String(this.m).padStart(2, "0");
    let sStr = String(this.s).padStart(2, "0");

    return `${hStr}h:${mStr}m:${sStr}s`;
  }
}

let horaAtual: Hora = new Hora(7, 5, 9);
console.log(horaAtual.mostrarHorario());
