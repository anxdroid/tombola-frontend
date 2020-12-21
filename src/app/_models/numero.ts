import { Injectable } from "@angular/core";

@Injectable()
export class Numero {
  "number": string;
  "text": string;
  "translation": string;
  "issued": boolean = false;
  "row": number = -1;
  "column": number = -1;
  "cartelle": number[];
}
