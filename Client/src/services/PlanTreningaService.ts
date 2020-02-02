import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlanTreninga } from 'src/models/PlanTreninga';
import { Observable } from 'rxjs';
import { Trening } from 'src/models/Trening';

@Injectable({providedIn: 'root'})
export class PlanTrenignaService {
    urlDodajPlanTreninga = "http://localhost:3000/plantreninga/dodajplan";
    urlGetAllPlanTreninga = "http://localhost:3000/plantreninga/getall";
    urlGetPlanTreninga = "http://localhost:3000/plantreninga/getplan";
    constructor(private httpClient: HttpClient) { }
    
    getAllPlanTreninga(usernameKlijenta:string,usernameInstruktora:string): Observable<any[]> {
      const headers = new HttpHeaders()
        .set("Authorization", "my-auth-token")
        .set("Content-Type", "application/json");
      let a = this.httpClient.post<any[]>(
        this.urlGetAllPlanTreninga,
        {
          usernameInstruktora: usernameInstruktora,
          usernameKlijenta: usernameKlijenta
        },
        {
          headers: headers
        }
      );
      return a;
    }

    getPlanTreninga(usernameKlijenta:string,usernameInstruktora:string,datum:string,naziv:string):Observable<PlanTreninga>{
        const headers = new HttpHeaders()
        .set("Authorization", "my-auth-token")
        .set("Content-Type", "application/json");
      let a = this.httpClient.post<PlanTreninga>(
        this.urlGetPlanTreninga,
        {
          usernameInstruktora: usernameInstruktora,
          usernameKlijenta: usernameKlijenta,
          naziv:naziv,
          datum:datum
        },
        {
          headers: headers
        }
      );
      return a;
    }

    addPlanTreninga(planTreninga:PlanTreninga):Observable<any>{
        const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    let a = this.httpClient
      .post<PlanTreninga>(this.urlDodajPlanTreninga, planTreninga, {
        headers: headers
      })
      return a;
    }
}