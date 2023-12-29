import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  // load all users
  public getAllUsers(){
    return this._http.get(`${baseUrl}/user/all`);
  }

  // load user
  public getCurrentUser(userId: any){
    return this._http.get(`${baseUrl}/user/${userId}`);
  }

  // add user
  public addUser(user: any){
    return this._http.post(`${baseUrl}/user/`,user);
  }

  // update user
  public updateUser(user: any){
    return this._http.put(`${baseUrl}/user/`, user);
  }
}
