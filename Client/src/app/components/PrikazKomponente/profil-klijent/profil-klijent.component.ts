import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { KlijentService } from 'src/services/KlijentService';
import { Klijent } from 'src/models/Klijent';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import { InstruktorService } from 'src/services/InstruktorService';

@Component({
  selector: 'app-profil-klijent',
  templateUrl: './profil-klijent.component.html',
  styleUrls: ['./profil-klijent.component.css']
})
export class ProfilKlijentComponent implements OnInit {
  klijent:Klijent=null;
  izmenaProfila:boolean=false;
  merenje:boolean=false;
  instruktori:boolean=false;
  pretragaPoImenu:string = "Pretrazite Klijente : ";
  obsKlijenti:Observable<string[]> = null;
  sviInstruktori:string[]=[];
  iskustva: string[] = [
    "Vezbac sa velikim Iskustvom",
    "Vezbac sa Iskustvom",
    "Vezbac Rekreativac",
    "Vezbac Pocetnik",
    "Vezbac bez iskustva"
  ];
  ///
  chartDatasets: Array<any> = [];
  chartDatasets1: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType: string = 'line';
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartColors1: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  ///
  prezimeKlijentControl: FormControl = new FormControl("", Validators.required);
  visinaKlijentControl: FormControl = new FormControl("", Validators.required);
  tezinaKlijentControl: FormControl = new FormControl("", Validators.required);
  ciljKlijentControl: FormControl = new FormControl("", Validators.required);
  bodyFatKlijentControl: FormControl = new FormControl("", Validators.required);
  iskustvoKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  noviPasswordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  constructor(private loginService:LoginService,private klijentService:KlijentService,private route:ActivatedRoute,private router:Router,private instruktorService:InstruktorService,private location:Location) { }

  ngOnInit() {
    this.klijent = null;
    this.klijentService.getKlijentProfile(this.route.snapshot.paramMap.get('username')).subscribe((klijentProfil)=>{
      this.klijent = klijentProfil;console.log(this.klijent);
      this.osveziGraf();
      this.instruktorService.getAllInstruktori().subscribe((data)=>{
        this.sviInstruktori = data;
        this.sviInstruktori = this.sviInstruktori.filter( ( el ) => !this.klijent.instruktori.includes( el ) );
      });
    });
    this.obsKlijenti=this.klijentService.getAllKlijents();
  }

  daLiJeLogovan():boolean{
    if(this.loginService.logovaniUsername!="")
      return true;
    else
      return false;
  }

  daLiNJegovProfilIliGleda():boolean{
    if(this.loginService.logovaniUsername==this.klijent.userName && this.loginService.korisnik == true)
      return true;
    else
      return false;
  }

  izmena(){
    this.izmenaProfila = !this.izmenaProfila;
  }

  novoMerenje(){
    this.merenje = !this.merenje;
  }

  pogledajInstruktore(){
    this.instruktori = !this.instruktori;
  }

  updateProf(){
    if(this.passwordKlijentControl.value == this.klijent.password){
      let updateProfil:Klijent = {
        bodyFat:this.klijent.bodyFat,
        cilj:this.ciljKlijentControl.value,
        ime:this.klijent.ime,
        instruktori:this.klijent.instruktori,
        iskustvo:this.iskustvoKlijentControl.value,
        password:this.noviPasswordKlijentControl.value,
        prezime:this.prezimeKlijentControl.value,
        tezina:this.klijent.tezina,
        userName:this.klijent.userName,
        visina:this.visinaKlijentControl.value,
        godinaRodjenja:this.klijent.godinaRodjenja
      }
      this.klijent = updateProfil;
      this.klijentService.updateKlijent(updateProfil);
    }
  }

  dodajMerenje(){
    let novaTezina = this.tezinaKlijentControl.value;
    let noviBodyFat = this.bodyFatKlijentControl.value;
    this.klijent.bodyFat.push(noviBodyFat);
    this.klijent.tezina.push(novaTezina);
    this.klijentService.updateKlijent(this.klijent);
    this.osveziGraf();
  }

  osveziGraf(){
    this.chartDatasets = [
      { data: this.klijent.tezina, label: 'Tezina' },
    ];
    this.chartDatasets1 = [
      { data: this.klijent.bodyFat, label: 'BodyFat' },
    ];
    this.chartLabels = [];
    for(let i=0;i<this.klijent.tezina.length;i++)
        this.chartLabels.push(i+1);
  }

  angazuj(instruktorUsername:string){
    this.klijent.instruktori.push(instruktorUsername);
    this.klijentService.updateKlijent(this.klijent);
    const index = this.sviInstruktori.indexOf(instruktorUsername);
    if (index > -1) {
      this.sviInstruktori.splice(index, 1);
    }
    this.klijentService.updateSaradnja(this.klijent.userName,instruktorUsername,1);
  }

  vidiProfil(instruktorUsername:string){
    this.router.navigate(["/vidiinstruktor/", instruktorUsername]);
  }

  pretraziUsera($username: any) {
    this.router.navigate(["/vidiklijent/", $username]);
  }

  nazad(){
    this.location.back();
  }

  logout(){
    this.loginService.logovaniUsername="";
    this.loginService.korisnik = true;
    this.nazad();
  }

  odjaviUslugu(instruktorUsername:string){
    console.log(instruktorUsername);
    const index = this.klijent.instruktori.indexOf(instruktorUsername);
    if (index > -1) {
      this.klijent.instruktori.splice(index, 1);
    }
    this.klijentService.updateKlijent(this.klijent);
    this.sviInstruktori.push(instruktorUsername);
    this.klijentService.updateSaradnja(this.klijent.userName,instruktorUsername,0);
  }

  vidiPlanTreninga(usernameInstruktora:string){

  }

  vidiPlanIshrane(usernameInstruktora:string){

  }
}
