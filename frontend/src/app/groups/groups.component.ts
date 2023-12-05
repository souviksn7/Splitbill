import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupsService } from '../services/groups.service';
import Swal from 'sweetalert2';

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
  loggedInUser: any;

  constructor(private _groups: GroupsService){

  }

  ngOnInit(): void {
      this._groups.groups().subscribe((data:any)=>{
        // success

        this.partOfGroups=data;
        console.log(this.partOfGroups); 
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", "error");
      }
      )
  }

  createGroup(){
    this.groupCreated = true;
  }

  partOfGroup(){

  }

}
