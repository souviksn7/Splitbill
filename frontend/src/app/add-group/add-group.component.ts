import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import Swal from 'sweetalert2';

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
    private _group: GroupsService
  ){}

  ngOnInit(): void {
      
  }

  demoFunction(){
    console.log("save working");
    
  }

  formSubmit(){
    console.log("form submit called");
    

    if(this.group.groupName.trim() == '' || this.group.groupName == null){
      Swal.fire("Error !!", "Error in loading data", "error");
    }

    //all done
    
    this._group.addGroup(this.group).subscribe((data: any)=>{
      Swal.fire('Success !!', 'Group is added successfully', 'success');
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Server Error", "error")
    }
    )
  }

}
