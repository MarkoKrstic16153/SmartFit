import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Vezba } from 'src/models/Vezba';
import { VezbeService } from 'src/services/VezbeService';

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
  constructor(private vezbaService:VezbeService) { }

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
    console.log(novaVezba);
    this.vezbaService.dodajVezbu(novaVezba);
  }

}
