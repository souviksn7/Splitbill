import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  loggedInUser = {
    "userId": 1,
    "name": "Souvik",
    "email": "svk@gmail.com",
    "phone": "",
    "password": "456"
   } 

  constructor(private _login: LoginService, private _user: UserService, private toastr: ToastrService,){}

  ngOnInit(): void { 
    this.getCurrentUser();
  }
  private getCurrentUser(){
    this._login.getCurrentUser().subscribe((data: any)=>{
      this.loggedInUser = data;
    })
  }

  newName = "";
  newEmail = "";
  newPhone = "";
  newPassword = "";

  public changeName(){
    this.loggedInUser.name = this.newName;
    this._user.updateUser(this.loggedInUser).subscribe((data: any)=>{
      this.loggedInUser = data;
    })
  }
  public changeEmail(){
    this.loggedInUser.email = this.newEmail;
    this._user.updateUser(this.loggedInUser).subscribe((data: any)=>{
      this.loggedInUser = data;
    })
  }
  public changePhone(){
    if(this.newPhone.toString().length === 10){
      this.loggedInUser.phone = this.newPhone;
      this._user.updateUser(this.loggedInUser).subscribe((data: any)=>{
        this.loggedInUser = data;
      })
    }
    else{
      this.toastr.error('WARNING: Phone number should consist of 10 digits!');
    }
    
  }
  public changePassword(){
    this.loggedInUser.password = this.newPassword;
    this._user.updateUser(this.loggedInUser).subscribe((data: any)=>{
      this.loggedInUser = data;
    })
  }
}
