
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
// model
import { DeliveryLocationlistModel } from './delivery-model/delivery-list.model';
import { DeliveryDeleteModel } from './delivery-model/delivery-delete.model';
import { DetailModel } from './delivery-model/detail.model';
import { DeliveryBulkDeleteModel } from './delivery-model/delivery-bulk-delete.model';

@Injectable()
export class DeliveryService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


   // add delivery
   deliveryAdd(param) {
    return this.http.post(this.basUrl + '/delivery-location/add-delivery-location', param);
  }
     // add delivery person
     deliveryPersonAdd(param) {
      return this.http.post(this.basUrl + '/delivery-person/add-delivery-person', param);
    }
    /**
   * Handles 'deliveryDetail' function. Calls get method with specific api address
   * along its param.
   *
   * @param param from DetailModel
   */
  deliveryDetail(param: DetailModel) {
    return this.http.get(this.basUrl + '/vendor-delivery/vendor-delivery-detail/' + param.Id);
  }
  /**
   * Handles 'deliveryDetail' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  deliveryUpdate(param) {
    return this.http.put(
      this.basUrl + '/delivery-location/update-delivery-location/' + param.deliveryLocationId,
      param
    );
  }
// update delivery person
  deliveryPersonUpdate(param) {
    return this.http.put(
      this.basUrl + '/delivery-person/update-delivery-person/' + param.deliveryPersonId,
      param
    );
  }
// delete delivery
  deliveryDelete(params: DeliveryDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { deliveryId: params.deliveryId }
    };

    return this.http.delete(
      this.basUrl + '/delivery-location/delete-delivery-location/' + params.deliveryId,
      httpOptions
    );
  }
  // delete delivery person
  deliveryPersonDelete(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { deliveryId: params.deliveryId }
    };

    return this.http.delete(
      this.basUrl + '/delivery-person/delete-delivery-person/' + params.deliveryId,
      httpOptions
    );
  }
// delete bulk delivery
deliveryBulkDelete(params: DeliveryBulkDeleteModel): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: false,
    body: { deliveryId: params.deliveryId }
  };

  return this.http.post(
    this.basUrl + '/vendor-delivery/delete-delivery', params,
    httpOptions
  );
}
// list delivery
  public DeliveryLocationlist(params: DeliveryLocationlistModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/delivery-location/delivery-location-list', {
      params: reqOpts
    });
  }
  // list delivery persons
  public DeliveryPersonslist(params: DeliveryLocationlistModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/delivery-person/list-delivery-person', {
      params: reqOpts
    });
  }
  // stock status list
  public stockStatusList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/stock-status/stock-status-list', {
      params: reqOpts
    });
  }
// delivery status change service calling


public deliveryStatus(params: any): Observable<any> {
  return this.http.put(this.basUrl + '/vendor-delivery/add-vendor-delivery-status/' + params.deliveryId, params);

}
  public categoryList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor/category-list', { params: reqOpts });
  }
  /**
   * Handles 'deliveryCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
public deliveryCount(filterParam: any): Observable<any> {
  const reqOpts: any = {};
  const params = Object.getOwnPropertyNames(filterParam).reduce(
    (p, key) => p.set(key, filterParam[key]),
    new HttpParams()
  );
  reqOpts.params = params;
  return this.http.get(this.basUrl + '/delivery-location/delivery-location-list', reqOpts);
}
public deliveryPersonsCount(filterParam: any): Observable<any> {
  const reqOpts: any = {};
  const params = Object.getOwnPropertyNames(filterParam).reduce(
    (p, key) => p.set(key, filterParam[key]),
    new HttpParams()
  );
  reqOpts.params = params;
  return this.http.get(this.basUrl + '/delivery-person/list-delivery-person', reqOpts);
}
  /**
   * Handles 'DeliveryExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public deliveryExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/admin-vendor-delivery/vendor-delivery-excel-list', reqOpts);
  }




  /**
   * Handles 'DeliveryExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public deliveryAllExcel(params): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'blob';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.basUrl + '/admin-vendor-delivery/bulk-vendor-delivery-excel-list', reqOpts);
  }
    /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public downloadMainCsv(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/delivery-location/download-delivery-location', reqOpts);
  }
      /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public uploadMainCsv(params): Observable<any> {
    const formData = new FormData();
    formData.append('deliveryLocationData', params.productData, params.productData.name);
    const options = {
      method: 'POST',
      body: formData,
    };
      return this.http.post(this.basUrl + '/delivery-location/import-delivery-location', formData);
  }
      /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public priceCsvList(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-delivery/price-update-file-log-list', {params: params});
  }
        /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public priceCsvCount(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-delivery/price-update-file-log-list', {params: params});
  }
      /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public downloadCsv(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-delivery/download-price-update-log/' + params, reqOpts);
  }
        /**
   * Handles 'csv price main file download' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public deleteCsvList(params): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-delivery/delete-price-update-log/' + params);
  }
}
