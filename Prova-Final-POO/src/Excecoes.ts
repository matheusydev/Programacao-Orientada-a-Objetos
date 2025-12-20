export class AutonomiaBateriaException extends Error {
  constructor(message: string = "Autonomia da bateria é insuficiente.") {
    super(message);
    this.name = "AutonomiaBateriaException";
  }
}

export class DroneNaoEncontradoException extends Error {
  constructor(message: string = "Não foi localizado o ID do drone. Drone não encontrado!") {
    super(message);
    this.name = "DroneNaoEncontradoException";
  }
}

export class DroneInvalidoException extends Error {
  constructor(
    message: string = "Apenas Drones de Entrega podem transportar carga."
  ) {
    super(message);
    this.name = "DroneInvalidoException";
  }
}
