import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instruktor } from 'src/models/Instruktor';

@Injectable({providedIn: 'root'})
export class InstruktorService {
    constructor(private httpClient: HttpClient) { }
    
    getAllInstruktori(){

    }

    dodajInstruktora(noviInstruktor:Instruktor){

    }

    getKiljentiInstruktora(usernameInstruktora:string){

    }

    getInstruktorProfil(username:string){

    }

}