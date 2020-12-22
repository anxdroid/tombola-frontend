import { Inject, Injectable, Optional } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Messaggio } from "../_models/messaggio";
import { WebSocketService } from "./websocket.service";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public wsService!: WebSocketService;
  public connections: any[] = [];

  constructor(wsService: WebSocketService) {
    this.wsService = wsService;
  }

  public start(sessionId:number, userId: number) {
    let connection = <Subject<Messaggio>>this.wsService.connect(environment.wsUrl+"/"+sessionId+"/"+userId).pipe(map(
      (response: MessageEvent): Messaggio => {
        //console.log(response);
        return JSON.parse(response.data);
      }
    )
    );
    this.connections.push(connection);
    return connection;
  }
}
