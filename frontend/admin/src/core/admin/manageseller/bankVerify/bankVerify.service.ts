import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';


@Injectable()
export class bankVerifyService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();
    
  //bankVerify
    public bankVerifyList(params: any): Observable<any> {
        return this.http.get(this.basUrl + '/admin-seller/bank-info/seller/'+ params.sellerId);
      }


        //bankVerifyChecked
    public bankVerifyChecked(param: any): Observable<any> {
      const id = param.id;
      delete param['id'];
      return this.http.put(`${this.basUrl}/admin-vendor/approve-vendor/${id}`, param);
    }
}