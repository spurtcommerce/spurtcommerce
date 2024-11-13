
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
// model
import { PaymentListModel } from './payment-model/payment-list.model';
import { PaymentDeleteModel } from './payment-model/payment-delete.model';
import { DetailModel } from './payment-model/detail.model';
import { PaymentBulkDeleteModel } from './payment-model/payment-bulk-delete.model';


@Injectable({
  providedIn: 'root'
})

export class PaymentService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // delete payment
  paymentDelete(params: PaymentDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { paymentId: params.paymentId }
    };

    return this.http.delete(
      this.basUrl + '/vendor-payment/delete-payment/' + params.paymentId,
      httpOptions
    );
  }
  // delete bulk payment
  paymentBulkDelete(params: PaymentBulkDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { paymentId: params.paymentId }
    };

    return this.http.post(
      this.basUrl + '/vendor-payment/delete-payment', params,
      httpOptions
    );
  }
  // list payment
  public paymentList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-sales/payment', {
      params: reqOpts
    });
  }
  // archive list payment
  public archivePaymentList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-sales/archive-payment-list', {
      params: reqOpts
    });
  }
  // payment status change service calling


  public paymentStatus(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-payment/add-vendor-payment-status/' + params.paymentId, params);

  }
  public categoryList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-sales/vendor-earning-list', { params: reqOpts });
  }
  public earningPaymentCount(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-sales/vendor-earning-list', { params: reqOpts });
  }

  /**
   * Handles 'paymentCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public paymentCount(filterParam: any): Observable<any> {
    let reqOpts: any = {};
    // const params = Object.getOwnPropertyNames(filterParam).reduce(
    //   (p, key) => p.set(key, filterParam[key]),
    //   new HttpParams()
    // );
    reqOpts = filterParam;
    return this.http.get(this.basUrl + '/vendor-sales/payment',{params:reqOpts});
  }

  /**
   * Handles 'PaymentExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public paymentExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/admin-vendor-payment/vendor-payment-excel-list', reqOpts);
  }

  /**
   * Handles 'PaymentExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public paymentAllExcel(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.basUrl + '/vendor-sales/earning-export', reqOpts);
  }
  /**
 * Handles 'csv price main file download' function. Calls put method with specific api address
 * along its param.
 *
 * @param params from model
 */
  public exportPayment(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/sales-export', reqOpts);
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public makeArchive(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/sales-export', reqOpts);
  }
  public multiplePaymentExport(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/vendor-sales-export', reqOpts);
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public exportEarning(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/earning-export', reqOpts);
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public priceCsvList(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-payment/price-update-file-log-list', { params: params });
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public multipleEarningExport(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/product-earning-export', reqOpts);
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public downloadInvoice(params): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    return this.http.get(this.basUrl + '/vendor-order/order-export-pdf', {params, responseType: 'blob'});
  }
  /**
* Handles 'csv price main file download' function. Calls put method with specific api address
* along its param.
*
* @param params from model
*/
  public deleteCsvList(params): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-payment/delete-price-update-log/' + params);
  }

  // make payment archive

  public makePaymentArchive(params): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-sales/make-vendor-payment-archive', params);
  }

  // make payment archive

  public archivePaymentCount(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-sales/archive-payment-list-count', { params: params });
  }

  // export all archive payment

  public exportAllArchivePayment(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/bulk-archive-payment-export', reqOpts);
  }

  // export archive payment

  public exportArchivePayment(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-sales/archive-payment-export', reqOpts);
  }
}
