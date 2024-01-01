import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedInUser = {
    "userId": 1,
    "name": "Demo",
    "email": "svk@gmail.com",
    "password": "456"
   } 
  constructor(public _login: LoginService){
    
  }

  ngOnInit(): void {
    // this._login.userData.subscribe((receiveddata) => {
    //   console.log(receiveddata);
    //   this.loggedInUser = receiveddata;
    // });
      this.getCurrentUser();
      console.log("in app.component.ts");
      
  }
  
  
  public getCurrentUser(){
    this._login.getCurrentUser().subscribe((data: any)=>{
      this.loggedInUser = data;
      console.log("in app.component.ts" + this.loggedInUser);
    })
  }

  public logoutUser(){
    this._login.logout();
  }

  public yourAccountFun(){
    console.log("hey man "+ this.loggedInUser.name);
  }
}
