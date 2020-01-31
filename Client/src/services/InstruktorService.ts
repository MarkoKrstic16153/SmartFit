import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Instruktor } from "src/models/Instruktor";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class InstruktorService {
  urlPostInstruktor: string =
    "http://localhost:3000/instruktor/signupinstruktor";
  getInstruktorByUsername: string =
    "http://localhost:3000/instruktor/";
  getAllInstruktors: string =
    "http://localhost:3000/instruktor/getallinstruktor/";
  getClientsInstruktor: string =
    "http://localhost:3000/instruktor/getclientinstruktor/";
  urlUpdateInstruktor:string = "http://localhost:3000/instruktor/updateinstruktor";
  urlSaradnjaInstruktor: string="http://localhost:3000/klijent/updatelistainstruktora";
  constructor(private httpClient: HttpClient) {}

  getAllInstruktori(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.getAllInstruktors);
  }

  dodajInstruktora(noviInstruktor: Instruktor) {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<Instruktor>(this.urlPostInstruktor, noviInstruktor, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  updateInstruktor(updatovaniInstruktor: Instruktor){
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .put<Instruktor>(this.urlUpdateInstruktor, updatovaniInstruktor, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  getKiljentiInstruktora(usernameInstruktora: string) {}

  getInstruktorProfil(username: string) {
    return this.httpClient.get<Instruktor>(
      this.getInstruktorByUsername + username
    );
  }

  raskiniSaradnju(usernameInstruktora:string,usernameKlijenta:string){
    const headers = new HttpHeaders()
    .set("Authorization", "my-auth-token")
    .set("Content-Type", "application/json");
  this.httpClient
    .post<Instruktor>(this.urlSaradnjaInstruktor, {usernameInstruktor:usernameInstruktora,usernameKlijent:usernameKlijenta}, {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }
}
