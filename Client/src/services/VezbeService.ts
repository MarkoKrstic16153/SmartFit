import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vezba } from 'src/models/Vezba';

@Injectable({providedIn: 'root'})
export class VezbeService {
    constructor(private httpClient: HttpClient) { }

    dodajVezbu(novaVezba:Vezba){

    }

    getAllVezbe(){

    }
    
    getTipTreningaVezbe(tipTrenigna:string){

    }

    getMisicVezbe(misic:string){

    }
    
}