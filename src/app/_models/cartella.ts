import { Injectable } from "@angular/core";
import { Numero } from "./numero";
import { v4 as uuid } from 'uuid';

@Injectable()
export class Cartella {
  sessionId: Number = 0;
  userId: Number = 0;
  pagata: boolean = false;
  numeri: Numero[][] = [];
  indici: number[][] = [];
  uuid: string = "";
  id: Number = 0;
  righe: string = "";
  risultati: string = "";
  risultatiArray: number[] = [];
  seq: number = -1;

  constructor(sessionId:Number, userId: Number) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.uuid = uuid();
  }
}
