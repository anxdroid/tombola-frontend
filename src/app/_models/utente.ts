import { Injectable } from "@angular/core";

@Injectable()
export class Utente {
  userId: Number = 0;
  numeroCartelle: Number = 0;


  constructor(userId: Number, numeroCartelle:Number) {
    this.numeroCartelle = numeroCartelle;
    this.userId = userId;
  }
}
