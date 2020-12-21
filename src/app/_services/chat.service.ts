import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { WebSocketService } from "./websocket.service";

const CHAT_URL = environment.wsUrl;

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<string>;

  constructor(wsService: WebSocketService) {
    this.messages = <Subject<string>>wsService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): string => {
        console.log(response);
        return response.data;
      }
    ));
  }
}