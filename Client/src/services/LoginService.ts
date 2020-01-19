import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Vezba } from "src/models/Vezba";

@Injectable({ providedIn: "root" })
export class LoginService {
  logovaniUsername: string = "";
  korisnik: boolean = false;
  urlGetKlijentPassword = "http://localhost:3000/klijent/loginklijent/";
  urlGetInstruktorPassword =
    "http://localhost:3000/instruktor/logininstruktor/";
  urlKlijentLogin = "http://localhost:3000/klijent/logklijent/";
  urlInstruktorLogin = "http://localhost:3000/instruktor/loginstruktor/";
  constructor(private httpClient: HttpClient) {}

  loginCheckKlijentPassword(username: string): Observable<any> {
    return this.httpClient.get<any>(this.urlGetKlijentPassword + username);
  }

  loginCheckInstruktorPassword(username: string): Observable<any> {
    return this.httpClient.get<any>(this.urlGetInstruktorPassword + username);
  }

  loginInstruktor(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    return this.httpClient.post<Vezba>(
      this.urlInstruktorLogin,
      { userName: username, password: password },
      { headers: headers }
    );
  }

  loginKlijent(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set("Authorization", "my-auth-token")
      .set("Content-Type", "application/json");
    return this.httpClient.post<Vezba>(
      this.urlKlijentLogin,
      { userName: username, password: password },
      { headers: headers }
    );
  }
}
