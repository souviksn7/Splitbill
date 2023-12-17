import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDetailsService {

  constructor(private _http: HttpClient) {}

  // get expense by expenseId
  getExpense(expenseId: any){
    return this._http.get(`${baseUrl}/expense/${expenseId}`)
  }

  // update splitExpense
  updateSplitExpense(splitExpense: any){
    return this._http.put(`${baseUrl}/splitExpenses/`, splitExpense);
  }

  // get all comments of an expense
  getAllCommentsOfAnExpense(expenseId: any){
    return this._http.get(`${baseUrl}/comment/expense/${expenseId}`);
  }

  // add comment
  addComment(comment: any){
    return this._http.post(`${baseUrl}/comment/`, comment);
  }
}
