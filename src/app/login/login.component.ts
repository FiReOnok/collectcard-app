import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  hide = true;
  public loginForm: FormGroup;
  constructor(private _auth: AuthService, private _router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
   }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Необходимо заполнить это поле' :
        this.email.hasError('email') ? 'Некорректный email' :
        this.password.hasError('minlength') ? 'Минимальная длинна пароля 8 символов' :
        this.password.hasError('required') ? 'Необходимо заполнить это поле' :
            '';
  }
  ngOnInit() {
  }
  public loginUser() {
    this.loginUserData = {email: this.email.value, pass: this.password.value};
    // console.log(this.loginUserData);
    if (this.email.value == null || !this.password.valid) {
      console.log('Форма заполнена некорректно!');
    } else {
      this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          // console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.userId);
          this._router.navigate(['/']);
        },
        err => console.log(err)
      );
    }
    // console.log(this.regForm.get('password'));
    // console.log(this.regForm);
  }
}
