"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hora {
    _h;
    _m;
    _s;
    constructor(h, m, s) {
        this._h = h;
        this._m = m;
        this._s = s;
    }
    get h() {
        return this._h;
    }
    get m() {
        return this._m;
    }
    get s() {
        return this._s;
    }
    mostrarHorario() {
        let hStr = String(this.h).padStart(2, "0");
        let mStr = String(this.m).padStart(2, "0");
        let sStr = String(this.s).padStart(2, "0");
        return `${hStr}h:${mStr}m:${sStr}s`;
    }
}
let horaAtual = new Hora(7, 5, 9);
console.log(horaAtual.mostrarHorario());
