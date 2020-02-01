import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlanIshrane } from 'src/models/PlanIshrane';

@Injectable({providedIn: 'root'})
export class PlanIshraneService {
    urlDodajPlanIshrane = "http://localhost:3000/planishrane/dodajplan";
    constructor(private httpClient: HttpClient) { }
    
    getPlanIshrane(usernameKlijenta:string,usernameInstruktora:string){

    }

    addPlanIshrane(planIshrane:PlanIshrane){
        const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<PlanIshrane>(this.urlDodajPlanIshrane, planIshrane, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
    }
}