"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralDrones = void 0;
const DroneEntrega_1 = require("./DroneEntrega");
const Excecoes_1 = require("./Excecoes");
class CentralDrones {
    _drones;
    constructor() {
        this._drones = [];
    }
    get drones() {
        return this._drones;
    }
    cadastrar(drone) {
        this.drones.push(drone);
    }
    consultar(id) {
        const droneEncontrado = this.drones.find((drone) => drone.id === id);
        if (!droneEncontrado) {
            throw new Excecoes_1.DroneNaoEncontradoException();
        }
        return droneEncontrado;
    }
    listar() {
        return this.drones;
    }
    voar(id, minutosVoo, minutosFilmagem = 0, cargaKg = 0) {
        const drone = this.consultar(id);
        if (cargaKg > 0 && !(drone instanceof DroneEntrega_1.DroneEntrega)) {
            throw new Excecoes_1.DroneInvalidoException();
        }
        if (drone instanceof DroneEntrega_1.DroneEntrega) {
            drone.voar(minutosVoo, minutosFilmagem, cargaKg);
        }
        else {
            drone.voar(minutosVoo, minutosFilmagem);
        }
    }
}
exports.CentralDrones = CentralDrones;
