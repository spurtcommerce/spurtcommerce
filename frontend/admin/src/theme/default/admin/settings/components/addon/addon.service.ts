/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { Injectable } from '@angular/core';
// third party imports 
import { Observable } from 'rxjs';
// Global Api 
import { Api } from '../../../../../../core/admin/providers/api/api';

@Injectable({
  providedIn: 'root',
})
export class AddonService extends Api {

  params: any = {};
  public pagesize: any;
  private basUrl = this.getBaseUrl();

  // get plugin list
  public pluginList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/plugins/', { params: params });
  }

  // get plugin detail
  public pluginDetail(params: any): Observable<any> {
    console.log(12312)
    return this.http.get(this.basUrl + '/plugins/' + params.id, { params: params });
  }


  updatePluginSpecification(id: any, pluginAdditionalInfo:{pluginStatus:number,pluginAdditionalInfo: { isSimplified: number }}): Observable<any> {
    return this.http.put<any>(`${this.basUrl}/plugins/logo/${id}`, pluginAdditionalInfo );
  }

  // Update Plugin Settings
  public updatePluginSetting(URL: string, params: any): Observable<any> {
    return this.http.post(this.basUrl + URL, params);
  }

  // Update Plugin Status
  public updatePluginStatus(id: any, params: any): Observable<any> {
    return this.http.put(this.basUrl + '/plugins/' + id, params);
  }

  public updatePluginLogo(id: any, params: any): Observable<any> {
    return this.http.put(this.basUrl + '/plugins/logo/' + id, params);
  }
}
