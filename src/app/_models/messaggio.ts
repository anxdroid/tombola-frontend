import { Injectable } from "@angular/core";

@Injectable()
export class Messaggio {
  sessionId: Number = 0;
  userId: Number = 0;
  command: string = '';
  payload: any = '';
  date: Date = new Date();
}
