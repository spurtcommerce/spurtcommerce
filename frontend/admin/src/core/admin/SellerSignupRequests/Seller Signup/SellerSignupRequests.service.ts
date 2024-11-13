import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';


@Injectable()
export class SellerSignupRequestsService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  //sellerSignupList
  public sellerSignupList(params: any): Observable<any> {

    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }


  //sellerSignupListCount
  public sellerSignupListCount(params: any): Observable<any> {

    return this.http.get(this.basUrl + '/admin-vendor', { params: params });
  }


  //updateSeller
  public updateSeller(params: any): Observable<any> {

    return this.http.put(this.basUrl + '/admin-vendor/email-status/' + params.id, params);
  }

    //sellerSignupListCount
    public sellerRequest(params: any): Observable<any> {

      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params) {
        reqOpts.params = new HttpParams();
        for (const k in params) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params[k]);
          }
        }
      }

    
      return this.http.get(this.basUrl + '/admin-vendor/vendor-excel-list/', reqOpts);
    }
}
