import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/services/LoginService";
import { PlanIshraneService } from "src/services/PlanIshraneService";
import { HranaService } from "src/services/HranaService";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { PlanIshrane } from "src/models/PlanIshrane";
import { identifierModuleUrl } from "@angular/compiler";
import { stringify } from "querystring";

@Component({
  selector: "app-plan-ishrane",
  templateUrl: "./plan-ishrane.component.html",
  styleUrls: ["./plan-ishrane.component.css"]
})
export class PlanIshraneComponent implements OnInit {
  parametri: any = {};
  plan: PlanIshrane = null;
  detaljiObrok: boolean = false;
  constructor(
    private loginService: LoginService,
    private planIshraneService: PlanIshraneService,
    private hranaService: HranaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    let data = this.route.snapshot.paramMap.get("data");
    this.parametri = JSON.parse(data);
    this.planIshraneService
      .getPlanIshrane(
        this.parametri.uK,
        this.parametri.uI,
        this.parametri.dat,
        this.parametri.naz
      )
      .subscribe(data => {
        this.plan = data;
        console.log(this.plan);
      });
  }

  daLiJeLogovan(): boolean {
    if (this.loginService.logovaniUsername != "") return true;
    else return false;
  }

  goBack() {
    this.location.back();
  }

  kastujDan(dan: any): string {
    let vrednost: string;
    if (dan == 1) vrednost = "Ponedeljak";
    else if (dan == 2) vrednost = "Utorak";
    else if (dan == 3) vrednost = "Sreda";
    else if (dan == 4) vrednost = "Cetvrtak";
    else if (dan == 5) vrednost = "Petak";
    else if (dan == 6) vrednost = "Subota";
    else vrednost = "Nedelja";

    return vrednost;
  }

  prikaziDetaljeObroka() {
    console.log(this.detaljiObrok);
    if (this.detaljiObrok == false) this.detaljiObrok = true;
    else this.detaljiObrok = false;
  }

  prikaziKalorijeObroka(obrok: any): number {
    let vrati: number = 0;
    obrok.deloviObroka.forEach(deoObroka => {
      vrati +=
        deoObroka.hrana.proteini * 4 +
        deoObroka.hrana.ugljeniHidrati * 4 +
        deoObroka.hrana.masti * 9;
    });
    vrati.toFixed(1);
    return vrati;
  }
}
