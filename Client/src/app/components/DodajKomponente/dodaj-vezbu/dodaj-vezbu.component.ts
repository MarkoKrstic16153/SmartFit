import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VezbeService } from 'src/services/VezbeService';
import { LoginService } from 'src/services/LoginService';
import { Location } from '@angular/common';
import { Vezba } from 'src/models/Vezba';

@Component({
  selector: 'app-dodaj-vezbu',
  templateUrl: './dodaj-vezbu.component.html',
  styleUrls: ['./dodaj-vezbu.component.css']
})
export class DodajVezbuComponent implements OnInit {
  pogodjeniMisici:string[]=[];
  dozvoljeniTreninzi:string[]=[];
  treninzi:string[]=['FullBody','Push','Pull','Legs','BroArms','BroChest','Calisthenics'];
  misici:string[]=['Grudi','Lepeze','Trapezi','Trbusnjaci','Butine','Gluteus','Listovi','Biceps','Triceps','Loza','Ramena','Podlaktica'];
  imeControl : FormControl = new FormControl("", Validators.required);
  misiciControl : FormControl = new FormControl("", Validators.required);
  treningControl : FormControl = new FormControl("", Validators.required);
  bodyWeightControl : FormControl = new FormControl("", Validators.required);
  tegoviControl : FormControl = new FormControl("", Validators.required);
  masineControl : FormControl = new FormControl("", Validators.required);
  poruka:string="";
  constructor(private vezbaService:VezbeService,private loginService:LoginService,private location:Location) { }

  ngOnInit() {

  }

  dodajTrening(){
    if(!this.dozvoljeniTreninzi.includes(this.treningControl.value) && this.treningControl.value!="")
      this.dozvoljeniTreninzi.push(this.treningControl.value);  
  }

  dodajMisic(){
    if(!this.pogodjeniMisici.includes(this.misiciControl.value) && this.misiciControl.value!="")
    this.pogodjeniMisici.push(this.misiciControl.value);  
    console.log(this.pogodjeniMisici);
  }

  izbaciTrening(trening:string){
    let ind:number = this.dozvoljeniTreninzi.indexOf(trening);
    this.dozvoljeniTreninzi.splice(ind,1);
  }

  izbaciMisic(misic:string){
    let ind:number = this.pogodjeniMisici.indexOf(misic);
    this.pogodjeniMisici.splice(ind,1);
  }

  dodajteVezbu(){
    this.vezbaService.checkVezba(this.imeControl.value).subscribe(({success})=>{
      if(success == 0){
        this.poruka = "Vezba vec postoji.";
      }
      else{
        let teg,masina,bodyWeight;
        if(this.tegoviControl.value == "" || this.tegoviControl.value == false)
          teg= false;
        else
          teg= true;
        if(this.masineControl.value == "" || this.masineControl.value == false)
          masina= false;
        else
          masina= true;
        if(this.bodyWeightControl.value == "" || this.bodyWeightControl.value == false)
          bodyWeight= false;
        else
          bodyWeight= true;
        let novaVezba:Vezba = {
          bodyWeight:bodyWeight,
          ime:this.imeControl.value,
          masine:masina,
          tegovi:teg,
          misicnePartije:this.pogodjeniMisici,
          vrsteTreninga:this.dozvoljeniTreninzi
        };
        this.vezbaService.dodajVezbu(novaVezba);
        this.poruka = "Nova vezba je uspesno dodata."
      }
    })
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
