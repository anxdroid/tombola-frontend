import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { Cartella } from '../_models/cartella';
import { Estrazione } from '../_models/estrazione';
import { Messaggio } from '../_models/messaggio';

import { Numero } from '../_models/numero';
import { Sessione } from '../_models/sessione';
import { Utente } from '../_models/utente';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { ChatService } from '../_services/chat.service';
import { TombolaService } from '../_services/tombola.service';
import { WebSocketService } from '../_services/websocket.service';

import { Tombola } from '../_models/tombola';
import { PropertyRead } from '@angular/compiler';

@Component({
  selector: 'app-cartellone',
  templateUrl: './cartellone.component.html',
  styleUrls: ['./cartellone.component.less'],
  providers: [WebSocketService, ChatService]
})
export class CartelloneComponent implements OnInit {

  // sessione
  sessionId: number = 0;
  session!: Sessione;
  lastSeq: number = -1;

  //cartellone: Numero[][] = [];
  // cartellone
  savedCount = 0;
  numeroCartelle = 6;
  cartelle: Cartella[] = [];

  // numeri
  risultati = Tombola.risultati;
  numeri = Tombola.numeriSprumpya;

  // estrazioni
  waiting: boolean = true;
  estratti: Estrazione[] = [];
  numero: Numero = { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "", "text": "", "translation": "" };

  // premi
  montepremi: number = 0;
  mustPay: boolean = false;
  lastPremio: number = 0;
  latestWinners: number[] = [];

  // utenti
  currentUser: User;
  users: User[] = [];
  utentiConnessi: Utente[] = [];
  utentiConnessiIndex: number[] = [];

  // websocket
  connection: any;
  lastMessage: string = "";

  constructor(
    private tombolaService: TombolaService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  public objectKeys(obj: any) {
    return Object.keys(obj);
  }

  public pay(): void {
    this.send("notifyPrize", { users: this.latestWinners, prize: this.lastPremio });
    this.mustPay = false;
  }

  public receive(message: Messaggio): void {
    if (+message.sessionId == this.sessionId) {
      if (+message.userId != +this.currentUser.id && message.command != 'notifyPrize') {
        if (message.command == "notifySyncStatus") {
          //console.log(message);
          if (message.payload.sync == 100 && message.payload.seq == this.session.ultimoSeq && this.utentiConnessi.length > 1) {
            this.lastMessage = "Tutti gli utenti sono in sync !";
            //console.log("All in sync ! Move on !");
            this.waiting = false;
          }
        }
        if (message.command == "joinUser") {
          this.userService.getAll().subscribe(
            users => {
              this.users = users;

              this.waiting = true;
              this.lastMessage = this.getUserById(+message.userId).username + " si è connesso con " + message.payload.numeroCartelle + " cartelle !";
              // solo in fase di inizio partita e se un utente non era già dentro
              if (!this.utentiConnessiIndex.includes(+message.userId)) {
                this.utentiConnessi.push(new Utente(message.userId, message.payload.numeroCartelle));
                this.utentiConnessiIndex.push(+message.userId)
                this.montepremi += message.payload.numeroCartelle * +this.session.costoCartella;
                this.waiting = false;

                for (let ri of this.objectKeys(this.risultati)) {
                  let risultato = this.risultati[ri];
                  risultato.premio = this.montepremi * risultato.perc / 100;
                }
              }
            },
            error => {
              this.alertService.error(error);
            });
        }

        if (message.command == "notifyWinners") {
          //console.log(message.payload.winners, this.risultati[+message.payload.result].perc);
          this.mustPay = true;
          let risultato = this.risultati[+message.payload.result]
          if (+message.payload.result == 15) {
            this.session.stato = 2;
          }
          this.lastPremio = risultato.premio / message.payload.winners.length;
          this.latestWinners = message.payload.winners;
          let winners: string = "";
          this.risultati[+message.payload.result].users = message.payload.winners;
          for (let winnerId of this.latestWinners) {
            if (winners != "") {
              winners += ", ";
            }
            winners += this.getUserById(+winnerId).username
          }
          if (this.latestWinners.includes(this.currentUser.id)) {
            this.lastMessage = "Complimenti ! Hai fatto " + risultato.label + "!";
          } else {
            this.lastMessage = winners + " ha" + (this.latestWinners.length > 1 ? "nno" : "") + " fatto " + risultato.label + " vincendo " + this.lastPremio + " EUR" + (this.latestWinners.length > 1 ? " a testa" : "");
          }
        }
      } else {
        console.log("Discarded", message);
      }
    }
  }

  public send(command: string, payload: any) {
    let messaggio = new Messaggio();
    messaggio.sessionId = this.sessionId;
    messaggio.command = command;
    messaggio.payload = payload;
    messaggio.userId = this.currentUser.id;
    messaggio.date = new Date();
    this.connection.next(messaggio);
  }

  public extract(): void {
    let ret: boolean = false;
    while (!ret) {
      ret = this.doExtract();
    }
  }

  public doExtract(): boolean {
    let randomIndex = Math.floor((Math.random() * 91));
    if (randomIndex != 0) {
      randomIndex--;
    }

    let numero = this.numeri[randomIndex];
    //console.log(randomIndex, numero);
    if (!numero.issued) {
      this.numero = this.numeri[randomIndex];

      this.selectNumber(this.numero);

      this.tombolaService.getSession(this.sessionId).subscribe(
        session => {
          this.session = session;
          this.session.ultimoSeq++;
          this.lastSeq = this.session.ultimoSeq;
          //console.log("Sending", this.session);

          this.waiting = true;
          this.tombolaService.saveSession(this.session)
            .subscribe(
              data => {
                //console.log(data)
                this.numeri[randomIndex].issued = true;
                let estrazione = new Estrazione(this.sessionId, this.currentUser.id, parseInt(this.numeri[randomIndex].number));
                estrazione.seq = this.session.ultimoSeq;

                this.tombolaService.extract(estrazione)
                  .subscribe(
                    data => {
                      //console.log(data)
                      //this.alertService.success("Saved !", true);
                      this.check(true);
                    },
                    error => {
                      this.alertService.error(error);
                    });
              },
              error => {
                this.alertService.error(error);
              });
        },
        error => {
          this.alertService.error(error);
        });
    } else {
      console.log("Discarding " + randomIndex);
      return false;
    }
    return true;
  }

  // salva la cartella
  public saveCartella(cartella: Cartella, count: boolean) {
    this.tombolaService.saveCartella(this.sessionId, this.currentUser.id, cartella).subscribe(
      data => {
        //console.log(cartella, data);
        if (data.id !== undefined) {
          cartella.id = data.id;
        }
        if (count) {
          this.savedCount++;
        }
      },
      error => {
        this.alertService.error(error);
      });
  }

  // genera il cartellone
  public setCartellone(): void {
    this.cartelle = [];
    let increment = -30;
    for (let ca = 0; ca < this.numeroCartelle; ca++) {
      if (ca % 2 == 0) {
        increment += 30;
      }
      let primoNumero = ((ca % 2) * 5) + 1 + increment;

      let cartella = new Cartella(this.sessionId, this.currentUser.id);
      cartella.risultatiArray = [];
      for (let r = 0; r < 3; r++) {
        let primoNumeroRiga = primoNumero + (10 * r);
        cartella.risultatiArray.push(0);
        let riga: Numero[] = [];
        let indici: number[] = [];
        for (let c = 0; c < 5; c++) {
          let randomNumber = primoNumeroRiga + c;
          //console.log(ca, randomNumber);
          indici.push(+randomNumber);
          this.numeri[+randomNumber - 1].cartelle.push(ca);
          riga.push(this.numeri[+randomNumber - 1]);
        }
        cartella.numeri.push(riga);
        cartella.indici.push(indici);

      }
      this.cartelle.push(cartella);
      this.saveCartella(cartella, true);
    }
    console.log(this.cartelle);
  }

  // controlla i risultati raggiunti
  public check(nuovoNumero: boolean): void {
    let ultimoRisultato = 0;
    for (let cartella of this.cartelle) {
      cartella.totRisultato = 0;
      let risultatoCartella: number = 0;
      cartella.seq = this.lastSeq;
      cartella.risultatiArray = [];
      for (let riga of cartella.numeri) {
        let risultatoRiga = 0;
        for (let numero of riga) {
          if (numero.issued) {
            risultatoRiga++;
            cartella.totRisultato++;
          }
        }
        if (risultatoRiga > risultatoCartella) {
          risultatoCartella = risultatoRiga;
        }
        cartella.risultatiArray.push(risultatoRiga);
      }
      cartella.risultati = JSON.stringify(cartella.risultatiArray);
      cartella.maxRisultato = risultatoCartella;
      if (cartella.maxRisultato > ultimoRisultato) {
        ultimoRisultato = cartella.maxRisultato;
      }
      // Salvo la cartella aggiornata
      if (nuovoNumero) {
        this.saveCartella(cartella, false);
      }
    }
  }

  // seleziona il numero uscito
  public selectNumber(numero: Numero): void {
    //console.log("selecting "+numero, numero.cartelle);
    for (let ca of numero.cartelle) {
      let cartella = this.cartelle[ca];
      //console.log(cartella);
      for (let r in cartella.indici) {
        let riga = cartella.indici[r];
        for (let c in riga) {
          let n = riga[c];
          //console.log(numero.number, n);
          if (+(numero.number) == +n) {
            //console.log(numero.number, n);
            //console.log(n, id);
            cartella.numeri[r][c].issued = true;
          }

        }
      }
    }
  }

  // carica lo stato delle cartelle dal backend
  public resume(): void {
    this.estratti = [];
    this.cartelle = [];
    this.lastMessage = "";
    if (this.sessionId > 0) {
      // carico le info sulla sessione
      this.tombolaService.getSession(this.sessionId).subscribe(
        session => {
          this.session = session;
          // carico le cartelle
          this.tombolaService.resumeCartelle(this.sessionId, this.currentUser.id).subscribe(
            cartelle => {
              this.cartelle = [];
              this.savedCount = 0;
              //this.numeroCartelle = 0;
              // inizializzo i dati dinamici delle cartelle
              for (let caI in cartelle) {
                let cartella = cartelle[caI];
                cartella.risultatiArray = [];
                cartella.indici = JSON.parse(cartella.righe);
                cartella.numeri = [];

                for (let rI in cartella.indici) {
                  cartella.risultatiArray.push();
                  let rigaIndici = cartella.indici[rI];
                  let riga: Numero[] = [];
                  for (let cI in rigaIndici) {

                    let numero = this.numeri[(+rigaIndici[cI]) - 1];
                    numero.cartelle.push(+caI);
                    numero.row = +rI;
                    numero.column = +cI;
                    //console.log(numero);
                    riga.push(numero);
                  }
                  cartella.numeri.push(riga);
                }
                this.cartelle.push(cartella);
                //this.numeroCartelle++;
              }
              // carico i numeri estratti
              this.send("forceSync", {});
              this.tombolaService.resumeSession(this.sessionId).subscribe(
                estratti => {
                  this.estratti = estratti;
                  // cerco i numeri sulle cartelle
                  for (let estratto of this.estratti) {
                    if (+estratto.seq > this.lastSeq) {
                      this.lastSeq = +estratto.seq;
                      console.log("New seq:" + this.lastSeq);
                    }
                    let numero = this.numeri[+estratto.number - 1];
                    if (numero.cartelle.length > 0) {
                      this.selectNumber(numero);
                    }
                  }
                  // controllo i punteggi
                  this.check(false);
                  // allineo i risultati con il backend
                  for (let cartella of this.cartelle) {
                    if (cartella.seq != this.lastSeq) {
                      cartella.seq = this.lastSeq;
                    }
                    this.saveCartella(cartella, true);
                  }
                },
                error => {
                  this.alertService.error(error);
                });

            },
            error => {
              this.alertService.error(error);
            });
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  public getUserById(id: number): User {
    for (let user of this.users) {
      if (user.id == id) {
        return user;
      }
    }
    return new User();
  }

  public setupWs(): void {
    // connessione alla websocket
    this.connection = this.chatService.start(this.sessionId, this.currentUser.id);
    this.connection.subscribe((msg: Messaggio) => { this.receive(msg) });
  }

  public sync(): void {
    this.setupWs();
    this.resume();
  }

  public getUsers(): void {
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
        //console.log(this.users);
      },
      error => {
        this.alertService.error(error);
      });
  }

  ngOnInit(): void {
    this.estratti = [];
    this.cartelle = [];
    this.lastMessage = "";
    this.getUsers();
    this.route.params.subscribe(params => {
      this.sessionId = params['sessionId'];
      this.numeroCartelle = 6;
      this.utentiConnessi = [];
      this.utentiConnessi.push(new Utente(this.currentUser.id, this.numeroCartelle));

      this.tombolaService.getSession(this.sessionId).subscribe(
        session => {
          this.session = session;
          // resume dei dati da backend
          this.montepremi = +this.session.costoCartella * this.numeroCartelle;
          for (let ri of this.objectKeys(this.risultati)) {
            let risultato = this.risultati[ri];
            //console.log(risultato);
            risultato.premio = this.montepremi * risultato.perc / 100;
          }
          if (this.session.stato == 0) {

            this.setupWs();
            this.setCartellone();
          } else {
            this.sync();
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
    });
  }

}
