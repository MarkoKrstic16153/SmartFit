import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Vezba } from "src/models/Vezba";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class VezbeService {
  urlPostVezba = "http://localhost:3000/vezba/postvezba";
  ulrGetAllVezbe = "http://localhost:3000/vezba/getallvezba";
  ulrGetTreningVezbe = "http://localhost:3000/vezba/getallvezbatip";
  ulrCheckVezba = "http://localhost:3000/vezba/checkvezba/";
  ulrGetVezba = "http://localhost:3000/vezba/";
  constructor(private httpClient: HttpClient) {}

  dodajVezbu(novaVezba: Vezba) {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<Vezba>(this.urlPostVezba, novaVezba, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  getAllVezbe(): Observable<Vezba[]> {
    return this.httpClient.get<Vezba[]>(this.ulrGetAllVezbe);
  }

  getVezba(ime: string): Observable<Vezba> {
    return this.httpClient.get<Vezba>(this.ulrGetVezba + ime);
  }

  checkVezba(ime: string): Observable<any> {
    return this.httpClient.get<any>(this.ulrCheckVezba + ime);
  }

  getTipTreningaVezbe(tipTreninga: string): Observable<Vezba[]> {
    const headers = new HttpHeaders()
    .set("Authorization", "my-auth-token")
    .set("Content-Type", "application/json");
  let a = this.httpClient.post<Vezba[]>(
    this.ulrGetTreningVezbe,
    {
      tipTreninga:tipTreninga
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

}
