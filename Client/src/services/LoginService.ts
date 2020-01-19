import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class LoginService {
  logovaniUsername: string = "";
  korisnik: boolean = false;
  urlGetKlijentPassword = "http://localhost:3000/login/loginklijent/";
  urlGetInstruktorPassword = "http://localhost:3000/login/logininstruktor/";
  constructor(private httpClient: HttpClient) {}

  loginCheckKlijentPassword(username: string) {
    return this.httpClient.get<string>(this.urlGetKlijentPassword + username);
  }

  loginCheckInstruktorPassword(username: string) {
    return this.httpClient.get<string>(
      this.urlGetInstruktorPassword + username
    );
  }
}
