import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanIshrane } from 'src/models/PlanIshrane';

@Injectable({providedIn: 'root'})
export class PlanIshraneService {
    constructor(private httpClient: HttpClient) { }
    
    getPlanIshrane(usernameKlijenta:string,usernameInstruktora:string){

    }

    addPlanIshrane(planIshrane:PlanIshrane){

    }
}