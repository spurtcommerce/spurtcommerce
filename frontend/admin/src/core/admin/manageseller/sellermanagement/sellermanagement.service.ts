/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class SellerManagementService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // attributeList 
  public attributeList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }

  // getListAttributecount 
  public getListAttributecount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }





  //CategoryList 

  public getCategoryList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }

  //getCategoryListCount

  public getCategoryListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }



  //rejectSellerList

  public rejectSellerList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }


  //approvedListCount

  public approvedListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }

  //rejectSellerListCount

  public rejectSellerListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }
  //approveListStatus
  public approveListStatus(param: any): Observable<any> {
    if (param.id) {
      const id = param.id;
      delete param['id'];
      return this.http.put(`${this.basUrl}/admin-vendor/status/${id}`, param);
    }
  }

  //countryList

  public countryList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/country');
  }

  //comment

  public comment(params: any): Observable<any> {
    const id = params.vendorId;
    return this.http.put(`${this.basUrl}/admin-vendor/approve-vendor/${id}`, params);
  }


  
}
