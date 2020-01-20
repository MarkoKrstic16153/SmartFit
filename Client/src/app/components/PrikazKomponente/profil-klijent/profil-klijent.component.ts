import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { KlijentService } from 'src/services/KlijentService';
import { Klijent } from 'src/models/Klijent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-klijent',
  templateUrl: './profil-klijent.component.html',
  styleUrls: ['./profil-klijent.component.css']
})
export class ProfilKlijentComponent implements OnInit {
  klijent:Klijent=null;
  constructor(private loginService:LoginService,private klijentService:KlijentService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.klijent = null;
    this.klijentService.getKlijentProfile(this.route.snapshot.paramMap.get('username')).subscribe((klijentProfil)=>{this.klijent = klijentProfil;console.log(this.klijent)});
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

}
