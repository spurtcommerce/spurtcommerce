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
// store
import { Store } from '@ngrx/store';
// actions
import * as orderActions from './order-action/order.action';
// app state
import * as store from '../app.state.interface';
// router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
// notifications

import {
  // order add selectors
  // getRecentOrderList,
  RecentOrderListFailed, ArchiveOrderList, ArchiveOrderListFailed, ArchiveOrderListLoaded, ArchiveOrderListLoading,
  RecentOrderListLoaded, OrderCount, OrderCountFailed, OrderCountLoaded, OrderCountLoading,
  RecentOrderListLoading, AllocateDeliveryPersonsFailed, AllocateDeliveryPersonsList, AllocateDeliveryPersonsLoaded, AllocateDeliveryPersonsLoading,
  AllOrderList, AllOrderListFailed, AllOrderListLoaded, AllOrderListLoading, recentOrderList,
  orderStatusListLoading, ShippingInformationUpdate, ShippingInformationUpdateFailed, ShippingInformationUpdateLoaded, ShippingInformationUpdateLoading,
  orderStatusList, DeliveryPersonsList, DeliveryPersonsListFailed, DeliveryPersonsListLoaded, DeliveryPersonsListLoading,
  todayRecentOrderList, UpdateAllOrderListBasedOnStatus, UpdateAllOrderListBasedOnStatusFailed, UpdateAllOrderListBasedOnStatusLoaded, UpdateAllOrderListBasedOnStatusLoading,
  prevRecentOrderList, AllOrderListBasedOnStatus, AllOrderListBasedOnStatusFailed, AllOrderListBasedOnStatusLoaded, AllOrderListBasedOnStatusLoading,
  OrderLogList, OrderLogListFailed, OrderLogListLoaded, OrderLogListLoading, MakeArchive, MakeArchiveFailed, MakeArchiveLoaded, MakeArchiveLoading,
  OrderDetail, OrderDetailFailed, OrderDetailLoaded, OrderDetailLoading, ArchiveOrderDetail, ArchiveOrderDetailFailed, ArchiveOrderDetailLoaded,
  ArchiveOrderDetailLoading, OrderStatusUpdate, OrderStatusUpdateFailed, OrderStatusUpdateLoaded, OrderStatusUpdateLoading,
  exportArchiveOrderLoading,
  exportArchiveOrderLoaded,
  exportAllArchiveOrderLoading,
  archiveOrderListCount,
  cancelOrderList,
  cancelOrderListLoading,
  cancelOrderListLoaded,
  cancelOrderListCount,
  cancelOrderListCountLoading,
  cancelOrderListCountLoaded,
  exportCancelOrderLoading,
  exportCancelOrderLoaded,
  exportAllCancelOrderLoaded,
  exportAllCancelOrderLoading,
  cancelOrderStatusLoading,
  cancelOrderStatusLoaded,
  bulkCancelOrderStatusLoading,
  bulkCancelOrderStatusLoaded,
  orderInvoiceList,
  orderInvoiceListCount,
  orderInvoiceListLoading,
  orderInvoiceListLoaded,
  downloadInvoice,
  downloadInvoiceLoading,
  downloadInvoiceLoaded,
  settlementList,
  settlementListCount,
  settlementListLoaded,
  settlementListLoading,
  exportSalesOrderLoading,
  exportSalesOrderLoaded,
  sendMailLoading,
  sendMailLoaded,
  productListLoading,
  productListLoaded,
  categoryLists,
  categoryListsLoading,
  categoryListLoaded,
  productList,
  selectedProductList,
  backOrderList,
  backOrderListLoading,
  backOrderListLoaded,
  backOrderListCount,
  backOrderListCountLoading,
  backOrderListCountLoaded,
  failedOrderList,
  failedOrderListsLoading,
  failedOrderListLoaded,
  exportBackOrderList,
  exportBackOrderListLoading,
  exportBackOrderListLoaded,
  bulkExportBackOrderList,
  bulkExportBackOrderListLoading,
  bulkExportBackOrderListLoaded,
  exportFailedOrderList,
  exportFailedOrderListLoading,
  exportFailedOrderListLoaded,
  bulkExportFailedOrderList,
  bulkExportFailedOrderListLoading,
  bulkExportFailedOrderListLoaded,
  vendorOrderListCount,
  vendorOrderListCountLoading,
  vendorOrderListCountLoaded,
  vendorOrderDetail,
  vendorOrderDetailLoading,
  vendorOrderDetailLoaded,
  getAllOrderListcount,
  getAllOrderListcountLoading,
  getAllOrderListcountLoaded,
  revokeArchieveOrder,
  revokeArchieveOrderLoading,
  revokeArchieveOrderLoaded,
  revokeArchieveOrderFailed,
  archieveOrderDetail,
  archieveOrderDetailLoading,
  archieveOrderDetailLoaded,
  archieveOrderDetailFailed,
  salesReportCategoryLists,
  salesReportCategoryListsLoading,
  salesReportCategoryListLoaded,
  failedOrderCounts,
  failedOrderCountsLoading,
  failedOrderCountsLoaded,
  exportOrderInvoiceLoading,
  exportOrderInvoiceLoaded,
  exportOrderInvoiceFailed,
  exportOrderInvoice,
  AllExportOrderInvoiceLoading,
  AllExportOrderInvoiceLoaded,
  AllExportOrderInvoiceFailed,
  AllExportOrderInvoice,
  updatePaymentStatusLoading,
  updatePaymentStatusLoaded,
  updatePaymentStatusFailed,
  updatePaymentStatus,
  OrderedExportAllLoading,
  OrderedExportAllLoaded,
  OrderedExportAllFailed,
  OrderedExportAll,
  backOrderDetailLoading,
  backOrderDetailLoaded,
  backOrderDetailFailed,
  backOrderDetail,
  fullFillNowLoading,
  fullFillNowLoaded,
  fullFillNowFailed,
  fullFillNow
  // order update selectors

} from './order-reducer/order.selector';
import { OrderListModel } from './order-model/Order-list.model';

@Injectable({
  providedIn: 'root'
})
export class OrderSandbox {


  public orderDetail$ = this.appState.select(OrderDetail);
  public orderDetailLoading$ = this.appState.select(OrderDetailLoading);
  public orderDetailLoaded$ = this.appState.select(OrderDetailLoaded);
  public orderDetailFailed$ = this.appState.select(OrderDetailFailed);

  public archiveOrderDetail$ = this.appState.select(ArchiveOrderDetail);
  public archiveOrderDetailLoading$ = this.appState.select(ArchiveOrderDetailLoading);
  public archiveOrderDetailLoaded$ = this.appState.select(ArchiveOrderDetailLoaded);
  public archiveOrderDetailFailed$ = this.appState.select(ArchiveOrderDetailFailed);

  public orderCount$ = this.appState.select(OrderCount);
  public orderCountLoading$ = this.appState.select(OrderCountLoading);
  public orderCountLoaded$ = this.appState.select(OrderCountLoaded);
  public orderCountFailed$ = this.appState.select(OrderCountFailed);

  public allOrderListLoading$ = this.appState.select(AllOrderListLoading);
  public allOrderListLoaded$ = this.appState.select(AllOrderListLoaded);
  public allOrderListFailed$ = this.appState.select(AllOrderListFailed);
  public allOrderList$ = this.appState.select(AllOrderList);

  public archiveOrderListLoading$ = this.appState.select(ArchiveOrderListLoading);
  public archiveOrderListLoaded$ = this.appState.select(ArchiveOrderListLoaded);
  public archiveOrderListFailed$ = this.appState.select(ArchiveOrderListFailed);
  public archiveOrderList$ = this.appState.select(ArchiveOrderList);

  public deliveryPersonsListLoading$ = this.appState.select(DeliveryPersonsListLoading);
  public deliveryPersonsListLoaded$ = this.appState.select(DeliveryPersonsListLoaded);
  public deliveryPersonsListFailed$ = this.appState.select(DeliveryPersonsListFailed);
  public deliveryPersonsList$ = this.appState.select(DeliveryPersonsList);
  public allocateDeliveryPersonsListLoading$ = this.appState.select(AllocateDeliveryPersonsLoading);
  public allocateDeliveryPersonsListLoaded$ = this.appState.select(AllocateDeliveryPersonsLoaded);
  public allocateDeliveryPersonsListFailed$ = this.appState.select(AllocateDeliveryPersonsFailed);
  public allocateDeliveryPersonsList$ = this.appState.select(AllocateDeliveryPersonsList);

  public allOrderListBasedOnStatusLoading$ = this.appState.select(AllOrderListBasedOnStatusLoading);
  public allOrderListBasedOnStatusLoaded$ = this.appState.select(AllOrderListBasedOnStatusLoaded);
  public allOrderListBasedOnStatusFailed$ = this.appState.select(AllOrderListBasedOnStatusFailed);
  public allOrderListBasedOnStatus$ = this.appState.select(AllOrderListBasedOnStatus);

  public updateAllOrderListBasedOnStatusLoading$ = this.appState.select(UpdateAllOrderListBasedOnStatusLoading);
  public updateAllOrderListBasedOnStatusLoaded$ = this.appState.select(UpdateAllOrderListBasedOnStatusLoaded);
  public updateAllOrderListBasedOnStatusFailed$ = this.appState.select(UpdateAllOrderListBasedOnStatusFailed);
  public updateAllOrderListBasedOnStatus$ = this.appState.select(UpdateAllOrderListBasedOnStatus);

  public logOrderListLoading$ = this.appState.select(OrderLogListLoading);
  public logOrderListLoaded$ = this.appState.select(OrderLogListLoaded);
  public logOrderListFailed$ = this.appState.select(OrderLogListFailed);
  public logOrderList$ = this.appState.select(OrderLogList);

  public updateOrderStatusLoading$ = this.appState.select(OrderStatusUpdateLoading);
  public updateOrderStatusLoaded$ = this.appState.select(OrderStatusUpdateLoaded);
  public updateOrderStatusFailed$ = this.appState.select(OrderStatusUpdateFailed);
  public updateOrderStatusList$ = this.appState.select(OrderStatusUpdate);

  public makeArchiveLoading$ = this.appState.select(MakeArchiveLoading);
  public makeArchiveLoaded$ = this.appState.select(MakeArchiveLoaded);
  public makeArchiveFailed$ = this.appState.select(MakeArchiveFailed);
  public makeArchiveList$ = this.appState.select(MakeArchive);

  public updateShippingInformationLoading$ = this.appState.select(ShippingInformationUpdateLoading);
  public updateShippingInformationLoaded$ = this.appState.select(ShippingInformationUpdateLoaded);
  public updateShippingInformationFailed$ = this.appState.select(ShippingInformationUpdateFailed);
  public updateShippingInformationList$ = this.appState.select(ShippingInformationUpdate);

  public recentOrderListLoading$ = this.appState.select(RecentOrderListLoading);
  public recentOrderListLoaded$ = this.appState.select(RecentOrderListLoaded);
  public recentOrderListFailed$ = this.appState.select(RecentOrderListFailed);
  public todayRecentOrderList$ = this.appState.select(todayRecentOrderList);
  public prevRecentOrderList$ = this.appState.select(prevRecentOrderList);
  public recentOrderList$ = this.appState.select(recentOrderList);

  public orderStatusListLoading$ = this.appState.select(orderStatusListLoading);
  public orderStatusList$ = this.appState.select(orderStatusList);

  public exportArchiveOrderLoading$ = this.appState.select(exportArchiveOrderLoading);
  public exportArchiveOrderLoaded$ = this.appState.select(exportArchiveOrderLoaded);
  public exportAllArchiveOrderLoading$ = this.appState.select(exportAllArchiveOrderLoading);

  public archiveOrderListCount$ = this.appState.select(archiveOrderListCount);

  public cancelOrderList$ = this.appState.select(cancelOrderList);
  public cancelOrderListLoading$ = this.appState.select(cancelOrderListLoading);
  public cancelOrderListLoaded$ = this.appState.select(cancelOrderListLoaded);

  public cancelOrderListCount$ = this.appState.select(cancelOrderListCount);
  public cancelOrderListCountLoading$ = this.appState.select(cancelOrderListCountLoading);
  public cancelOrderListCountLoaded$ = this.appState.select(cancelOrderListCountLoaded);

  public exportCancelOrderLoading$ = this.appState.select(exportCancelOrderLoading);
  public exportCancelOrderLoaded$ = this.appState.select(exportCancelOrderLoaded);

  public exportAllCancelOrderLoading$ = this.appState.select(exportAllCancelOrderLoading);
  public exportAllCancelOrderLoaded$ = this.appState.select(exportAllCancelOrderLoaded);

  public cancelOrderStatusLoading$ = this.appState.select(cancelOrderStatusLoading);
  public cancelOrderStatusLoaded$ = this.appState.select(cancelOrderStatusLoaded);

  public bulkCancelOrderStatusLoading$ = this.appState.select(bulkCancelOrderStatusLoading);
  public bulkCancelOrderStatusLoaded$ = this.appState.select(bulkCancelOrderStatusLoaded);



  public backOrderList$ = this.appState.select(backOrderList);
  public backOrderListLoading$ = this.appState.select(backOrderListLoading);
  public backOrderListLoaded$ = this.appState.select(backOrderListLoaded);

  public backOrderListCount$ = this.appState.select(backOrderListCount);
  public backOrderListCountLoading$ = this.appState.select(backOrderListCountLoading);
  public backOrderListCountLoaded$ = this.appState.select(backOrderListCountLoaded);

  public exportBackOrderList$ = this.appState.select(exportBackOrderList);
  public exportBackOrderListLoading$ = this.appState.select(exportBackOrderListLoading);
  public exportBackOrderListLoaded$ = this.appState.select(exportBackOrderListLoaded);

  public bulkExportBackOrderList$ = this.appState.select(bulkExportBackOrderList);
  public bulkExportBackOrderListLoading$ = this.appState.select(bulkExportBackOrderListLoading);
  public bulkExportBackOrderListLoaded$ = this.appState.select(bulkExportBackOrderListLoaded);

  public exportFailedOrderList$ = this.appState.select(exportFailedOrderList);
  public exportFailedOrderListLoading$ = this.appState.select(exportFailedOrderListLoading);
  public exportFailedOrderListLoaded$ = this.appState.select(exportFailedOrderListLoaded);

  public bulkExportFailedOrderList$ = this.appState.select(bulkExportFailedOrderList);
  public bulkExportFailedOrderListLoading$ = this.appState.select(bulkExportFailedOrderListLoading);
  public bulkExportFailedOrderListLoaded$ = this.appState.select(bulkExportFailedOrderListLoaded);

  public failedOrderList$ = this.appState.select(failedOrderList);
  public failedOrderListLoading$ = this.appState.select(failedOrderListsLoading);
  public failedOrderListLoaded$ = this.appState.select(failedOrderListLoaded);


  public failedOrderCounts$ = this.appState.select(failedOrderCounts);
  public failedOrderCountsLoading$ = this.appState.select(failedOrderCountsLoading);
  public failedOrderCountsLoaded$ = this.appState.select(failedOrderCountsLoaded);


  public orderInvoiceList$ = this.appState.select(orderInvoiceList);
  public orderInvoiceListCount$ = this.appState.select(orderInvoiceListCount);
  public orderInvoiceListLoading$ = this.appState.select(orderInvoiceListLoading);
  public orderInvoiceListLoaded$ = this.appState.select(orderInvoiceListLoaded);

  public downloadCsv$ = this.appState.select(downloadInvoice);
  public downloadInvoiceLoading$ = this.appState.select(
    downloadInvoiceLoading
  );
  public downloadInvoiceLoaded$ = this.appState.select(
    downloadInvoiceLoaded
  );


  public settlementList$ = this.appState.select(settlementList);
  public settlementListCount$ = this.appState.select(settlementListCount);
  public settlementListLoading$ = this.appState.select(settlementListLoading);
  public settlementListLoaded$ = this.appState.select(settlementListLoaded);

  public exportSalesOrderLoading$ = this.appState.select(exportSalesOrderLoading);
  public exportSalesOrderLoaded$ = this.appState.select(exportSalesOrderLoaded);


  public sendMailLoaded$ = this.appState.select(sendMailLoaded);
  public sendMailLoading$ = this.appState.select(sendMailLoading);

  public productList$ = this.appState.select(productList);
  public productListLoading$ = this.appState.select(productListLoading);
  public productListLoaded$ = this.appState.select(productListLoaded);

  public categoryLists$ = this.appState.select(categoryLists);
  public categoryListsLoading$ = this.appState.select(categoryListsLoading);
  public categoryListLoaded$ = this.appState.select(categoryListLoaded);

  public selectedProductList$ = this.appState.select(selectedProductList);

  public vendorOrderListCounts$ = this.appState.select(vendorOrderListCount);
  public vendorOrderListCountLoading$ = this.appState.select(vendorOrderListCountLoading);
  public vendorOrderListCountLoaded$ = this.appState.select(vendorOrderListCountLoaded);

  public vendorOrderDetail$ = this.appState.select(vendorOrderDetail);
  public vendorOrderDetailLoading$ = this.appState.select(vendorOrderDetailLoading);
  public vendorOrderDetailLoaded$ = this.appState.select(vendorOrderDetailLoaded);

  public revokeArchieveOrder$ = this.appState.select(revokeArchieveOrder);
  public revokeArchieveOrderLoading$ = this.appState.select(revokeArchieveOrderLoading);
  public revokeArchieveOrderLoaded$ = this.appState.select(revokeArchieveOrderLoaded);
  public revokeArchieveOrderFailed$ = this.appState.select(revokeArchieveOrderFailed);


  /*AllOrder List count */

  public getAllOrderListcount$ = this.appState.select(getAllOrderListcount);
  public getAllOrderListcountLoading$ = this.appState.select(getAllOrderListcountLoading);
  public getAllOrderListcountLoaded$ = this.appState.select(getAllOrderListcountLoaded);

  public archieveOrderDetail$ = this.appState.select(archieveOrderDetail);
  public archieveOrderDetailLoading$ = this.appState.select(archieveOrderDetailLoading);
  public archieveOrderDetailLoaded$ = this.appState.select(archieveOrderDetailLoaded);
  public archieveOrderDetailFailed$ = this.appState.select(archieveOrderDetailFailed);

  public salesReportCategoryList$ = this.appState.select(salesReportCategoryLists);
  public salesReportCategoryListLoading$ = this.appState.select(salesReportCategoryListsLoading);
  public salesReportCategoryListLoaded$ = this.appState.select(salesReportCategoryListLoaded);



  public exportOrderInvoiceLoading$ = this.appState.select(exportOrderInvoiceLoading);
  public exportOrderInvoiceLoaded$ = this.appState.select(exportOrderInvoiceLoaded);
  public exportOrderInvoiceFailed$ = this.appState.select(exportOrderInvoiceFailed);
  public exportOrderInvoice$ = this.appState.select(exportOrderInvoice);

  public AllExportOrderInvoiceLoading$ = this.appState.select(AllExportOrderInvoiceLoading);
  public AllExportOrderInvoiceLoaded$ = this.appState.select(AllExportOrderInvoiceLoaded);
  public AllExportOrderInvoiceFailed$ = this.appState.select(AllExportOrderInvoiceFailed);
  public AllExportOrderInvoice$ = this.appState.select(AllExportOrderInvoice);

  public updatePaymentStatusLoading$ = this.appState.select(updatePaymentStatusLoading);
  public updatePaymentStatusLoaded$ = this.appState.select(updatePaymentStatusLoaded);
  public updatePaymentStatusFailed$ = this.appState.select(updatePaymentStatusFailed);
  public updatePaymentStatus$ = this.appState.select(updatePaymentStatus);

  //ordered Export all
  public OrderedExportAllLoading$ = this.appState.select(OrderedExportAllLoading);
  public OrderedExportAllLoaded$ = this.appState.select(OrderedExportAllLoaded);
  public OrderedExportAllFailed$ = this.appState.select(OrderedExportAllFailed);
  public OrderedExportAll$ = this.appState.select(OrderedExportAll);

  //backOrderDetail
  public backOrderDetailLoading$ = this.appState.select(backOrderDetailLoading);
  public backOrderDetailLoaded$ = this.appState.select(backOrderDetailLoaded);
  public backOrderDetailFailed$ = this.appState.select(backOrderDetailFailed);
  public backOrderDetail$ = this.appState.select(backOrderDetail);

  //fullFillNow
  public fullFillNowLoading$ = this.appState.select(fullFillNowLoading);
  public fullFillNowLoaded$ = this.appState.select(fullFillNowLoaded);
  public fullFillNowFailed$ = this.appState.select(fullFillNowFailed);
  public fullFillNow$ = this.appState.select(fullFillNow);

  private subscriptions: Array<Subscription> = [];
  getOrderListLoading$: any;
  getOrderList$: any;
  getOrderListLoaded$: any;

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {

  }


  public doOrderDetail(value) {
    this.appState.dispatch(
      new orderActions.GetOrderDetailAction(value)
    );
  }
  public doArchiveOrderDetail(value) {
    this.appState.dispatch(
      new orderActions.GetOrderDetailAction(value)
    );
  }

  public getOrderCount(value) {
    this.appState.dispatch(
      new orderActions.GetOrderCountAction(value)
    );
  }

  public getRecentOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetRecentOrderlistAction(new OrderListModel(value))
    );
  }

  public getAllOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetAllOrderlistAction(value)
    );
  }

  public getArchiveOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetArchiveOrderlistAction(new OrderListModel(value))
    );
  }
  public getDeliveryPersonsList(value) {
    this.appState.dispatch(
      new orderActions.GetDeliveryPersonsListAction(value)
    );
  }
  public allocateDeliveryPersons(value) {
    this.appState.dispatch(
      new orderActions.AllocateDeliveryPersonsAction(value)
    );
  }
  public getAllOrderListBasedOnStatus(value) {
    this.appState.dispatch(
      new orderActions.GetAllOrderlistBasedOnStatusAction(value)
    );
  }
  public updateAllOrderListBasedOnStatus(value) {
    this.appState.dispatch(
      new orderActions.UpdateAllOrderlistBasedOnStatusAction(value)
    );
  }
  public decreaseOrderCount(value) {
    this.appState.dispatch(
      new orderActions.DecreaseUpdatedOrderCount(value)
    );
  }

  public getLogOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetOrderLoglistAction(value)
    );
  }
  public getOrderStatusList(value) {
    this.appState.dispatch(
      new orderActions.GetOrderStatuslistAction(value)
    );
  }
  public getOrderStatusUpdate(value) {
    this.appState.dispatch(
      new orderActions.GetOrderStatusUpdateAction(value)
    );
  }
  public makeArchive(value) {
    this.appState.dispatch(
      new orderActions.MakeArchiveAction(value)
    );
  }
  public getShippingInformationUpdate(value) {
    this.appState.dispatch(
      new orderActions.GetShippingInformationUpdateAction(value)
    );
  }

  public exportArchiveOrder(value) {
    this.appState.dispatch(
      new orderActions.ExportArchiveOrderAction(value)
    );
  }
  public exportAllArchiveOrder(value) {
    this.appState.dispatch(
      new orderActions.ExportAllArchiveOrderAction(value)
    );
  }

  public getArchiveOrderListCount(value) {
    this.appState.dispatch(
      new orderActions.ArchiveOrderListCountAction(value)
    );
  }
  /*AllOrder List Action */
  public getAllOrderListcount(value) {
    this.appState.dispatch(
      new orderActions.getAllOrderListcountAction(value)
    );
  }

  public RemoveExportSelection(val) {
    this.appState.dispatch(new orderActions.RemoveExportSelection(val));
  }


  // cancel order list
  public getCancelOrderList(val) {
    this.appState.dispatch(new orderActions.CancelOrderListAction(val));
  }
  // cancel order list count
  public getCancelOrderListCount(val) {
    this.appState.dispatch(new orderActions.CancelOrderListCountAction(val));
  }

  // cancel order export
  public exportCancelOrder(val) {
    this.appState.dispatch(new orderActions.ExportCancelOrderAction(val));
  }

  // cancel order export all
  public exportAllCancelOrder(val) {
    this.appState.dispatch(new orderActions.ExportAllCancelOrderAction(val));
  }

  // change cancel order status
  public changeCancelOrderStatus(val) {
    this.appState.dispatch(new orderActions.ChangeCancelOrderStatusAction(val));
  }

  // bulk cancel order status
  public bulkCancelOrderStatus(val) {
    this.appState.dispatch(new orderActions.BulkCancelOrderStatusAction(val));
  }




  // get order invoice list

  public getOrderInvoiceList(val) {
    this.appState.dispatch(new orderActions.OrderInvoiceListAction(val));
  }

  // get order invoice list count

  public getOrderInvoiceListCount(val) {
    this.appState.dispatch(new orderActions.OrderInvoiceListCountAction(val));
  }

  // download invoice

  public downloadInvoice(val) {
    this.appState.dispatch(new orderActions.DownloadInvoiceAction(val));
  }

  public settlementList(val) {
    this.appState.dispatch(new orderActions.SettlementListAction(val));
  }

  public settlementListCount(val) {
    this.appState.dispatch(new orderActions.SettlementListCountAction(val));
  }

  public exportSalesReport(val) {
    this.appState.dispatch(new orderActions.ExportSalesReportAction(val));
  }
  public sendMail(val) {
    this.appState.dispatch(new orderActions.SendMailAction(val));
  }

  public getProductList(value) {
    this.appState.dispatch(
      new orderActions.ProductListAction(value));
  }

  public getCategoryList(value) {
    this.appState.dispatch(
      new orderActions.CategoryListAction(value));
  }

  public clearList(params): void {
    this.appState.dispatch(new orderActions.ClearList(params));
  }

  public searchCategory(value) {
    this.appState.dispatch(
      new orderActions.SearchCategoryList(value));
  }
  public searchProduct(value) {
    this.appState.dispatch(
      new orderActions.SearchProductList(value));

  }

  public selectProduct(params): void {
    this.appState.dispatch(new orderActions.SelectProductList(params));
  }

  public selectCategory(params): void {
    this.appState.dispatch(new orderActions.SelectCategoryList(params));
  }

  public backOrderList(val) {
    this.appState.dispatch(new orderActions.BackOrderList(val));
  }


  public backOrderListCount(val) {
    this.appState.dispatch(new orderActions.BackOrderListCount(val));
  }

  public failedOrderList(val) {
    this.appState.dispatch(new orderActions.FailedOrderList(val));
  }

  public failedOrderCounts(val) {

    this.appState.dispatch(new orderActions.failedOrderCounts(val));

  }

  public exportBackOrderList(val) {
    this.appState.dispatch(new orderActions.ExportBackOrderList(val));
  }

  public bulkExportBackOrderList(val) {
    this.appState.dispatch(new orderActions.bulkExportBackOrderList(val));
  }

  public exportFailedOrderList(val) {
    this.appState.dispatch(new orderActions.ExportFailedOrderList(val));
  }

  public bulkExportFailedOrderList(val) {
    this.appState.dispatch(new orderActions.bulkExportFailedOrderList(val));
  }

  public vendorOrderListCount(val) {
    this.appState.dispatch(new orderActions.VendorOrderListCountAction(val));
  }

  public vendorOrderDetail(val) {
    this.appState.dispatch(new orderActions.VendorOrderDetailAction(val));
  }

  public revokeArchieveOrder(val) {
    this.appState.dispatch(new orderActions.revokeArchieveOrderAction(val));
  }

  public archieveOrderDetail(val) {
    this.appState.dispatch(new orderActions.ArchieveOrderDetailAction(val));
  }

  public clear() {
    this.appState.dispatch(new orderActions.ClearOrder());
  }

  public salesReportCategoryList(val) {
    this.appState.dispatch(new orderActions.SalesReportCategoryListAction(val));
  }
  public exportOrderInvoice(value) {
    this.appState.dispatch(
      new orderActions.OrderInvoiceExportAction(value));
  }

  public allExportOrderInvoice(value) {
    this.appState.dispatch(
      new orderActions.OrderInvoiceAllExportAction(value));
  }

  public updatePaymentStatus(value) {
    this.appState.dispatch(
      new orderActions.UpdatePaymentStatusAction(value));
  }
  //ordered Export all
  public OrderedExportAll(value) {
    this.appState.dispatch(
      new orderActions.OrderedExportAllAction(value));
  }

  //backOrderDetail
  public backOrderDetail(value) {
    this.appState.dispatch(
      new orderActions.backOrderDetailAction(value));
  }

  //fullFillNow
  public fullFillNow(value) {
    this.appState.dispatch(
      new orderActions.fullFillNowAction(value));
  }
}

