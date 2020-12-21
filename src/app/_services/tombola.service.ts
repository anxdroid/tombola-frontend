import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Estrazione } from '../_models/estrazione';
import { Sessione } from '../_models/sessione';
import { Cartella } from '../_models/cartella';


@Injectable({ providedIn: 'root' })
export class TombolaService {
  sessionId: Number = -1;

  constructor(private http: HttpClient) {
  }

  extract(estrazione: Estrazione) {
    console.log(estrazione);
    return this.http.post(`${environment.apiUrl}/tombola/extract`, estrazione);
  }

  newSession(sessione: Sessione) {
    console.log(sessione);
    return this.http.post<Sessione>(`${environment.apiUrl}/tombola/new`, sessione);
  }

  listSessions() {
    return this.http.get<Sessione[]>(`${environment.apiUrl}/tombola/list`);
  }

  resumeSession(sessionId: number) {
    return this.http.get<Estrazione[]>(`${environment.apiUrl}/tombola/resume/${sessionId}`);
  }

  getSession(sessionId: number) {
    return this.http.get<Sessione>(`${environment.apiUrl}/tombola/get/${sessionId}`);
  }

  saveCartella(sessionId:number, userId:number, cartella: Cartella) {
    let payload = {"sessionId": sessionId, "userId": userId, "cartella": cartella};
    return this.http.post<Cartella>(`${environment.apiUrl}/tombola/saveCartella`, payload);
  }

  resumeCartelle(sessionId: number, userId:number) {
    return this.http.get<Cartella[]>(`${environment.apiUrl}/tombola/resumeCartelle/${sessionId}/${userId}`);
  }

  setSessionId(sessionId:Number) {
    this.sessionId = sessionId;
  }

  getSessionId() {
    return this.sessionId;
  }
}
