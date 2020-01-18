import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class LoginService {
    logovaniUsername:string="";
    korisnik:boolean = false; 
    constructor(private httpClient: HttpClient) { }
    
    loginCheckKorisnik(username:string,password:string){

    }

    loginCheckInstruktor(username:string,password:string){

    }
}