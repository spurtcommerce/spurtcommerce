

import { Map, Record } from 'immutable';
import { OrderAddResponseModel } from '../order-model/order-add-response.model';
import { DetailResponseModel } from '../order-model/detail-response.model';
import { orderStatusListLoading } from './order.reducer';

export interface OrderState extends Map<string, any> {

  orderAdded: any;
  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  orderBulkDelete: any;


  recentListLoading: boolean;
  recentListLoaded: boolean;
  recentListFailed: boolean;
  todayRecentOrderList: Array<any>;
  prevRecentOrderList: Array<any>;
  recentOrder: any;

  allListLoading: boolean;
  allListLoaded: boolean;
  allListFailed: boolean;
  allOrderList: any;

  archiveListLoading: boolean;
  archiveListLoaded: boolean;
  archiveListFailed: boolean;
  archiveOrderList: Array<any>;

  deliveryPersonsListLoading: boolean;
  deliveryPersonsListLoaded: boolean;
  deliveryPersonsListFailed: boolean;
  deliveryPersonsList: Array<any>;

  allocateDeliveryPersonsLoading: boolean;
  allocateDeliveryPersonsLoaded: boolean;
  allocateDeliveryPersonsFailed: boolean;
  allocateDeliveryPersons: Array<any>;
  allOrdersBasedOnStatusListLoading: boolean;
  allOrdersBasedOnStatusListLoaded: boolean;
  allOrdersBasedOnStatusListFailed: boolean;
  allOrdersBasedOnStatusList: Array<any>;


  updateAllOrdersBasedOnStatusListLoading: boolean;
  updateAllOrdersBasedOnStatusListLoaded: boolean;
  updateAllOrdersBasedOnStatusListFailed: boolean;
  updateAllOrdersBasedOnStatusList: any;

  logListLoading: boolean;
  logListLoaded: boolean;
  logListFailed: boolean;
  orderLogList: Array<any>;

  updateOrderStatusLoading: boolean;
  updateOrderStatusLoaded: boolean;
  updateOrderStatusFailed: boolean;
  updateOrderStatus: Array<any>;

  makeArchiveLoading: boolean;
  makeArchiveLoaded: boolean;
  makeArchiveFailed: boolean;
  makeArchive: Array<any>;

  updateShippingInformationLoading: boolean;
  updateShippingInformationLoaded: boolean;
  updateShippingInformationFailed: boolean;
  updateShippingInformation: Array<any>;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;
  orderDetail: any;

  archiveDetailLoading: boolean;
  archiveDetailLoaded: boolean;
  archiveDetailFailed: boolean;
  archiveOrderDetail: any;

  orderCountLoading: boolean;
  orderCountLoaded: boolean;
  orderCountFailed: boolean;
  orderCount: any;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;
  categoryListLoading: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;

  orderStatusListLoading: boolean;
  orderStatusList: Array<any>;


  exportArchiveOrderLoading: boolean;
  exportArchiveOrderLoaded: boolean;
  exportArchiveOrderFailed: boolean;

  exportAllArchiveOrderLoading: boolean;
  exportAllArchiveOrderLoaded: boolean;
  exportAllArchiveOrderFailed: boolean;

  archiveOrderListCount: boolean;
  archiveOrderListCountLoading: boolean;
  archiveOrderListCountLoaded: boolean;

  cancelOrderListCount: any;
  cancelOrderListCountLoading: boolean;
  cancelOrderListCountLoaded: boolean;

  cancelOrderList: any;
  cancelOrderListLoading: boolean;
  cancelOrderListLoaded: boolean;

  exportCancelOrder: any;
  exportCancelOrderLoading: boolean;
  exportCancelOrderLoaded: boolean;

  exportAllCancelOrder: any;
  exportAllCancelOrderLoading: boolean;
  exportAllCancelOrderLoaded: boolean;

  cancelOrderStatus: any;
  cancelOrderStatusLoading: boolean;
  cancelOrderStatusLoaded: boolean;

  bulkCancelOrderStatus: any;
  bulkCancelOrderStatusLoading: boolean;
  bulkCancelOrderStatusLoaded: boolean;

  cancelRequest: any;

  orderInvoiceListLoading: boolean;
  orderInvoiceListLoaded: boolean;
  orderInvoiceListFailed: boolean;
  orderInvoiceList: any;

  orderInvoiceListCountLoading: boolean;
  orderInvoiceListCountLoaded: boolean;
  orderInvoiceListCountFailed: boolean;
  orderInvoiceListCount: any;

  downloadInvoice: number;
  downloadInvoiceLoading: boolean;
  downloadInvoiceLoaded: boolean;
  downloadInvoiceFailed: boolean;

  failedOrderList: number;
  failedOrderListLoading: boolean;
  failedOrderListLoaded: boolean;
  failedOrderListFailed: boolean;

  
  failedOrderCounts: any;
 failedOrderCountsLoading: boolean;
 failedOrderCountsLoaded: boolean;
 failedOrderCountsFailed: boolean;

  backOrderList: number;
  backOrderListLoading: boolean;
  backOrderListLoaded: boolean;
  backOrderListFailed: boolean;


  backOrderListCount: number;
  backOrderListCountLoading: boolean;
  backOrderListCountLoaded: boolean;
  backOrderListCountFailed: boolean;


  exportBackOrderList: number;
  exportBackOrderListLoading: boolean;
  exportBackOrderListLoaded: boolean;
  exportBackOrderListFailed: boolean;

  bulkExportBackOrderList: number;
  bulkExportBackOrderListLoading: boolean;
  bulkExportBackOrderListLoaded: boolean;
  bulkExportBackOrderListFailed: boolean;

  exportFailedOrderList: number;
  exportFailedOrderListLoading: boolean;
  exportFailedOrderListLoaded: boolean;
  exportFailedOrderListFailed: boolean;

  bulkExportFailedOrderList: number;
  bulkExportFailedOrderListLoading: boolean;
  bulkExportFailedOrderListLoaded: boolean;
  bulkExportFailedOrderListFailed: boolean;


  vendorOrderCount: number;
  vendorOrderCountLoading: boolean;
  vendorOrderCountLoaded: boolean;
  vendorOrderCountFailed: boolean;





  settlementList: any;
  settlementListLoading: boolean;
  settlementListLoaded: boolean;
  settlementListFailed: boolean;

  settlementListCount: any;
  settlementCountLoading: boolean;
  settlementCountLoaded: boolean;
  settlementCountFailed: boolean;


  exportSalesOrderLoading: boolean;
  exportSalesOrderLoaded: boolean;
  exportSalesOrderFailed: boolean;

  sendMailLoading: boolean;
  sendMailLoaded: boolean;
  sendMailFailed: boolean;




  productList: any;
  originalProductList: any;
  selectedProductList: any;
  productListLoading: boolean;
  productListLoaded: boolean;
  productListFailed: boolean;

  categoryLists: any;
  originalCategoryList: any;
  categoryListsLoading: boolean;
  categoryListLoaded: boolean;
  categoryListFailed: boolean;

  productRefresh: boolean;


  vendorOrderDetail: any;
  vendorOrderDetailLoading: object;
  vendorOrderDetailLoaded: boolean;
  vendorOrderDetailFailed: boolean;

  vendorDetailDragArray: any;

  orderSearch: boolean

  getAllOrderListcount: boolean;
  getAllOrderListcountLoading: boolean;
  getAllOrderListcountLoaded: boolean;

  revokeArchieveOrder: any;
  revokeArchieveOrderLoading: object;
  revokeArchieveOrderLoaded: boolean;
  revokeArchieveOrderFailed: boolean;

  archieveOrderDetail: any;
  archieveOrderDetailLoading: object;
  archieveOrderDetailLoaded: boolean;
  archieveOrderDetailFailed: boolean;

  salesReportCategorysList: any;
  salesReportCategorysLoading: boolean;
  salesReportCategoryListLoaded: boolean;
  salesReportCategoryListFailed: boolean;



  exportOrderInvoice: any;
  exportOrderInvoiceLoading: boolean;
  exportOrderInvoiceLoaded: boolean;
  exportOrderInvoiceFailed: boolean;

  AllExportOrderInvoice: any;
  AllExportOrderInvoiceLoading: boolean;
  AllExportOrderInvoiceLoaded: boolean;
  AllExportOrderInvoiceFailed: boolean;

  updatePaymentStatus: any;
  updatePaymentStatusLoading: boolean;
  updatePaymentStatusLoaded: boolean;
  updatePaymentStatusFailed: boolean;


  OrderedExportAll: any;
  OrderedExportAllLoading: boolean;
  OrderedExportAllLoaded: boolean;
  OrderedExportAllFailed: boolean;

  backOrderDetail: any;
  backOrderDetailLoading: boolean;
  backOrderDetailLoaded: boolean;
  backOrderDetailFailed: boolean;

  fullFillNow: any;
  fullFillNowLoading: boolean;
  fullFillNowLoaded: boolean;
  fullFillNowFailed: boolean;
}

export const OrderStateRecord = Record({

  orderAdded: {},

  recentListLoading: false,
  recentListLoaded: false,
  recentListFailed: false,
  todayRecentOrderList: [],
  prevRecentOrderList: [],
  recentOrder: {},

  allListLoading: false,
  allListLoaded: false,
  allListFailed: false,
  allOrderList: [], 

  archiveListLoading: false,
  archiveListLoaded: false,
  archiveListFailed: false,
  archiveOrderList: [],

  deliveryPersonsListLoading: false,
  deliveryPersonsListLoaded: false,
  deliveryPersonsListFailed: false,
  deliveryPersonsOrderList: [],
  allocateDeliveryPersonsLoading: false,
  allocateDeliveryPersonsLoaded: false,
  allocateDeliveryPersonsFailed: false,
  allocateDeliveryPersons: {},
  allOrdersBasedOnStatusListLoading: false,
  allOrdersBasedOnStatusListLoaded: false,
  allOrdersBasedOnStatusListFailed: false,
  allOrdersBasedOnStatusList: [],

  updateAllOrdersBasedOnStatusListLoading: false,
  updateAllOrdersBasedOnStatusListLoaded: false,
  updateAllOrdersBasedOnStatusListFailed: false,
  updateAllOrdersBasedOnStatusList: {},

  logListLoading: false,
  logListLoaded: false,
  logListFailed: false,
  orderLogList: [],

  updateOrderStatusLoading: false,
  updateOrderStatusLoaded: false,
  updateOrderStatusFailed: false,
  updateOrderStatus: [],


  makeArchiveLoading: false,
  makeArchiveLoaded: false,
  makeArchiveFailed: false,
  makeArchive: [],

  updateShippingInformationLoading: false,
  updateShippingInformationLoaded: false,
  updateShippingInformationFailed: false,
  updateShippingInformation: [],

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,
  orderDetail: {},

  archiveDetailLoading: false,
  archiveDetailLoaded: false,
  archiveDetailFailed: false,
  archiveOrderDetail: {},

  orderCountLoading: false,
  orderCountLoaded: false,
  orderCountFailed: false,
  orderCount: {},

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  tempCategoryList: [],

  orderStatusListLoading: false,
  orderStatusList: [],

  exportArchiveOrderLoading: false,
  exportArchiveOrderLoaded: false,
  exportArchiveOrderFailed: false,

  exportAllArchiveOrderLoading: false,
  exportAllArchiveOrderLoaded: false,
  exportAllArchiveOrderFailed: false,

  archiveOrderListCount: '',
  archiveOrderListCountLoading: false,
  archiveOrderListCountLoaded: false,

  cancelOrderListCount: '',
  cancelOrderListCountLoading: false,
  cancelOrderListCountLoaded: false,

  cancelOrderList: [],
  cancelOrderListLoading: false,
  cancelOrderListLoaded: false,

  exportCancelOrder: {},
  exportCancelOrderLoading: false,
  exportCancelOrderLoaded: false,

  exportAllCancelOrder: {},
  exportAllCancelOrderLoading: false,
  exportAllCancelOrderLoaded: false,

  cancelOrderStatus: {},
  cancelOrderStatusLoading: false,
  cancelOrderStatusLoaded: false,

  bulkCancelOrderStatus: {},
  bulkCancelOrderStatusLoading: false,
  bulkCancelOrderStatusLoaded: false,



  cancelRequest: {},

  orderInvoiceListLoading: false,
  orderInvoiceListLoaded: false,
  orderInvoiceListFailed: false,
  orderInvoiceList: [],

  orderInvoiceListCountLoading: false,
  orderInvoiceListCountLoaded: false,
  orderInvoiceListCountFailed: false,
  orderInvoiceListCount: '',

  downloadInvoice: {},
  downloadInvoiceLoading: false,
  downloadInvoiceLoaded: false,
  downloadInvoiceFailed: false,

  backOrderList: {},
  backOrderListLoading: false,
  backOrderListLoaded: false,
  backOrderListFailed: false,

  backOrderListCount: {},
  backOrderListCountLoading: false,
  backOrderListCountLoaded: false,
  backOrderListCountFailed: false,

  exportBackOrderList: {},
  exportBackOrderListLoading: false,
  exportBackOrderListLoaded: false,
  exportBackOrderListFailed: false,

  bulkExportBackOrderList: {},
  bulkExportBackOrderListLoading: false,
  bulkExportBackOrderListLoaded: false,
  bulkExportBackOrderListFailed: false,

  exportFailedOrderList: {},
  exportFailedOrderListLoading: false,
  exportFailedOrderListLoaded: false,
  exportFailedOrderListFailed: false,

  bulkExportFailedOrderList: {},
  bulkExportFailedOrderListLoading: false,
  bulkExportFailedOrderListLoaded: false,
  bulkExportFailedOrderListFailed: false,

  failedOrderList: {},
  failedOrderListLoading: false,
  failedOrderListLoaded: false,
  failedOrderListFailed: false,



  
  failedOrderCounts: {},
  failedOrderCountsLoading: false,
  failedOrderCountsLoaded: false,
  failedOrderCountsFailed: false,




  settlementList: [],
  settlementListLoading: false,
  settlementListLoaded: false,
  settlementListFailed: false,

  settlementListCount: '',
  settlementCountLoading: false,
  settlementCountLoaded: false,
  settlementCountFailed: false,

  exportSalesOrderLoading: false,
  exportSalesOrderLoaded: false,
  exportSalesOrderFailed: false,

  sendMailLoading: false,
  sendMailLoaded: false,
  sendMailFailed: false,



  productList: [],
  originalProductList: [],
  selectedProductList: [],
  productListLoading: false,
  productListLoaded: false,
  productListFailed: false,

  categoryList: [],
  originalCategoryList: [],
  categoryListLoading: false,
  categoryListLoaded: false,
  categoryListFailed: false,

  vendorOrderCount: {},
  vendorOrderCountLoading: false,
  vendorOrderCountLoaded: false,
  vendorOrderCountFailed: false,


  vendorOrderDetail: {},
  vendorOrderDetailLoading: {},
  vendorOrderDetailLoaded: false,
  vendorOrderDetailFailed: false,

  productRefresh: false,
  vendorDetailDragArray: [],

  orderSearch: false,

  getAllOrderListcount: '',
  getAllOrderListcountLoading: false,
  getAllOrderListcountLoaded: false,

  revokeArchieveOrder: {},
  revokeArchieveOrderLoading: {},
  revokeArchieveOrderLoaded: false,
  revokeArchieveOrderFailed: false,

  archieveOrderDetail: {},
  archieveOrderDetailLoading: {},
  archieveOrderDetailLoaded: false,
  archieveOrderDetailFailed: false,

  
  salesReportCategorysList: {},
  salesReportCategorysLoading: false,
  salesReportCategoryListLoaded: false,
  salesReportCategoryListFailed: false,



  exportOrderInvoice: '',
  exportOrderInvoiceLoading: false,
  exportOrderInvoiceLoaded: false,
  exportOrderInvoiceFailed: false,

  AllExportOrderInvoice: '',
  AllExportOrderInvoiceLoading: false,
  AllExportOrderInvoiceLoaded: false,
  AllExportOrderInvoiceFailed: false,

  updatePaymentStatus: '',
  updatePaymentStatusLoading: false,
  updatePaymentStatusLoaded: false,
  updatePaymentStatusFailed: false,

  OrderedExportAll: '',
  OrderedExportAllLoading: false,
  OrderedExportAllLoaded: false,
  OrderedExportAllFailed: false,

  backOrderDetail: {},
  backOrderDetailLoading: false,
  backOrderDetailLoaded: false,
  backOrderDetailFailed: false,

  fullFillNow: {},
  fullFillNowLoading: false,
  fullFillNowLoaded: false,
  fullFillNowFailed: false
});
