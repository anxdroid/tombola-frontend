import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../_models';
import { Cartella } from '../_models/cartella';
import { Estrazione } from '../_models/estrazione';
import { Messaggio } from '../_models/messaggio';
import { Numero } from '../_models/numero';
import { Sessione } from '../_models/sessione';
import { Tombola } from '../_models/tombola';
import { AuthenticationService, AlertService, UserService } from '../_services';
import { ChatService } from '../_services/chat.service';
import { TombolaService } from '../_services/tombola.service';
import { WebSocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-cartelle',
  templateUrl: './cartelle.component.html',
  styleUrls: ['./cartelle.component.less'],
  providers: [WebSocketService, ChatService]
})
export class CartelleComponent implements OnInit {
  [x: string]: any;
  // session
  sessionId: number = 0;
  session: Sessione = new Sessione(0, 0);
  lastSeq: number = -1;

  //
  //numero: Numero = { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "", "text": "", "translation": "" };

  // utente
  currentUser: User;
  users: User[] = [];
  owner: boolean = false;

  // form
  cartelleForm: FormGroup = this.formBuilder.group({
    numeroCartelle: ['', Validators.required],
  });
  loading = false;
  submitted = false;

  // cartelle
  savedCount = 0;
  numeroCartelle: number = 0;
  cartelle: Cartella[] = [];
  estratti: Estrazione[] = [];
  estratto: Numero = new Numero();

  // numeri
  risultati = Tombola.risultati;
  numeri = Tombola.numeriSprumpya;
  winner = false;
  paid = false;

  // websocket
  lastMessage: string = "";
  connection: any;

  constructor(
    private formBuilder: FormBuilder,
    private tombolaService: TombolaService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private chatService: ChatService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  get f() { return this.cartelleForm.controls; }

  public saveCartella(cartella: Cartella, count: boolean) {
    this.tombolaService.saveCartella(this.sessionId, this.currentUser.id, cartella).subscribe(
      data => {

        if (data.id !== undefined) {
          cartella.id = +data.id;
          console.log(data.id, cartella);
          console.log(this.cartelle);
        }

        if (count) {
          this.savedCount++;
          if (this.savedCount == this.numeroCartelle) {
            this.send("joinUser", { numeroCartelle: this.numeroCartelle })
            console.log("Done saving !");
          }
        }
      },
      error => {
        this.alertService.error(error);
      });
  }

  // salva le cartelle create
  public save(): void {
    this.savedCount = 0;

    for (let cartella of this.cartelle) {
      cartella.risultatiArray = [];
      console.log("save", cartella);
      this.saveCartella(cartella, true);
    }
  }

  // cerca un numero nella cartella
  public numberInCartella(randomNumber: number, cartella: Cartella): boolean {
    for (let r in cartella.numeri) {
      if (cartella.indici[r].includes(randomNumber)) {
        return true;
      }
    }
    return false;
  }

  // genera le cartelle
  public setCartelle(): void {
    this.numeroCartelle = this.f.numeroCartelle.value;
    //console.log(this.numeroCartelle);
    this.cartelle = [];
    for (let ca = 0; ca < +this.numeroCartelle; ca++) {
      let cartella = new Cartella(this.sessionId, this.currentUser.id);
      cartella.risultatiArray = [];
      for (let r = 0; r < 3; r++) {
        cartella.risultatiArray.push(0);
        let riga: Numero[] = [];
        let indici: number[] = [];
        for (let c = 0; c < 5; c++) {
          let randomNumber = Math.floor((Math.random() * 90));
          while (randomNumber == 0 || indici.includes(randomNumber) || this.numberInCartella(randomNumber, cartella)) {
            //console.log(randomNumber+" already in cartella "+ca);
            randomNumber = Math.floor((Math.random() * 90));
          }
          indici.push(+randomNumber);
        }
        indici.sort((a, b) => { return +a - (+b) });
        //console.log(indici);
        for (let i in indici) {
          if (this.numeri[+indici[i] - 1] !== undefined) {
            riga.push(this.numeri[+indici[i] - 1]);
            this.numeri[+indici[i] - 1].cartelle.push(ca);
          }
        }
        //console.log(riga);
        cartella.numeri.push(riga);
        cartella.indici.push(indici);

      }
      this.cartelle.push(cartella);
    }
    console.log("setCartelle", this.cartelle);
  }

  // utile per i cicli for nel codice html
  public createRange(number: number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
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

  // carica lo stato delle cartelle dal backend
  public resume(): void {
    if (this.sessionId > 0) {
      // carico le info sulla sessione
      this.tombolaService.getSession(this.sessionId).subscribe(
        session => {
          this.session = session;
          console.log(this.session);
          // carico le cartelle
          this.tombolaService.resumeCartelle(this.sessionId, this.currentUser.id).subscribe(
            cartelle => {
              this.cartelle = [];
              this.savedCount = 0;
              this.numeroCartelle = 0;
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
                this.numeroCartelle++;
              }
              // carico i numeri estratti
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
                    console.log("Saved !", cartella);
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

  // ricezione dei messaggi da websocket
  public receive(message: Messaggio): void {
    if (+message.userId != +this.currentUser.id) {
      if (message.command == "forceSync") {
        this.sync();
      }

      // nuova estrazione
      if (message.command == "extract") {
        this.paid = false;
        let payload = message.payload;
        let numero = this.numeri[+payload.number - 1];
        if (+payload.seq > this.lastSeq) {
          this.lastSeq = +payload.seq;
          this.session.ultimoSeq = this.lastSeq;
          //console.log("New seq:" + this.lastSeq);
        }
        this.estratto = numero;
        this.estratti.push(new Estrazione(message.sessionId, message.userId, +payload.number));
        this.selectNumber(numero);
        this.check(true);
      }

      if (message.command == "joinUser") {
        this.lastMessage = this.getUserById(+message.userId).username + " si è connesso con " + message.payload.numeroCartelle + " cartelle !";
      }

      if (message.command == "notifyPrize") {
        this.lastMessage = "Hai vinto " + message.payload.prize + " EUR !";
        this.winner = false;
        this.paid = true;
      }

      if (message.command == "notifyWinners") {
        //console.log(message.payload.winners, this.risultati[+message.payload.result].perc);
        let risultato = this.risultati[+message.payload.result]
        //let premio = risultato.premio / message.payload.winners.length;
        let winners: string = "";
        for (let winnerId of message.payload.winners) {
          if (winners != "") {
            winners += ", ";
          }
          winners += this.getUserById(+winnerId).username
        }
        if (message.payload.winners.includes(this.currentUser.id)) {
          this.lastMessage = "Complimenti ! Hai fatto " + risultato.label + "!";
          this.winner = true;
        } else {
          this.lastMessage = winners + " ha" + (message.payload.winners.length > 1 ? "nno" : "") + " fatto " + risultato.label;
        }
      }
    }
  }

  // invio di messaggi su websocket
  public send(command: string, payload: any) {
    let messaggio = new Messaggio();
    messaggio.sessionId = this.sessionId;
    messaggio.command = command;
    messaggio.payload = payload;
    messaggio.userId = this.currentUser.id;
    messaggio.date = new Date();
    this.connection.next(messaggio);
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
    this.lastMessage = "";
    this.setupWs();
    this.resume();
  }

  ngOnInit(): void {
    this.estratti = [];
    this.cartelle = [];
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
        console.log(this.users);
      },
      error => {
        this.alertService.error(error);
      });

    this.route.params.subscribe(params => {
      this.sessionId = params['sessionId'];

      this.tombolaService.getSession(this.sessionId).subscribe(
        session => {
          this.session = session;
          // resume dei dati da backend
          if (this.session.userId != this.currentUser.id) {
            this.sync();
          } else {
            this.lastMessage = "Partita non giocabile ! (Sei forse il cartellone ?)";
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
    });
  }
}
// https://www.universonline.it/_tempo_libero/sogni/smorfia-napoletana/img/1-smorfia-napoletana.jpg
