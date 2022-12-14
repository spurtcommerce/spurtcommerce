/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { ZonelistForm } from './zone-model/zonelist.model';
import { ZoneForm } from './zone-model/zone.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class ZoneService extends Api {
  zonelistdata: any;
  private url: string = this.getBaseUrl();

  setzonelistdata(data) {
    this.zonelistdata = data;
  }

  getzonelistdata() {
    return this.zonelistdata;
  }

  // Zone list Pagination

  public zonePagiantion(params: ZonelistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/zone/zone-list', { params: reqOpts });
  }

  // ZOne list

  public zoneList(params: ZonelistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/zone/zone-list', { params: reqOpts });
  }

  // Zone delete
  public deleteZone(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/zone/delete-zone/' + Id, param);
  }

  // new zone
  addZone(param: ZoneForm): Observable<any> {
    return this.http.post(this.url + '/zone/add-zone', param);
  }

  // update zone
  updateZone(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { zoneId: params.zoneId }
    };
    return this.http.put(
      this.url + '/zone/update-zone/' + params.zoneId,
      params
    );
  }
}
