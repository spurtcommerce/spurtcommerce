/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Api } from "../providers/api/api";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class EarningService extends Api {
  private base: string = this.getBaseUrl();

  public GetEarning(params: any): Observable<any> {

    return this.http.get(this.base + '/vendor-sales/vendor-earning-list', {params});
    
  }

  /* get earning  count*/
  public GetEarningCount(params: any): Observable<any> {

    return this.http.get(this.base + '/vendor-sales/vendor-earning-list', {params});
    
  }

    /*Exportexcel*/
   public GetEarningExport(params: any): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.base + '/vendor-sales/product-earning-export',reqOpts);
    
  }

  }

