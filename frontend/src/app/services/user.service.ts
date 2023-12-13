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
}
