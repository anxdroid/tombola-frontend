import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { Cartella } from '../_models/cartella';
import { Estrazione } from '../_models/estrazione';
import { Messaggio } from '../_models/messaggio';

import { Numero } from '../_models/numero';
import { Risultato } from '../_models/risultato';
import { Sessione } from '../_models/sessione';
import { Utente } from '../_models/utente';
import { AlertService, AuthenticationService } from '../_services';
import { ChatService } from '../_services/chat.service';
import { TombolaService } from '../_services/tombola.service';
import { WebSocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-cartellone',
  templateUrl: './cartellone.component.html',
  styleUrls: ['./cartellone.component.less'],
  providers: [WebSocketService, ChatService]
})
export class CartelloneComponent implements OnInit {

  sessionId: number = 0;
  session!: Sessione;
  cartellone: Numero[][] = [];
  cartelle: Cartella[] = [];
  estratti: Estrazione[] = [];
  numeri: Numero[] = [
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "1", "text": "L'Italia", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "2", "text": "'A criatura", "translation": "Il bimbo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "3", "text": "'A jatta", "translation": "Il gatto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "4", "text": "'O puorco", "translation": "Il maiale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "5", "text": "'A mano", "translation": "La mano" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "6", "text": "Chella che guarda 'nterra", "translation": "Organo sessuale femminile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "7", "text": "'A scuppetta", "translation": "Il fucile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "8", "text": "'A maronna", "translation": "La madonna" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "9", "text": "'A figliata", "translation": "La prole" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "10", "text": "'E fasule", "translation": "I fagioli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "11", "text": "'E surice", "translation": "I topi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "12", "text": "'E surdate", "translation": "I soldati" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "13", "text": "Sant'Antonio", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "14", "text": "'O mbriaco", "translation": "L'ubriaco" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "15", "text": "'O guaglione", "translation": "Il ragazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "16", "text": "'O culo", "translation": "Il deretano" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "17", "text": "'A disgrazia", "translation": "La disgrazia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "18", "text": "'O sanghe", "translation": " Il sangue" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "19", "text": "'A resata", "translation": "La risata" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "20", "text": "'A festa", "translation": "La festa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "21", "text": "'A femmena annura", "translation": "La donna nuda" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "22", "text": "'O pazzo", "translation": "Il pazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "23", "text": "'O scemo", "translation": "Lo scemo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "24", "text": "'E gguardie", "translation": "Le guardie" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "25", "text": "Natale", "translation": "" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "26", "text": "Nanninella", "translation": "Diminuitivo del nome Anna" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "27", "text": "'O cantero", "translation": "Il vaso da notte" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "28", "text": "'E zzizze", "translation": "Il seno" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "29", "text": "'O pate d''e criature", "translation": "Organo sessuale maschile" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "30", "text": "'E palle d''o tenente", "translation": "Le palle del tenente" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "31", "text": "'O padrone ' e casa", "translation": "Il proprietario di casa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "32", "text": "'O capitone", "translation": "Il capitone" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "33", "text": "Ll'anne ' e Cristo", "translation": "Gli anni di Cristo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "34", "text": "'A capa", "translation": "La testa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "35", "text": "L'aucielluzzo", "translation": "L'uccellino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "36", "text": "'E castagnelle", "translation": "Sorta di petardi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "37", "text": "'O monaco", "translation": "Il frate" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "38", "text": "'E mmazzate", "translation": "Le botte" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "39", "text": "'A funa 'nganna", "translation": "La corda la collo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "40", "text": "'A paposcia", "translation": "Ernia inguinale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "41", "text": "'O curtiello", "translation": "Il coltello" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "42", "text": "'O ccafè", "translation": "Il caffè" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "43", "text": "'A femmena 'ncopp'' o balcone", "translation": "La donna al balcone" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "44", "text": "'E ccancelle", "translation": "Il carcere" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "45", "text": "'O vino", "translation": "Il vino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "46", "text": "'E denare", "translation": "I denari" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "47", "text": "'O muorto", "translation": "Il morto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "48", "text": "'O muorto che parla", "translation": "Il morto che parla" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "49", "text": "'O piezzo ' e carne", "translation": "Il pezzo di carne" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "50", "text": "'O ppane", "translation": "Il pane" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "51", "text": "'O ciardino", "translation": "Il giardino" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "52", "text": "'A mamma", "translation": "La mamma" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "53", "text": "'O viecchio", "translation": "Il vecchio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "54", "text": "'O cappiello", "translation": "Il cappello" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "55", "text": "'A museca", "translation": "La musica" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "56", "text": "'A caruta", "translation": "La caduta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "57", "text": "'O scartellato", "translation": "Il gobbo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "58", "text": "'O paccotto", "translation": "L'imbroglio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "59", "text": "'E pile", "translation": "I peli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "60", "text": "Se lamenta", "translation": "Si lamenta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "61", "text": "'O cacciatore", "translation": "Il cacciatore" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "62", "text": "'O muorto acciso", "translation": "Il morto ammazzato" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "63", "text": "'A sposa", "translation": "La sposa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "64", "text": "'A sciammeria", "translation": "La marsina" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "65", "text": "'O chianto", "translation": "Il pianto" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "66", "text": "'E ddoie zetelle", "translation": "Le due zitelle" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "67", "text": "'O totano int''a chitarra", "translation": "Il totano nella chitarra" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "68", "text": "'A zuppa cotta", "translation": "La zuppa cotta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "69", "text": "Sott'e'ncoppo", "translation": "Sottosopra" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "70", "text": "'O palazzo", "translation": "Il palazzo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "71", "text": "L'ommo 'e merda", "translation": "L'uomo senza princìpi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "72", "text": "'A meraviglia", "translation": "La meraviglia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "73", "text": "'O spitale", "translation": "L'ospedale" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "74", "text": "'A rotta", "translation": "La grotta" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "75", "text": "Pullecenella", "translation": "Pulcinella" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "76", "text": "'A funtana", "translation": "La fontana" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "77", "text": "'E diavule", "translation": "I diavoli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "78", "text": "'A bella figliola", "translation": "La bella ragazza" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "79", "text": "'O mariuolo", "translation": "Il ladro" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "80", "text": "'A vocca", "translation": "La bocca" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "81", "text": "'E sciure", "translation": "I fiori" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "82", "text": "'A tavula 'mbandita", "translation": "La tavola imbandita" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "83", "text": "'O maletiempo", "translation": "Il maltempo" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "84", "text": "'A cchiesa", "translation": "La chiesa" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "85", "text": "Ll'aneme 'o priatorio", "translation": "Le anime del purgatorio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "86", "text": "'A puteca", "translation": "Il negozio" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "87", "text": "'E perucchie", "translation": "I pidocchi" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "88", "text": "'E casecavalle", "translation": "I caciocavalli" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "89", "text": "'A vecchia", "translation": "La vecchia" },
    { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "90", "text": "'A paura", "translation": "La paura" }
  ];

  risultati: any = {
    2: new Risultato("ambo", 5),
    3: new Risultato("terno", 10),
    4: new Risultato("quaterna", 15),
    5: new Risultato("cinquina", 20),
    15: new Risultato("tombola", 50)
  };

  montepremi: number = 0;

  closeNumbers: number[][] = [];
  closeNumbersOld: number[][] = [];
  newClose: boolean[][] = [];
  //myWebSocket: WebSocketSubject<string> = webSocket('ws://localhost:1337');

  waiting: boolean = true;
  numero: Numero = { "cartelle": [], "row": -1, "column": -1, "issued": false, "number": "", "text": "", "translation": "" };
  currentUser: User;

  connection: any;

  lastMessage: string = "";

  utentiConnessi: Utente[] = [];

  lastSeq: number = -1;

  savedCount = 0;
  numeroCartelle = 6;

  constructor(
    private tombolaService: TombolaService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    for (let ir = 0; ir < 11; ir++) {
      let riga: Numero[] = [];
      for (let ic = 0; ic < 11; ic++) {
        let myVal = null;
        let r = ir;
        let c = ic;

        if (c != 5 && r != 3 && r != 7) {
          if (ic > 5) {
            c--;
          }
          if (ir > 3) {
            r--;
            if (ir > 7) {
              r--;
            }
          }
          myVal = r * 10 + c;
          riga.push(this.numeri[myVal]);

          if (this.numeri[myVal - 1] !== undefined) {
            this.numeri[myVal - 1].row = ir;
            this.numeri[myVal - 1].column = ic;
          }
          //console.log(myVal, this.numeri[myVal-1]);
        } else {
          riga.push(new Numero());
        }

      }
      this.cartellone.push(riga);
      this.closeNumbers.push([0, 0]);
      this.closeNumbersOld.push([0, 0]);
      this.newClose.push([false, false]);
    }
  }

  public objectKeys(obj: any) {
    return Object.keys(obj);
  }

  public receive(message: Messaggio): void {
    if (+message.userId != +this.currentUser.id) {
      if (message.command == "notifySyncStatus") {
        //console.log(message);
        if (message.payload.sync == 100 && message.payload.seq == this.session.ultimoSeq && this.utentiConnessi.length > 1) {
          this.lastMessage = "Tutti gli utenti sono in sync !";
          //console.log("All in sync ! Move on !");
          this.waiting = false;
        }
      }

      if (message.command == "joinUser") {
        this.waiting = true;
        this.lastMessage = message.userId + " si è connesso con " + message.payload.numeroCartelle + " cartelle !";
        this.utentiConnessi.push(new Utente(message.userId, message.payload.numeroCartelle));
        this.montepremi += message.payload.numeroCartelle * +this.session.costoCartella;
        this.waiting = false;

        for (let ri of this.objectKeys(this.risultati)) {
          let risultato = this.risultati[ri];
          risultato.premio = this.montepremi * risultato.perc / 100;
        }

      }

      if (message.command == "notifyWinners") {
        //console.log(message.payload.winners, this.risultati[+message.payload.result].perc);
        let risultato = this.risultati[+message.payload.result]
        let premio = risultato.premio / message.payload.winners.length;
        this.lastMessage = "Gli utenti " + message.payload.winners + " ha/nno fatto " + risultato.label + " vincendo " + premio + " EUR a testa !";
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

  /*
  public isSelectedNumber(): boolean {
    let id: string = 'id' + this.numero.number;
    let numeroElement = this.el.nativeElement.querySelector("#" + id);
    if (numeroElement != null && !numeroElement.classList.contains('selected')) {
      numeroElement.classList.add('selected');
      return true;
    }
    return false;
  }
  */

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

  /*
  public check(): void {
    for (let r = 0; r < 11; r++) {
      let count = 0;
      for (let c = 0; c < 11; c++) {
        if (c == 5) {
          this.closeNumbers[r][0] = count;
          this.newClose[r][0] = (this.closeNumbers[r][0] > this.closeNumbersOld[r][0]);
          this.closeNumbersOld[r][0] = count;
          count = 0;
        }
        let number = this.cartellone[r][c];
        if (number.issued) {
          count++;
        }
      }
      this.closeNumbers[r][1] = count;
      this.newClose[r][1] = (this.closeNumbers[r][1] > this.closeNumbersOld[r][1]);
      this.closeNumbersOld[r][1] = count;
    }
  }

  public resume(): void {
    if (this.sessionId > 0) {
      this.tombolaService.getSession(this.sessionId).subscribe(
        data => {
          console.log(data);
          this.session = data;
        },
        error => {
          this.alertService.error(error);
        });

      this.tombolaService.resumeSession(this.sessionId).subscribe(
        data => {
          for (let e in data) {
            //console.log(data[e]);
            let randomIndex = +data[e].number - 1;
            this.numero = this.numeri[randomIndex];
            this.numero.issued = true;
            if (+data[e].seq > this.lastSeq) {
              this.lastSeq = +data[e].seq;
              console.log("New seq:" + this.lastSeq);
            }
            this.selectNumber();
          }
          this.check();
        },
        error => {
          this.alertService.error(error);
        });
    }
  }
  */


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


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sessionId = params['sessionId'];
      this.connection = this.chatService.start(this.sessionId, this.currentUser.id);
      this.connection.subscribe((msg: Messaggio) => { this.receive(msg) });
      this.numeroCartelle = 6;
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
            this.setCartellone();
          } else {

            this.resume();
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
    });
  }

}
