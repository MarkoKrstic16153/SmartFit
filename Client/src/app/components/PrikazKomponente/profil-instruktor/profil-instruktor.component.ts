import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { Instruktor } from 'src/models/Instruktor';
import { InstruktorService } from 'src/services/InstruktorService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil-instruktor',
  templateUrl: './profil-instruktor.component.html',
  styleUrls: ['./profil-instruktor.component.css']
})
export class ProfilInstruktorComponent implements OnInit {
  instruktor:Instruktor=null;
  flagIzmena:boolean = false;
  pretragaPoImenu:string = "Pretrazite Instruktore : ";
  obsKlijenti:Observable<Instruktor> = null;
  prezimeInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  akreditacijaInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  radnoIskustvoInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  noviPasswordInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  constructor(private loginService:LoginService,private instruktorService:InstruktorService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.instruktor=null;
    this.instruktorService.getInstruktorProfil(this.route.snapshot.paramMap.get('username')).subscribe((instruktorProfil)=>{this.instruktor = instruktorProfil;console.log(this.instruktor)});
    this.instruktorService.getAllInstruktori().subscribe((data)=>{
      console.log(data);
    });
  }

  daLiJeLogovan():boolean{
    if(this.loginService.logovaniUsername!="")
      return true;
    else
      return false;
  }

  daLiNJegovProfilIliGleda():boolean{
    if(this.loginService.logovaniUsername==this.instruktor.userName && this.loginService.korisnik == false)
      return true;
    else
      return false;
  }

  izmenaProfila(){
    this.flagIzmena = !this.flagIzmena;
  }

  updateProfil(){
    if(this.passwordInstruktorControl.value == this.instruktor.password){
      this.flagIzmena = !this.flagIzmena;
      let updateProfile:Instruktor = {
        akreditacija:this.akreditacijaInstruktorControl.value,
        ime:this.instruktor.ime,
        klijenti:this.instruktor.klijenti,
        password:this.noviPasswordInstruktorControl.value,
        prezime:this.prezimeInstruktorControl.value,
        radnoIskustvo:this.radnoIskustvoInstruktorControl.value,
        userName:this.instruktor.userName
      };
      console.log(updateProfile);
      this.instruktor = updateProfile;
      this.instruktorService.updateInstruktor(updateProfile);
    }
  }

  dodajHranu(){
    this.router.navigate(["/dodajhranu"]);
  }

  dodajVezbu(){
    this.router.navigate(["/dodajvezbu"]);
  }

}
