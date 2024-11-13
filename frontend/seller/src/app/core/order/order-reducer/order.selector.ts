

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromOrder from './order.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.order;

export const RecentOrderListLoading = createSelector(
  getProdState,
  fromOrder.getRecentOrderListLoading
);
export const RecentOrderListLoaded = createSelector(
  getProdState,
  fromOrder.getRecentOrderListLoaded
);
export const RecentOrderListFailed = createSelector(
  getProdState,
  fromOrder.getRecentOrderListFailed
);

export const orderStatusList = createSelector(
  getProdState,
  fromOrder.orderStatusList
);
export const orderStatusListLoading = createSelector(
  getProdState,
  fromOrder.orderStatusListLoading
);

export const todayRecentOrderList = createSelector(
  getProdState,
  fromOrder.todayRecentOrderList
);
export const recentOrderList = createSelector(
  getProdState,
  fromOrder.recentOrderList
);
export const prevRecentOrderList = createSelector(
  getProdState,
  fromOrder.prevRecentOrderList
);

export const AllOrderListLoading = createSelector(
  getProdState,
  fromOrder.getAllOrderListLoading
);
export const AllOrderListLoaded = createSelector(
  getProdState,
  fromOrder.getAllOrderListLoaded
);
export const AllOrderListFailed = createSelector(
  getProdState,
  fromOrder.getAllOrderListFailed
);
export const AllOrderList = createSelector(
  getProdState,
  fromOrder.getAllOrderList
);
export const ArchiveOrderListLoading = createSelector(
  getProdState,
  fromOrder.getArchiveOrderListLoading
);
export const ArchiveOrderListLoaded = createSelector(
  getProdState,
  fromOrder.getArchiveOrderListLoaded
);
export const ArchiveOrderListFailed = createSelector(
  getProdState,
  fromOrder.getArchiveOrderListFailed
);
export const ArchiveOrderList = createSelector(
  getProdState,
  fromOrder.getArchiveOrderList
);
export const DeliveryPersonsListLoading = createSelector(
  getProdState,
  fromOrder.getDeliveryPersonsListLoading
);
export const DeliveryPersonsListLoaded = createSelector(
  getProdState,
  fromOrder.getDeliveryPersonsListLoaded
);
export const DeliveryPersonsListFailed = createSelector(
  getProdState,
  fromOrder.getDeliveryPersonsListFailed
);
export const DeliveryPersonsList = createSelector(
  getProdState,
  fromOrder.getDeliveryPersonsList
);
export const AllocateDeliveryPersonsLoading = createSelector(
  getProdState,
  fromOrder.allocateDeliveryPersonsLoading
);
export const AllocateDeliveryPersonsLoaded = createSelector(
  getProdState,
  fromOrder.allocateDeliveryPersonsLoaded
);
export const AllocateDeliveryPersonsFailed = createSelector(
  getProdState,
  fromOrder.allocateDeliveryPersonsFailed
);
export const AllocateDeliveryPersonsList = createSelector(
  getProdState,
  fromOrder.allocateDeliveryPersons
);
export const AllOrderListBasedOnStatusLoading = createSelector(
  getProdState,
  fromOrder.getAllOrderListBasedOnStatusLoading
);
export const AllOrderListBasedOnStatusLoaded = createSelector(
  getProdState,
  fromOrder.getAllOrderListBasedOnStatusLoaded
);
export const AllOrderListBasedOnStatusFailed = createSelector(
  getProdState,
  fromOrder.getAllOrderListBasedOnStatusFailed
);
export const AllOrderListBasedOnStatus = createSelector(
  getProdState,
  fromOrder.getAllOrderListBasedOnStatus
);
export const UpdateAllOrderListBasedOnStatusLoading = createSelector(
  getProdState,
  fromOrder.updateAllOrderListBasedOnStatusLoading
);
export const UpdateAllOrderListBasedOnStatusLoaded = createSelector(
  getProdState,
  fromOrder.updateAllOrderListBasedOnStatusLoaded
);
export const UpdateAllOrderListBasedOnStatusFailed = createSelector(
  getProdState,
  fromOrder.updateAllOrderListBasedOnStatusFailed
);
export const UpdateAllOrderListBasedOnStatus = createSelector(
  getProdState,
  fromOrder.updateAllOrderListBasedOnStatus
);
export const OrderLogListLoading = createSelector(
  getProdState,
  fromOrder.getOrderLogListLoading
);
export const OrderLogListLoaded = createSelector(
  getProdState,
  fromOrder.getOrderLogListLoaded
);
export const OrderLogListFailed = createSelector(
  getProdState,
  fromOrder.getOrderLogListFailed
);
export const OrderLogList = createSelector(
  getProdState,
  fromOrder.getOrderLogList
);
export const OrderStatusUpdateLoading = createSelector(
  getProdState,
  fromOrder.getUpdateOrderStatusLoading
);
export const OrderStatusUpdateLoaded = createSelector(
  getProdState,
  fromOrder.getUpdateOrderStatusLoaded
);
export const OrderStatusUpdateFailed = createSelector(
  getProdState,
  fromOrder.getUpdateOrderStatusFailed
);
export const OrderStatusUpdate = createSelector(
  getProdState,
  fromOrder.getUpdateOrderStatus
);
export const MakeArchiveLoading = createSelector(
  getProdState,
  fromOrder.makeArchiveLoading
);
export const MakeArchiveLoaded = createSelector(
  getProdState,
  fromOrder.makeArchiveLoaded
);
export const MakeArchiveFailed = createSelector(
  getProdState,
  fromOrder.makeArchiveFailed
);
export const MakeArchive = createSelector(
  getProdState,
  fromOrder.makeArchive
);
export const ShippingInformationUpdateLoading = createSelector(
  getProdState,
  fromOrder.getUpdateShippingInformationLoading
);
export const ShippingInformationUpdateLoaded = createSelector(
  getProdState,
  fromOrder.getUpdateShippingInformationLoaded
);
export const ShippingInformationUpdateFailed = createSelector(
  getProdState,
  fromOrder.getUpdateShippingInformationFailed
);
export const ShippingInformationUpdate = createSelector(
  getProdState,
  fromOrder.getUpdateShippingInformation
);
export const OrderDetailLoading = createSelector(
  getProdState,
  fromOrder.getOrderDetailLoading
);
export const OrderDetailLoaded = createSelector(
  getProdState,
  fromOrder.getOrderDetailLoaded
);
export const OrderDetailFailed = createSelector(
  getProdState,
  fromOrder.getOrderDetailFailed
);
export const OrderDetail = createSelector(
  getProdState,
  fromOrder.getOrderDetail
);
export const ArchiveOrderDetailLoading = createSelector(
  getProdState,
  fromOrder.getArchiveOrderDetailLoading
);
export const ArchiveOrderDetailLoaded = createSelector(
  getProdState,
  fromOrder.getArchiveOrderDetailLoaded
);
export const ArchiveOrderDetailFailed = createSelector(
  getProdState,
  fromOrder.getArchiveOrderDetailFailed
);
export const ArchiveOrderDetail = createSelector(
  getProdState,
  fromOrder.getArchiveOrderDetail
);
export const OrderCountLoading = createSelector(
  getProdState,
  fromOrder.getOrderCountLoading
);
export const OrderCountLoaded = createSelector(
  getProdState,
  fromOrder.getOrderCountLoaded
);
export const OrderCountFailed = createSelector(
  getProdState,
  fromOrder.getOrderCountFailed
);
export const OrderCount = createSelector(
  getProdState,
  fromOrder.getOrderCount
);
export const exportArchiveOrderLoading = createSelector(
  getProdState,
  fromOrder.exportArchiveOrderLoading
);
export const exportArchiveOrderLoaded = createSelector(
  getProdState,
  fromOrder.exportArchiveOrderLoaded
);
export const exportAllArchiveOrderLoading = createSelector(
  getProdState,
  fromOrder.exportAllArchiveOrderLoading
);

export const archiveOrderListCount = createSelector(
  getProdState,
  fromOrder.archiveOrderListCount
);
export const archiveOrderListCountLoading = createSelector(
  getProdState,
  fromOrder.archiveOrderListCountLoading
);
export const archiveOrderListCountLoaded = createSelector(
  getProdState,
  fromOrder.archiveOrderListCountLoaded
);

export const cancelOrderList = createSelector(
  getProdState,
  fromOrder.cancelOrderList
);
export const cancelOrderListLoading = createSelector(
  getProdState,
  fromOrder.cancelOrderListLoading
);
export const cancelOrderListLoaded = createSelector(
  getProdState,
  fromOrder.cancelOrderListLoaded
);

export const cancelOrderListCount = createSelector(
  getProdState,
  fromOrder.cancelOrderListCount
);
export const cancelOrderListCountLoading = createSelector(
  getProdState,
  fromOrder.cancelOrderListCountLoading
);
export const cancelOrderListCountLoaded = createSelector(
  getProdState,
  fromOrder.cancelOrderListCountLoaded
);

export const exportCancelOrderLoading = createSelector(
  getProdState,
  fromOrder.exportCancelOrderLoading
);
export const exportCancelOrderLoaded = createSelector(
  getProdState,
  fromOrder.exportCancelOrderLoaded
);


export const exportAllCancelOrderLoading = createSelector(
  getProdState,
  fromOrder.exportAllCancelOrderLoading
);
export const exportAllCancelOrderLoaded = createSelector(
  getProdState,
  fromOrder.exportAllCancelOrderLoaded
);

export const cancelOrderStatusLoading = createSelector(
  getProdState,
  fromOrder.cancelOrderStatusLoading
);
export const cancelOrderStatusLoaded = createSelector(
  getProdState,
  fromOrder.cancelOrderStatusLoaded
);

export const bulkCancelOrderStatusLoading = createSelector(
  getProdState,
  fromOrder.bulkCancelOrderStatusLoading
);
export const bulkCancelOrderStatusLoaded = createSelector(
  getProdState,
  fromOrder.bulkCancelOrderStatusLoaded
);


export const orderInvoiceList = createSelector(
  getProdState,
  fromOrder.orderInvoiceList
);
export const orderInvoiceListLoading = createSelector(
  getProdState,
  fromOrder.orderInvoiceListLoading
);
export const orderInvoiceListLoaded = createSelector(
  getProdState,
  fromOrder.orderInvoiceListLoaded
);
export const orderInvoiceListCount = createSelector(
  getProdState,
  fromOrder.orderInvoiceListCount
);

export const downloadInvoice = createSelector(
  getProdState,
  fromOrder.downloadInvoice
);
export const downloadInvoiceLoaded = createSelector(
  getProdState,
  fromOrder.downloadInvoiceLoaded
);
export const downloadInvoiceLoading = createSelector(
  getProdState,
  fromOrder.downloadInvoiceLoading
);
export const downloadInvoiceFailed = createSelector(
  getProdState,
  fromOrder.downloadInvoiceFailed
);



export const settlementList = createSelector(
  getProdState,
  fromOrder.settlementList
);
export const settlementListLoading = createSelector(
  getProdState,
  fromOrder.settlementListLoading
);
export const settlementListLoaded = createSelector(
  getProdState,
  fromOrder.settlementListLoaded
);
export const settlementListCount = createSelector(
  getProdState,
  fromOrder.settlementListCount
);

export const exportSalesOrderLoaded = createSelector(
  getProdState,
  fromOrder.exportSalesOrderLoaded
);
export const exportSalesOrderLoading = createSelector(
  getProdState,
  fromOrder.exportSalesOrderLoading
);

export const sendMailLoading = createSelector(
  getProdState,
  fromOrder.sendMailLoading
);
export const sendMailLoaded = createSelector(
  getProdState,
  fromOrder.sendMailLoaded
);


export const productList = createSelector(
  getProdState,
  fromOrder.productList
);
export const selectedProductList = createSelector(
  getProdState,
  fromOrder.selectedProductList
);
export const productListLoading = createSelector(
  getProdState,
  fromOrder.productListLoading
);
export const productListLoaded = createSelector(
  getProdState,
  fromOrder.productListLoaded
);


export const categoryLists = createSelector(
  getProdState,
  fromOrder.categoryLists
);
export const categoryListsLoading = createSelector(
  getProdState,
  fromOrder.categoryListsLoading
);
export const categoryListLoaded = createSelector(
  getProdState,
  fromOrder.categoryListLoaded
);

export const failedOrderList = createSelector(
  getProdState,
  fromOrder.failedOrderList
);
export const failedOrderListsLoading = createSelector(
  getProdState,
  fromOrder.failedOrderListLoading
);
export const failedOrderListLoaded = createSelector(
  getProdState,
  fromOrder.failedOrderListLoaded
);


export const failedOrderCounts = createSelector(
  getProdState,
  fromOrder.failedOrderCounts
);
export const failedOrderCountsLoading = createSelector(
  getProdState,
  fromOrder.failedOrderCountsLoading
);
export const failedOrderCountsLoaded = createSelector(
  getProdState,
  fromOrder.failedOrderCountsLoaded
);

export const backOrderList = createSelector(
  getProdState,
  fromOrder.backOrderList
);
export const backOrderListLoading = createSelector(
  getProdState,
  fromOrder.backOrderListLoading
);
export const backOrderListLoaded = createSelector(
  getProdState,
  fromOrder.backOrderListoaded
);

export const backOrderListCount = createSelector(
  getProdState,
  fromOrder.backOrderListCount
);
export const backOrderListCountLoading = createSelector(
  getProdState,
  fromOrder.backOrderListCountLoading
);
export const backOrderListCountLoaded = createSelector(
  getProdState,
  fromOrder.backOrderListCountLoaded
);



export const exportBackOrderList = createSelector(
  getProdState,
  fromOrder.exportBackOrderList
);
export const exportBackOrderListLoading = createSelector(
  getProdState,
  fromOrder.exportBackOrderListLoading
);
export const exportBackOrderListLoaded = createSelector(
  getProdState,
  fromOrder.exportBackOrderListoaded
);

export const bulkExportBackOrderList = createSelector(
  getProdState,
  fromOrder.bulkExportBackOrderList
);
export const bulkExportBackOrderListLoading = createSelector(
  getProdState,
  fromOrder.bulkExportBackOrderListLoading
);
export const bulkExportBackOrderListLoaded = createSelector(
  getProdState,
  fromOrder.bulkExportBackOrderListoaded
);


export const exportFailedOrderList = createSelector(
  getProdState,
  fromOrder.exportFailedOrderList
);
export const exportFailedOrderListLoading = createSelector(
  getProdState,
  fromOrder.exportFailedOrderListLoading
);
export const exportFailedOrderListLoaded = createSelector(
  getProdState,
  fromOrder.exportFailedOrderListoaded
);

export const bulkExportFailedOrderList = createSelector(
  getProdState,
  fromOrder.bulkExportFailedOrderList
);
export const bulkExportFailedOrderListLoading = createSelector(
  getProdState,
  fromOrder.bulkExportFailedOrderListLoading
);
export const bulkExportFailedOrderListLoaded = createSelector(
  getProdState,
  fromOrder.bulkExportFailedOrderListoaded
);

export const vendorOrderListCount = createSelector(
  getProdState,
  fromOrder.vendorOrderListCount);
export const vendorOrderListCountLoading = createSelector(
  getProdState,
  fromOrder.vendorOrderListCountLoading
);
export const vendorOrderListCountLoaded = createSelector(
  getProdState,
  fromOrder.vendorOrderListCountLoaded
);

export const vendorOrderDetail = createSelector(
  getProdState,
  fromOrder.vendorOrderDetail);
export const vendorOrderDetailLoading = createSelector(
  getProdState,
  fromOrder.vendorOrderDetailLoading
);
export const vendorOrderDetailLoaded = createSelector(
  getProdState,
  fromOrder.vendorOrderDetailLoaded
);


export const getAllOrderListcount = createSelector(
  getProdState,
  fromOrder.getAllOrderListcount
);
export const getAllOrderListcountLoading = createSelector(
  getProdState,
  fromOrder.getAllOrderListcountLoading
);
export const getAllOrderListcountLoaded = createSelector(
  getProdState,
  fromOrder.getAllOrderListcountLoaded
);

export const revokeArchieveOrder = createSelector(
  getProdState,
  fromOrder.revokeArchieveOrder
);
export const revokeArchieveOrderLoading = createSelector(
  getProdState,
  fromOrder.revokeArchieveOrderLoading
);
export const revokeArchieveOrderLoaded = createSelector(
  getProdState,
  fromOrder.revokeArchieveOrderLoaded
);

export const revokeArchieveOrderFailed = createSelector(
  getProdState,
  fromOrder.revokeArchieveOrderFailed
);

export const archieveOrderDetail = createSelector(
  getProdState,
  fromOrder.archieveOrderDetail
);
export const archieveOrderDetailLoading = createSelector(
  getProdState,
  fromOrder.archieveOrderDetailLoading
);
export const archieveOrderDetailLoaded = createSelector(
  getProdState,
  fromOrder.archieveOrderDetailLoaded
);

export const archieveOrderDetailFailed = createSelector(
  getProdState,
  fromOrder.archieveOrderDetailFailed
);

export const salesReportCategoryLists = createSelector(
  getProdState,
  fromOrder.salesReportCategoryList
);
export const salesReportCategoryListsLoading = createSelector(
  getProdState,
  fromOrder.salesReportCategoryListLoading
);
export const salesReportCategoryListLoaded = createSelector(
  getProdState,
  fromOrder.salesReportCategoryListLoaded
);


export const exportOrderInvoice = createSelector(
  getProdState,
  fromOrder.exportOrderInvoice
);
export const exportOrderInvoiceLoading = createSelector(
  getProdState,
  fromOrder.exportOrderInvoiceLoading
);
export const exportOrderInvoiceLoaded = createSelector(
  getProdState,
  fromOrder.exportOrderInvoiceLoaded
);
export const exportOrderInvoiceFailed = createSelector(
  getProdState,
  fromOrder.exportOrderInvoiceFailed
);

export const AllExportOrderInvoice = createSelector(
  getProdState,
  fromOrder.AllExportOrderInvoice
);
export const AllExportOrderInvoiceLoading = createSelector(
  getProdState,
  fromOrder.AllExportOrderInvoiceLoading
);
export const AllExportOrderInvoiceLoaded = createSelector(
  getProdState,
  fromOrder.AllExportOrderInvoiceLoaded
);
export const AllExportOrderInvoiceFailed = createSelector(
  getProdState,
  fromOrder.AllExportOrderInvoiceFailed
);

export const updatePaymentStatus = createSelector(
  getProdState,
  fromOrder.updatePaymentStatus
);
export const updatePaymentStatusLoading = createSelector(
  getProdState,
  fromOrder.updatePaymentStatusLoading
);
export const updatePaymentStatusLoaded = createSelector(
  getProdState,
  fromOrder.updatePaymentStatusLoaded
);
export const updatePaymentStatusFailed = createSelector(
  getProdState,
  fromOrder.updatePaymentStatusFailed
);
//ordered Export all

export const OrderedExportAll = createSelector(
  getProdState,
  fromOrder.OrderedExportAll
);
export const OrderedExportAllLoading = createSelector(
  getProdState,
  fromOrder.OrderedExportAllLoading
);
export const OrderedExportAllLoaded = createSelector(
  getProdState,
  fromOrder.OrderedExportAllLoaded
);
export const OrderedExportAllFailed = createSelector(
  getProdState,
  fromOrder.OrderedExportAllFailed
);


//backOrderDetail
export const backOrderDetail = createSelector(
  getProdState,
  fromOrder.backOrderDetail
);
export const backOrderDetailLoading = createSelector(
  getProdState,
  fromOrder.backOrderDetailLoading
);
export const backOrderDetailLoaded = createSelector(
  getProdState,
  fromOrder.backOrderDetailLoaded
);
export const backOrderDetailFailed = createSelector(
  getProdState,
  fromOrder.backOrderDetailFailed
);


//fullFillNow
export const fullFillNow = createSelector(
  getProdState,
  fromOrder.fullFillNow
);
export const fullFillNowLoading = createSelector(
  getProdState,
  fromOrder.fullFillNowLoading
);
export const fullFillNowLoaded = createSelector(
  getProdState,
  fromOrder.fullFillNowLoaded
);
export const fullFillNowFailed = createSelector(
  getProdState,
  fromOrder.fullFillNowFailed
);


