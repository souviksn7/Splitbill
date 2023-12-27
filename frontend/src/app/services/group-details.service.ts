import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailsService {

  constructor(private _http: HttpClient) {

  }

  // load group details with groupId
  public getGroupDetails(groupId: any){
    return this._http.get(`${baseUrl}/group/${groupId}`)
  }

  // load group members of a group
  public getGroupMembers(groupId: any){
    return this._http.get(`${baseUrl}/user/group/${groupId}`);
  }

  // load expenses of a group
  public getExpenses(groupId: any){
    return this._http.get(`${baseUrl}/expense/group/${groupId}`);
  }

  // add expense to a group
  public addExpense(expense: any){
    return this._http.post(`${baseUrl}/expense/`, expense);
  }

  // add splitExpense
  public addSplitExpense(splitExpense: any){
    return this._http.post(`${baseUrl}/splitExpenses/`, splitExpense);
  }

  // get SplitExpenses in modal by expenseID
  public getSplitExpensesInModal(expenseId: any){
    return this._http.get(`${baseUrl}/splitExpenses/expense/${expenseId}`);
  }

  // delete expense with expenseId
  public deleteExpense(expenseId: any){
    return this._http.delete(`${baseUrl}/expense/${expenseId}`);
  }

  //delete splitExpense with splitExpenseID
  public deleteSplitExpense(splitExpenseId: any){
    return this._http.delete(`${baseUrl}/splitExpenses/${splitExpenseId}`)
  }

  
}
