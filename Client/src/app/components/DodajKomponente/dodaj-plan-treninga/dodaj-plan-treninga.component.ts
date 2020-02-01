import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/services/LoginService';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dodaj-plan-treninga',
  templateUrl: './dodaj-plan-treninga.component.html',
  styleUrls: ['./dodaj-plan-treninga.component.css']
})
export class DodajPlanTreningaComponent implements OnInit {
  usernameKlijenta:string = "";
  usernameInstruktora:string = "";
  
  constructor(private route:ActivatedRoute,private router:Router,private location:Location,private loginService:LoginService) { }

  ngOnInit() {
    let podaci = this.route.snapshot.paramMap.get('data');
    var res : string[] = podaci.split(" ");
    console.log(res[0] + res[1]);
    this.usernameInstruktora = res[1];
    this.usernameKlijenta = res [0];
  }

  daLiJeLogovan():boolean{
    if(this.loginService.logovaniUsername!="")
      return true;
    else
      return false;
  }

}
