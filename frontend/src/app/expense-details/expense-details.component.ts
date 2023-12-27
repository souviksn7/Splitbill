import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupDetailsService } from '../services/group-details.service';
import Swal from 'sweetalert2';
import { ExpenseDetailsService } from '../services/expense-details.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit{

  expenseId: any;
  expenseDetails = {
    expenseId: 1,
    description: "Mirik",
    amount: 100,
    upiId: "demoUpiId",
    date: "2023-11-02",
    addedBy: {
      userId: 2,
      name: "souvik nandi",
      email: "svk@gmail.com",
      password: "123"
    },
    group: {
      groupId: 2,
      groupName: "Demo"
    }
  }

  splitExpensesInModal = [
    {
      splitExpenseId: 1,
      user: {
        userId: 1,
        name: '',
        email: ''
      },
      expense: {
        expenseId: 1,
        description: ''
      },
      amount: 10,
      isPaid: false
    }
  ] 

  loggedInUser = {
    "userId": 1,
    "name": "souvik",
    "email": "svk@gmail.com",
    "password": "456"
   } 

   commentInput = "";

   allComments = [
    {
      commentId: 3,
      expense: {
        expenseId:1,
        description: ""
      },
      user: {
        userId: 1,
        name: ""
      },
      commentText: "",
      date: null
    }
   ]



  constructor(private _route: ActivatedRoute, private _groupDetails: GroupDetailsService, private _expenseDetails: ExpenseDetailsService, private _login: LoginService){
    this.expenseId = this._route.snapshot.params['expenseId'];

  }
  ngOnInit(): void {
    this.getExpenseDetails(this.expenseId);
    this.getSplitExpensesInModal(this.expenseId);
    this.getAllCommentsOfAnExpense(this.expenseId);
    this.getCurrentUser();
  }

  private getCurrentUser(){
    this._login.getCurrentUser().subscribe((data: any)=>{
      this.loggedInUser = data;
    })
  }

  getExpenseDetails(expenseId: any){
    this._expenseDetails.getExpense(expenseId).subscribe((data: any)=>{
      this.expenseDetails = data;
    })
  }

  // get splitExpenses with expenseId
  getSplitExpensesInModal(expenseId: any){
    this._groupDetails.getSplitExpensesInModal(expenseId).subscribe((data: any)=>{
      this.splitExpensesInModal = data;
    },
    (error)=>{
      Swal.fire("Error!!", "Error in loading expense details", "error");
      console.log(error);
    }
    )
  }

  updateTransaction(tempSplitExpenseId: any){
    let members = this.splitExpensesInModal;
    members.forEach(member => {
      if(member.splitExpenseId == tempSplitExpenseId){
        member.isPaid = true;
        
        this._expenseDetails.updateSplitExpense(member).subscribe((data: any)=>{})
      }
    });
  }

  createComment(){
    const comment = {
      expense: {
        expenseId: this.expenseId,
      },
      user: {
        userId: this.loggedInUser.userId,
        name: this.loggedInUser.name
      },
      commentText: this.commentInput,
      date: new Date()
    }
    this._expenseDetails.addComment(comment).subscribe((data: any)=>{
      this.allComments.push(data);
    });
  }

  getAllCommentsOfAnExpense(expenseId: any){
    this._expenseDetails.getAllCommentsOfAnExpense(expenseId).subscribe((data: any)=>{
      this.allComments = data;
    })
  }

}
