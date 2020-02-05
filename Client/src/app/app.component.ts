import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/services/LoginService";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "SmartFit";
  constructor(private router: Router, private loginService: LoginService) {}
  getNavBarClasses(): string {
    if (this.router.url == "/") {
      return "navbar navbar-expand-lg navbar-dark opacity position-fixed";
    } else {
      return "navbar navbar-expand-lg navbar-light";
    }
  }
  daLiJeLogovan(): boolean {
    if (this.loginService.logovaniUsername != "") return true;
    else return false;
  }
  logout() {
    this.loginService.logovaniUsername = "";
    this.loginService.korisnik = true;
    this.router.navigate(["/"]);
  }
}
