import { Injectable } from "@angular/core";

@Injectable()
export class Risultato {
  label: String = "";
  perc: Number = 0;
  premio: number = 0;

  constructor(label: String, perc: Number) {
    this.label = label;
    this.perc = perc;
  }
}
