/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyListForm } from './currency-model/currencyList.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class CurrencyService extends Api {
  public editedCurrency: any;
  public currencyId: any;
  public pageoffset: number;
  private url: string = this.getBaseUrl();

  setEditedValue(editedCurrency: any) {
    this.editedCurrency = editedCurrency;
  }

  getEditedValue() {
    return this.editedCurrency;
  }

  deletePagerefresh(pageoffset: any) {
    this.pageoffset = pageoffset;
  }

  // currency list
  public currencyList(params: CurrencyListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/currency/', {
      params: reqOpts
    });
  }

  // currency count
  public currencyListCount(params: any) {
    return this.http.get(this.url + '/currency', {
      params: params
    });
  }

  // currency add
  public currencynew(value: any) {
    return this.http.post(this.url + '/currency', value);
  }

  // update currency
  public currencyupdate(value) {
    const params: any = {};
    params.currencyId = value.currencyId;
    params.title = value.title;
    params.code = value.code;
    params.symbolLeft = value.symbolLeft;
    params.symbolRight = value.symbolRight;
    params.value = value.value;
    params.status = value.status;
    return this.http.put(
      this.url + '/currency/' + value.currencyId,
      params
    );
  }

  public deleteCurrency(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/currency/' + Id,
      param
    );
  }
}
