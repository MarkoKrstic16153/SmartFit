import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { PlanIshraneService } from 'src/services/PlanIshraneService';
import { HranaService } from 'src/services/HranaService';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanIshrane } from 'src/models/PlanIshrane';

@Component({
  selector: 'app-plan-ishrane',
  templateUrl: './plan-ishrane.component.html',
  styleUrls: ['./plan-ishrane.component.css']
})
export class PlanIshraneComponent implements OnInit {
  parametri:any={};
  plan:PlanIshrane=null;
  constructor(private loginService : LoginService,private planIshraneService:PlanIshraneService,private hranaService:HranaService,private router:Router,private route: ActivatedRoute,private location :Location) { }
  
  ngOnInit() {
    let data=this.route.snapshot.paramMap.get('data');
    this.parametri = JSON.parse(data);
    this.planIshraneService.getPlanIshrane(this.parametri.uK,this.parametri.uI,this.parametri.dat,this.parametri.naz).subscribe((data)=>{
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
