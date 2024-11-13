
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { OrderAddModel } from '../order-model/Order-add.model';
import { OrderListModel } from '../order-model/Order-list.model';

export const ActionTypes = {

  GET_ORDER_DETAIL: type('[Add] Get Order Detail'),
  GET_ORDER_DETAIL_SUCCESS: type('[Add] Get Order Detail Success'),
  GET_ORDER_DETAIL_FAIL: type('[Add] Get Order Detail Fail'),

  SALES_REPORTCATEGORY_LIST: type('[Customers] Sales Report Category List'),
  SALES_REPORTCATEGORY_LIST_SUCCESS: type('[Customers] Sales Report Category List Success'),
  SALES_REPORTCATEGORY_LIST_FAIL: type('[Customers] Sales Report Category List Fail'),

  GET_ARCHIVE_ORDER_DETAIL: type('[Add] Get Archive Order Detail'),
  GET_ARCHIVE_ORDER_DETAIL_SUCCESS: type('[Add] Get Archive Order Detail Success'),
  GET_ARCHIVE_ORDER_DETAIL_FAIL: type('[Add] Get Archive Order Detail Fail'),

  GET_RECENT_ORDER_LIST: type('[List] Do Recent Order list'),
  GET_RECENT_ORDER_LIST_SUCCESS: type('[List] Do Recent Order list Success'),
  GET_RECENT_ORDER_LIST_FAIL: type('[List] Do Recent Order list Fail'),

  GET_ORDER_COUNT: type('[List] Do Order count'),
  GET_ORDER_COUNT_SUCCESS: type('[List] Do Order count Success'),
  GET_ORDER_COUNT_FAIL: type('[List] Do Order count Fail'),

  GET_ALL_ORDER_LIST: type('[List] Do All Order list'),
  GET_ALL_ORDER_LIST_SUCCESS: type('[List] Do All Order list Success'),
  GET_ALL_ORDER_LIST_FAIL: type('[List] Do All Order list Fail'),

  GET_ARCHIVE_ORDER_LIST: type('[List] Do Archive Order list'),
  GET_ARCHIVE_ORDER_LIST_SUCCESS: type('[List] Do Archive Order list Success'),
  GET_ARCHIVE_ORDER_LIST_FAIL: type('[List] Do Archive Order list Fail'),

  GET_DELIVERY_PERSONS_LIST: type('[List] Do All delivery persons list'),
  GET_DELIVERY_PERSONS_LIST_SUCCESS: type('[List] Do All delivery persons list Success'),
  GET_DELIVERY_PERSONS_LIST_FAIL: type('[List] Do All delivery persons list Fail'),

  ALLOCATE_DELIVERY_PERSONS: type('[List] Do Allocate delivery persons'),
  ALLOCATE_DELIVERY_PERSONS_SUCCESS: type('[List] Do Allocate delivery persons Success'),
  ALLOCATE_DELIVERY_PERSONS_FAIL: type('[List] Do Allocate delivery persons Fail'),

  GET_ALL_ORDER_LIST_BASED_ON_STATUS: type('[List] Do All Order list based on status'),
  GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: type('[List] Do All Order list based on status Success'),
  GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: type('[List] Do All Order list based on status Fail'),

  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS: type('[List] Do update All Order list based on status'),
  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: type('[List] Do update All Order list based on status Success'),
  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: type('[List] Do All update Order list based on status Fail'),

  DECREASE_UPDATED_ORDER_COUNT: type('[List] Change count'),

  GET_ORDER_LOG_LIST: type('[List] Do Order log list'),
  GET_ORDER_LOG_LIST_SUCCESS: type('[List] Do Order log list Success'),
  GET_ORDER_LOG_LIST_FAIL: type('[List] Do Order log list Fail'),

  GET_ORDER_STATUS_LIST: type('[List] Do Order status list'),
  GET_ORDER_STATUS_LIST_SUCCESS: type('[List] Do Order status list Success'),
  GET_ORDER_STATUS_LIST_FAIL: type('[List] Do Order status list Fail'),

  GET_ORDER_STATUS_UPDATE: type('[List] Do Order status update'),
  GET_ORDER_STATUS_UPDATE_SUCCESS: type('[List] Do Order status update Success'),
  GET_ORDER_STATUS_UPDATE_FAIL: type('[List] Do Order status update Fail'),

  MAKE_ARCHIVE: type('[List] Do make archive'),
  MAKE_ARCHIVE_SUCCESS: type('[List] Do make archive Success'),
  MAKE_ARCHIVE_FAIL: type('[List] Do make archive Fail'),

  GET_SHIPPING_INFORMATION_UPDATE: type('[List] Do Shipping information update'),
  GET_SHIPPING_INFORMATION_UPDATE_SUCCESS: type('[List] Do Shipping information update Success'),
  GET_SHIPPING_INFORMATION_UPDATE_FAIL: type('[List] Do Shipping information update Fail'),


  EXPORT_ARCHIVE_ORDER: type('[Add] Export Archive Order'),
  EXPORT_ARCHIVE_ORDER_SUCCESS: type('[Add] Export Archive Order Success'),
  EXPORT_ARCHIVE_ORDER_FAIL: type('[Add] Export Archive Order Fail'),

  EXPORT_ALL_ARCHIVE_ORDER: type('[Add] Export All Archive Order'),
  EXPORT_ALL_ARCHIVE_ORDER_SUCCESS: type('[Add] Export All Archive Order Success'),
  EXPORT_ALL_ARCHIVE_ORDER_FAIL: type('[Add] Export All Archive Order Fail'),

  ARCHIVE_ORDER_LIST_COUNT: type('[Add] Archive Order List Count'),
  ARCHIVE_ORDER_LIST_COUNT_SUCCESS: type('[Add] Archive Order List Count Success'),
  ARCHIVE_ORDER_LIST_COUNT_FAIL: type('[Add] Archive Order List Count Fail'),

  REMOVE_EXPORT_SELECTION: type('[order export] Remove  order export selection'),

  CANCEL_ORDER_LIST: type('[List] Do Cancel Order list'),
  CANCEL_ORDER_LIST_SUCCESS: type('[List] Do Cancel Order list Success'),
  CANCEL_ORDER_LIST_FAIL: type('[List] Do Cancel Order list Fail'),

  CANCEL_ORDER_LIST_COUNT: type('[List] Do Cancel Order list count'),
  CANCEL_ORDER_LIST_COUNT_SUCCESS: type('[List] Do Cancel Order list count Success'),
  CANCEL_ORDER_LIST_COUNT_FAIL: type('[List] Do Cancel Order list count Fail'),

  EXPORT_CANCEL_ORDER: type('[Add] Export Cancel Order'),
  EXPORT_CANCEL_ORDER_SUCCESS: type('[Add] Export Cancel Order Success'),
  EXPORT_CANCEL_ORDER_FAIL: type('[Add] Export Cancel Order Fail'),

  EXPORT_ALL_CANCEL_ORDER: type('[Add] Export All Cancel Order'),
  EXPORT_ALL_CANCEL_ORDER_SUCCESS: type('[Add] Export All Cancel Order Success'),
  EXPORT_ALL_CANCEL_ORDER_FAIL: type('[Add] Export All Cancel Order Fail'),

  CHANGE_CANCEL_ORDER_STATUS: type('[List] Change Cancel Order status'),
  CHANGE_CANCEL_ORDER_STATUS_SUCCESS: type('[List] Change Cancel Order status Success'),
  CHANGE_CANCEL_ORDER_STATUS_FAIL: type('[List] Change Cancel Order status Fail'),

  BULK_CANCEL_ORDER_STATUS: type('[List] Bulk Cancel Order status'),
  BULK_CANCEL_ORDER_STATUS_SUCCESS: type('[List] Bulk Cancel Order status Success'),
  BULK_CANCEL_ORDER_STATUS_FAIL: type('[List] Bulk Cancel Order status Fail'),

  
  GET_ORDER_INVOICE_LIST: type('[Add] Get Order Invoice list'),
  GET_ORDER_INVOICE_LIST_SUCCESS: type('[Add] Get Order Invoice list Success'),
  GET_ORDER_INVOICE_LIST_FAIL: type('[Add] Get Order Invoice list Fail'),

  GET_ORDER_INVOICE_LIST_COUNT: type('[Add] Get Order Invoice list count'),
  GET_ORDER_INVOICE_LIST_COUNT_SUCCESS: type('[Add] Get Order Invoice list count Success'),
  GET_ORDER_INVOICE_LIST_COUNT_FAIL: type('[Add] Get Order Invoice list count Fail'),

  DOWNLOAD_INVOICE: type('[Add] Download Invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type('[Add] Download Invoice Success'),
  DOWNLOAD_INVOICE_FAIL: type('[Add] Download Invoice Fail'),

  SETTLEMENT_LIST: type('[List] Do Settlement list'),
  SETTLEMENT_LIST_SUCCESS: type('[List] Do Settlement list Success'),
  SETTLEMENT_LIST_FAIL: type('[List] Do Settlement list Fail'),

  SETTLEMENT_LIST_COUNT: type('[List] Do Settlement list count'),
  SETTLEMENT_LIST_COUNT_SUCCESS: type('[List] Do Settlement list count Success'),
  SETTLEMENT_LIST_COUNT_FAIL: type('[List] Do Settlement list count Fail'),

  EXPORT_SALES_REPORT: type('[Add] Export Sales Report'),
  EXPORT_SALES_REPORT_SUCCESS: type('[Add] Export Sales Report Success'),
  EXPORT_SALES_REPORT_FAIL: type('[Add] Export Sales Report Fail'),

  SEND_MAIL: type('[Send Mail] Send Mail'),
  SEND_MAIL_SUCCESS: type('[Send Mail] Send Mail Success'),
  SEND_MAIL_FAIL: type('[Send Mail] Send Mail Fail'),


  PRODUCT_LIST: type('[Customers] Product List'),
  PRODUCT_LIST_SUCCESS: type('[Customers] Product List Success'),
  PRODUCT_LIST_FAIL: type('[Customers] Product List Fail'),

  CATEGORY_LIST: type('[Customers] Category List'),
  CATEGORY_LIST_SUCCESS: type('[Customers] Category List Success'),
  CATEGORY_LIST_FAIL: type('[Customers] Category List Fail'),

  BACK_ORDER_EXPORT_LIST: type('[Customers] back order export List'),
  BACK_ORDER_EXPORT_LIST_SUCCESS: type('[Customers] back order export List Success'),
  BACK_ORDER_EXPORT_LIST_FAIL: type('[Customers] back order export List Fail'),

  BULK_BACK_ORDER_EXPORT_LIST: type('[Customers] bulk back order export List'),
  BULK_BACK_ORDER_EXPORT_LIST_SUCCESS: type('[Customers] bulk back order export List Success'),
  BULK_BACK_ORDER_EXPORT_LIST_FAIL: type('[Customers] bulk back order export List Fail'),

  FAILED_ORDER_EXPORT_LIST: type('[Customers] failed order export List'),
  FAILED_ORDER_EXPORT_LIST_SUCCESS: type('[Customers] failed order export List Success'),
  FAILED_ORDER_EXPORT_LIST_FAIL: type('[Customers] failed order export List Fail'),


  FAILED_ORDER_COUNTS: type('[Customers count] failed order count'),
  FAILED_ORDER_COUNTS_SUCCESS: type('[Customers count] failed order count Success'),
  FAILED_ORDER_COUNTS_FAIL: type('[Customers count] failed order count Fail'),

  BULK_FAILED_ORDER_EXPORT_LIST: type('[Customers] bulk failed order export List'),
  BULK_FAILED_ORDER_EXPORT_LIST_SUCCESS: type('[Customers] bulk failed order export List Success'),
  BULK_FAILED_ORDER_EXPORT_LIST_FAIL: type('[Customers] bulk failed order export List Fail'),

  SEARCH_PRODUCT_LIST: type('[Customers] Search Product List'),
  SEARCH_CATEGORY_LIST: type('[Customers] Search Category List'),
  SELECT_PRODUCT_LIST: type('[Customers] Select Product List'),
  SELECT_CATEGORY_LIST: type('[Customers] Select Category List'),

  CLEAR_LIST: type('[Customers] Clear List'),

  BACK_ORDER: type('[Customers] back order List'),
  BACK_ORDER_SUCCESS: type('[Customers] back order List Success'),
  BACK_ORDER_FAIL: type('[Customers] back order List Fail'),

  BACK_ORDER_COUNT: type('[Customers] back order List Count'),
  BACK_ORDER_COUNT_SUCCESS: type('[Customers] back order List Count Success'),
  BACK_ORDER_COUNT_FAIL: type('[Customers] back order List Count Fail'),

  VENDOR_ORDER_COUNT: type('[Customers] vendor order count'),
  VENDOR_ORDER_COUNT_SUCCESS: type('[Customers] vendor order count Success'),
  VENDOR_ORDER_COUNT_FAIL: type('[Customers] vendor order count Fail'),

  FAILED_ORDER: type('[Customers] failed order List'),
  FAILED_ORDER_SUCCESS: type('[Customers] failed order List Success'),
  FAILED_ORDER_FAIL: type('[Customers] failed order List Fail'),

  VENDOR_ORDER_DETAIL: type('[Customers] Vendor Detail List'),
  VENDOR_ORDER_DETAIL_SUCCESS: type('[Customers] Vendor Detail List Success'),
  VENDOR_ORDER_DETAIL_FAIL: type('[Customers] Vendor Detail List Fail'),

  // fullFillNow
  FULL_FILL_NOW: type('[Customers] fullFillNow'),
  FULL_FILL_NOW_SUCCESS: type('[Customers] fullFillNow Success'),
  FULL_FILL_NOW_FAIL: type('[Customers] fullFillNow Fail'),

  CLEAR_ORDER: type('[Customers] clear order'),

  /*AllOrder List Action */

  GET_ALL_ORDER_LIST_COUNT: type('[Add] all Order List Count'),
  GET_ALL_ORDER_LIST_COUNT_SUCCESS: type('[Add] all Order List Count Success'),
  GET_ALL_ORDER_LIST_COUNT_FAIL: type('[Add] all Order List Count Fail'),

  REVOKE_ARCHIEVE_ORDER: type('[Customers] revoke archieve order'),
  REVOKE_ARCHIEVE_ORDER_SUCCESS: type('[Customers] revoke archieve order Success'),
  REVOKE_ARCHIEVE_ORDER_FAIL: type('[Customers] revoke archieve order Fail'),

  ARCHIEVE_ORDER_DETAIL: type('[Customers] archieve order detail'),
  ARCHIEVE_ORDER_DETAIL_SUCCESS: type('[Customers] archieve order detail Success'),
  ARCHIEVE_ORDER_DETAIL_FAIL: type('[Customers] archieve order detail Fail'),


  EXPORT_ORDER_INVOICE: type('[Export] Export Order Invoices'),
  EXPORT_ORDER_INVOICE_SUCCESS: type('[Export] Export Order Invoices  Success'),
  EXPORT_ORDER_INVOICE_FAIL: type('[Export] Export Order Invoices Fail'),

  ALL_EXPORT_ORDER_INVOICE: type('[All Export] All Export OrderInvoice '),
  ALL_EXPORT_ORDER_INVOICE_SUCCESS: type('[All Export] All Export OrderInvoice Success'),
  ALL_EXPORT_ORDER_INVOICE_FAIL: type('[All Export] All Export OrderInvoice Fail'),

  UPDATE_PAYMENTSTATUS: type('[List] Do update paymentstatus'),
  UPDATE_PAYMENTSTATUS_SUCCESS: type('[List] Do update paymentstatus Success'),
  UPDATE_PAYMENTSTATUS_FAIL: type('[List] Do update paymentstatus Fail'),

  //ordered Export all
  ORDERED_EXPORT_ALL: type('[List] Do ordered export'),
  ORDERED_EXPORT_ALL_SUCCESS: type('[List] Do ordered export Success'),
  ORDERED_EXPORT_ALL_FAIL: type('[List] Do ordered export Fail'),

  //backOrderDetail
  BACK_ORDER_DETAIL: type('[List] backOrderDetail export'),
  BACK_ORDER_DETAIL_SUCCESS: type('[List] backOrderDetail Success'),
  BACK_ORDER_DETAIL_FAIL: type('[List] backOrderDetail Fail'),
};



// get order detail action
export class GetOrderDetailAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL;

  constructor(public payload: OrderAddModel) { }
}

export class GetOrderDetailSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderDetailFailAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

// get order detail action
export class GetArchiveOrderDetailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL;

  constructor(public payload: OrderAddModel) { }
}

export class GetArchiveOrderDetailSuccessAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class GetArchiveOrderDetailFailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}
// recent order list action
export class GetRecentOrderlistAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST;

  constructor(public payload: OrderListModel) { }
}

export class GetRecentOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetRecentOrderlistFailAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// all orders list action
export class GetAllOrderlistAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST;

  constructor(public payload: OrderListModel) { }
}

export class GetAllOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetAllOrderlistFailAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// archive orders list action
export class GetArchiveOrderlistAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST;

  constructor(public payload: OrderListModel) { }
}

export class GetArchiveOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetArchiveOrderlistFailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// count for orders list action
export class GetOrderCountAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT;

  constructor(public payload: OrderListModel) { }
}

export class GetOrderCountSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderCountFailAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) { }
}
// get delivery persons list action
export class GetDeliveryPersonsListAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST;

  constructor(public payload: OrderListModel) { }
}

export class GetDeliveryPersonsListSuccessAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetDeliveryPersonsListFailAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// allocate delivery persons action
export class AllocateDeliveryPersonsAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS;

  constructor(public payload: OrderListModel) { }
}

export class AllocateDeliveryPersonsSuccessAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS_SUCCESS;

  constructor(public payload: any) { }
}

export class AllocateDeliveryPersonsFailAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS_FAIL;

  constructor(public payload: any = null) { }
}
// all orders based on status list action
export class GetAllOrderlistBasedOnStatusAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS;

  constructor(public payload: OrderListModel) { }
}

export class GetAllOrderlistBasedOnStatusSuccessAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class GetAllOrderlistBasedOnStatusFailAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL;

  constructor(public payload: any = null) { }
}
// update all orders based on status list action
export class UpdateAllOrderlistBasedOnStatusAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS;

  constructor(public payload: any) { }
}

export class UpdateAllOrderlistBasedOnStatusSuccessAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class UpdateAllOrderlistBasedOnStatusFailAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

export class DecreaseUpdatedOrderCount implements Action {
  type = ActionTypes.DECREASE_UPDATED_ORDER_COUNT;

  constructor(public payload: any = null) { }
}
// order log list action
export class GetOrderLoglistAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST;

  constructor(public payload: any) { }
}

export class GetOrderLoglistSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderLoglistFailAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// order status list action
export class GetOrderStatuslistAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST;

  constructor(public payload: any) { }
}

export class GetOrderStatuslistSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderStatuslistFailAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST_FAIL;

  constructor(public payload: any = null) { }
}
// update order status list action
export class GetOrderStatusUpdateAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE;

  constructor(public payload: any) { }
}

export class GetOrderStatusUpdateSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderStatusUpdateFailAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}
// make archive order action
export class MakeArchiveAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE;

  constructor(public payload: any) { }
}

export class MakeArchiveSuccessAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE_SUCCESS;

  constructor(public payload: any) { }
}

export class MakeArchiveFailAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE_FAIL;

  constructor(public payload: any = null) { }
}
// update shipping information action
export class GetShippingInformationUpdateAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE;

  constructor(public payload: any) { }
}

export class GetShippingInformationUpdateSuccessAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class GetShippingInformationUpdateFailAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}

// export archive order

export class ExportArchiveOrderAction implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER;
  constructor(public payload: any) { }
}

export class ExportArchiveOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportArchiveOrderFail implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER_FAIL;
  constructor(public payload: any = null) { }
}


// export all archive order

export class ExportAllArchiveOrderAction implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER;
  constructor(public payload: any) { }
}

export class ExportAllArchiveOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportAllArchiveOrderFail implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_FAIL;
  constructor(public payload: any = null) { }
}

// archive order list count

export class ArchiveOrderListCountAction implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT;
  constructor(public payload: any) { }
}

export class ArchiveOrderListCountSuccess implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class ArchiveOrderListCountFail implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

// remove order selection

export class RemoveExportSelection implements Action {
  type = ActionTypes.REMOVE_EXPORT_SELECTION;
  constructor(public payload: any) { }
}

// cancel order list actions

export class CancelOrderListAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST;
  constructor(public payload: any) { }
}

export class CancelOrderListSuccessAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class CancelOrderListFailAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_FAIL;
  constructor(public payload: any) { }
}

// cancel order list count

export class CancelOrderListCountAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT;
  constructor(public payload: any) { }
}

export class CancelOrderListCountSuccess implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class CancelOrderListCountFail implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

// export cancel order

export class ExportCancelOrderAction implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER;
  constructor(public payload: any) { }
}

export class ExportCancelOrderSuccess implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportCancelOrderFail implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER_FAIL;
  constructor(public payload: any = null) { }
}

// export All cancel order

export class ExportAllCancelOrderAction implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER;
  constructor(public payload: any) { }
}

export class ExportAllCancelOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportAllCancelOrderFail implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER_FAIL;
  constructor(public payload: any = null) { }
}


// change cancel order status

export class ChangeCancelOrderStatusAction implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS;
  constructor(public payload: any) { }
}

export class ChangeCancelOrderStatusSuccess implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class ChangeCancelOrderStatusFail implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS_FAIL;
  constructor(public payload: any = null) { }
}

// Bulkge cancel order status

export class BulkCancelOrderStatusAction implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS;
  constructor(public payload: any) { }
}

export class BulkCancelOrderStatusSuccess implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) { }
}

export class BulkCancelOrderStatusFail implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS_FAIL;
  constructor(public payload: any = null) { }
}


// get order invoice list

export class OrderInvoiceListAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST;
  constructor(public payload: any) { }
}

export class OrderInvoiceListSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class OrderInvoiceListFailAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_FAIL;
  constructor(public payload: any = null) { }
}

// get order invoice list count

export class OrderInvoiceListCountAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT;
  constructor(public payload: any) { }
}

export class OrderInvoiceListCountSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class OrderInvoiceListCountFailAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

// download invoice from invoice list

export class DownloadInvoiceAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;
  constructor(public payload: any) { }
}

export class DownloadInvoiceSuccessAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;
  constructor(public payload: any) { }
}

export class DownloadInvoiceFailAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;
  constructor(public payload: any = null) { }
}



// settlement list

export class SettlementListAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST;
  constructor(public payload: any) { }
}

export class SettlementListSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class SettlementListFailAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_FAIL;
  constructor(public payload: any = null) { }
}

// settlement list count

export class SettlementListCountAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT;
  constructor(public payload: any) { }
}

export class SettlementListCountSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class SettlementListCountFailAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}


export class ExportSalesReportAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT;
  constructor(public payload: any) { }
}

export class ExportSalesReportSuccessAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_SUCCESS;
  constructor(public payload: any) { }
}

export class ExportSalesReportFailAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_FAIL;
  constructor(public payload: any = null) { }
}

// SEND MAIL

export class SendMailAction implements Action {
  type = ActionTypes.SEND_MAIL;
  constructor(public payload: any) { }
}

export class SendMailActionSuccessAction implements Action {
  type = ActionTypes.SEND_MAIL_SUCCESS;
  constructor(public payload: any) { }
}

export class SendMailActionFailAction implements Action {
  type = ActionTypes.SEND_MAIL_FAIL;
  constructor(public payload: any = null) { }
}


// PRODUCT LIST


export class ProductListAction implements Action {
  type = ActionTypes.PRODUCT_LIST;
  constructor(public payload: any) { }
}

export class ProductListSuccess implements Action {
  type = ActionTypes.PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class ProductListFail implements Action {
  type = ActionTypes.PRODUCT_LIST_FAIL;
  constructor(public payload: any = null) { }
}


// CATEGORY LIST


export class CategoryListAction implements Action {
  type = ActionTypes.CATEGORY_LIST;
  constructor(public payload: any) { }
}

export class CategoryListSuccess implements Action {
  type = ActionTypes.CATEGORY_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class CategoryListFail implements Action {
  type = ActionTypes.CATEGORY_LIST_FAIL;
  constructor(public payload: any = null) { }
}


// SEARCH CATEGORY

export class SearchCategoryList implements Action {
  type = ActionTypes.SEARCH_CATEGORY_LIST;
  constructor(public payload: any) { }
}


// SEARCH PRODUCT LIST

export class SearchProductList implements Action {
  type = ActionTypes.SEARCH_PRODUCT_LIST;
  constructor(public payload: any) { }
}


// CLEAR LIST

export class ClearList implements Action {
  type = ActionTypes.CLEAR_LIST;
  constructor(public payload: any) { }
}

// SELECT PRODUCT LIST

export class SelectProductList implements Action {
  type = ActionTypes.SELECT_PRODUCT_LIST;
  constructor(public payload: any) { }
}


// SELECT CATEGORY LIST

export class SelectCategoryList implements Action {
  type = ActionTypes.SELECT_CATEGORY_LIST;
  constructor(public payload: any) { }
}


// BACK ORDER LIST

export class BackOrderList implements Action {
  type = ActionTypes.BACK_ORDER;
  constructor(public payload: any) { }
}

export class BackOrderListSuccessAction implements Action {
  type = ActionTypes.BACK_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class BackOrderListFailAction implements Action {
  type = ActionTypes.BACK_ORDER_FAIL;
  constructor(public payload: any = null) { }
}



//BACK ORDER LIST COUNT

export class BackOrderListCount implements Action {
  type = ActionTypes.BACK_ORDER_COUNT;
  constructor(public payload: any) { }
}

export class BackOrderListCountSuccessAction implements Action {
  type = ActionTypes.BACK_ORDER_COUNT_SUCCESS;
  constructor(public payload: any) { }
}

export class BackOrderListCountFailAction implements Action {
  type = ActionTypes.BACK_ORDER_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

//FAILED ORDER LIST

export class FailedOrderList implements Action {
  type = ActionTypes.FAILED_ORDER;
  constructor(public payload: any) { }
}

export class FailedOrderListSuccessAction implements Action {
  type = ActionTypes.FAILED_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class FailedOrderListFailAction implements Action {
  type = ActionTypes.FAILED_ORDER_FAIL;
  constructor(public payload: any = null) { }
}

// back orders export list
export class ExportBackOrderList implements Action {
  type = ActionTypes.BACK_ORDER_EXPORT_LIST;

  constructor(public payload: any) { }
}

export class ExportBackOrderListSuccess implements Action {
  type = ActionTypes.BACK_ORDER_EXPORT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class exportBackOrderListFailed implements Action {
  type = ActionTypes.BACK_ORDER_EXPORT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// bulk back orders export list
export class bulkExportBackOrderList implements Action {
  type = ActionTypes.BULK_BACK_ORDER_EXPORT_LIST;

  constructor(public payload: any) { }
}

export class bulkExportBackOrderListSuccess implements Action {
  type = ActionTypes.BULK_BACK_ORDER_EXPORT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class bulkExportBackOrderListFailed implements Action {
  type = ActionTypes.BULK_BACK_ORDER_EXPORT_LIST_FAIL;

  constructor(public payload: any = null) { }
}


// Failed orders export list
export class ExportFailedOrderList implements Action {
  type = ActionTypes.FAILED_ORDER_EXPORT_LIST;

  constructor(public payload: any) { }
}

export class ExportFailedOrderListSuccess implements Action {
  type = ActionTypes.FAILED_ORDER_EXPORT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class exportFailedOrderListFailed implements Action {
  type = ActionTypes.FAILED_ORDER_EXPORT_LIST_FAIL;

  constructor(public payload: any = null) { }
}


// Failed orders count
export class failedOrderCounts implements Action {
  type = ActionTypes.FAILED_ORDER_COUNTS;

  constructor(public payload: any) { }
}

export class failedOrderCountsSuccess implements Action {
  type = ActionTypes.FAILED_ORDER_COUNTS_SUCCESS;

  constructor(public payload: any) { }
}

export class failedOrderCountsFailed implements Action {
  type = ActionTypes.FAILED_ORDER_COUNTS_FAIL;

  constructor(public payload: any = null) { }
}

// bulk Failed orders export list
export class bulkExportFailedOrderList implements Action {
  type = ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST;

  constructor(public payload: OrderAddModel) { }
}

export class bulkExportFailedOrderListSuccess implements Action {
  type = ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class bulkExportFailedOrderListFailed implements Action {
  type = ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// get order list count action
export class VendorOrderListCountAction implements Action {
  type = ActionTypes.VENDOR_ORDER_COUNT;

  constructor(public payload: any) { }
}

export class VendorOrderListCountSuccessAction implements Action {
  type = ActionTypes.VENDOR_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class VendorOrderListCountFailAction implements Action {
  type = ActionTypes.VENDOR_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) { }
}


// get order detail count action
export class VendorOrderDetailAction implements Action {
  type = ActionTypes.VENDOR_ORDER_DETAIL;

  constructor(public payload: any) { }
}

export class VendorOrderDetailSuccessAction implements Action {
  type = ActionTypes.VENDOR_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class VendorOrderDetailFailAction implements Action {
  type = ActionTypes.VENDOR_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

// clear order
export class ClearOrder implements Action {
  type = ActionTypes.CLEAR_ORDER;

  constructor() { }
}

/*AllOrder List count */

export class getAllOrderListcountAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_COUNT;

  constructor(public payload: OrderListModel) { }
}

export class getAllOrderListcountSuccessAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class getAllOrderListcountFailAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

/*Revoke Archieve Order */

export class revokeArchieveOrderAction implements Action {
  type = ActionTypes.REVOKE_ARCHIEVE_ORDER;

  constructor(public payload: any) { }
}

export class revokeArchieveOrderSuccessAction implements Action {
  type = ActionTypes.REVOKE_ARCHIEVE_ORDER_SUCCESS;

  constructor(public payload: any) { }
}

export class revokeArchieveOrderFailAction implements Action {
  type = ActionTypes.REVOKE_ARCHIEVE_ORDER_FAIL;

  constructor(public payload: any = null) { }
}

/*Archieve Order detail */

export class ArchieveOrderDetailAction implements Action {
  type = ActionTypes.ARCHIEVE_ORDER_DETAIL;

  constructor(public payload: any) { }
}

export class ArchieveOrderDetailSuccessAction implements Action {
  type = ActionTypes.ARCHIEVE_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class ArchieveOrderDetailFailAction implements Action {
  type = ActionTypes.ARCHIEVE_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

//SALES REPORT CATEGORY LIST


export class SalesReportCategoryListAction implements Action {
  type = ActionTypes.SALES_REPORTCATEGORY_LIST;
  constructor(public payload: any) { }
}

export class SalesReportCategoryListSuccess implements Action {
  type = ActionTypes.SALES_REPORTCATEGORY_LIST_SUCCESS;
  constructor(public payload: any) { }
}

export class SalesReportCategoryListFail implements Action {
  type = ActionTypes.SALES_REPORTCATEGORY_LIST_FAIL;
  constructor(public payload: any = null) { }
}


// OrderInvoice Export action
export class OrderInvoiceExportAction implements Action {
  type = ActionTypes.EXPORT_ORDER_INVOICE;

  constructor(public payload: any) { }
}

export class OrderInvoiceExportSuccessAction implements Action {
  type = ActionTypes.EXPORT_ORDER_INVOICE_SUCCESS;

  constructor(public payload: any) { }
}

export class OrderInvoiceExportFailAction implements Action {
  type = ActionTypes.EXPORT_ORDER_INVOICE_FAIL;

  constructor(public payload: any = null) { }
}

// OrderInvoice All Export action
export class OrderInvoiceAllExportAction implements Action {
  type = ActionTypes.ALL_EXPORT_ORDER_INVOICE;

  constructor(public payload: any) { }
}

export class OrderInvoiceAllExportSuccessAction implements Action {
  type = ActionTypes.ALL_EXPORT_ORDER_INVOICE_SUCCESS;

  constructor(public payload: any) { }
}

export class OrderInvoiceAllExportFailAction implements Action {
  type = ActionTypes.ALL_EXPORT_ORDER_INVOICE_FAIL;

  constructor(public payload: any = null) { }
}

// update payment status
export class UpdatePaymentStatusAction implements Action {
  type = ActionTypes.UPDATE_PAYMENTSTATUS;

  constructor(public payload: any) { }
}

export class UpdatePaymentStatusSuccessAction implements Action {
  type = ActionTypes.UPDATE_PAYMENTSTATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class UpdatePaymentStatusFailAction implements Action {
  type = ActionTypes.UPDATE_PAYMENTSTATUS_FAIL;

  constructor(public payload: any = null) { }
}




//ordered Export all
export class OrderedExportAllAction implements Action {
  type = ActionTypes.ORDERED_EXPORT_ALL;

  constructor(public payload: any) { }
}

export class OrderedExportAllSuccessAction implements Action {
  type = ActionTypes.ORDERED_EXPORT_ALL_SUCCESS;

  constructor(public payload: any) { }
}

export class OrderedExportAllFailAction implements Action {
  type = ActionTypes.ORDERED_EXPORT_ALL_FAIL;

  constructor(public payload: any = null) { }
}


//backOrderDetail
export class backOrderDetailAction implements Action {
  type = ActionTypes.BACK_ORDER_DETAIL;

  constructor(public payload: any) { }
}

export class backOrderDetailSuccessAction implements Action {
  type = ActionTypes.BACK_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class backOrderDetailFailAction implements Action {
  type = ActionTypes.BACK_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}


//fullFillNow
export class fullFillNowAction implements Action {
  type = ActionTypes.FULL_FILL_NOW;

  constructor(public payload: any) { }
}

export class fullFillNowSuccessAction implements Action {
  type = ActionTypes.FULL_FILL_NOW_SUCCESS;

  constructor(public payload: any) { }
}

export class fullFillNowFailAction implements Action {
  type = ActionTypes.FULL_FILL_NOW_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions =
  | GetRecentOrderlistAction
  | GetRecentOrderlistSuccessAction
  | GetRecentOrderlistFailAction
  | GetAllOrderlistAction
  | GetAllOrderlistSuccessAction
  | GetAllOrderlistFailAction
  | GetArchiveOrderlistAction
  | GetArchiveOrderlistSuccessAction
  | GetArchiveOrderlistFailAction
  | GetOrderCountAction
  | GetOrderCountSuccessAction
  | GetOrderCountFailAction
  | GetDeliveryPersonsListAction
  | GetDeliveryPersonsListSuccessAction
  | GetDeliveryPersonsListFailAction
  | AllocateDeliveryPersonsAction
  | AllocateDeliveryPersonsSuccessAction
  | AllocateDeliveryPersonsFailAction
  | GetAllOrderlistBasedOnStatusAction
  | GetAllOrderlistBasedOnStatusSuccessAction
  | GetAllOrderlistBasedOnStatusFailAction
  | UpdateAllOrderlistBasedOnStatusAction
  | UpdateAllOrderlistBasedOnStatusSuccessAction
  | UpdateAllOrderlistBasedOnStatusFailAction
  | GetOrderLoglistAction
  | GetOrderLoglistSuccessAction
  | GetOrderLoglistFailAction
  | GetOrderDetailAction
  | GetOrderDetailSuccessAction
  | GetOrderDetailFailAction
  | GetArchiveOrderDetailAction
  | GetArchiveOrderDetailSuccessAction
  | GetArchiveOrderDetailFailAction
  | GetOrderStatuslistAction
  | GetOrderStatuslistSuccessAction
  | GetOrderStatuslistFailAction
  | GetOrderStatusUpdateAction
  | GetOrderStatusUpdateSuccessAction
  | GetOrderStatusUpdateFailAction
  | MakeArchiveAction
  | MakeArchiveSuccessAction
  | MakeArchiveFailAction
  | ExportAllArchiveOrderAction
  | ExportAllArchiveOrderSuccess
  | ExportAllArchiveOrderFail
  | ArchiveOrderListCountAction
  | ArchiveOrderListCountSuccess
  | ArchiveOrderListCountFail
  | ProductListAction
  | ProductListSuccess
  | ProductListFail
  | CategoryListAction
  | CategoryListSuccess
  | CategoryListFail
  | SearchProductList
  | ClearList
  | SelectProductList
  | SelectProductList
  | getAllOrderListcountAction
  | getAllOrderListcountSuccessAction
  | getAllOrderListcountFailAction
  | failedOrderCounts
  | failedOrderCountsFailed
  | failedOrderCountsSuccess
  | FailedOrderList
  | FailedOrderListFailAction
  | FailedOrderListSuccessAction
  | OrderInvoiceExportAction
  | OrderInvoiceExportSuccessAction
  | OrderInvoiceExportFailAction
  | OrderInvoiceAllExportAction
  | OrderInvoiceAllExportSuccessAction
  | OrderInvoiceAllExportFailAction
  | UpdatePaymentStatusAction
  | UpdatePaymentStatusSuccessAction
  | UpdatePaymentStatusFailAction
  | OrderedExportAllAction
  | OrderedExportAllSuccessAction
  | OrderedExportAllFailAction
  | backOrderDetailAction
  | backOrderDetailSuccessAction
  | backOrderDetailFailAction
  | fullFillNowAction
  | fullFillNowSuccessAction
  | fullFillNowFailAction;


