import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PlanIshrane } from "src/models/PlanIshrane";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class PlanIshraneService {
  urlDodajPlanIshrane = "http://localhost:3000/planishrane/dodajplan";
  urlGetAllPlanIshrane = "http://localhost:3000/planishrane/getall";
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
    a.subscribe(data => {
      console.log(data);
    });
    return a;
  }

  addPlanIshrane(planIshrane: PlanIshrane) {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<PlanIshrane>(this.urlDodajPlanIshrane, planIshrane, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
  }
}
