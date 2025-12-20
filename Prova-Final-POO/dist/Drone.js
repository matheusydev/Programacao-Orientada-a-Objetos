"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drone = void 0;
const Excecoes_1 = require("./Excecoes");
class Drone {
    _id;
    _modelo;
    _autonomiaBateria;
    constructor(id, modelo, autonomiaBateria) {
        this._id = id;
        this._modelo = modelo;
        this._autonomiaBateria = autonomiaBateria;
    }
    get id() {
        return this._id;
    }
    get autonomiaBateria() {
        return this._autonomiaBateria;
    }
    set autonomiaBateria(autonomiaBateria) {
        this._autonomiaBateria = autonomiaBateria;
    }
    voar(minutosVoo, minutosFilmagem) {
        const consumoTotal = 2 * minutosVoo + minutosFilmagem;
        if (this.autonomiaBateria < consumoTotal) {
            throw new Excecoes_1.AutonomiaBateriaException();
        }
        this.autonomiaBateria -= consumoTotal;
    }
}
exports.Drone = Drone;
