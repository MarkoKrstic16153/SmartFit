import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "src/services/LoginService";
import { FormControl, Validators } from "@angular/forms";
import { Vezba } from "src/models/Vezba";
import { Observable } from "rxjs";
import { Trening } from "src/models/Trening";
import { VezbeService } from "src/services/VezbeService";
import { PlanTrenignaService } from "src/services/PlanTreningaService";
import { OdradjenaVezba } from "src/models/OdradjenjaVezba";
import { PlanTreninga } from "src/models/PlanTreninga";
import { Subject } from "rxjs";

@Component({
  selector: "app-dodaj-plan-treninga",
  templateUrl: "./dodaj-plan-treninga.component.html",
  styleUrls: ["./dodaj-plan-treninga.component.css"]
})
export class DodajPlanTreningaComponent implements OnInit {
  changingValue: Subject<Vezba[]> = new Subject();
  usernameKlijenta: string = "";
  usernameInstruktora: string = "";
  smartSearch: boolean = false;
  poslatPlanFlag: boolean = false;
  detaljiVezba: number = -1;
  detaljiTrening: number = -1;
  pretragaPoImenu: string = "Pretrazite Vezbu : ";
  obsVezbe: Observable<Vezba[]> = null;
  trenutnaVezba: Vezba = null;
  trenutniTrening: Trening = {
    odmorIzmedjuSerija: 0,
    trajanje: 0,
    vezbe: [],
    vrsta: ""
  };
  nizTreninga: Trening[] = [];
  prethodniPlanovi: any[] = [];
  nizMogucihTreninga: string[] = [
    "FullBody",
    "Push",
    "Pull",
    "Legs",
    "BroArms",
    "BroChest",
    "Calisthenics",
    "Odmor"
  ];
  treningControl: FormControl = new FormControl("", Validators.required);
  serijeControl: FormControl = new FormControl("", Validators.required);
  opterecenjeControl: FormControl = new FormControl("", Validators.required);
  ponavljanjaControl: FormControl = new FormControl("", Validators.required);
  odmorIzmedjuSerijaControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  trajanjeControl: FormControl = new FormControl("", Validators.required);
  datumControl: FormControl = new FormControl("", Validators.required);
  nazivControl: FormControl = new FormControl("", Validators.required);
  bodyControl: FormControl = new FormControl("", Validators.required);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private vezbaService: VezbeService,
    private planTreningaService: PlanTrenignaService
  ) {}

  ngOnInit() {
    let podaci = this.route.snapshot.paramMap.get("data");
    var res: string[] = podaci.split(" ");
    console.log(res[0] + res[1]);
    this.usernameInstruktora = res[1];
    this.usernameKlijenta = res[0];
    this.planTreningaService
      .getAllPlanTreninga(this.usernameKlijenta, this.usernameInstruktora)
      .subscribe(data => {
        this.prethodniPlanovi = data;
      });
  }

  daLiJeLogovan(): boolean {
    if (this.loginService.logovaniUsername != "") return true;
    else return false;
  }

  dodajVezbu() {
    console.log(this.bodyControl.value);
    if (
      (this.opterecenjeControl.value != "" ||
        (this.bodyControl.value == true &&
          this.opterecenjeControl.value != null)) &&
      this.serijeControl.value != "" &&
      this.ponavljanjaControl.value != "" &&
      this.trenutnaVezba != null
    ) {
      let opterecenjePom;
      if (
        this.opterecenjeControl.value == "" ||
        this.opterecenjeControl.value == null
      )
        opterecenjePom = 0;
      else opterecenjePom = this.opterecenjeControl.value;
      let novaOdradjenaVezba: OdradjenaVezba = {
        brojPonavljanja: this.ponavljanjaControl.value,
        brojSerija: this.serijeControl.value,
        opterecenje: opterecenjePom,
        vezba: this.trenutnaVezba
      };
      this.trenutniTrening.vezbe.push(novaOdradjenaVezba);
      console.log(this.trenutniTrening);
    }
  }

  selektujVezbu(vezba: Vezba) {
    console.log(vezba);
    this.trenutnaVezba = vezba;
  }

  selektujTipTreninga() {
    console.log(this.treningControl.value);
    this.smartSearch = true;
    this.fetchujTipVezbi();
  }

  fetchujTipVezbi() {
    if (this.treningControl.value != "Odmor") {
      this.obsVezbe = this.vezbaService.getTipTreningaVezbe(
        this.treningControl.value
      );
      this.obsVezbe.subscribe(data => {
        this.changingValue.next(data);
      });
    }
  }

  back() {
    this.location.back();
  }

  zavrsiTrening() {
    if (
      this.treningControl.value == "" ||
      this.treningControl.value == "Odmor" ||
      this.trenutniTrening.vezbe.length == 0
    ) {
      this.trenutniTrening.trajanje = 0;
      this.trenutniTrening.odmorIzmedjuSerija = 0;
      this.trenutniTrening.vrsta = "Odmor";
      this.nizTreninga.push(this.trenutniTrening);
      this.trenutniTrening = {
        odmorIzmedjuSerija: 0,
        trajanje: 0,
        vezbe: [],
        vrsta: ""
      };
    } else if (
      this.odmorIzmedjuSerijaControl.value != "" &&
      this.trajanjeControl.value != ""
    ) {
      this.trenutniTrening.trajanje = this.trajanjeControl.value;
      this.trenutniTrening.odmorIzmedjuSerija = this.odmorIzmedjuSerijaControl.value;
      this.trenutniTrening.vrsta = this.treningControl.value;
      this.nizTreninga.push(this.trenutniTrening);
      console.log(this.nizTreninga);
      this.trenutniTrening = {
        odmorIzmedjuSerija: 0,
        trajanje: 0,
        vezbe: [],
        vrsta: ""
      };
    }
  }

  posaljiPlan() {
    if (this.datumControl.value != "" && this.nazivControl.value != "") {
      console.log("salje plan");
      let noviPlanTreninga: PlanTreninga = {
        datum: this.datumControl.value,
        naziv: this.nazivControl.value,
        usernameInstruktora: this.usernameInstruktora,
        usernameKlijenta: this.usernameKlijenta,
        treninzi: this.nizTreninga,
        komentari: []
      };
      console.log(noviPlanTreninga);
      this.planTreningaService
        .addPlanTreninga(noviPlanTreninga)
        .subscribe(data => {
          this.planTreningaService
            .getAllPlanTreninga(this.usernameKlijenta, this.usernameInstruktora)
            .subscribe(data => {
              this.prethodniPlanovi = data;
            });
        });
      this.poslatPlanFlag = true;
      this.nizTreninga = [];
    }
  }

  daLiJeGotov(): boolean {
    if (this.nizTreninga.length >= 7) return true;
    else return false;
  }

  prikaziDetaljeVezba(index: number) {
    console.log(index);
    if (index == this.detaljiVezba) this.detaljiVezba = -1;
    else this.detaljiVezba = index;
  }

  obrisiVezba(vezba: OdradjenaVezba) {
    console.log(vezba);
    const index = this.trenutniTrening.vezbe.indexOf(vezba);
    if (index > -1) {
      this.trenutniTrening.vezbe.splice(index, 1);
    }
  }

  prikaziDetaljeTrening(index: number) {
    console.log(index);
    if (index == this.detaljiTrening) this.detaljiTrening = -1;
    else this.detaljiTrening = index;
  }

  obrisiTrening(trening: Trening) {
    console.log(trening);
    const index = this.nizTreninga.indexOf(trening);
    if (index > -1) {
      this.nizTreninga.splice(index, 1);
    }
  }

  vratiTreningUString(index: number): string {
    if (this.nizTreninga[index].vezbe.length > 0)
      return (
        "Dan " +
        (index + 1) +
        "  Tip Treninga : " +
        this.nizTreninga[index].vrsta +
        ", Broj Vezbi : " +
        this.nizTreninga[index].vezbe.length
      );
    else return "Dan " + (index + 1) + "  Dan Odmora.";
  }

  odvediNaPlan(plan: any) {
    let param = {
      uK: this.usernameKlijenta,
      uI: this.usernameInstruktora,
      dat: plan.datum,
      naz: plan.naziv
    };
    this.router.navigate(["prikazplantreninga", JSON.stringify(param)]);
  }
}
