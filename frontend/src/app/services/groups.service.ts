import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import baseUrl from './helper';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private _http: HttpClient) { }

  // load all the groups
  public groups(){
    return this._http.get(`${baseUrl}/group/all`);
  }

  // add new group
  public addGroup(group: any){
    return this._http.post(`${baseUrl}/group/`, group)
  }

  // add member to a group
  public assignMemberToGroup(groupId: any, userId: any){
    return this._http.put(`${baseUrl}/group/${groupId}/addUser/${userId}`, group)
  }

  // remove member from group 
  public removeMemberFromGroup(groupId: any, userId: any){
    return this._http.put(`${baseUrl}/group/${groupId}/removeUser/${userId}`, group);
  }
}
