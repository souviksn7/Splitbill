import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

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
    "password": "456"
   } 

  constructor(private _user: UserService){}

  ngOnInit(): void { 

  }
  // private getCurrentUser(){
  //   this._user.getgetCurrentUser().subscribe((data: any)=>{
  //     this.loggedInUser = data;
  //   })
  // }
}
