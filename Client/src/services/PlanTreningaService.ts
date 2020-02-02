import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlanTreninga } from 'src/models/PlanTreninga';

@Injectable({providedIn: 'root'})
export class PlanTrenignaService {
    urlDodajPlanTreninga = "http://localhost:3000/plantreninga/dodajplan";
    urlGetAllPlanTreninga = "http://localhost:3000/plantreninga/getall";
    constructor(private httpClient: HttpClient) { }
    
    getPlanTreninga(usernameKlijenta:string,usernameInstruktora:string){

    }

    addPlanTreninga(planTreninga:PlanTreninga){
        const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<PlanTreninga>(this.urlDodajPlanTreninga, planTreninga, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
    }
}