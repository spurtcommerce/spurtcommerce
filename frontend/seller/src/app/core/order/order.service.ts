
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
// model
import { OrderListModel } from './order-model/Order-list.model';
import { OrderDeleteModel } from './order-model/order-delete.model';
import { DetailModel } from './order-model/detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  // add order
  getOrderDetail(param) {
    return this.http.get(this.basUrl + '/vendor-order/order-detail/' + param);
  }

  // archive order detail
  getArchiveOrderDetail(param) {
    return this.http.get(this.basUrl + '/vendor-order/order-detail/' + param);
  }
  // recent list order
  public recentOrderList(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/recent-order-list', {
      params: reqOpts
    });
  }
  // all list order
  public allOrderList(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/order-list', {
      params: reqOpts
    });
  }
  // archive list order
  public archiveOrderList(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/archive-order-list', {
      params: reqOpts
    });
  }
  // all list order
  public orderCount(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/order-counts');
  }
  // all list order
  public deliveryPersonsList(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/delivery-person/delivery-person-list-delivery-allocation', {
      params: reqOpts
    });
  }
  // allocate delivery person list order
  public allocateDeliveryPersons(params): Observable<any> {
    return this.http.post(this.basUrl + '/delivery-person/add-delivery-allocation', params);
  }
  // all list based on status
  public allOrderListBasedOnStatus(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/vendor-orders-based-status-list', {
      params: reqOpts
    });
  }
  // all list based on status
  public updateAllOrderListBasedOnStatus(params: any): Observable<any> {
    const param: any = {};
    param.subOrderStatusId = params.subOrderStatusId;
    return this.http.put(this.basUrl + '/vendor-order/update-order-status/' + params.vendorOrderId, param);
  }
  // log list order
  public orderLogList(params: OrderListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/vendorOrderLoglist', {
      params: reqOpts
    });
  }
  // update status list order
  public orderStatusUpdate(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.subOrderStatusId = Number(params.subOrderStatusId);
    return this.http.put(this.basUrl + '/vendor-order/update-order-status/' + params.vendorOrderId, reqOpts);
  }
  // make arhive
  public makeArchive(params: any): Observable<any> {
    const reqOpts: any = {};
    return this.http.post(this.basUrl + '/vendor-order/make-vendor-order-archive', params);
  }
  // update status list order
  public shippingInformationUpdate(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-order/update-shipping-information', params);
  }

  public orderStatusList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-order/vendor-order-status-list', { params: reqOpts });
  }

  // Bulk Update Status All Orders

  public allOrdersStatusUpdate(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-order/bulk-update-order-status', params)
  }

  // export archive order
  public exportArchiveOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/archive-order-export', reqOpts);
  }


  // export all archive order

  public exportAllArchiveOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/bulk-archive-order-export', reqOpts);
  }

  // archive order list count

  public archiveOrderListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/archive-order-list-count', { params: params });
  }

  // cancel order list

  public cancelOrderList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/cancel-order-list', { params: params });
  }

  // cancel order list count

  public cancelOrderListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/cancel-order-list', { params: params });
  }

  // export cancel order list

  public exportCancelOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/vendor-order-cancel-excel-list', reqOpts);
  }

  // export all cancel order list

  public exportAllCancelOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/bulk-vendor-order-cancel-excel-list', reqOpts);
  }


  // change cancel order status

  public changeCancelOrderStatus(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-order/update-vendor-order-cancel-request/' + params.orderProductId, params);
  }

  // Bulk cancel order status

  public bulkCancelOrderStatus(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/update-bulk-vendor-order-cancel-request', { params: params });
  }


  // get order invoice list
  orderInvoiceList(param) {
    return this.http.get(this.basUrl + '/vendor-order/vendor-invoice-list', { params: param });
  }

  // get order invoice list count
  orderInvoiceListCount(param) {
    return this.http.get(this.basUrl + '/vendor-order/vendor-invoice-list', { params: param });
  }

  // Download Invoice
  downloadInvoice(params) {
    return this.http.get(this.basUrl + '/vendor-order/order-invoice-export-pdf', { params, responseType: 'blob' });
  }

  settlementList(param): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/sales-report-list', { params: param });
  }
  settlementListCount(param): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/sales-report-list', { params: param });
  }
  sendMail(param): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-order/order-invoice-export-send-email-pdf', param);
  }
  public exportSalesReport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/sales-report-export-list', reqOpts);
  }



  public productList(params): Observable<any> {
    return this.http.get(
      this.basUrl + '/vendor-product', { params: params }
    );
  }

  public categoryList(params): Observable<any> {
    return this.http.get(
      this.basUrl + '/vendor/category-list', { params: params }
    );
  }
  public backOrderList(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/back-order-list', { params: params });
  }


  public backOrderListCount(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/back-order-list', { params: params });
  }
  public failedOrderList(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/order-list', { params: params });
  }


  public failedOrderCounts(params): Observable<any> {

    return this.http.get(this.basUrl + '/vendor-order/order-list', { params: params });

  }

  public exportBackOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/back-order-excel-list', reqOpts);

  }

  public bulkBackOrderExport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/bulk-back-order-excel-list', reqOpts);

  }

  public exportFailedOrder(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/failed-order-excel-list', reqOpts);

  }




  public exportOrderInvoice(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.basUrl + '/vendor-order/export-order-invoice-list', reqOpts);
  }

  public orderInvoiceAllExcel(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.basUrl + '/vendor-order/export-order-invoice-list', reqOpts);
  }

  public bulkFailedOrderExport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/vendor-order/bulk-failed-order-excel-list', reqOpts);

  }

  // get order invoice list count
  vendorOrderStatusCount(param) {
    return this.http.get(this.basUrl + '/vendor-order/vendor-orders-based-status-count', { params: param });
  }
  public vendorOrderBasedOnDetail(params: any): Observable<any> {
    // this.base = this.getBaseUrl();

    return this.http.get<any>(this.basUrl + '/vendor-order/vendor-orders-based-status-details/' + params.id, { params: params });
  }

  /*AllOrder List Action */

  public getAllOrderListcount(params: any): Observable<any> {

    return this.http.get(this.basUrl + '/vendor-order/order-list', { params: params });
  }

  public revokeArchieveOrder(params: any): Observable<any> {

    return this.http.post(this.basUrl + '/vendor-order/revoke-vendor-order-archive', params);
  }

  public archieveOrderDetail(params: any): Observable<any> {

    return this.http.get(this.basUrl + '/vendor-order/archive-order-detail/' + params.vendorOrderArchiveId, { params: params });
  }

  public salesReportCategory(params: any): Observable<any> {

    return this.http.get(this.basUrl + '/vendor-product/vendor-category-list', { params: params });
  }

  public updatePaymentStatus(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-order/update-payment-status', params);
  }

  //ordered Export all
  public OrderedExportAll(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    // if (params) {
    //   reqOpts.params = new HttpParams();
    //   for (const k in params) {
    //     if (k) {
    //       reqOpts.params = reqOpts.params.set(k, params[k]);
    //     }
    //   }
    // }

    return this.http.post(this.basUrl + '/vendor-order/order-list-export', params, reqOpts);

  }

  public backOrderDetail(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-order/order-detail/' + params);
  }

  // fullFillNow
  public fullFillNow(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-order/order', params);
  }

  // tag list
  public tagPost(params: any): Observable<any> {

    let id = params.id
    delete params['id']
    return this.http.put(this.basUrl + `/vendor-order/${id}/order-product`, params);
  }

  // fullFillList
  public fullFillmentList(params: any): Observable<any> {


    return this.http.get(this.basUrl + `/vendor-order/vendor-order-status-list-based-on-parent`, { params: params });
  }

  // fullFillList
  public fullFillmentPost(params: any): Observable<any> {

    let id =params.id
     delete params['id']

    return this.http.put(this.basUrl + `/vendor-order/update-order-status/${id}`,params);
  }
}

