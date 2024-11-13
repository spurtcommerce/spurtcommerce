/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../order-action/order.action';

import { catchError } from 'rxjs/operators';
// service
import { OrderService } from '../order.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';  



@Injectable()
export class OrderEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: OrderService,
    private popup: NgbModal, public toaster: ToastrService
  ) { }

  
  doGetOrderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_DETAIL),
    map((action: actions.GetOrderDetailAction) => action.payload),
    switchMap(state => {
      return this.service.getOrderDetail(state).pipe(

        tap(add => {
        }),
        switchMap(user => [new actions.GetOrderDetailSuccessAction(user)]),
        catchError(error => of(new actions.GetOrderDetailFailAction(error)))
      );
    })
  ));
  
  doGetArchiveOrderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL),
    map((action: actions.GetArchiveOrderDetailAction) => action.payload),
    switchMap(state => {
      return this.service.getArchiveOrderDetail(state).pipe(

        tap(add => {
        }),
        switchMap(user => [new actions.GetArchiveOrderDetailSuccessAction(user)]),
        catchError(error => of(new actions.GetArchiveOrderDetailFailAction(error)))
      );
    })
  ));
  
  getRecentOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_RECENT_ORDER_LIST),
    map((action: actions.GetRecentOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.recentOrderList(state).pipe(
        map(user => new actions.GetRecentOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetRecentOrderlistFailAction(error)))
      );
    })
  ));
  
  getAllOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ALL_ORDER_LIST),
    map((action: actions.GetAllOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.allOrderList(state).pipe(
        map(user => new actions.GetAllOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetAllOrderlistFailAction(error)))
      );
    })
  ));
  
  getArchiveOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_ORDER_LIST),
    map((action: actions.GetArchiveOrderlistAction) => action.payload),
    switchMap(state => {
      return this.service.archiveOrderList(state).pipe(
        map(user => new actions.GetArchiveOrderlistSuccessAction(user)),
        catchError(error => of(new actions.GetArchiveOrderlistFailAction(error)))
      );
    })
  ));
  
  getOrderCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_COUNT),
    map((action: actions.GetOrderCountAction) => action.payload),
    switchMap(state => {
      return this.service.orderCount(state).pipe(
        map(user => new actions.GetOrderCountSuccessAction(user)),
        catchError(error => of(new actions.GetOrderCountFailAction(error)))
      );
    })
  ));
  
  getDeliveryPersonsList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_PERSONS_LIST),
    map((action: actions.GetDeliveryPersonsListAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryPersonsList(state).pipe(
        map(user => new actions.GetDeliveryPersonsListSuccessAction(user)),
        catchError(error => of(new actions.GetDeliveryPersonsListFailAction(error)))
      );
    })
  ));
  
  allocateDeliveryPersons$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS),
    map((action: actions.AllocateDeliveryPersonsAction) => action.payload),
    switchMap(state => {
      return this.service.allocateDeliveryPersons(state).pipe(
        map(user => new actions.AllocateDeliveryPersonsSuccessAction(user)),
        tap(resp => {
            this.toaster.success('Success', resp.payload['message']);
        }),
        catchError(error => of(new actions.AllocateDeliveryPersonsFailAction(error)))
      );
    })
  ));
  
  getAllOrderListBasedOnStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS),
    map((action: actions.GetAllOrderlistBasedOnStatusAction) => action.payload),
    switchMap(state => {
      return this.service.allOrderListBasedOnStatus(state).pipe(
        map(user => new actions.GetAllOrderlistBasedOnStatusSuccessAction(user)),

        catchError(error => of(new actions.GetAllOrderlistBasedOnStatusFailAction(error)))
      );
    })
  ));
  
  updateAllOrderListBasedOnStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS),
    map((action: actions.GetAllOrderlistBasedOnStatusAction) => action.payload),
    switchMap(state => {
      return this.service.updateAllOrderListBasedOnStatus(state).pipe(
        map(user => new actions.UpdateAllOrderlistBasedOnStatusSuccessAction(user)),
        catchError(error => of(new actions.UpdateAllOrderlistBasedOnStatusFailAction(error)))
      );
    })
  ));
  
  getOrderLogList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_LOG_LIST),
    map((action: actions.GetOrderLoglistAction) => action.payload),
    switchMap(state => {
      return this.service.orderLogList(state).pipe(
        map(user => new actions.GetOrderLoglistSuccessAction(user)),
        catchError(error => of(new actions.GetOrderLoglistFailAction(error)))
      );
    })
  ));
  
  getOrderStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_STATUS_LIST),
    map((action: actions.GetOrderStatuslistAction) => action.payload),
    switchMap(state => {
      return this.service.orderStatusList(state).pipe(
        map(user => new actions.GetOrderStatuslistSuccessAction(user)),
        catchError(error => of(new actions.GetOrderStatuslistFailAction(error)))
      );
    })
  ));
  
  getOrderStatusUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_STATUS_UPDATE),
    map((action: actions.GetOrderStatusUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.orderStatusUpdate(state).pipe(
        map(user => new actions.GetOrderStatusUpdateSuccessAction(user)),
        catchError(error => of(new actions.GetOrderStatusUpdateFailAction(error)))
      );
    })
  ));
  
  makeArchive$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_ARCHIVE),
    map((action: actions.MakeArchiveAction) => action.payload),
    switchMap(state => {
      return this.service.makeArchive(state).pipe(
        map(user => new actions.MakeArchiveSuccessAction(user)),
        tap(resp => {
          if (resp) {
              this.toaster.success(resp.payload.message);
          }
        }),
        catchError(error => of(new actions.MakeArchiveFailAction(error)))
      );
    })
  ));
  
  getShippingInformationUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE),
    map((action: actions.GetShippingInformationUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.shippingInformationUpdate(state).pipe(
        map(user => new actions.GetShippingInformationUpdateSuccessAction(user)),
        tap(resp => {
          if (resp) {
            if (resp.payload.status === 1) {
              this.toaster.success(resp.payload.message, 'Success');
            }
          }
        }),
        catchError(error => of(new actions.GetShippingInformationUpdateFailAction(error)))
      );
    })
  ));

  
  exportArchiveOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ARCHIVE_ORDER),
    map((action: actions.ExportArchiveOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportArchiveOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportArchiveOrderSuccess(user)),
        catchError(error => of(new actions.ExportArchiveOrderFail(error)))
      );
    })
  ));

  
  exportAllArchiveOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER),
    map((action: actions.ExportAllArchiveOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllArchiveOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_all_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportAllArchiveOrderSuccess(user)),
        catchError(error => of(new actions.ExportAllArchiveOrderFail(error)))
      );
    })
  ));

  
  archiveOrderCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT),
    map((action: actions.ArchiveOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.service.archiveOrderListCount(state).pipe(
        map(user => new actions.ArchiveOrderListCountSuccess(user)),
        catchError(error => of(new actions.ArchiveOrderListCountFail(error)))
      );
    })
  ));

  
  cancelOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CANCEL_ORDER_LIST),
    map((action: actions.CancelOrderListAction) => action.payload),
    switchMap(state => {
      return this.service.cancelOrderList(state).pipe(
        map(user => new actions.CancelOrderListSuccessAction(user)),
        catchError(error => of(new actions.CancelOrderListFailAction(error)))
      );
    })
  ));

  
  cancelOrderListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CANCEL_ORDER_LIST_COUNT),
    map((action: actions.CancelOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.service.cancelOrderListCount(state).pipe(
        map(user => new actions.CancelOrderListCountSuccess(user)),
        catchError(error => of(new actions.CancelOrderListCountFail(error)))
      );
    })
  ));

  
  exportCancelOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_CANCEL_ORDER),
    map((action: actions.ExportCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportCancelOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'cancel_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportCancelOrderSuccess(user)),
        catchError(error => of(new actions.ExportCancelOrderFail(error)))
      );
    })
  ));

  
  exportAllCancelOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER),
    map((action: actions.ExportAllCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllCancelOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'cancel_order_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportAllCancelOrderSuccess(user)),
        catchError(error => of(new actions.ExportAllCancelOrderFail(error)))
      );
    })
  ));

  
  changeCancelOrderStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS),
    map((action: actions.ChangeCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.service.changeCancelOrderStatus(state).pipe(
        map(user => new actions.ChangeCancelOrderStatusSuccess(user)),
        catchError(error => of(new actions.ChangeCancelOrderStatusFail(error)))
      );
    })
  ));

  
  bulkCancelOrderStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BULK_CANCEL_ORDER_STATUS),
    map((action: actions.BulkCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.service.bulkCancelOrderStatus(state).pipe(
        map(user => new actions.BulkCancelOrderStatusSuccess(user)),
        catchError(error => of(new actions.BulkCancelOrderStatusFail(error)))
      );
    })
  ));




  // get order invoice list

  
  orderInvoiceList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_INVOICE_LIST),
    map((action: actions.OrderInvoiceListAction) => action.payload),
    switchMap(state => {
      return this.service.orderInvoiceList(state).pipe(
        map(user => new actions.OrderInvoiceListSuccessAction(user)),
        catchError(error => of(new actions.OrderInvoiceListFailAction(error)))
      );
    })
  ));

   // get order invoice list count

   
   orderInvoiceListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT),
     map((action: actions.OrderInvoiceListCountAction) => action.payload),
     switchMap(state => {
       return this.service.orderInvoiceListCount(state).pipe(
         map(user => new actions.OrderInvoiceListCountSuccessAction(user)),
         catchError(error => of(new actions.OrderInvoiceListCountFailAction(error)))
       );
     })
   ));

   
   settlementList$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SETTLEMENT_LIST),
     map((action: actions.SettlementListAction) => action.payload),
     switchMap(state => {
       return this.service.settlementList(state).pipe(
         map(user => new actions.SettlementListSuccessAction(user)),
         catchError(error => of(new actions.SettlementListFailAction(error)))
       );
     })
   ));

   
   settlementListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SETTLEMENT_LIST_COUNT),
     map((action: actions.SettlementListCountAction) => action.payload),
     switchMap(state => {
       return this.service.settlementListCount(state).pipe(
         map(user => new actions.SettlementListCountSuccessAction(user)),
         catchError(error => of(new actions.SettlementListCountFailAction(error)))
       );
     })
   ));

   
   sendMail$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SEND_MAIL),
     map((action: actions.SendMailAction) => action.payload),
     switchMap(state => {
       return this.service.sendMail(state).pipe(
         tap(res => {
           if (res.status === 1) {
             this.toaster.success('Invoice has been sent to your mail');
            }
         }),
         map(user => new actions.SendMailActionSuccessAction(user)),
         catchError(error => of(new actions.SendMailActionFailAction(error)))
       );
     })
   ));


   
   exportSalesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.EXPORT_SALES_REPORT),
     map((action: actions.ExportSalesReportAction) => action.payload),
     switchMap(state => {
       return this.service.exportSalesReport(state).pipe(
         tap(data => {
           if (data) {
             const filename = 'sales_report_' + Date.now() + '.xlsx';
             const blob = new Blob([data], {type: 'text/xlsx'});
             saveAs(blob, filename);
           }
         }),
         map(user => new actions.ExportSalesReportSuccessAction(user)),
         catchError(error => of(new actions.ExportSalesReportFailAction(error)))
       );
     })
   ));


      // Download Invoice

      
      downloadInvoice$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
        map((action: actions.DownloadInvoiceAction) => action.payload),
        switchMap(state => {
          return this.service.downloadInvoice(state).pipe(
            tap((response: any ) => {
              const filename = state.orderId + ".pdf";
              const blob = new Blob([response], { type: 'application/pdf' });
              fileSaver.saveAs(blob, filename);
            }),
         
            map(user => new actions.DownloadInvoiceSuccessAction(user)),
            catchError(error => of(new actions.DownloadInvoiceFailAction(error)))
          );
        })
      ));



    
    productList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.PRODUCT_LIST),
      map((action: actions.ProductListAction) => action.payload),
      switchMap(state => {
        return this.service.productList(state).pipe(
          switchMap(list => [new actions.ProductListSuccess(list)]),
          catchError(error => of(new actions.ProductListFail(error)))
        );
      })
    ));

    
    categoryList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.CATEGORY_LIST),
      map((action: actions.CategoryListAction) => action.payload),
      switchMap(state => {
        return this.service.categoryList(state).pipe(
          switchMap(list => [new actions.CategoryListSuccess(list)]),
          catchError(error => of(new actions.CategoryListFail(error)))
        );
      })
    ));
  
    
    backOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.BACK_ORDER),
      map((action: actions.BackOrderList) => action.payload),
      switchMap(state => {
        return this.service.backOrderList(state).pipe(
          switchMap(list => [new actions.BackOrderListSuccessAction(list)]),
          catchError(error => of(new actions.BackOrderListFailAction(error)))
        );
      })
    ));


    
    
    backOrderListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.BACK_ORDER_COUNT),
      map((action: actions.BackOrderListCount) => action.payload),
      switchMap(state => {
        return this.service.backOrderListCount(state).pipe(
          switchMap(list => [new actions.BackOrderListCountSuccessAction(list)]),
          catchError(error => of(new actions.BackOrderListCountFailAction(error)))
        );
      })
    ));

    
    vendorOrderCount$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.VENDOR_ORDER_COUNT),
      map((action: actions.VendorOrderListCountAction) => action.payload),
      switchMap(state => {
        return this.service.vendorOrderStatusCount(state).pipe(
          switchMap(list => [new actions.VendorOrderListCountSuccessAction(list)]),
          catchError(error => of(new actions.VendorOrderListCountFailAction(error)))
        );
      })
    ));
  
  
  failedOrderList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.FAILED_ORDER),
      map((action: actions.FailedOrderList) => action.payload),
      switchMap(state => {
        return this.service.failedOrderList(state).pipe(
          switchMap(list => [new actions.FailedOrderListSuccessAction(list)]),
          catchError(error => of(new actions.FailedOrderListFailAction(error)))
        );
      })
  ));


  
  failedOrderCounts$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.FAILED_ORDER_COUNTS),
      map((action: actions.failedOrderCounts) => action.payload),
      switchMap(state => {
        return this.service.failedOrderCounts(state).pipe(
          switchMap(list => [new actions.failedOrderCountsSuccess(list)]),
          catchError(error => of(new actions.failedOrderCountsFailed(error)))
        );
      })
  ));

  
  vendorOrderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_ORDER_DETAIL),
      map((action: actions.VendorOrderDetailAction) => action.payload),
      mergeMap(state => {
        return this.service.vendorOrderBasedOnDetail(state).pipe(
          mergeMap(list => [new actions.VendorOrderDetailSuccessAction(list)]),
          catchError(error => of(new actions.VendorOrderDetailFailAction(error)))
        );
      })
  ));
  
  
  backOrderExportList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BACK_ORDER_EXPORT_LIST),
    map((action: actions.ExportBackOrderList) => action.payload),
    switchMap(state => {
      return this.service.exportBackOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'sales_report_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportBackOrderListSuccess(user)),
        catchError(error => of(new actions.exportBackOrderListFailed(error)))
      );
    })
  ));

  
  BulkbackOrderExportList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BULK_BACK_ORDER_EXPORT_LIST),
    map((action: actions.bulkExportBackOrderList) => action.payload),
    switchMap(state => {
      return this.service.bulkBackOrderExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'sales_report_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.bulkExportBackOrderListSuccess(user)),
        catchError(error => of(new actions.bulkExportBackOrderListFailed(error)))
      );
    })
  ));

  
  failedOrderExportList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.FAILED_ORDER_EXPORT_LIST),
    map((action: actions.ExportFailedOrderList) => action.payload),
    switchMap(state => {
      return this.service.exportFailedOrder(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'sales_report_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.ExportFailedOrderListSuccess(user)),
        catchError(error => of(new actions.exportFailedOrderListFailed(error)))
      );
    })
  ));
  
  bulkExporFailedOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST),
    map((action: actions.bulkExportFailedOrderList) => action.payload),
    switchMap(state => {
      return this.service.bulkFailedOrderExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'sales_report_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        map(user => new actions.bulkExportFailedOrderListSuccess(user)),
        catchError(error => of(new actions.bulkExportFailedOrderListFailed(error)))
      );
    })
  ));

/*AllOrder List count */

  
  getAllOrderListcount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ALL_ORDER_LIST_COUNT),
    map((action: actions.getAllOrderListcountAction) => action.payload),
    switchMap(state => {
      return this.service.getAllOrderListcount(state).pipe(
        map(user => new actions.getAllOrderListcountSuccessAction(user)),
        catchError(error => of(new actions.getAllOrderListcountFailAction(error)))
      );
    })
  ));

  /*revoke archieve order */

  
  revokeArchieveOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.REVOKE_ARCHIEVE_ORDER),
    map((action: actions.revokeArchieveOrderAction) => action.payload),
    switchMap(state => {
      return this.service.revokeArchieveOrder(state).pipe(
        map(user => new actions.revokeArchieveOrderSuccessAction(user)),
        catchError(error => of(new actions.revokeArchieveOrderFailAction(error)))
      );
    })
  ));

  
  archieveOrderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIEVE_ORDER_DETAIL),
    map((action: actions.ArchieveOrderDetailAction) => action.payload),
    switchMap(state => {
      return this.service.archieveOrderDetail(state).pipe(
        map(user => new actions.ArchieveOrderDetailSuccessAction(user)),
        catchError(error => of(new actions.ArchieveOrderDetailFailAction(error)))
      );
    })
  ));

  
  salesReport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SALES_REPORTCATEGORY_LIST),
    map((action: actions.SalesReportCategoryListAction) => action.payload),
    switchMap(state => {
      return this.service.salesReportCategory(state).pipe(
        switchMap(list => [new actions.SalesReportCategoryListSuccess(list)]),
        catchError(error => of(new actions.SalesReportCategoryListFail(error)))
      );
    })
  ));




 // export product list

 
 exportOrderInvoice$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.EXPORT_ORDER_INVOICE),
   map((action: actions.OrderInvoiceExportAction) => action.payload),
   switchMap(state => {
     return this.service.exportOrderInvoice(state).pipe(
       tap((data:any) => {
         const filename = 'product_list_' + Date.now() + '.xlsx';
         const blob = new Blob([data], { type: 'text/xlsx' });
         saveAs(blob, filename);
       }),

       switchMap(response => [
        new actions.OrderInvoiceListSuccessAction (response)
      ]),
      catchError(error =>
        of(new actions.OrderInvoiceListFailAction(error))
      )
     );
   })
 ));

 // export All product list

 
 exportAllOrderInvoice$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.ALL_EXPORT_ORDER_INVOICE),
   map((action: actions.OrderInvoiceAllExportAction) => action.payload),
   switchMap(state => {
     return this.service.orderInvoiceAllExcel(state).pipe(
       tap((data:any) => {
         const filename = 'product_list_' + Date.now() + '.xlsx';
         const blob = new Blob([data], { type: 'text/xlsx' });
         saveAs(blob, filename);
       }),
       switchMap(list => [new actions.OrderInvoiceAllExportSuccessAction(list)]),
       catchError(error => of(new actions.OrderInvoiceAllExportFailAction(error)))
     );
   })
 ));
 
 updatePaymentStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.UPDATE_PAYMENTSTATUS),
   map((action: actions.UpdatePaymentStatusAction) => action.payload),
   switchMap(state => {
     return this.service.updatePaymentStatus(state).pipe(
       switchMap(list => [new actions.UpdatePaymentStatusSuccessAction(list)]),
       catchError(error => of(new actions.UpdatePaymentStatusFailAction(error)))
     );
   })
 ));

//ordered Export all
 
 OrderedExportAll$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.ORDERED_EXPORT_ALL),
   map((action: actions.OrderedExportAllAction) => action.payload),
   switchMap(state => {

    return this.service.OrderedExportAll(state).pipe(
      tap((data:any) => {
        const filename = 'Orders_' + Date.now() + '.xlsx';
        const blob = new Blob([data], { type: 'text/xlsx' });
        saveAs(blob, filename);
      }),
      switchMap(list => [new actions.OrderedExportAllSuccessAction(list)]),
      catchError(error => of(new actions.OrderedExportAllFailAction(error)))
    );

   
   })
 ));

//  backOrderDetail

 backOrderDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
  ofType(actions.ActionTypes.BACK_ORDER_DETAIL),
  map((action: actions.backOrderDetailAction) => action.payload),
  switchMap(state => {
    return this.service.backOrderDetail(state).pipe(
      switchMap(list => [new actions.backOrderDetailSuccessAction(list)]),
      catchError(error => of(new actions.backOrderDetailFailAction(error)))
    );
  })
));
 

//  fullFillNow
fullFillNow$: Observable<Action> = createEffect(() => this.action$.pipe(
  ofType(actions.ActionTypes.FULL_FILL_NOW),
  map((action: actions.fullFillNowAction) => action.payload),
  switchMap(state => {
    return this.service.fullFillNow(state).pipe(
      switchMap(list => [new actions.fullFillNowSuccessAction(list)]),
      catchError(error => of(new actions.fullFillNowFailAction(error)))
    );
  })
));

}
