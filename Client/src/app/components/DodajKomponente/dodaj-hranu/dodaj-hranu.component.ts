import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hrana } from 'src/models/Hrana';
import { HranaService } from 'src/services/HranaService';
import { LoginService } from 'src/services/LoginService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dodaj-hranu',
  templateUrl: './dodaj-hranu.component.html',
  styleUrls: ['./dodaj-hranu.component.css']
})
export class DodajHranuComponent implements OnInit {
  imeControl : FormControl = new FormControl("", Validators.required);
  ugljeniHidratiControl : FormControl = new FormControl("", Validators.required);
  proteiniControl : FormControl = new FormControl("", Validators.required);
  mastiControl : FormControl = new FormControl("", Validators.required);
  vlaknaControl : FormControl = new FormControl("", Validators.required);
  poruka:string="";
  constructor(private hranaService:HranaService,private loginService:LoginService,private location:Location) { }

  ngOnInit() {
  }

  DodajHranu(){
    this.hranaService.checkHrana(this.imeControl.value).subscribe(({success})=>{
      if(success == 0){
        this.poruka="Ta hrana vec postoji.";
      }
      else{
        let novaHrana:Hrana = {
          ime:this.imeControl.value,
          masti:this.mastiControl.value,
          proteini:this.proteiniControl.value,
          ugljeniHidrati:this.ugljeniHidratiControl.value,
          vlakna:this.vlaknaControl.value
        };
        console.log(novaHrana);
        this.hranaService.dodajHranu(novaHrana);
        this.poruka = "Nova hrana je uspesno dodata.";
      }
    });
    
  }
  
  ispisiKalorije():string{
    if(this.imeControl.value == "")
      return "";
    let brKal = this.ugljeniHidratiControl.value*4 + this.proteiniControl.value*4 + this.mastiControl.value*9;
    return this.imeControl.value + " ima " + brKal + "kcal. (100g)";
  }

  ulogovan():boolean{
    if(this.loginService.logovaniUsername!="" && this.loginService.korisnik == false)
      return true;
    else
      return false;
  }

  nazad(){
    this.location.back();
  }
}
