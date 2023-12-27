import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  constructor(
    private snack: MatSnackBar,
    private _login: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    console.log('login btn click');

    if (this.loginData.email.trim() == '' || this.loginData.email == null) {
      this.snack.open('email is required!!', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('password is required!!', '', {
        duration: 3000,
      });
      return;
    }

    //request Server to generate Token

    this._login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);
        //login...

        this._login.loginUser(data.jwtToken);

        console.log('login');

        this._login.getCurrentUser().subscribe((user: any) => {
          this._login.setUser(user);
          console.log(user);
          //redirect to groups

          this.router.navigate(['groups']);
          
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

  //clear fuction
  clear() {
    console.log('clear is working');

    this.loginData = {
      email: '',
      password: '',
    };
  }
}