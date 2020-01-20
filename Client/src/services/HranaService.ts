import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hrana } from "src/models/Hrana";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class HranaService {
  urlPostHrana = "http://localhost:3000/hrana/posthrana";
  ulrGetAllHrana = "http://localhost:3000/hrana/getallhrana";
  ulrCheckHrana = "http://localhost:3000/hrana/checkhrana/";
  constructor(private httpClient: HttpClient) {}

  dodajHranu(novaHrana: Hrana) {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    this.httpClient
      .post<Hrana>(this.urlPostHrana, novaHrana, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
  }

  getAllHrana(): Observable<Hrana[]> {
    return this.httpClient.get<Hrana[]>(this.ulrGetAllHrana);
  }

  checkHrana(imeHrane:string):Observable<any>{
    return this.httpClient.get<any>(this.ulrCheckHrana+imeHrane);
  }
}
