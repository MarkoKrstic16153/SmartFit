import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Router } from "@angular/router";
import { Hrana } from "src/models/Hrana";

@Component({
  selector: "app-smart-search-bar",
  templateUrl: "./smart-search-bar.component.html",
  styleUrls: ["./smart-search-bar.component.css"]
})
export class SmartSearchBarComponent implements OnInit {
  @Input() titlePretrage: string;
  @Input() obsPretrage: Observable<any>;
  @Input() changing: Subject<any[]>;
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();
  myControl = new FormControl();
  allPodaci: any[] = [];
  filtriraniPodaci: Observable<any>;
  klikSelektovaniPodatak: any = null;
  show: any = "";
  constructor(private router: Router) {}

  async ngOnInit() {
    this.changing.subscribe(v => {
      console.log("value is changing", v);
      this.allPodaci = v;
    });
    this.subskrajbujSeNaUlaznePodatke();
  }

  subskrajbujSeNaUlaznePodatke() {
    this.obsPretrage.subscribe(podaci => {
      console.log(podaci);
      this.allPodaci = podaci;
    });
    this.filtriraniPodaci = this.myControl.valueChanges.pipe(
      startWith("/[a-zA-Z]/"),
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): string[] {
    let filterValue;
    if (value.ime) filterValue = value.ime.toLowerCase();
    else filterValue = value.toLowerCase();
    if (this.allPodaci[0] && this.allPodaci[0].ime) {
      if (value.length > 2)
        return this.allPodaci.filter(podatak =>
          podatak.ime.toLowerCase().includes(filterValue)
        );
    } else {
      if (value.length > 2) {
        return this.allPodaci.filter(podatak =>
          podatak.toLowerCase().includes(filterValue)
        );
      }
    }
  }

  prikaz(podatak: any) {
    if (this.allPodaci[0].ime) {
      return podatak.ime;
    } else {
      return podatak;
    }
  }

  vratiVrednost(podatak: any) {
    if (this.allPodaci[0].ime) {
      return podatak;
    } else {
      return podatak;
    }
  }

  pretraziTrenutno() {
    if (this.allPodaci[0].ime) {
      let pom = this.show;
      this.show = this.show.ime;
      let vratiObj: object = null;
      this.allPodaci.forEach(obj => {
        if (obj.ime == pom.ime) vratiObj = obj;
      });
      this.onEnter.emit(vratiObj);
    } else {
      this.show = this.prikaz(this.show);
      this.onEnter.emit(this.show);
    }
  }

  klikNaOpciju(vrednost: any) {
    console.log(vrednost);
    this.show = this.prikaz(vrednost);
    this.onEnter.emit(vrednost);
  }
}
