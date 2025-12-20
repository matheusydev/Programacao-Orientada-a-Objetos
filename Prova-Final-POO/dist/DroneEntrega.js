"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneEntrega = void 0;
const Drone_1 = require("./Drone");
class DroneEntrega extends Drone_1.Drone {
    constructor(id, modelo, autonomiaBateria) {
        super(id, modelo, autonomiaBateria);
    }
    voar(minutosVoo, minutosFilmagem = 0, cargaKg = 0) {
        super.voar(minutosVoo, minutosFilmagem + 3 * cargaKg);
    }
}
exports.DroneEntrega = DroneEntrega;
