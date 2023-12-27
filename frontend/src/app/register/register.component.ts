import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService:UserService,private snack:MatSnackBar,private router: Router){}

  //object
  public user = {
    name: '',
    email: '',
    password: ''
  }


  //submit function
  // formSubmit(){
  //   console.log(this.user);
  //   if(this.user.name=="" || this.user.name==null){
  //     alert("user id required !!")
  //   }
  //  }


  formSubmit(){
    console.log(this.user); 
    if(this.user.name=="" || this.user.name==null || this.user.password==null || this.user.password=="" || this.user.email==null || this.user.email==""){
      //alert("user id required !!");
      // passing duration as an Object
      this.snack.open('Username is required!!', '',{
        duration:2000,  
        // verticalPosition: 'top',
        // horizontalPosition: 'right'           
      });
      return;
    }

    //validation


    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        //alert('Success');
        Swal.fire('Successsfully done!!','user is registered','success');
        this.router.navigate(['login'])

      },
      (error)=>{
        //error
        console.log(error);
        // alert('Something went wrong');
        this.snack.open('some thing went wrong','',{
          duration:2000
        })
      }
    );

   }

   //clear fuction
   clear()
  {

   console.log("clear is working");
   
  
   
   this.user = {
     name: '',
     password: '',
     email:''

   };
  }

}