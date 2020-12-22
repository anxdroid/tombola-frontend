import { Injectable } from "@angular/core";

@Injectable()
export class Sessione {
  userId: Number = 0;
  costoCartella: Number = 0;
  id: Number = 0;
  createdAt: Date = new Date();
  stato: number = 0;
  ultimoRisultato: number = 0;
  userIdUltimoRisultato: number = 0;
  ultimoSeq: number = -1;
  constructor(userId: Number, costoCartella: Number) {
    this.userId = userId;
    this.costoCartella = costoCartella;
  }
}
