import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hrana } from 'src/models/Hrana';
import { HranaService } from 'src/services/HranaService';

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
  constructor(private hranaService:HranaService) { }

  ngOnInit() {
  }

  DodajHranu(){
    let novaHrana:Hrana = {
      ime:this.imeControl.value,
      masti:this.mastiControl.value,
      proteini:this.proteiniControl.value,
      ugljeniHidrati:this.ugljeniHidratiControl.value,
      vlakna:this.vlaknaControl.value
    };
    console.log(novaHrana);
    this.hranaService.dodajHranu(novaHrana);
  }
  
  ispisiKalorije():string{
    if(this.imeControl.value == "")
      return "";
    let brKal = this.ugljeniHidratiControl.value*4 + this.proteiniControl.value*4 + this.mastiControl.value*9;
    return this.imeControl.value + " ima " + brKal + "kcal. (100g)";
  }
}
