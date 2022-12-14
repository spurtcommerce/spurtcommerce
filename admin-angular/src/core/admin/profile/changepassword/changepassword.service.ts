/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ChangePasswordForm } from './changepassword-models/changepassword.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class ChangePasswordService extends Api {
  private URL = this.getBaseUrl();

  // change psw
  public changePassword(param: ChangePasswordForm): Observable<any> {
    return this.http.put(this.URL + '/auth/change-password', param);
  }
}
