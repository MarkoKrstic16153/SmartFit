import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PlanIshrane } from "src/models/PlanIshrane";
import { Observable } from "rxjs";
import { Odgovor } from 'src/models/Odgovor';

@Injectable({ providedIn: "root" })
export class PlanIshraneService {
  urlDodajPlanIshrane = "http://localhost:3000/planishrane/dodajplan";
  urlGetAllPlanIshrane = "http://localhost:3000/planishrane/getall";
  urlGetPlanIshrane = "http://localhost:3000/planishrane/getplan";
  urlDodajKomentar = "http://localhost:3000/planishrane/dodajkomentar";
  constructor(private httpClient: HttpClient) {}

  getAllPlanIshrane(
    usernameKlijenta: string,
    usernameInstruktora: string
  ): Observable<any[]> {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    let a = this.httpClient.post<any[]>(
      this.urlGetAllPlanIshrane,
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

  getPlanIshrane(usernameKlijenta:string,usernameInstruktora:string,datum:string,naziv:string):Observable<PlanIshrane>{
    const headers = new HttpHeaders()
    .set("Authorization", "my-auth-token")
    .set("Content-Type", "application/json");
  let a = this.httpClient.post<PlanIshrane>(
    this.urlGetPlanIshrane,
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

  addPlanIshrane(planIshrane: PlanIshrane):Observable<any> {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    let a =this.httpClient
      .post<PlanIshrane>(this.urlDodajPlanIshrane, planIshrane, {
        headers: headers
      })
      return a;
  }

  addKomentar(usernameKlijenta:string,userNameInstruktora:string,datum:string,naziv:string,noviOdgovor:Odgovor){
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<any>(this.urlDodajKomentar, 
        {
          usernameKlijenta:usernameKlijenta,
          userNameInstruktora:userNameInstruktora,
          datum:datum,
          naziv:naziv,
          noviOdgovor:noviOdgovor
        }, 
        {
        headers: headers
      }).subscribe((data)=>{
        console.log(data);
      })
  }
}
