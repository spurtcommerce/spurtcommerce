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
import { TaxListForm } from './tax-model/taxList.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class TaxService extends Api {
  public editedTax: any;
  public taxId: any;
  public pageoffset: number;
  private url: string = this.getBaseUrl();

  setEditedValue(editedTax: any) {
    this.editedTax = editedTax;
  }

  getEditedValue() {
    return this.editedTax;
  }

  deletePagerefresh(pageoffset: any) {
    this.pageoffset = pageoffset;
  }

  // tax list
  public taxList(params: TaxListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/tax/tax-list', {
      params: reqOpts
    });
  }

  // tax count
  public taxListCount(params: any) {
    return this.http.get(this.url + '/tax/tax-list', {
      params: params
    });
  }

  // tax add
  public taxnew(value: any) {
    return this.http.post(this.url + '/tax/add-tax', value);
  }

  // update tax
  public taxupdate(value) {
    const params: any = {};
    params.taxName = value.taxName;
    params.taxPercentage = value.taxPercentage;
    params.taxStatus = value.taxStatus;
    return this.http.put(
      this.url + '/tax/update-tax/' + value.taxId,
      params
    );
  }

  public deleteTax(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/tax/delete-tax/' + Id,
      param
    );
  }
}
