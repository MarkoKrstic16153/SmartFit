import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanTreninga } from 'src/models/PlanTreninga';

@Injectable({providedIn: 'root'})
export class PlanTrenignaService {
    constructor(private httpClient: HttpClient) { }
    
    getPlanTreninga(usernameKlijenta:string,usernameInstruktora:string){

    }

    addPlanTreninga(planTreninga:PlanTreninga){

    }
}