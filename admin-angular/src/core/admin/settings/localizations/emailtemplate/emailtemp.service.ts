/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTempListForm } from './emailtemp-model/emailtemplist.model';
import { EmailTempForm } from './emailtemp-model/emailtemp.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class EmailTempService extends Api {
  public emailtemplistdata: any;
  private url: string = this.getBaseUrl();

  // setemailtemplistdata
  setemailtemplistdata(data) {
    this.emailtemplistdata = data;
  }

  getemailtemplistdata() {
    return this.emailtemplistdata;
  }

  // new emailtemp
  addEmailtemp(param: EmailTempForm): Observable<any> {
    return this.http.post(
      this.url + '/email-template/add-email-template',
      param
    );
  }

  // Email temp update

  updateEmailTemp(params): Observable<any> {
    return this.http.put(
      this.url + '/email-template/update-email-template/' + params.Id,
      params
    );
  }

  // emailtemp list

  public emailtemplist(params: EmailTempListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;

    return this.http.get(this.url + '/email-template/email-templatelist', {
      params: reqOpts
    });
  }

  // emailtemp pagination
  public emailtempPagiantion(params: EmailTempListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;

    return this.http.get(this.url + '/email-template/email-templatelist', {
      params: reqOpts
    });
  }

  // delete emptemp
  public deleteEmailtemp(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/email-template/delete-email-template/' + Id,
      param
    );
  }
}
