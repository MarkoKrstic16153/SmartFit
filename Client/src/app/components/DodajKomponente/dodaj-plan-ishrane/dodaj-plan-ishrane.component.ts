import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { LoginService } from "src/services/LoginService";
import { FormControl, Validators } from "@angular/forms";
import { Obrok } from "src/models/Obrok";
import { Dan } from "src/models/Dan";
import { Hrana } from "src/models/Hrana";
import { HranaService } from "src/services/HranaService";
import { Observable } from "rxjs";
import { DeoObroka } from "src/models/DeoObroka";
import { PlanIshrane } from "src/models/PlanIshrane";
import { PlanIshraneService } from "src/services/PlanIshraneService";

@Component({
  selector: "app-dodaj-plan-ishrane",
  templateUrl: "./dodaj-plan-ishrane.component.html",
  styleUrls: ["./dodaj-plan-ishrane.component.css"]
})
export class DodajPlanIshraneComponent implements OnInit {
  pretragaPoImenu: string = "Pretrazite Hranu : ";
  usernameKlijenta: string = "";
  usernameInstruktora: string = "";
  detaljiZaObrok: number = -1;
  detaljiZaDan: number = -1;
  poslatPlanFlag: boolean = false;
  trenutniObrok: Obrok = {
    deloviObroka: [],
    ukupnaVlakna: 0,
    ukupneKalorije: 0,
    ukupneMasti: 0,
    ukupniProteini: 0,
    ukupniUgljeniHidrati: 0,
    vreme: ""
  };
  trenutnaHrana: Hrana = null;
  nizDana: Dan[] = [];
  trenutniDan: Dan = {
    obroci: [],
    vlakna: 0,
    kalorije: 0,
    masti: 0,
    proteini: 0,
    ugljeniHidrati: 0
  };
  obsHrana: Observable<Hrana[]> = null;
  kolicinaControl: FormControl = new FormControl("", Validators.required);
  vremeObrokaControl: FormControl = new FormControl("", Validators.required);
  datumControl: FormControl = new FormControl("", Validators.required);
  nazivControl: FormControl = new FormControl("", Validators.required);
  prethodniPlanovi: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private hranaService: HranaService,
    private planIshraneService: PlanIshraneService
  ) {}

  ngOnInit() {
    let podaci = this.route.snapshot.paramMap.get("data");
    var res: string[] = podaci.split(" ");
    console.log(res[0] + res[1]);
    this.usernameInstruktora = res[1];
    this.usernameKlijenta = res[0];
    this.obsHrana = this.hranaService.getAllHrana();
    this.planIshraneService
      .getAllPlanIshrane(this.usernameKlijenta, this.usernameInstruktora)
      .subscribe(data => {
        this.prethodniPlanovi = data;
      });
  }

  odvediNaPlan(plan: any) {
    console.log(plan);
  }

  daLiJeLogovan(): boolean {
    if (this.loginService.logovaniUsername != "") return true;
    else return false;
  }

  dodajObrok() {
    if (this.vremeObrokaControl.value != "") {
      this.trenutniObrok.vreme = this.vremeObrokaControl.value;
      this.trenutniDan.obroci.push(this.trenutniObrok);
      this.trenutniObrok = {
        deloviObroka: [],
        ukupnaVlakna: 0,
        ukupneKalorije: 0,
        ukupneMasti: 0,
        ukupniProteini: 0,
        ukupniUgljeniHidrati: 0,
        vreme: ""
      };
    }
  }

  dodajDan() {
    this.trenutniDan.kalorije = this.dnevneKalorije();
    this.trenutniDan.masti = this.dnevneMasti();
    this.trenutniDan.proteini = this.dnevniProteini();
    this.trenutniDan.vlakna = this.dnevnaVlakna();
    this.trenutniDan.ugljeniHidrati = this.dnevniHidrati();
    this.nizDana.push(this.trenutniDan);
    this.trenutniDan = {
      obroci: [],
      vlakna: 0,
      kalorije: 0,
      masti: 0,
      proteini: 0,
      ugljeniHidrati: 0
    };
  }

  posaljiPlan() {
    if (this.datumControl.value != "" && this.nazivControl.value != "") {
      let noviPlan: PlanIshrane = {
        dani: this.nizDana,
        usernameKlijenta: this.usernameKlijenta,
        usernameInstruktora: this.usernameInstruktora,
        datum: this.datumControl.value,
        naziv: this.nazivControl.value
      };
      console.log(noviPlan);
      this.poslatPlanFlag = true;
      this.nizDana = [];
      this.trenutniDan = {
        obroci: [],
        vlakna: 0,
        kalorije: 0,
        masti: 0,
        proteini: 0,
        ugljeniHidrati: 0
      };
      this.trenutniObrok = {
        deloviObroka: [],
        ukupnaVlakna: 0,
        ukupneKalorije: 0,
        ukupneMasti: 0,
        ukupniProteini: 0,
        ukupniUgljeniHidrati: 0,
        vreme: ""
      };
      this.detaljiZaDan = -1;
      this.detaljiZaObrok = -1;
      this.planIshraneService.addPlanIshrane(noviPlan);
    }
  }

  daLiJeGotov(): boolean {
    if (this.nizDana.length >= 7) return true;
    else return false;
  }

  selektujHranu(hrana: Hrana) {
    console.log(hrana);
    this.trenutnaHrana = hrana;
  }

  dodajUObrok() {
    if (this.kolicinaControl.value != "") {
      let noviDeoObroka: DeoObroka = {
        hrana: this.trenutnaHrana,
        kolicina: this.kolicinaControl.value
      };
      this.trenutniObrok.deloviObroka.push(noviDeoObroka);
      this.updatujKalorijeUObroku(noviDeoObroka, 1);
      console.log(this.trenutniObrok);
    }
  }

  updatujKalorijeUObroku(deoObroka: DeoObroka, flag: number) {
    let skaliraniProtein: number =
      (deoObroka.hrana.proteini * deoObroka.kolicina) / 100;
    let skaliranaMast: number =
      (deoObroka.hrana.masti * deoObroka.kolicina) / 100;
    let skaliranaVlakna: number =
      (deoObroka.hrana.vlakna * deoObroka.kolicina) / 100;
    let skaliraniHidrati: number =
      (deoObroka.hrana.ugljeniHidrati * deoObroka.kolicina) / 100;
    this.trenutniObrok.ukupniProteini += skaliraniProtein * flag;
    this.trenutniObrok.ukupneMasti += skaliranaMast * flag;
    this.trenutniObrok.ukupniUgljeniHidrati += skaliraniHidrati * flag;
    this.trenutniObrok.ukupnaVlakna += skaliranaVlakna * flag;
    this.trenutniObrok.ukupneKalorije +=
      skaliraniProtein * 4 + skaliranaMast * 9 + skaliraniHidrati * 4 * flag;
    this.trenutniObrok.ukupneKalorije = +this.trenutniObrok.ukupneKalorije.toFixed(
      1
    );
  }

  izbaciIzObroka(deoObroka: DeoObroka) {
    console.log(deoObroka);
    const index = this.trenutniObrok.deloviObroka.indexOf(deoObroka);
    if (index > -1) {
      this.trenutniObrok.deloviObroka.splice(index, 1);
      this.updatujKalorijeUObroku(deoObroka, -1);
    }
  }

  prikaziDetaljeObrok(index: number) {
    console.log(index);
    if (index == this.detaljiZaObrok) this.detaljiZaObrok = -1;
    else this.detaljiZaObrok = index;
  }

  prikaziDetaljeDan(index: number) {
    console.log(index);
    if (index == this.detaljiZaDan) this.detaljiZaDan = -1;
    else this.detaljiZaDan = index;
  }

  obrisiObrok(obrok: Obrok) {
    console.log(obrok);
    const index = this.trenutniDan.obroci.indexOf(obrok);
    if (index > -1) {
      this.trenutniDan.obroci.splice(index, 1);
    }
  }

  obrisiDan(dan: Dan) {
    console.log(dan);
    const index = this.nizDana.indexOf(dan);
    if (index > -1) {
      this.nizDana.splice(index, 1);
    }
  }

  dnevneKalorije(): number {
    let vrati = 0;
    this.trenutniDan.obroci.forEach(obrok => {
      vrati += obrok.ukupneKalorije;
    });
    return vrati;
  }

  dnevniProteini(): number {
    let vrati = 0;
    this.trenutniDan.obroci.forEach(obrok => {
      vrati += obrok.ukupniProteini;
    });
    return vrati;
  }

  dnevneMasti(): number {
    let vrati = 0;
    this.trenutniDan.obroci.forEach(obrok => {
      vrati += obrok.ukupneMasti;
    });
    return vrati;
  }

  dnevniHidrati(): number {
    let vrati = 0;
    this.trenutniDan.obroci.forEach(obrok => {
      vrati += obrok.ukupniUgljeniHidrati;
    });
    return vrati;
  }

  dnevnaVlakna(): number {
    let vrati = 0;
    this.trenutniDan.obroci.forEach(obrok => {
      vrati += obrok.ukupnaVlakna;
    });
    return vrati;
  }
}
