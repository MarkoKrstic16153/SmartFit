import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { VezbeService } from 'src/services/VezbeService';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanTrenignaService } from 'src/services/PlanTreningaService';
import { PlanTreninga } from 'src/models/PlanTreninga';

@Component({
  selector: 'app-plan-treninga',
  templateUrl: './plan-treninga.component.html',
  styleUrls: ['./plan-treninga.component.css']
})
export class PlanTreningaComponent implements OnInit {
  parametri:any = {};
  plan:PlanTreninga = null;
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

}
