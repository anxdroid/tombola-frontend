import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../_models';
import { Estrazione } from '../_models/estrazione';

import { Numero } from '../_models/numero';
import { Sessione } from '../_models/sessione';
import { AlertService, AuthenticationService } from '../_services';
import { TombolaService } from '../_services/tombola.service';

@Component({
  selector: 'app-cartellone',
  templateUrl: './cartellone.component.html',
  styleUrls: ['./cartellone.component.less']
})
export class CartelloneComponent implements OnInit {

  sessionId: number = 0;
  session!: Sessione;
  cartellone: Numero[][] = [];
  numeri: Numero[] = [
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "1", "text": "L'Italia", "translation": "" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "2", "text": "'A criatura", "translation": "il bimbo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "3", "text": "'A jatta", "translation": "il gatto" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "4", "text": "'O puorco", "translation": "il maiale" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "5", "text": "'A mano", "translation": "la mano" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "6", "text": "Chella che guarda 'nterra", "translation": "organo sessuale femminile" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "7", "text": "'A scuppetta", "translation": "il fucile" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "8", "text": "'A maronna", "translation": "la madonna" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "9", "text": "'A figliata", "translation": "la prole" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "10", "text": "'E fasule", "translation": "i fagioli" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "11", "text": "'E surice", "translation": "i topi" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "12", "text": "'E surdate", "translation": "i soldati" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "13", "text": "Sant'Antonio", "translation": "" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "14", "text": "'O mbriaco", "translation": "l'ubriaco" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "15", "text": "'O guaglione", "translation": "il ragazzo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "16", "text": "'O culo", "translation": "il deretano" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "17", "text": "'A disgrazia", "translation": "la disgrazia" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "18", "text": "'O sanghe", "translation": " il sangue" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "19", "text": "'A resata", "translation": "la risata" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "20", "text": "'A festa", "translation": "la festa" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "21", "text": "'A femmena annura", "translation": "la donna nuda" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "22", "text": "'O pazzo", "translation": "il pazzo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "23", "text": "'O scemo", "translation": "lo scemo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "24", "text": "'E gguardie", "translation": "le guardie" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "25", "text": "Natale", "translation": "" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "26", "text": "Nanninella", "translation": "diminuitivo del nome Anna" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "27", "text": "'O cantero", "translation": "il vaso da notte" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "28", "text": "'E zzizze", "translation": "il seno" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "29", "text": "'O pate d''e criature", "translation": "organo sessuale maschile" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "30", "text": "'E palle d''o tenente", "translation": "le palle del tenente" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "31", "text": "'O padrone ' e casa", "translation": "il proprietario di casa" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "32", "text": "'O capitone", "translation": "il capitone" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "33", "text": "Ll'anne ' e Cristo", "translation": "gli anni di Cristo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "34", "text": "'A capa", "translation": "la testa" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "35", "text": "L'aucielluzzo", "translation": "l'uccellino" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "36", "text": "'E castagnelle", "translation": "sorta di petardi" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "37", "text": "'O monaco", "translation": "il frate" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "38", "text": "'E mmazzate", "translation": "le botte" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "39", "text": "'A funa 'nganna", "translation": "la corda la collo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "40", "text": "'A paposcia", "translation": "ernia inguinale" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "41", "text": "'O curtiello", "translation": "il coltello" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "42", "text": "'O ccafè", "translation": "il caffè" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "43", "text": "'A femmena 'ncopp'' o balcone", "translation": "la donna al balcone" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "44", "text": "'E ccancelle", "translation": "il carcere" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "45", "text": "'O vino", "translation": "il vino" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "46", "text": "'E denare", "translation": "i denari" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "47", "text": "'O muorto", "translation": "il morto" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "48", "text": "'O muorto che parla", "translation": "il morto che parla" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "49", "text": "'O piezzo ' e carne", "translation": "il pezzo di carne" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "50", "text": "'O ppane", "translation": "il pane" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "51", "text": "'O ciardino", "translation": "il giardino" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "52", "text": "'A mamma", "translation": "la mamma" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "53", "text": "'O viecchio", "translation": "il vecchio" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "54", "text": "'O cappiello", "translation": "il cappello" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "55", "text": "'A museca", "translation": "la musica" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "56", "text": "'A caruta", "translation": "la caduta" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "57", "text": "'O scartellato", "translation": "il gobbo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "58", "text": "'O paccotto", "translation": "l'imbroglio" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "59", "text": "'E pile", "translation": "i peli" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "60", "text": "Se lamenta", "translation": "si lamenta" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "61", "text": "'O cacciatore", "translation": "il cacciatore" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "62", "text": "'O muorto acciso", "translation": "il morto ammazzato" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "63", "text": "'A sposa", "translation": "la sposa" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "64", "text": "'A sciammeria", "translation": "la marsina" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "65", "text": "'O chianto", "translation": "il pianto" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "66", "text": "'E ddoie zetelle", "translation": "le due zitelle" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "67", "text": "'O totano int''a chitarra", "translation": "il totano nella chitarra" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "68", "text": "'A zuppa cotta", "translation": "la zuppa cotta" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "69", "text": "Sott'e'ncoppo", "translation": "sottosopra" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "70", "text": "'O palazzo", "translation": "il palazzo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "71", "text": "L'ommo 'e merda", "translation": "l'uomo senza princìpi" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "72", "text": "'A meraviglia", "translation": "la meraviglia" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "73", "text": "'O spitale", "translation": "l'ospedale" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "74", "text": "'A rotta", "translation": "la grotta" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "75", "text": "Pullecenella", "translation": "Pulcinella" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "76", "text": "'A funtana", "translation": "la fontana" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "77", "text": "'E diavule", "translation": "i diavoli" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "78", "text": "'A bella figliola", "translation": "la bella ragazza" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "79", "text": "'O mariuolo", "translation": "il ladro" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "80", "text": "'A vocca", "translation": "la bocca" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "81", "text": "'E sciure", "translation": "i fiori" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "82", "text": "'A tavula 'mbandita", "translation": "la tavola imbandita" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "83", "text": "'O maletiempo", "translation": "il maltempo" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "84", "text": "'A cchiesa", "translation": "la chiesa" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "85", "text": "Ll'aneme 'o priatorio", "translation": "le anime del purgatorio" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "86", "text": "'A puteca", "translation": "il negozio" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "87", "text": "'E perucchie", "translation": "i pidocchi" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "88", "text": "'E casecavalle", "translation": "i caciocavalli" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "89", "text": "'A vecchia", "translation": "la vecchia" },
    {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "90", "text": "'A paura", "translation": "la paura" }
  ];

  closeNumbers: number[][] = [];
  closeNumbersOld: number[][] = [];
  newClose: boolean[][] = [];
  //myWebSocket: WebSocketSubject<string> = webSocket('ws://localhost:1337');

  testoBottone: string = "Estrai";
  numero: Numero = {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "", "text": "", "translation": "" };
  currentUser: User;

  constructor(
    private el: ElementRef,
    private tombolaService: TombolaService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute
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

  public selectNumber(): boolean {
    let id: string = 'id' + this.numero.number;
    let numeroElement = this.el.nativeElement.querySelector("#" + id);
    if (numeroElement != null && !numeroElement.classList.contains('selected')) {
      numeroElement.classList.add('selected');
      return true;
    }
    return false;
  }

  public extract(): void {
    this.testoBottone = "Attendi...";
    let randomIndex = Math.floor((Math.random() * 90));
    if (randomIndex != 0) {
      randomIndex--;
    }

    let numero = this.numeri[randomIndex];
    //console.log(randomIndex, numero);
    if (!numero.issued) {
      this.numero = this.numeri[randomIndex];

      if (this.selectNumber()) {
        this.numeri[randomIndex].issued = true;
        let estrazione = new Estrazione(this.sessionId, this.currentUser.id, parseInt(this.numeri[randomIndex].number));

        this.tombolaService.extract(estrazione)
          .subscribe(
            data => {
              console.log(data)
              this.alertService.success("Saved !", true);
              this.check();
            },
            error => {
              this.alertService.error(error);
            });
      }
    } else {
      console.log("Discarding " + randomIndex);
      this.extract();
    }
    this.testoBottone = "Estrai";
  }

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
            this.selectNumber();
          }
          this.check();
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.sessionId = params['sessionId'];
      console.log(this.sessionId);
      this.resume();
    });
    /*
    this.myWebSocket.asObservable().subscribe(dataFromServer => {
      console.log(dataFromServer);
    });
    this.myWebSocket.next("test test test");
    */

  }

}
