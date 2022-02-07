/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { RoleForm } from './role.models/role.models';
import { Api } from '../../providers/api/api';

@Injectable()
export class RoleApiClientService extends Api {
  private url: string = this.getBaseUrl();
  public roledata: any;

  rolegetdata() {
    return this.roledata;
  }

  rolesetdata(data) {
    this.roledata = data;
  }

  // update Role
  public updateRole(param: RoleForm, Id: number): Observable<any> {
    return this.http.put(this.url + '/role/update-role/' + Id, param);
  }

  // new Role
  addRole(param: RoleForm): Observable<any> {
    return this.http.post(this.url + '/role/create-role', param);
  }

  // role List
  roleList(params: any): Observable<any> {
    return this.http.get(this.url + '/role/rolelist', { params: params });
  }
  roleDelete(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: params
    };
    return this.http.delete(
      this.url + '/role/delete-role/' + params.groupId,
      httpOptions
    );
  }
}
