import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class DecisionVerifyService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // decisionVerifyList 
  public decisionVerifyList(param: any): Observable<any> {
    const id = param.id;
    delete param['id'];
    return this.http.put(`${this.basUrl}/admin-vendor/${id}`, param);

  }

  
}