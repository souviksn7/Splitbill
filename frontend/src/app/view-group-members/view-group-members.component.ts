import { Component, OnInit } from '@angular/core';
import { GroupDetailsService } from '../services/group-details.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/user.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-view-group-members',
  templateUrl: './view-group-members.component.html',
  styleUrls: ['./view-group-members.component.css']
})
export class ViewGroupMembersComponent implements OnInit {

  groupId: any;

  groupMembers = [
    {
      "userId": 101102948990,
      "name": "Demo Name",
      "email": "demo@email.com",
      "phone": 1010101010,
      "password": "21ed"
    }
  ];

  users = [{
      "userId": 101134658451,
      "name": "Demo Name",
      "email": "demo@email.com",
      "phone": 1010101010,
      "password": "21ed",
      "alreadyAdded": false
  }];

  AllUsers = [{
    "userId": 101134658451,
    "name": "Demo Name",
    "email": "demo@email.com",
    "phone": 1010101010,
    "password": "21ed",
    "alreadyAdded": false
}];

  searchValue: string = "";

  constructor(private _router: ActivatedRoute, private _groupDetails: GroupDetailsService, private _user: UserService, private _group: GroupsService){
    this.groupId = this._router.snapshot.params['groupId'];
  }

  ngOnInit(): void {
      this._groupDetails.getGroupMembers(this.groupId).subscribe((data: any)=>{
        this.groupMembers = data;
        // console.log(this.groupMembers);
      },
      (error)=>{
        Swal.fire("Error!", "Error in loading group members", "error");
        console.log(error);
      }
      )

      this._user.getAllUsers().subscribe((data:any)=>{
        this.users = data;
        this.AllUsers = data;
        // console.log(this.users);

        for(let i in this.users){
          for(let j in this.groupMembers){
            if(this.users[i].userId === this.groupMembers[j].userId){
              this.users[i].alreadyAdded = true;
            }
          }
        }
      })
  }

  removeMember(userId: any){
    this._group.removeMemberFromGroup(this.groupId, userId).subscribe((data: any)=>{

      let tempMember = this.groupMembers.filter((member)=>member.userId === userId)[0];
      console.log(tempMember);

      let tempUser = this.users.filter((user)=>user.userId === userId)[0];
      tempUser.alreadyAdded = false;

      this.groupMembers = this.groupMembers.filter((member)=>member.userId!=userId);
      Swal.fire("Success!!", tempMember.name + " removed from this group successfully", "success");
    },
      (error)=>{
        Swal.fire("Error!", "Error in loading group members", "error");
        console.log(error);
      }
    )
  }

  addMember(userId: any){
     this._group.assignMemberToGroup(this.groupId, userId).subscribe((data:any)=>{
      let tempUser;
      tempUser = this.users.filter((user)=>user.userId === userId)[0];
      console.log(tempUser);

      if(this.groupMembers.includes(tempUser)===false){
        this.groupMembers.push(tempUser);
        tempUser.alreadyAdded = true;
        Swal.fire("Success!!", tempUser.name + " added to this group successfully", "success");
      }
    })
  }

  filterMembers(){
    this.users = this.AllUsers.filter((user)=>user.name.includes(this.searchValue));
    console.log("button clicked");
  }

}
