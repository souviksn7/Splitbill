import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupDetailsService } from '../services/group-details.service';
import Swal from 'sweetalert2';
import { 
  FormGroup,
  FormBuilder, 
  Validators,
  FormArray,
  ValidatorFn,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { __values } from 'tslib';
import { forkJoin } from 'rxjs';
import { GroupsService } from '../services/groups.service';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit{

  expenseForm: any;

  start = false;

  currentGroup =  {
    groupName: ""
  };

  currentSplitExpense = {
    user: {
      userId: 1,
      name: ''
    },
    expense: {
      expenseId: 1,
      description: ''
    },
    amount: 10,
    isPaid: false
  }

  groupId: number;

  groupMembers = [
    {
      "userId": 1,
      "name": "Demo"
    }
  ];
  expenses = [
    {
      "description": "Mirik",
      "amount": 100,
      "upiId": "demoUpiId",
      "date": "2023-11-02",
      "addedBy": {
        "userId": 2,
        "name": "souvik nandi",
        "email": "svk@gmail.com",
        "password": "123"
      },
    }
  ]

  loggedInUser = {
    "userId": 2,
    "name": "souvik",
    "email": "svk@gmail.com",
    "password": "456"
   } 
   
   expenseDetails = {
    description: "",
    amount: 100,
    upiId: "",
    date: "",
    addedBy: {
      userId: 2
    },
    group: {
      groupId: 12
    },
    membersInvolved : []
   };

   expenseSettled = false;
   expenseInModal: any;


  constructor(
      private _route: ActivatedRoute,
      private _groupDetails: GroupDetailsService,
      private formBuilder: FormBuilder,
    )
    {
      this.groupId = this._route.snapshot.params['groupId'];
      // this.expenseForm = new FormGroup({ expenseName: new FormControl(), amount: new FormControl(), date: new FormControl(), upiId: new FormControl(), membersOfExpense: new FormControl(),})
    }

  ngOnInit(): void {

    this.getGroupDetails();

    this.getGroupMembers();
    
    this.getExpenses(); 

    this.initiateExpenseForm();    
  }

  // get group details
  private getGroupDetails(){
    this._groupDetails.getGroupDetails(this.groupId).subscribe((data: any)=>{
      this.currentGroup = data;      
    },
    (error)=>{
      console.log(error);
    })
    
  }
  // get members of expense
  get membersOfExpense(){
    return (this.expenseForm.get('membersOfExpense') as FormArray).controls;
  }

  private populateCheckboxes(){
    this.groupMembers.forEach(()=>{
      const control = this.formBuilder.control(true); // Initialize as checked
      (this.expenseForm.get('membersOfExpense') as FormArray).push(control);
    });

  }

  // Get group members
  getGroupMembers(){
      this._groupDetails.getGroupMembers(this.groupId).subscribe((data: any)=>{
      this.groupMembers = data;
      // console.log(this.groupMembers);
      console.log("in getGroupMembers");
      this.populateCheckboxes();
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error in loading group members", "error");
    })
  }

  // Get Expenses 
  getExpenses(){
     this._groupDetails.getExpenses(this.groupId).subscribe((data:any)=>{
      this.expenses = data;
      for(let i=0;i<this.expenses.length;i++){
        let tempDate = this.expenses[i].date;
        this.expenses[i].date = tempDate.substring(0,10);
      }
      // console.log(this.expenses);
      console.log("in getGetExpenses");
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error in loading expenses", "error")
    }
    )
  }
  

/**
   * This method will initiate the expense form
   */

  initiateExpenseForm(){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    // console.log(formattedDate);
    
    this.expenseForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
      
      date: [formattedDate, [Validators.required]],
      upiId: [''],
      membersOfExpense: new FormArray([], [this.minSelectedCheckboxes(1)])
    });
    this.start = true;
    console.log("in initiate ExpenseForm");
  }

  /**
   * This method validates the minimum member selection for a expense.
   * @param min
   * @returns
   */
  // minSelectedCheckboxes(min = 1) {
  //   const validator: ValidatorFn = (formArray: FormArray) => {
  //     const totalSelected = formArray.controls
  //       .map((control) => control.value)
  //       .reduce((prev, next) => (next ? prev + next : prev), 0);

  //     return totalSelected >= min ? null : { required: true };
  //   };

  //   return validator;
  // }

  minSelectedCheckboxes(min: number): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: boolean } | null => {
      const selectedCount = (formArray as FormArray).controls
        .map(control => control.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);
  
      return selectedCount >= min ? null : { minSelected: true };
    };
  }



  // putting data to ExpenseDetails

  private putDataToExpenseDetails(){
    this.expenseDetails.description = this.expenseForm.value.description;
    this.expenseDetails.amount = this.expenseForm.value.amount;
    this.expenseDetails.upiId = this.expenseForm.value.upiId;
    this.expenseDetails.date = this.expenseForm.value.date;
    this.expenseDetails.addedBy = {userId: this.loggedInUser.userId};
    this.expenseDetails.group = {groupId: this.groupId}
  }

  // add new expense
  addNewExpense(){
    this.putDataToExpenseDetails()

    let currentExpenseId: number;

    this._groupDetails.addExpense(this.expenseDetails).subscribe((data: any)=>{
      currentExpenseId = data.expenseId;
      Swal.fire("Success!!!", "Expense is added successfully", "success")

      let numberOfInvolvedMembers = 0;
      this.expenseForm.value.membersOfExpense.forEach((element:any) => {
        if(element === true)
          numberOfInvolvedMembers++;
      });            
      
      console.log(this.expenseForm.value.membersOfExpense[0]);
      
      let size = this.expenseForm.value.membersOfExpense.length;

      for(let i=0 ; i<size ; i++){

        if(this.expenseForm.value.membersOfExpense[i] === true){
          this.currentSplitExpense.user.userId = this.groupMembers[i].userId;
          this.currentSplitExpense.expense.expenseId = currentExpenseId;
          this.currentSplitExpense.amount = this.expenseForm.value.amount/(numberOfInvolvedMembers+1);

          // console.log(this.currentSplitExpense);

          this._groupDetails.addSplitExpense(this.currentSplitExpense).subscribe((data: any)=>{
            console.log(data);
          })
        }
      }
    });
  }

  // assign expense to Modal
  assigntransactionToModal(selectedExpense: any){
    let count = 1;
    this.expenseSettled = false;
    this.expenseInModal = selectedExpense;
    if(this.expenseInModal.addedBy.email == this.loggedInUser.email){
      this.expenseInModal.membersOfExpense.forEach((ele: any)=>{
        if(ele?.isPaid){
          count++;
        }
      });
      if(count == this.expenseInModal.membersOfExpense.length){
        this.expenseSettled = true;
      }
    }
  }
}
