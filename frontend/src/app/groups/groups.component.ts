import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupsService } from '../services/groups.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  createGroupForm!: FormGroup;
  partOfGroups = [
    {
      "groupId": 1,
      "groupName": "Demo"
    }
  ];
  groupCreated = false;
  loggedInUser = {
    userId: 1,
    name: "Demo Name"
  };

  constructor(private _groups: GroupsService, private _login: LoginService){
  }

  ngOnInit(): void {
      this.getMyGroups();
  }

  getMyGroups(){
    this._login.getCurrentUser().subscribe((data: any)=>{
      this.loggedInUser = data;
      this._groups.getMyGroups(this.loggedInUser.userId).subscribe((data:any)=>{
        this.partOfGroups=data;
        console.log(this.partOfGroups); 
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", "error");
      }
      )
    }) 
  }

  createGroup(){
    this.groupCreated = true;
  }

  partOfGroup(){

  }

}
