"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Veiculo {
    placa;
    ano;
    constructor(placa, ano) {
        this.placa = placa;
        this.ano = ano;
    }
}
class Carro extends Veiculo {
    modelo;
    constructor(placa, ano, modelo) {
        super(placa, ano);
        this.modelo = modelo;
    }
}
class CarroEletrico extends Carro {
    autonomiaBateria;
    constructor(placa, ano, modelo, autonomiaBateria) {
        super(placa, ano, modelo);
        this.autonomiaBateria = autonomiaBateria;
    }
}
