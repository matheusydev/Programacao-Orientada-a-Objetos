import { AutonomiaBateriaException } from "./Excecoes";

class Drone {
  private _id: number;
  private _modelo: string;
  protected _autonomiaBateria: number;

  constructor(id: number, modelo: string, autonomiaBateria: number) {
    this._id = id;
    this._modelo = modelo;
    this._autonomiaBateria = autonomiaBateria;
  }

  get id(): number {
    return this._id;
  }

  get autonomiaBateria(): number {
    return this._autonomiaBateria;
  }

  set autonomiaBateria(autonomiaBateria: number) {
    this._autonomiaBateria = autonomiaBateria;
  }

  voar(minutosVoo: number, minutosFilmagem: number): void {
    const consumoTotal = 2 * minutosVoo + minutosFilmagem;

    if (this.autonomiaBateria < consumoTotal) {
      throw new AutonomiaBateriaException();
    }

    this.autonomiaBateria -= consumoTotal;
  }
}

export { Drone };