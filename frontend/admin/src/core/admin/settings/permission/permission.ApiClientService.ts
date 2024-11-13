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
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { PermissionForm } from './permission.models/permission.models';
import { Api } from '../../providers/api/api';

@Injectable()
export class PermissionApiClientService extends Api {
  private url: string = this.getBaseUrl();
  public permissiondata: any;

  permissiongetdata() {
    return this.permissiondata;
  }

  permissionsetdata(data) {
    this.permissiondata = data;
  }

  // update Permission
  public updatePermission(param: PermissionForm): Observable<any> {
    return this.http.put(this.url + '/permission/update-permission/', param);
  }

  // new Permission
  addPermission(param: PermissionForm): Observable<any> {
    return this.http.post(this.url + '/permission-module/add-permission', param);
  }

  // permission List
  permissionList(params: any): Observable<any> {
    return this.http.get(this.url + '/permission-module/list', { params: params });
  }
  permissionGet(params) {
    return this.http.get(this.url + '/permission-module/get-permission/', { params: params });
  }
}
