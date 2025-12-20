"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneInvalidoException = exports.DroneNaoEncontradoException = exports.AutonomiaBateriaException = void 0;
class AutonomiaBateriaException extends Error {
    constructor(message = "Autonomia da bateria é insuficiente.") {
        super(message);
        this.name = "AutonomiaBateriaException";
    }
}
exports.AutonomiaBateriaException = AutonomiaBateriaException;
class DroneNaoEncontradoException extends Error {
    constructor(message = "Não foi localizado o ID do drone. Drone não encontrado!") {
        super(message);
        this.name = "DroneNaoEncontradoException";
    }
}
exports.DroneNaoEncontradoException = DroneNaoEncontradoException;
class DroneInvalidoException extends Error {
    constructor(message = "Apenas Drones de Entrega podem transportar carga.") {
        super(message);
        this.name = "DroneInvalidoException";
    }
}
exports.DroneInvalidoException = DroneInvalidoException;
