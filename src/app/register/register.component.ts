import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};
  hide = true;
  public regForm: FormGroup;
  constructor(private _auth: AuthService, private _router: Router) {
    this.regForm = new FormGroup({
      login: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
   }
  login = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Необходимо заполнить это поле' :
        this.email.hasError('email') ? 'Некорректный email' :
        this.password.hasError('required') ? 'Необходимо заполнить это поле' :
        this.password.hasError('minlength') ? 'Минимальная длинна пароля 8 символов' :
        this.login.hasError('required') ? 'Необходимо заполнить это поле' :
            '';
  }
  ngOnInit() {
  }
  public registerUser() {
    this.registerUserData = {login: this.login.value, email: this.email.value, pass: this.password.value};
    console.log(this.registerUserData);
    if (this.email.value == null || !this.password.valid || this.login.value == null) {
      console.log('Форма заполнена некорректно!');
    } else {
      this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/']);
        },
        err => console.log(err)
      );
    }
    // console.log(this.regForm.get('password'));
    // console.log(this.regForm);
  }
}
