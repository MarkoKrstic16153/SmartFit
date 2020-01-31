import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Klijent } from "src/models/Klijent";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class KlijentService {
  urlPostKlijent: string = "http://localhost:3000/klijent/signupklijent";
  getKlijentByUsername: string = "http://localhost:3000/klijent/";
  getAllClients: string = "http://localhost:3000/klijent/getallklijent";
  urlUpdateClient: string = "http://localhost:3000/klijent/updateklijent";
  urlSaradnjaKlijent: string="http://localhost:3000/instruktor/updatelistaklijenata";
  constructor(private httpClient: HttpClient) {}

  dodajKlijenta(noviKlijent: Klijent) {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<Klijent>(this.urlPostKlijent, noviKlijent, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  updateKlijent(updatovaniKlijent: Klijent){
    const headers = new HttpHeaders()
    .set("Authorization", "my-auth-token")
    .set("Content-Type", "application/json");
  this.httpClient
    .put<Klijent>(this.urlUpdateClient, updatovaniKlijent, { headers: headers })
    .subscribe(data => {
      console.log(data);
    });
  }

  getKlijentProfile(username: string): Observable<Klijent> {
    return this.httpClient.get<Klijent>(this.getKlijentByUsername + username);
  }

  getAllKlijents(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.getAllClients);
  }

  updateSaradnja(usernameKlijent:string,usernameInstruktor:string,tip:number){
    const headers = new HttpHeaders()
    .set("Authorization", "my-auth-token")
    .set("Content-Type", "application/json");
  this.httpClient
    .post<Klijent>(this.urlSaradnjaKlijent, {usernameKlijent:usernameKlijent,usernameInstruktor:usernameInstruktor,tip:tip}, { headers: headers })
    .subscribe(data => {
      console.log(data);
    });
  }

}
