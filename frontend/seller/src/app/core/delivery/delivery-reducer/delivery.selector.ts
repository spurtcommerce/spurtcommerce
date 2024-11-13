

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromDelivery from './delivery.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.delivery;


// delivery add action
export const getDeliveryAdd = createSelector(
  getProdState,
  fromDelivery.getDeliveryAdd
);
export const deliveryAddLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryAddLoading
);
export const deliveryAddLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryAddLoaded
);
export const deliveryAddFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryAddFailed
);
// delivery person add action
export const getDeliveryPersonAdd = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonAdd
);
export const deliveryPersonAddLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonAddLoading
);
export const deliveryPersonAddLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonAddLoaded
);
export const deliveryPersonAddFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonAddFailed
);
// delivery delete action
export const getDeliveryDelete = createSelector(
  getProdState,
  fromDelivery.getDeliveryDelete
);
export const deliveryDeleteLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryDeleteLoading
);
export const deliveryDeleteLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryDeleteLoaded
);
export const deliveryDeleteFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryDeleteFailed
);
// delivery person delete action
export const getDeliveryPersonDelete = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonDelete
);
export const deliveryDeletePersonLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonDeleteLoading
);
export const deliveryPersonDeleteLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonDeleteLoaded
);
export const deliveryPersonDeleteFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonDeleteFailed
);
// delivery bulk delete action
export const getDeliveryBulkDelete = createSelector(
  getProdState,
  fromDelivery.getDeliveryBulkDelete
);
export const deliveryBulkDeleteLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryBulkDeleteLoading
);
export const deliveryBulkDeleteLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryBulkDeleteLoaded
);
export const deliveryBulkDeleteFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryBulkDeleteFailed
);
// delivery Detail action
export const getDeliveryDetail = createSelector(
  getProdState,
  fromDelivery.getDeliveryDetail
);
export const deliveryDetailLoading = createSelector(
  getProdState,
  fromDelivery.getProducDetailLoading
);
export const deliveryDetailLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryDetailLoaded
);
export const deliveryDetailFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryDetailFailed
);
// delivery update action
export const getDeliveryUpdate = createSelector(
  getProdState,
  fromDelivery.getDeliveryUpdate
);
export const getDeliveryDetails = createSelector(
  getProdState,
  fromDelivery.getDeliveryDetail
);
export const deliveryUpdateLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryUpdateLoading
);
export const deliveryUpdateLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryUpdateLoaded
);
export const deliveryUpdateFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryUpdateFailed
);
// delivery person update action
export const getDeliveryPersonUpdate = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonUpdate
);
export const deliveryPersonUpdateLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonUpdateLoading
);
export const deliveryPersonUpdateLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonUpdateLoaded
);
export const deliveryPersonUpdateFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonUpdateFailed
);

// delivery status change
export const getDeliveryStatus = createSelector(
  getProdState,
  fromDelivery.getDeliveryStatus
);
export const getDeliveryStatusLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryStatusLoading
);
export const getDeliveryStatusLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryStatusLoaded
);
export const getDeliveryStatusFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryStatusFailed
);

export const deliveryLocationlistLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryLocationlistLoading
);
export const deliveryLocationlistLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryLocationlistLoaded
);
export const deliveryLocationlistFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryLocationlistFailed
);
export const deliveryPersonslistLoading = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonslistLoading
);
export const deliveryPersonslistLoaded = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonslistLoaded
);
export const deliveryPersonslistFailed = createSelector(
  getProdState,
  fromDelivery.getDeliveryPersonslistFailed
);
export const stockStatusList = createSelector(
  getProdState,
  fromDelivery.getStockStatusList
);
export const stockStatusListLoading = createSelector(
  getProdState,
  fromDelivery.getStockStatusListLoading
);
export const stockStatusListLoaded = createSelector(
  getProdState,
  fromDelivery.getStockStatusListLoaded
);
export const stockStatusListFailed = createSelector(
  getProdState,
  fromDelivery.getStockStatusListFailed
);

export const categoryList = createSelector(
  getProdState,
  fromDelivery.categoryList
);
export const categoryListLoading = createSelector(
  getProdState,
  fromDelivery.categoryListLoading
);

export const tempCategoryList = createSelector(
  getProdState,
  fromDelivery.tempCategoryList
);
export const deliveryLocationList = createSelector(
  getProdState,
  fromDelivery.deliveryLocationList
);
export const deliveryPersonslist = createSelector(
  getProdState,
  fromDelivery.DeliveryPersonslist
);
export const getTotalDeliveryCount = createSelector(
  getProdState,
  fromDelivery.getTotalDeliveryCount
);
export const getTotalDeliveryCountLoaded = createSelector(
  getProdState,
  fromDelivery.getTotalDeliveryCountLoaded
);
export const getTotalDeliveryCountLoading = createSelector(
  getProdState,
  fromDelivery.getTotalDeliveryCountLoading
);
export const getTotalDeliveryCountFailed = createSelector(
  getProdState,
  fromDelivery.getTotalDeliveryCountFailed
);

export const  getDeliveryPersonsCount = createSelector(
  getProdState,
  fromDelivery. getDeliveryPersonsCount
);
export const  getDeliveryPersonsCountLoaded = createSelector(
  getProdState,
  fromDelivery. getDeliveryPersonsCountLoaded
);
export const  getDeliveryPersonsCountLoading = createSelector(
  getProdState,
  fromDelivery. getDeliveryPersonsCountLoading
);
export const  getDeliveryPersonsCountFailed = createSelector(
  getProdState,
  fromDelivery. getDeliveryPersonsCountFailed
);

export const getInActiveDeliveryCount = createSelector(
  getProdState,
  fromDelivery.getInActiveDeliveryCount
);
export const getInActiveDeliveryCountLoaded = createSelector(
  getProdState,
  fromDelivery.getInActiveDeliveryCountLoaded
);
export const getInActiveDeliveryCountLoading = createSelector(
  getProdState,
  fromDelivery.getInActiveDeliveryCountLoading
);
export const getInActiveDeliveryCountFailed = createSelector(
  getProdState,
  fromDelivery.getInActiveDeliveryCountFailed
);

export const downloadMainCsv = createSelector(
  getProdState,
  fromDelivery.downloadMainCsv
);
export const downloadMainCsvLoaded = createSelector(
  getProdState,
  fromDelivery.downloadMainCsvLoaded
);
export const downloadMainCsvLoading = createSelector(
  getProdState,
  fromDelivery.downloadMainCsvLoading
);
export const downloadMainCsvFailed = createSelector(
  getProdState,
  fromDelivery.downloadMainCsvFailed
);

export const uploadMainCsv = createSelector(
  getProdState,
  fromDelivery.uploadMainCsv
);
export const uploadMainCsvLoaded = createSelector(
  getProdState,
  fromDelivery.uploadMainCsvLoaded
);
export const uploadMainCsvLoading = createSelector(
  getProdState,
  fromDelivery.uploadMainCsvLoading
);
export const uploadMainCsvFailed = createSelector(
  getProdState,
  fromDelivery.uploadMainCsvFailed
);


export const priceCsvList = createSelector(
  getProdState,
  fromDelivery.priceCsvList
);
export const priceCsvListLoaded = createSelector(
  getProdState,
  fromDelivery.priceCsvListLoaded
);
export const priceCsvListLoading = createSelector(
  getProdState,
  fromDelivery.priceCsvListLoading
);
export const priceCsvListFailed = createSelector(
  getProdState,
  fromDelivery.priceCsvListFailed
);

export const priceCsvCount = createSelector(
  getProdState,
  fromDelivery.priceCsvCount
);
export const priceCsvCountLoaded = createSelector(
  getProdState,
  fromDelivery.priceCsvCountLoaded
);
export const priceCsvCountLoading = createSelector(
  getProdState,
  fromDelivery.priceCsvCountLoading
);
export const priceCsvCountFailed = createSelector(
  getProdState,
  fromDelivery.priceCsvCountFailed
);


export const deleteCsvList = createSelector(
  getProdState,
  fromDelivery.deleteCsvList
);
export const deleteCsvListLoaded = createSelector(
  getProdState,
  fromDelivery.deleteCsvListLoaded
);
export const deleteCsvListLoading = createSelector(
  getProdState,
  fromDelivery.deleteCsvListLoading
);
export const deleteCsvListFailed = createSelector(
  getProdState,
  fromDelivery.deleteCsvListFailed
);


export const downloadCsv = createSelector(
  getProdState,
  fromDelivery.downloadCsv
);
export const downloadCsvLoaded = createSelector(
  getProdState,
  fromDelivery.downloadCsvLoaded
);
export const downloadCsvLoading = createSelector(
  getProdState,
  fromDelivery.downloadCsvLoading
);
export const downloadCsvFailed = createSelector(
  getProdState,
  fromDelivery.downloadCsvFailed
);
