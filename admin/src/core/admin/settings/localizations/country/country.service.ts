/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

  // setcountrylistdata
  setcountrylistdata(data) {
    this.countrylistdata = data;
  }

  getcountrylistdata() {
    return this.countrylistdata;
  }

  addCountry(param: CountryForm): Observable<any> {
    delete param.countryId;
    return this.http.post(this.url + '/country/add-country', param);
  }

  updateCountry(params) {
    return this.http.put(
      this.url + '/country/update-country/' + params.countryId,
      params
    );
  }

  // country list

  public countrylist(params: CountryListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/country/countrylist', {
      params: reqOpts
    });
  }

  // country pagination
  public countrypagiantion(params: CountryListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/country/countrylist', {
      params: reqOpts
    });
  }

  // delete country
  public deletecountry(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/country/delete-country/' + Id, param);
  }
}
