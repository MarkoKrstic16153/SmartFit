import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameKlijentControl : FormControl = new FormControl("", Validators.required);
  passwordKlijentControl : FormControl = new FormControl("", Validators.required);
  usernameInstruktorControl : FormControl = new FormControl("", Validators.required);
  passwordInstruktorControl : FormControl = new FormControl("", Validators.required);
  constructor() { }

  ngOnInit() {
  }

}
