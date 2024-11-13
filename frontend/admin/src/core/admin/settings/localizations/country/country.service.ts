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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { CountryForm } from './country-model/country.model';
import { CountryListForm } from './country-model/countrylist.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class CountryService extends Api {
  public countrylistdata: any;

  private url: string = this.getBaseUrl();

  setcountrylistdata(data) {
    this.countrylistdata = data;
  }

  getcountrylistdata() {
    return this.countrylistdata;
  }

  addCountry(param: CountryForm): Observable<any> {
    return this.http.post(this.url + '/country', param);
  }

  updateCountry(params) {
    return this.http.put(
      this.url + '/country/' + params.countryId,
      params
    );
  }

  public countrylist(params: CountryListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/country/', {
      params: reqOpts
    });
  }

  public countrypagiantion(params: CountryListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/country/', {
      params: reqOpts
    });
  }

  // delete country
  public deletecountry(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/country/' + Id, param);
  }
}
