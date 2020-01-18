import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hrana } from 'src/models/Hrana';

@Injectable({providedIn: 'root'})
export class HranaService {
    constructor(private httpClient: HttpClient) { }
    
    dodajHranu(novaHrana:Hrana){

    }

    getAllHrana(){

    }
}