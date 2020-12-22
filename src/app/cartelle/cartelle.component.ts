import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../_models';
import { Cartella } from '../_models/cartella';
import { Estrazione } from '../_models/estrazione';
import { Messaggio } from '../_models/messaggio';
import { Numero } from '../_models/numero';
import { Sessione } from '../_models/sessione';
import { AuthenticationService, AlertService } from '../_services';
import { ChatService } from '../_services/chat.service';
import { TombolaService } from '../_services/tombola.service';
import { WebSocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-cartelle',
  templateUrl: './cartelle.component.html',
  styleUrls: ['./cartelle.component.css'],
  providers: [WebSocketService, ChatService]
})
export class CartelleComponent implements OnInit {
  [x: string]: any;
  sessionId: number = 0;
  session: Sessione = new Sessione(0, 0);
  numero: Numero = {"cartelle": [], "row": -1, "column": -1, "issued": false, "number": "", "text": "", "translation": "" };
  currentUser: User;
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
  cartelleForm: FormGroup = this.formBuilder.group({
    numeroCartelle: ['', Validators.required],
  });
  loading = false;
  submitted = false;
  savedCount = 0;
  numeroCartelle: number = 0;
  cartelle: Cartella[] = [];
  estratti: Estrazione[] = [];

  connection: any;

  constructor(
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private tombolaService: TombolaService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private chatService: ChatService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  get f() { return this.cartelleForm.controls; }

  public save(): void {
    //console.log("save", this.cartelle);
    for (let cartella of this.cartelle) {
      this.tombolaService.saveCartella(this.sessionId, this.currentUser.id, cartella).subscribe(
        data => {
          //console.log(cartella, data);
          cartella.id = data["id"];
          //console.log("save", cartella);
          this.savedCount++;
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  public numberInCartella(randomNumber: number, cartella: Cartella): boolean {
    for (let r in cartella.numeri) {
      if (cartella.indici[r].includes(randomNumber)) {
        return true;
      }
    }
    return false;
  }

  public setCartelle(): void {
    this.numeroCartelle = this.f.numeroCartelle.value;
    //console.log(this.numeroCartelle);
    this.cartelle = [];
    for (let ca = 0; ca < +this.numeroCartelle; ca++) {
      let cartella = new Cartella(this.sessionId, this.currentUser.id);
      for (let r = 0; r < 3; r++) {
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

  public createRange(number: number) {
    var items: number[] = [];
    for (var i = 0; i < number; i++) {
      items.push(i);
    }
    return items;
  }

  public selectNumber(numero:Numero): void {
    //console.log(numero);
    for(let ca of numero.cartelle) {
      let cartella = this.cartelle[ca];
      //console.log(cartella);
      for (let r in cartella.indici) {
        let riga = cartella.indici[r];
        for (let c in riga) {
          let n = riga[c];
          //console.log(numero.number, n);
          if (+numero.number == +n) {
            //console.log(numero.number, n);
            //let id = 'id'+ca+'x'+r+'x'+c;
            //console.log(n, id);
            cartella.numeri[r][c].issued = true;
          }

        }
      }
    }
  }

  public resume(): void {
    if (this.sessionId > 0) {
      this.tombolaService.getSession(this.sessionId).subscribe(
        data => {
          this.session = data;
          console.log(data);
        },
        error => {
          this.alertService.error(error);
        });

      this.tombolaService.resumeCartelle(this.sessionId, this.currentUser.id).subscribe(
        data => {
          //console.log(data);
          this.cartelle = [];
          for (let caI in data) {
            let cartella = data[caI];
            cartella.indici = JSON.parse(cartella.righe);
            cartella.numeri = [];

            for (let rI in cartella.indici) {
              let rigaIndici = cartella.indici[rI];
              let riga: Numero[] = [];
              for (let cI in rigaIndici) {

                let numero = this.numeri[(+rigaIndici[cI]) - 1];
                numero.cartelle.push(+caI);
                numero.row = +rI;
                numero.column = +cI;
                //this.selectNumber(+caI, numero);

                //console.log(numero);
                riga.push(numero);
              }
              cartella.numeri.push(riga);
            }
            this.cartelle.push(cartella);
            this.savedCount++;
            this.numeroCartelle++;
          }

        },
        error => {
          this.alertService.error(error);
        });

      this.tombolaService.resumeSession(this.sessionId).subscribe(
        data => {
          //console.log(data);
          this.estratti = data;
          for(let estratto of this.estratti) {
            //console.log(estratto);
            let numero = this.numeri[+estratto.number-1];
            if (numero.cartelle.length > 0) {
              this.selectNumber(numero);
            }
          }
        },
        error => {
          this.alertService.error(error);
        });
    }
  }

  public receive(message: string): void {
      let msg = JSON.parse(message);
      if (msg.command == "extract") {
        let numero = this.numeri[+msg.payload-1];
        this.estratti.push(new Estrazione(msg.sessionId, msg.userId, +msg.payload));
        this.selectNumber(numero);
      }
      console.log(msg);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //console.log(params);
      this.sessionId = params['sessionId'];
      //console.log(this.sessionId);
      this.connection = this.chatService.start(this.sessionId);
      this.connection.subscribe((msg: string) => {this.receive(msg)});

      this.resume();
    });
  }

}

// https://www.universonline.it/_tempo_libero/sogni/smorfia-napoletana/img/1-smorfia-napoletana.jpg
