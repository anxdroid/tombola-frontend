import { Inject, Injectable, Optional } from "@angular/core";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { WebSocketService } from "./websocket.service";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public sessionId = 0;
  public wsService!: WebSocketService;
  public connection: any;

  constructor(wsService: WebSocketService) {
    this.wsService = wsService;
  }

  public start(sessionId:number) {
    this.sessionId = sessionId;
    return <Subject<string>>this.wsService.connect(environment.wsUrl+"/"+this.sessionId).pipe(map(
      (response: MessageEvent): string => {
        console.log(response);
        return response.data;
      }
    )
    );
  }

  public send(message:string) {
    console.log("Sending "+message)
    this.connection.next(message);
  }
}
