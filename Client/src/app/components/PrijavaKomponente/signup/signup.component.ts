import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Klijent } from "src/models/Klijent";
import { Instruktor } from "src/models/Instruktor";
import { LoginService } from "src/services/LoginService";
import { InstruktorService } from "src/services/InstruktorService";
import { KlijentService } from "src/services/KlijentService";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  iskustva: string[] = [
    "Vezbac sa velikim Iskustvom",
    "Vezbac sa Iskustvom",
    "Vezbac Rekreativac",
    "Vezbac Pocetnik",
    "Vezbac bez iskustva"
  ];
  signupFlag: boolean = false;
  signupFlag1: boolean = false;
  //za klijenta
  imeKlijentControl: FormControl = new FormControl("", Validators.required);
  prezimeKlijentControl: FormControl = new FormControl("", Validators.required);
  visinaKlijentControl: FormControl = new FormControl("", Validators.required);
  tezinaKlijentControl: FormControl = new FormControl("", Validators.required);
  ciljKlijentControl: FormControl = new FormControl("", Validators.required);
  godinaRodjenjaKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  bodyFatKlijentControl: FormControl = new FormControl("", Validators.required);
  iskustvoKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  usernameKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  //za instruktora
  imeInstruktorControl: FormControl = new FormControl("", Validators.required);
  prezimeInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  akreditacijaInstruktorControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  radnoIskustvoInstruktorControl: FormControl = new FormControl(
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

  constructor(
    private loginService: LoginService,
    private instruktorService: InstruktorService,
    private klijentService: KlijentService
  ) {}

  ngOnInit() {}

  signUpInstructor() {
    this.loginService
      .loginCheckInstruktorPassword(this.usernameInstruktorControl.value)
      .subscribe(({ password }) => {
        if (password != 1) {
          let noviInstruktor: Instruktor = {
            akreditacija: this.akreditacijaInstruktorControl.value,
            ime: this.imeInstruktorControl.value,
            password: this.passwordInstruktorControl.value,
            prezime: this.prezimeInstruktorControl.value,
            radnoIskustvo: this.radnoIskustvoInstruktorControl.value,
            userName: this.usernameInstruktorControl.value,
            klijenti: []
          };
          this.instruktorService.dodajInstruktora(noviInstruktor);
        } else {
          this.signupFlag1 = true;
        }
      });
  }

  signUpClient() {
    this.loginService
      .loginCheckKlijentPassword(this.usernameKlijentControl.value)
      .subscribe(({ password }) => {
        if (password != 1) {
          let noviKlijent: Klijent = {
            bodyFat: [this.bodyFatKlijentControl.value],
            cilj: this.ciljKlijentControl.value,
            ime: this.imeKlijentControl.value,
            iskustvo: this.iskustvoKlijentControl.value,
            password: this.passwordKlijentControl.value,
            prezime: this.prezimeKlijentControl.value,
            tezina: [this.tezinaKlijentControl.value],
            userName: this.usernameKlijentControl.value,
            visina: this.visinaKlijentControl.value,
            instruktori: []
          };
          this.klijentService.dodajKlijenta(noviKlijent);
        } else {
          this.signupFlag = true;
        }
      });
  }
}
