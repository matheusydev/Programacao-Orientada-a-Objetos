import { Drone } from "./Drone";
import { DroneEntrega } from "./DroneEntrega";
import {DroneNaoEncontradoException, DroneInvalidoException,} from "./Excecoes";

class CentralDrones {
  private _drones: Drone[];

  constructor() {
    this._drones = [];
  }

  get drones(): Drone[] {
    return this._drones;
  }

  cadastrar(drone: Drone): void {
    this.drones.push(drone);
  }

  consultar(id: number): Drone {
    const droneEncontrado = this.drones.find((drone) => drone.id === id);
    if (!droneEncontrado) {
      throw new DroneNaoEncontradoException();
    }
    return droneEncontrado;
  }

  listar(): Drone[] {
    return this.drones;
  }

  voar(
    id: number,
    minutosVoo: number,
    minutosFilmagem: number = 0,
    cargaKg: number = 0
  ): void {
    const drone = this.consultar(id);

    if (cargaKg > 0 && !(drone instanceof DroneEntrega)) {
      throw new DroneInvalidoException();
    }
    

    if (drone instanceof DroneEntrega) {
      drone.voar(minutosVoo, minutosFilmagem, cargaKg);
    } 
    else {
      drone.voar(minutosVoo, minutosFilmagem);
    }
  }
}

export { CentralDrones };