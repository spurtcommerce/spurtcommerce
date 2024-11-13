/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserForm } from './user-model/user.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class UserService extends Api {
  public userdata: any;

  public params: any = {};
  private url = this.getBaseUrl();

  getdata() {
    return this.userdata;
  }

  setdata(data) {
    this.userdata = data;
  }

  addUser(param: UserForm): Observable<any> {
    return this.http.post(this.url + '/auth/create-user', param);
  }

  public updateUser(param: UserForm, Id: number): Observable<any> {
    return this.http.put(this.url + '/auth/update-user/' + Id, param);
  }

  userGrouplist(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/role/rolelist', { params: reqOpts });
  }

  userlist(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/auth/userlist', { params: reqOpts });
  }
  userDelete(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: params
    };
    return this.http.delete(
      this.url + '/auth/delete-user/' + params.id,
      httpOptions
    );
  }
  public userpagiantion(param: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = param;
    return this.http.get(this.url + '/auth/userlist', { params: reqOpts });
  }
}
