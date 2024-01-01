import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {
    
  }

  userName = "";

  userData = new Subject<any>(); //Decalring new RxJs Subject

  sendUserData(data: string) {
    console.log('called');
    this.userData.next(data);
  }

  //generate Token

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/auth/login`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenstr = localStorage.getItem('token');
    if (tokenstr == undefined || tokenstr == '' || tokenstr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    console.log("user is " + user.name);
    localStorage.setItem('user', JSON.stringify(user));
    this.userName = user.name;
  }

  public getUserName(){
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr).name;
    } else {
      this.logout();
      return null;
    }
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get the current user

  public getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    
    return this.http.get(`${baseUrl}/user/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}