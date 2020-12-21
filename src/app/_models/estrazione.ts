import { Injectable } from "@angular/core";

@Injectable()
export class Estrazione {
  sessionId: Number = 0;
  userId: Number = 0;
  number: Number = 0;
  constructor(sessionId:Number, userId: Number, number: Number) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.number = number;
  }
}
