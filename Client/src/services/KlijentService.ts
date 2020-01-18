import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Klijent } from 'src/models/Klijent';

@Injectable({providedIn: 'root'})
export class KlijentService {
    constructor(private httpClient: HttpClient) { }

    dodajKlijenta(noviKlijent:Klijent){

    }

    getKlijentProfile(username:string){

    }

    getAllKlijents(){
        
    }
}