/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2023  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

@Injectable()
export class MultipleWebsitesService extends Api {

  private url: string = this.getBaseUrl();

   /*Get MultipleWebsites List*/

  public GetMultipleWebsitesList(params:any): Observable<any> {
    return this.http.get(this.url + '/settings', params);
  }
   /*Create MultipleWebsites*/

  public CreateMultipleWebsites(params): Observable<any> {
    return this.http.post(this.url + '/settings', params);
  }

  /*Update MultipleWebsites*/

  public UpdateMultipleWebsites(params): Observable<any> {
    // const {id, ...list} = params;
    return this.http.get(this.url + '/settings/'+ params.settingId);
    

  }
  public GetKey(params): Observable<any> {
    return this.http.put(this.url + '/settings/keygen',params);
  }

  // get settings details
  public GetSettingsMultipleWebsites(params:any): Observable<any> {
    return this.http.get(this.url + '/settings/'+ params.id);
  }
}