import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class PendingLayoutService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // pendingLayoutsList 
  public pendingLayoutsList(param: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor/' + param.id);

  }

  
}