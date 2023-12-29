import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  group = {
    groupName: ""
  }

  constructor(
    private _group: GroupsService,
    private router: Router,
    private _login: LoginService
  ){}

  ngOnInit(): void {
      this.getLoggedInUser();
  }

  loggedInUser = {
    "userId": 1,
    "name": "Souvik",
    "email": "svk@gmail.com",
    "password": "456"
   } 


   getLoggedInUser(){
      this._login.getCurrentUser().subscribe((data: any)=>{
        this.loggedInUser = data;
      })
   }

  demoFunction(){
    console.log("save working");
    
  }

  addGroup(){
    console.log("form submit called");
    

    if(this.group.groupName.trim() == '' || this.group.groupName == null){
      Swal.fire("Error !!", "Error in loading data", "error");
    }

    //all done
    
    this._group.addGroup(this.group).subscribe((newGroup: any)=>{
      Swal.fire('Success !!', 'Group is added successfully', 'success');
      
      this._group.assignMemberToGroup(newGroup.groupId, this.loggedInUser.userId).subscribe((data: any)=>{
        
      })
      // Get loggedIn user 

      this.router.navigate(['groups']);

    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Server Error", "error")
    }
    )
  }

}
