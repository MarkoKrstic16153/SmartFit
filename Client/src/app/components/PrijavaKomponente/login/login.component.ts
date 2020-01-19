import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { LoginService } from "src/services/LoginService";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  instFlag: boolean = false;
  kliFlag: boolean = false;
  usernameKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  usernameInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  loginClient() {
    this.loginService
      .loginKlijent(
        this.usernameKlijentControl.value,
        this.passwordKlijentControl.value
      )
      .subscribe(({ success }) => {
        console.log(success);
        if (success == 1) {
          console.log("ok");
          this.loginService.logovaniUsername = this.usernameKlijentControl.value;
          this.loginService.korisnik = true;
        } else {
          this.kliFlag = true;
        }
      });
  }

  loginInstructor() {
    this.loginService
      .loginInstruktor(
        this.usernameInstruktorControl.value,
        this.passwordInstruktorControl.value
      )
      .subscribe(({ success }) => {
        console.log(success);
        if (success == 1) {
          console.log("ok");
          this.loginService.logovaniUsername = this.usernameInstruktorControl.value;
          this.loginService.korisnik = false;
        } else {
          this.instFlag = true;
        }
      });
  }
}
