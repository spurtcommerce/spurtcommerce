import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class StoreVerifyService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // storeverifyList 
  public storeverifyList(param: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor/'+ param.vendorId);

  }


  // storeverify 
  public storeverify(param: any): Observable<any> {
    const id = param.id;
    delete param['id'];
    return this.http.put(`${this.basUrl}/admin-seller/${id}`, param);

  }

  
}