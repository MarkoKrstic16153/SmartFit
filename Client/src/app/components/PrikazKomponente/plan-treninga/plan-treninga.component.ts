import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { VezbeService } from 'src/services/VezbeService';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanTrenignaService } from 'src/services/PlanTreningaService';
import { PlanTreninga } from 'src/models/PlanTreninga';
import { FormControl, Validators } from '@angular/forms';
import { Odgovor } from 'src/models/Odgovor';

@Component({
  selector: 'app-plan-treninga',
  templateUrl: './plan-treninga.component.html',
  styleUrls: ['./plan-treninga.component.css']
})
export class PlanTreningaComponent implements OnInit {
  parametri:any = {};
  plan:PlanTreninga = null;
  komentarControl : FormControl = new FormControl("", Validators.required);
  detaljiDan:number[] = [-1,-1,-1,-1,-1,-1,-1];
  constructor(private loginService : LoginService,private planTreningaService:PlanTrenignaService,private vezbaService:VezbeService,private router:Router,private route: ActivatedRoute,private location :Location) { }

  ngOnInit() {
    let data=this.route.snapshot.paramMap.get('data');
    this.parametri = JSON.parse(data);
    this.planTreningaService.getPlanTreninga(this.parametri.uK,this.parametri.uI,this.parametri.dat,this.parametri.naz).subscribe((data)=>{
      this.plan = data;
      console.log(this.plan);
    });
  }

  daLiJeLogovan():boolean{
    if(this.loginService.logovaniUsername!="")
      return true;
    else
      return false;
  }

  goBack(){
    this.location.back();
  }

  dodajKomentar(){
    let noviKomentar : Odgovor = {koJeOdgovorio:this.loginService.logovaniUsername,text:this.komentarControl.value};
    console.log(noviKomentar);
    //this.plan.komentari.push(noviKomentar);
  }

  pogledajVezbu(imeVezbe:string){
    console.log(imeVezbe);
    this.router.navigate(["vezba",imeVezbe]);
  }

  kastujDan(index:number){
    let vrednost: string;
    if (index == 1) vrednost = "Ponedeljak";
    else if (index == 2) vrednost = "Utorak";
    else if (index == 3) vrednost = "Sreda";
    else if (index == 4) vrednost = "Cetvrtak";
    else if (index == 5) vrednost = "Petak";
    else if (index == 6) vrednost = "Subota";
    else vrednost = "Nedelja";
    return vrednost;
  }

  prikaziDan(index:number){
    this.detaljiDan[index]*=-1;
  }

}
