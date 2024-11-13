import * as actions from '../delivery-action/delivery.action';
// state
// model
import { DetailResponseModel } from '../delivery-model/detail-response.model';
import { DeliveryAddResponseModel } from '../delivery-model/delivery-add-response.model';
import { DeliveryState, DeliveryStateRecord } from './delivery.state';
import { PriceUpdateListResponse } from '../delivery-model/price-update-List.model';

export const initialState: DeliveryState = (new DeliveryStateRecord() as unknown) as DeliveryState;

export function reducer(
  state = initialState,
  { type, payload }: any
): DeliveryState {
  if (!type) {
    return state;
  }

  switch (type) {


// <-----------------ADD DELIVERY LOCATION------------------> //

    case actions.ActionTypes.DO_DELIVERY_ADD_LOCATION: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_DELIVERY_ADD_LOCATION_SUCCESS: {
      const addedDelivery = new DeliveryAddResponseModel(payload.data);
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        addDeliveryDetail: addedDelivery,
        deliveryAdded: payload
      });
    }

    case actions.ActionTypes.DO_DELIVERY_ADD_LOCATION_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

// <-----------------ADD DELIVERY PERSON------------------> //

    case actions.ActionTypes.DO_DELIVERY_PERSON_ADD: {
      return Object.assign({}, state, {
        addPersonLoading: true,
        addPersonLoaded: false,
        addPersonFailed: false
      });
    }

    case actions.ActionTypes.DO_DELIVERY_PERSON_ADD_SUCCESS: {
      const addedDelivery = new DeliveryAddResponseModel(payload.data);
      return Object.assign({}, state, {
        addPersonLoading: false,
        addPersonLoaded: true,
        addPersonFailed: false,
        deliveryPersonAdded: payload
      });
    }

    case actions.ActionTypes.DO_DELIVERY_PERSON_ADD_FAIL: {
      return Object.assign({}, state, {
        addPersonLoading: false,
        addPersonLoaded: false,
        addPersonFailed: true
      });
    }

// <-----------------GET DELIVERY DETAILS------------------> //

    case actions.ActionTypes.GET_DELIVERY_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        deliveryDetail: new DetailResponseModel(payload.data),
        currentCategoryList: payload.data.Category
      });
    }

    case actions.ActionTypes.GET_DELIVERY_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

// <-----------------DELETE DELIVERY LOCATION------------------> //

    case actions.ActionTypes.DO_DELIVERY_LOCATION_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        deleteDelivery: payload['deliveryId']
      });
    }

    case actions.ActionTypes.DO_DELIVERY_LOCATION_DELETE_SUCCESS: {
      if (payload) {
       state.deliveryLocationList = state.deliveryLocationList.filter(data => {
         if (data.deliveryLocationId === state.deleteDelivery) {
           return false;
         } else {
           return true;
         }
       });
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_DELIVERY_LOCATION_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true
      });
    }

// <-----------------DELETE DELIVERY PERSON------------------> //

    case actions.ActionTypes.DO_DELIVERY_PERSON_DELETE: {
      return Object.assign({}, state, {
        deletePersonLoading: true,
        deletePersonLoaded: false,
        deletePersonFailed: false,
        deletePersonDelivery: payload['deliveryId']
      });
    }

    case actions.ActionTypes.DO_DELIVERY_PERSON_DELETE_SUCCESS: {
      if (payload) {
        state.DeliveryPersonslist = state.DeliveryPersonslist.filter(data => {
          if (data.id === state.deletePersonDelivery) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        deletePersonLoading: false,
        deletePersonLoaded: true,
        deletePersonFailed: false
      });
    }

    case actions.ActionTypes.DO_DELIVERY_PERSON_DELETE_FAIL: {
      return Object.assign({}, state, {
        deletePersonLoading: false,
        deletePersonLoaded: false,
        deletePersonFailed: true
      });
    }

// <-----------------DELETE DELIVERY LOCATION------------------> //

    case actions.ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE: {
      return Object.assign({}, state, {
        deleteBulkLoading: true,
        deleteBulkLoaded: false,
        deleteBulkFailed: false,
        deleteBulkDelivery: payload['deliveryId']
      });
    }

    case actions.ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: true,
        deleteBulkFailed: false
      });
    }

    case actions.ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: false,
        deleteBulkFailed: true
      });
    }


// <-----------------UPDATE DELIVERY------------------> //

    case actions.ActionTypes.DO_DELIVERY_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.DO_DELIVERY_UPDATE_SUCCESS: {
      if (payload.data) {
        state.deliveryLocationList.map(data => {
          if (data.deliveryLocationId === payload.data.deliveryLocationId) {
            data.locationName = payload.data.locationName;
            data.zipCode = payload.data.zipCode;
          }
        });
      }
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        deliveryUpdate: payload
      });
    }

    case actions.ActionTypes.DO_DELIVERY_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }

// <-----------------UPDATE DELIVERY PERSON------------------> //

      case actions.ActionTypes.DO_DELIVERY_PERSON_UPDATE: {
        return Object.assign({}, state, {
          updatePersonLoading: true,
          updatePersonLoaded: false,
          updatePersonFailed: false
        });
      }

      case actions.ActionTypes.DO_DELIVERY_PERSON_UPDATE_SUCCESS: {
        if (payload.data) {
        }
        return Object.assign({}, state, {
          updatePersonLoading: false,
          updatePersonLoaded: true,
          updatePersonFailed: false,
        });
      }

      case actions.ActionTypes.DO_DELIVERY_PERSON_UPDATE_FAIL: {
        return Object.assign({}, state, {
          updatePersonLoading: false,
          updatePersonLoaded: true,
          updatePersonFailed: true
        });
      }


// <-----------------GET DELIVERY LOCATION LIST------------------> //

    case actions.ActionTypes.GET_DELIVERY_LOCATION_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_LOCATION_LIST_SUCCESS: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        deliveryLocationList: payload.data
      });
    }

    case actions.ActionTypes.GET_DELIVERY_LOCATION_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }

// <-----------------DELIVERY PERSON LIST------------------> //

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST: {
      return Object.assign({}, state, {
        personsListLoading: true,
        personsListLoaded: false,
        personsListFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS: {
      if (payload.data) {
        payload.data.map(datas  => {
          if (datas.locations.length > 0) {
           datas.locations.map(data => {
             data.locationName = data.location;
           });
          }
          if (datas.isActive === 1) {
            datas.isActive = true;
          } else {
            datas.isActive = false;
          }
        });
      }
      return Object.assign({}, state, {
        personsListLoading: false,
        personsListLoaded: true,
        personsListFailed: false,
        DeliveryPersonslist: payload.data
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL: {
      return Object.assign({}, state, {
        personsListLoading: false,
        personsListLoaded: false,
        personsListFailed: true
      });
    }

// <-----------------GET STOCK STATUS LIST------------------> //

    case actions.ActionTypes.GET_STOCK_STATUS_LIST: {
      return Object.assign({}, state, {
        stockStatusListLoading: true,
        stockStatusListLoaded: false,
        stockStatusListFailed: false
      });
    }

    case actions.ActionTypes.GET_STOCK_STATUS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        stockStatusListLoading: false,
        stockStatusListLoaded: true,
        stockStatusListFailed: false,
        stockStatusList: payload.data
      });
    }

    case actions.ActionTypes.GET_STOCK_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }


// <-----------------DELIVERY STATUS------------------> //

    case actions.ActionTypes.DO_STATUS: {
      return Object.assign({}, state, {
        deliveryStatusLoading: true,
        deliveryStatusLoaded: false,
        deliveryStatusFailed: false
      });
    }

    case actions.ActionTypes.DO_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        deliveryStatusLoading: false,
        deliveryStatusLoaded: true,
        deliveryStatusFailed: false,
        deliveryStatus: payload
      });
    }

    case actions.ActionTypes.DO_STATUS_FAIL: {
      return Object.assign({}, state, {
        deliveryStatusLoading: false,
        deliveryStatusLoaded: false,
        deliveryStatusFailed: true
      });
    }

// <-----------------GET TOTAL DELIVERY COUNT------------------> //

    case actions.ActionTypes.GET_TOTAL_DELIVERY_COUNT: {
      return Object.assign({}, state, {
        totalDeliveryCount: 0,
        totalDeliveryLoading: true,
        totalDeliveryLoaded: false,
        totalDeliveryFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_DELIVERY_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalDeliveryCount: payload.data,
        totalDeliveryLoading: false,
        totalDeliveryLoaded: true,
        totalDeliveryFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_DELIVERY_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalDeliveryCount: 0,
        totalDeliveryLoading: false,
        totalDeliveryLoaded: true,
        totalDeliveryFailed: true
      });
    }

// <-----------------GET DELIVERY PERSON COUNT------------------> //

    case actions.ActionTypes.GET_DELIVERY_PERSONS_COUNT: {
      return Object.assign({}, state, {
       deliveryPersonsCount: 0,
       deliveryPersonsCountLoading: true,
       deliveryPersonsCountLoaded: false,
       deliveryPersonsCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_COUNT_SUCCESS: {
      return Object.assign({}, state, {
       deliveryPersonsCount: payload.data,
       deliveryPersonsCountLoading: false,
       deliveryPersonsCountLoaded: true,
       deliveryPersonsCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_COUNT_FAIL: {
      return Object.assign({}, state, {
       deliveryPersonsCount: 0,
       deliveryPersonsCountLoading: false,
       deliveryPersonsCountLoaded: true,
       deliveryPersonsCountFailed: true
      });
    }


// <-----------------GET INACTIVE DELIVERY COUNT------------------> //

    case actions.ActionTypes.GET_INACTIVE_DELIVERY_COUNT: {
      return Object.assign({}, state, {
        inactiveDeliveryCount: 0,
        inactiveDeliveryCountLoading: true,
        inactiveDeliveryCountLoaded: false,
        inactiveDeliveryCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_DELIVERY_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        inactiveDeliveryCount: payload.data,
        inactiveDeliveryCountLoading: false,
        inactiveDeliveryCountLoaded: true,
        inactiveDeliveryCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_DELIVERY_COUNT_FAIL: {
      return Object.assign({}, state, {
        inactiveDeliveryCount: 0,
        inactiveDeliveryCountLoading: false,
        inactiveDeliveryCountLoaded: true,
        inactiveDeliveryCountFailed: true
      });
    }

// <-----------------DOWNLOAD PRICE CSV FILE------------------> //

    case actions.ActionTypes.DOWNLOAD_MAIN_PRICE_CSV: {
      return Object.assign({}, state, {
        downloadMainCsvLoading: true,
        downloadMainCsvLoaded: false,
        downloadMainCsvFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_MAIN_PRICE_CSV_SUCCESS: {
      return Object.assign({}, state, {
        downloadMainCsv: payload.data,
        downloadMainCsvLoading: false,
        downloadMainCsvLoaded: true,
        downloadMainCsvFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_MAIN_PRICE_CSV_FAIL: {
      return Object.assign({}, state, {
        downloadMainCsvLoading: false,
        downloadMainCsvLoaded: true,
        downloadMainCsvFailed: true
      });
    }

// <-----------------UPLOAD PRICE CSV------------------> //

    case actions.ActionTypes.UPLOAD_MAIN_PRICE_CSV: {
      return Object.assign({}, state, {
        uploadMainCsvLoading: true,
        uploadMainCsvLoaded: false,
        uploadMainCsvFailed: false
      });
    }

    case actions.ActionTypes.UPLOAD_MAIN_PRICE_CSV_SUCCESS: {
      return Object.assign({}, state, {
        uploadMainCsv: payload.data,
        uploadMainCsvLoading: false,
        uploadMainCsvLoaded: true,
        uploadMainCsvFailed: false
      });
    }

    case actions.ActionTypes.UPLOAD_MAIN_PRICE_CSV_FAIL: {
      return Object.assign({}, state, {
        uploadMainCsvLoading: false,
        uploadMainCsvLoaded: false,
        uploadMainCsvFailed: true
      });
    }

// <-----------------CHANGE COUNT------------------> //

    case actions.ActionTypes.CHANGE_COUNT: {
      if (payload) {
        state.deliveryLocationList = state.deliveryLocationList.filter(data => {
          if (data.deliveryId === payload.deliveryId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {});
    }

// <-----------------PRICE CSV LIST------------------> //

    case actions.ActionTypes.PRICE_CSV_LIST: {
      return Object.assign({}, state, {
        priceCsvListLoading: true,
        priceCsvListLoaded: false,
        priceCsvListFailed: false
      });
    }

    case actions.ActionTypes.PRICE_CSV_LIST_SUCCESS: {
       const templist = payload.data.map(list => {
        const tempDeliveryModel = new PriceUpdateListResponse(list);
        return tempDeliveryModel;
      });
      return Object.assign({}, state, {
        priceCsvList: templist,
        priceCsvListLoading: false,
        priceCsvListLoaded: true,
        priceCsvListFailed: false
      });
    }

    case actions.ActionTypes.PRICE_CSV_LIST_FAIL: {
      return Object.assign({}, state, {
        priceCsvListLoading: false,
        priceCsvListLoaded: true,
        priceCsvListFailed: true
      });
    }

// <-----------------PRICE CSV COUNT------------------> //

    case actions.ActionTypes.PRICE_CSV_COUNT: {
      return Object.assign({}, state, {
        priceCsvCountLoading: true,
        priceCsvCountLoaded: false,
        priceCsvCountFailed: false
      });
    }

    case actions.ActionTypes.PRICE_CSV_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        priceCsvCount: payload.data,
        priceCsvCountLoading: false,
        priceCsvCountLoaded: true,
        priceCsvCountFailed: false
      });
    }

    case actions.ActionTypes.PRICE_CSV_COUNT_FAIL: {
      return Object.assign({}, state, {
        priceCsvCountLoading: false,
        priceCsvCountLoaded: true,
        priceCsvCountFailed: true
      });
    }

// <-----------------DELETE CSV LIST------------------> //

    case actions.ActionTypes.DELETE_CSV_LIST: {
      return Object.assign({}, state, {
        deleteCsvListLoading: true,
        deleteCsvListLoaded: false,
        deleteCsvListFailed: false,
        deleteCsvList: payload,
      });
    }

    case actions.ActionTypes.DELETE_CSV_LIST_SUCCESS: {
      state.priceCsvList = state.priceCsvList.filter(data => {
        if (data.id === state.deleteCsvList) {
          return false;
        } else {
          return true;
        }
      });
      return Object.assign({}, state, {
        deleteCsvListLoading: false,
        deleteCsvListLoaded: true,
        deleteCsvListFailed: false
      });
    }

    case actions.ActionTypes.DELETE_CSV_LIST_FAIL: {
      return Object.assign({}, state, {
        deleteCsvListLoading: false,
        deleteCsvListLoaded: true,
        deleteCsvListFailed: true
      });
    }

// <-----------------DOWNLOAD CSV------------------> //

    case actions.ActionTypes.DOWNLOAD_PRICE_CSV: {
      return Object.assign({}, state, {
        downloadCsvLoading: true,
        downloadCsvLoaded: false,
        downloadCsvFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_PRICE_CSV_SUCCESS: {
      return Object.assign({}, state, {
        downloadCsv: payload.data,
        downloadCsvLoading: false,
        downloadCsvLoaded: true,
        downloadCsvFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_PRICE_CSV_FAIL: {
      return Object.assign({}, state, {
        downloadCsvLoading: false,
        downloadCsvLoaded: true,
        downloadCsvFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

// delivery list action
export const getDeliveryLocationlistLoading = (state: DeliveryState) => state.listLoading;
export const getDeliveryLocationlistLoaded = (state: DeliveryState) => state.listLoaded;
export const getDeliveryLocationlistFailed = (state: DeliveryState) => state.listFailed;
export const deliveryLocationList = (state: DeliveryState) => state.deliveryLocationList;

export const getDeliveryPersonslistLoading = (state: DeliveryState) => state.personsListLoading;
export const getDeliveryPersonslistLoaded = (state: DeliveryState) => state.personsListLoaded;
export const getDeliveryPersonslistFailed = (state: DeliveryState) => state.personsListFailed;
export const DeliveryPersonslist = (state: DeliveryState) => state.DeliveryPersonslist;

export const getStockStatusListLoading = (state: DeliveryState) => state.stockStatusListLoading;
export const getStockStatusListLoaded = (state: DeliveryState) => state.stockStatusListLoaded;
export const getStockStatusListFailed = (state: DeliveryState) => state.stockStatusListFailed;
export const getStockStatusList = (state: DeliveryState) => state.stockStatusList;

// delivery detail action
export const getDeliveryDetail = (state: DeliveryState) => state.deliveryDetail;
export const getProducDetailLoading = (state: DeliveryState) =>
  state.detailLoading;
export const getDeliveryDetailLoaded = (state: DeliveryState) =>
  state.detailLoaded;
export const getDeliveryDetailFailed = (state: DeliveryState) =>
  state.detailFailed;
  export const getCurrentCategoryList = (state: DeliveryState) =>
  state.currentCategoryList;

// delivery add action
export const getDeliveryAdd = (state: DeliveryState) => state.deliveryAdded;
// export const getDeliveryAddDetail = (state: DeliveryState) =>
//   state.addDeliveryDetail;
export const getDeliveryAddLoading = (state: DeliveryState) => state.addLoading;
export const getDeliveryAddLoaded = (state: DeliveryState) => state.addLoaded;
export const getDeliveryAddFailed = (state: DeliveryState) => state.addFailed;
// delivery person add action
export const getDeliveryPersonAdd = (state: DeliveryState) => state.deliveryPersonAdded;
// export const getDeliveryAddDetail = (state: DeliveryState) =>
//   state.addDeliveryDetail;
export const getDeliveryPersonAddLoading = (state: DeliveryState) => state.addPersonLoading;
export const getDeliveryPersonAddLoaded = (state: DeliveryState) => state.addPersonLoaded;
export const getDeliveryPersonAddFailed = (state: DeliveryState) => state.addPersonFailed;
// delivery update action
export const getDeliveryUpdate = (state: DeliveryState) => state.deliveryUpdate;
export const getDeliveryUpdateLoading = (state: DeliveryState) =>
  state.updateLoading;
export const getDeliveryUpdateLoaded = (state: DeliveryState) =>
  state.updateLoaded;
export const getDeliveryUpdateFailed = (state: DeliveryState) =>
  state.updateFailed;
  // delivery person update action
export const getDeliveryPersonUpdate = (state: DeliveryState) => state.deliveryPersonUpdate;
export const getDeliveryPersonUpdateLoading = (state: DeliveryState) =>
  state.updatePersonLoading;
export const getDeliveryPersonUpdateLoaded = (state: DeliveryState) =>
  state.updatePersonLoaded;
export const getDeliveryPersonUpdateFailed = (state: DeliveryState) =>
  state.updatePersonFailed;
// delivery status change
export const getDeliveryStatus = (state: DeliveryState) => state.deliveryStatus;
export const getDeliveryStatusLoading = (state: DeliveryState) =>
  state.deliveryStatusLoading;
export const getDeliveryStatusLoaded = (state: DeliveryState) =>
  state.deliveryStatusLoaded;
export const getDeliveryStatusFailed = (state: DeliveryState) =>
  state.deliveryStatusFailed;

// delivery delete action
export const getDeliveryDelete = (state: DeliveryState) => state.deleteDelivery;
export const getDeliveryDeleteLoading = (state: DeliveryState) =>
  state.deleteLoading;
export const getDeliveryDeleteLoaded = (state: DeliveryState) =>
  state.deleteLoaded;
export const getDeliveryDeleteFailed = (state: DeliveryState) =>
  state.deleteFailed;
// delivery person delete action
export const getDeliveryPersonDelete = (state: DeliveryState) => state.deletePersonDelivery;
export const getDeliveryPersonDeleteLoading = (state: DeliveryState) =>
  state.deletePersonLoading;
export const getDeliveryPersonDeleteLoaded = (state: DeliveryState) =>
  state.deletePersonLoaded;
export const getDeliveryPersonDeleteFailed = (state: DeliveryState) =>
  state.deletePersonFailed;

// delivery bulk delete action
export const getDeliveryBulkDelete = (state: DeliveryState) =>
  state.deleteBulkDelivery;
export const getDeliveryBulkDeleteLoading = (state: DeliveryState) =>
  state.deleteBulkLoading;
export const getDeliveryBulkDeleteLoaded = (state: DeliveryState) =>
  state.deleteBulkLoaded;
export const getDeliveryBulkDeleteFailed = (state: DeliveryState) =>
  state.deleteBulkFailed;

export const categoryListLoading = (state: DeliveryState) =>
  state.categoryListLoading;
export const categoryList = (state: DeliveryState) => state.categoryList;
export const tempCategoryList = (state: DeliveryState) => state.tempCategoryList;

export const getTotalDeliveryCount = (state: DeliveryState) =>
  state.totalDeliveryCount;
export const getTotalDeliveryCountLoading = (state: DeliveryState) =>
  state.totalDeliveryCountLoading;
export const getTotalDeliveryCountLoaded = (state: DeliveryState) =>
  state.totalDeliveryCountLoaded;
export const getTotalDeliveryCountFailed = (state: DeliveryState) =>
  state.totalDeliveryCountFailed;

export const  getDeliveryPersonsCount = (state: DeliveryState) =>
  state.deliveryPersonsCount;
export const  getDeliveryPersonsCountLoading = (state: DeliveryState) =>
  state.deliveryPersonsCountLoading;
export const  getDeliveryPersonsCountLoaded = (state: DeliveryState) =>
  state.deliveryPersonsCountLoaded;
export const  getDeliveryPersonsCountFailed = (state: DeliveryState) =>
  state.deliveryPersonsCountFailed;

export const getInActiveDeliveryCount = (state: DeliveryState) =>
  state.inactiveDeliveryCount;
export const getInActiveDeliveryCountLoading = (state: DeliveryState) =>
  state.inactiveDeliveryCountLoading;
export const getInActiveDeliveryCountLoaded = (state: DeliveryState) =>
  state.inactiveDeliveryCountLoaded;
export const getInActiveDeliveryCountFailed = (state: DeliveryState) =>
  state.inactiveDeliveryCountFailed;

export const downloadMainCsv = (state: DeliveryState) => state.downloadMainCsv;
export const downloadMainCsvLoading = (state: DeliveryState) =>
  state.downloadMainCsvLoading;
export const downloadMainCsvLoaded = (state: DeliveryState) =>
  state.downloadMainCsvLoaded;
export const downloadMainCsvFailed = (state: DeliveryState) =>
  state.downloadMainCsvFailed;

  export const uploadMainCsv = (state: DeliveryState) => state.uploadMainCsv;
  export const uploadMainCsvLoading = (state: DeliveryState) =>
    state.uploadMainCsvLoading;
  export const uploadMainCsvLoaded = (state: DeliveryState) =>
    state.uploadMainCsvLoaded;
  export const uploadMainCsvFailed = (state: DeliveryState) =>
    state.uploadMainCsvFailed;



  export const priceCsvList = (state: DeliveryState) => state.priceCsvList;
  export const priceCsvListLoading = (state: DeliveryState) =>
    state.priceCsvListLoading;
  export const priceCsvListLoaded = (state: DeliveryState) =>
    state.priceCsvListLoaded;
  export const priceCsvListFailed = (state: DeliveryState) =>
    state.priceCsvListFailed;


    export const priceCsvCount = (state: DeliveryState) => state.priceCsvCount;
    export const priceCsvCountLoading = (state: DeliveryState) =>
      state.priceCsvCountLoading;
    export const priceCsvCountLoaded = (state: DeliveryState) =>
      state.priceCsvCountLoaded;
    export const priceCsvCountFailed = (state: DeliveryState) =>
      state.priceCsvCountFailed;

    export const deleteCsvList = (state: DeliveryState) => state.deleteCsvList;
    export const deleteCsvListLoading = (state: DeliveryState) =>
      state.deleteCsvListLoading;
    export const deleteCsvListLoaded = (state: DeliveryState) =>
      state.deleteCsvListLoaded;
    export const deleteCsvListFailed = (state: DeliveryState) =>
      state.deleteCsvListFailed;


      export const downloadCsv = (state: DeliveryState) => state.downloadCsv;
export const downloadCsvLoading = (state: DeliveryState) =>
  state.downloadCsvLoading;
export const downloadCsvLoaded = (state: DeliveryState) =>
  state.downloadCsvLoaded;
export const downloadCsvFailed = (state: DeliveryState) =>
  state.downloadCsvFailed;
