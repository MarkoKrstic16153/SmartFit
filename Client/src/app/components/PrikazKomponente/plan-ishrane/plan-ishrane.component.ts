import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/services/LoginService";
import { PlanIshraneService } from "src/services/PlanIshraneService";
import { HranaService } from "src/services/HranaService";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { PlanIshrane } from "src/models/PlanIshrane";
import { identifierModuleUrl } from "@angular/compiler";
import { stringify } from "querystring";
import { Odgovor } from 'src/models/Odgovor';
import { FormControl, Validators } from '@angular/forms';
import { Hrana } from 'src/models/Hrana';

@Component({
  selector: "app-plan-ishrane",
  templateUrl: "./plan-ishrane.component.html",
  styleUrls: ["./plan-ishrane.component.css"]
})
export class PlanIshraneComponent implements OnInit {
  parametri: any = {};
  plan: PlanIshrane = null;
  detaljiObrok: number[] = [-1,-1];
  detaljiHrana: number[] = [-1,-1,-1];
  detaljiDan:number[] = [-1,-1,-1,-1,-1,-1,-1];
  komentarControl : FormControl = new FormControl("", Validators.required);
  constructor(
    private loginService: LoginService,
    private planIshraneService: PlanIshraneService,
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

  prikaziMacrosObroka(i:number,j:number) {
    if (this.detaljiObrok[0] == i && this.detaljiObrok[1] == j) this.detaljiObrok = [-1,-1];
    else this.detaljiObrok = [i,j];
  }

  prikaziMacrosHrane(i:number,j:number,z:number) {
    if (this.detaljiHrana[0] == i && this.detaljiHrana[1] == j && this.detaljiHrana[2] == z)
     this.detaljiHrana = [-1,-1,-1];
    else
     this.detaljiHrana = [i,j,z];
  }

  izracunajKalorijeHrana(hrana:Hrana,kolicina:number):string{
    return (((hrana.masti*9 + hrana.proteini*4 + hrana.ugljeniHidrati*4)*kolicina)/100).toFixed(1);
  }

  dodajKomentar(){
    let noviKomentar : Odgovor = {koJeOdgovorio:this.loginService.logovaniUsername,text:this.komentarControl.value};
    console.log(noviKomentar);
    //this.plan.komentari.push(noviKomentar);
  }

  vratiVrednost(vrednost:number,kolicina:number):string{
    return ((vrednost*kolicina)/100).toFixed(1);
  }

  prikaziDan(index:number){
    this.detaljiDan[index]*=-1;
  }
}
