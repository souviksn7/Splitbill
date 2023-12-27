import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  otp: string = '';
  otpGenerated: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  step: 'email' | 'otp-verification' | 'new-password' = 'email';
  isEmailVerified: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private ngxUiLoader: NgxUiLoaderService,
  ) {}


  async onSubmit() {
    switch (this.step) {
      //first
      case 'email':
        const otp = Math.floor(100000 + Math.random() * 900000) + ''; // Generate a 6-digit OTP
        this.otpGenerated = otp;
        const otpData = {
          email: this.email,
          otp: otp,
        };

        try {
          this.ngxUiLoader.start();
          const forgetPasswordResponse: any = await this.http
            .post(`http://localhost:8080/user/forgotPassword`, otpData,{responseType: 'text'})
            .toPromise();
          this.ngxUiLoader.stop();
          console.log(forgetPasswordResponse);
          console.log(otpData);
          this.step = 'otp-verification';
          this.isEmailVerified = true;
        } catch (error:any) {
          this.ngxUiLoader.stop();
          this.toastr.error('WARNING: Username or Email does not exists!');
          console.log(otpData);
          console.log(error);
          // this.ngxUiLoader.start();
          // if (error.error.text === 'Check Your mail for Credentials') {
          //   this.step = 'otp-verification';
          //   this.isEmailVerified = true;
          //   this.ngxUiLoader.stop();
          // } else {
          //   this.toastr.error('WARNING: Username or Email does not exists!');
          // }
        }
        break;

      //second
      case 'otp-verification':
        console.log("nxt page");
        if (this.otp === this.otpGenerated) {
          this.step = 'new-password';
          //console.log("otp verified");
        } else {
          console.log('wrong otp');
        }
        break;

      //third
      case 'new-password':
        if (this.newPassword === this.confirmPassword) {
          const updateData = {
            email: this.email,
            password: this.confirmPassword,
          };
          console.log(updateData);

          const forgetPasswordResponse: any = await this.http
            .post(`http://localhost:8080/user/updatePassword`, updateData,{responseType: 'text'})
            .toPromise();
          // console.log(forgetPasswordResponse);

          this.email = '';
          this.otp = '';
          this.newPassword = '';
          this.step = 'email';
          this.confirmPassword = '';
          this.isEmailVerified = false;

          this.router.navigate(['/login']);
          this.toastr.success('', 'Password Changed Successful!');
        }

        break;
    }
  }

}
