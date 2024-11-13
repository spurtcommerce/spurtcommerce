/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../seller-action/seller.action';
import { SellerState, SellerRecord } from '../seller-reducer/seller.state';

export const initialState: SellerState = new SellerRecord() as unknown as SellerState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SellerState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <-----------------VENDOR LIST ----------------> //

    case actions.ActionTypes.GET_SELLER_LIST: {
      return Object.assign({}, state, {
        sellerListLoading: true,
        sellerListLoaded: false,
        sellerListFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerListLoading: false,
        sellerListLoaded: true,
        sellerListFailed: false,
        sellerList: payload.data
      });
    }

    case actions.ActionTypes.GET_SELLER_LIST_FAIL: {
      return Object.assign({}, state, {
        sellerListLoading: false,
        sellerListLoaded: false,
        sellerListFailed: true
      });
    }

    // <-----------------ADD VENDOR ----------------> //

    case actions.ActionTypes.DO_SELLER_ADD: {
      return Object.assign({}, state, {
        sellerAddLoading: true,
        sellerAddLoaded: false,
        sellerAddFailed: false
      });
    }

    case actions.ActionTypes.DO_SELLER_ADD_SUCCESS: {
      return Object.assign({}, state, {
        sellerAddLoading: false,
        sellerAddLoaded: true,
        sellerAddFailed: false,
        sellerAdd: payload
      });
    }

    case actions.ActionTypes.DO_SELLER_ADD_FAIL: {
      return Object.assign({}, state, {
        sellerAddLoading: false,
        sellerAddLoaded: false,
        sellerAddFailed: true
      });
    }

    // <-----------------UPDATE VENDOR ----------------> //

    case actions.ActionTypes.DO_SELLER_UPDATE: {
      return Object.assign({}, state, {
        sellerUpdateLoading: true,
        sellerUpdateLoaded: false,
        sellerUpdateFailed: false
      });
    }

    case actions.ActionTypes.DO_SELLER_UPDATE_SUCCESS: {
      
      return Object.assign({}, state, {
        sellerUpdate: payload,
        sellerUpdateLoading: false,
        sellerUpdateLoaded: true,
        sellerUpdateFailed: false,
      });
    }

    case actions.ActionTypes.DO_SELLER_UPDATE_FAIL: {
      return Object.assign({}, state, {
        sellerUpdateLoading: false,
        sellerUpdateLoaded: false,
        sellerUpdateFailed: true
      });
    }


    // <-----------------PAGE DETAILS ----------------> //

    case actions.ActionTypes.PAGE_DETAILS: {
      return Object.assign({}, state, {
        pageDetailsLoading: true,
        pageDetailsLoaded: false,
        pageDetailsFailed: false
      });
    }

    case actions.ActionTypes.PAGE_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        pageDetails: payload.data,
        pageDetailsLoading: false,
        pageDetailsLoaded: true,
        pageDetailsFailed: false
      });
    }
    case actions.ActionTypes.PAGE_DETAILS_FAIL: {
      return Object.assign({}, state, {
        pageDetailsLoading: false,
        pageDetailsLoaded: true,
        pageDetailsFailed: true
      });
    }

    // <-----------------DELETE VENDOR ----------------> //

    case actions.ActionTypes.DO_DELETE_SELLER_ACTION: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        deleteSeller: payload
      });
    }

    case actions.ActionTypes.DO_DELETE_SELLER_SUCCESS: {
      if (payload) {
        state.sellerList = state.sellerList.filter(data => {
          if (data.vendorId === state.deleteSeller.vendorId) {
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

    case actions.ActionTypes.DO_DELETE_SELLER_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
        deleteSeller: payload
      });
    }


    // <-----------------BULK DELETE VENDOR----------------> //

    case actions.ActionTypes.DO_SELLER_BULK_DELETE: {
      return Object.assign({}, state, {
        deletesLoading: true,
        deletesLoaded: false,
        deletesFailed: false,
        bulkDeleteSeller: payload,

      });
    }

    case actions.ActionTypes.DO_SELLER_BULK_DELETE_SUCCESS: {
      if (payload) {
        state.sellerList = state.sellerList.filter(data => {
          if (data.vendorId === state.bulkDeleteSeller.vendorId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        deletesLoading: false,
        deletesLoaded: true,
        deletesFailed: false
      });
    }

    case actions.ActionTypes.DO_SELLER_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        deletesLoading: false,
        deletesLoaded: false,
        deletesFailed: true,
      });
    }

    // <-----------------APPROVE VENDOR ----------------> //

    case actions.ActionTypes.DO_SELLER_APPROVAL: {
      return Object.assign({}, state, {
        sellerApprovalLoading: true,
        sellerApprovalLoaded: false,
        sellerApprovalFailed: false
      });
    }

    case actions.ActionTypes.DO_SELLER_APPROVAL_SUCCESS: {
      return Object.assign({}, state, {
        sellerApprovalLoading: false,
        sellerApprovalLoaded: true,
        sellerApprovalFailed: false,
        sellerApproval: payload
      });
    }

    case actions.ActionTypes.DO_SELLER_APPROVAL_FAIL: {
      return Object.assign({}, state, {
        sellerApprovalLoading: false,
        sellerApprovalLoaded: false,
        sellerApprovalFailed: true
      });
    }

    // <-----------------GET COUNTRY LIST ----------------> //

    case actions.ActionTypes.GET_COUNTRY_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        countryList: payload.data,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }

    // <-----------------VENDOR COUNTS ----------------> //

    case actions.ActionTypes.GET_VENDOR_COUNTS: {
      return Object.assign({}, state, {
        vendorCount: {},
        vendorCountLoading: true,
        vendorCountLoaded: false,
        vendorCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_COUNTS_SUCCESS: {
      return Object.assign({}, state, {
        vendorCount: payload.data,
        vendorCountLoading: false,
        vendorCountLoaded: true,
        vendorCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_COUNTS_FAIL: {
      return Object.assign({}, state, {
        vendorCount: {},
        vendorCountLoading: false,
        vendorCountLoaded: false,
        vendorCountFailed: true,
      });
    }

    // <-----------------ZONE LIST ----------------> //

    case actions.ActionTypes.ZONE_LIST: {
      return Object.assign({}, state, {
        zoneListLoading: true,
        zoneListLoaded: false,
        zoneListFailed: false
      });
    }

    case actions.ActionTypes.ZONE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        zoneList: payload.data,
        zoneListLoading: false,
        zoneListLoaded: true,
        zoneListFailed: false
      });
    }

    case actions.ActionTypes.ZONE_LIST_FAIL: {
      return Object.assign({}, state, {
        zoneListLoading: false,
        zoneListLoaded: true,
        zoneListFailed: true
      });
    }

    // <-----------------VENDOR LIST COUNT----------------> //

    case actions.ActionTypes.SELLER_LIST_COUNT: {
      return Object.assign({}, state, {
        sellerListCountLoading: true,
        sellerListCountLoaded: false,
        sellerListCountFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        sellerListCount: payload.data,
        sellerListCountLoading: false,
        sellerListCountLoaded: true,
        sellerListCountFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        sellerListCountLoading: false,
        sellerListCountLoaded: false,
        sellerListCountFailed: true,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST: {
      return Object.assign({}, state, {
        getproductListLoading: true,
        getproductListLoaded: false,
        getproductListFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        getproductListLoading: false,
        getproductListLoaded: true,
        getproductListFailed: false,
        getproductList: payload.data
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        getproductListLoading: false,
        getproductListLoaded: false,
        getproductListFailed: true
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_COUNT: {
      return Object.assign({}, state, {
        getproductListcountLoading: true,
        getproductListcountLoaded: false,
        getproductListcountFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        getproductListcountLoading: false,
        getproductListcountLoaded: true,
        getproductListcountFailed: false,
        getproductListcount: payload.data
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        getproductListcountLoading: false,
        getproductListcountLoaded: false,
        getproductListcountFailed: true
      });
    }

    case actions.ActionTypes.GET_SELLER_EXCEL: {
      return Object.assign({}, state, {
        excelListLoading: true,
        excelListLoaded: false,
      });
    }

    case actions.ActionTypes.GET_SELLER_EXCEL_SUCCESS: {
      return Object.assign({}, state, {
        excelListLoading: false,
        excelListLoaded: true,
      });
    }

    case actions.ActionTypes.CHECK_AVAILABILITY: {
      return Object.assign({}, state, {
        availLoading: true,
        availLoaded: false,
        availFailed: false
      });
    }

    case actions.ActionTypes.CHECK_AVAILABILITY_SUCCESS: {
      return Object.assign({}, state, {
        availLoading: false,
        availLoaded: true,
        availFailed:false,
        available:payload.data
      });
    }
    case actions.ActionTypes.CHECK_AVAILABILITY_FAIL: {
      return Object.assign({}, state, {
        availLoading: false,
        availLoaded: false,
        availFailed:true,
      });
    }
      
    case actions.ActionTypes.STATE_LIST: {
      return Object.assign({}, state, {
        stateListLoading: true,
        stateListLoaded: false,
        stateListFailed: false
      });
    }

    case actions.ActionTypes.STATE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        stateListLoading: false,
        stateListLoaded: true,
        stateListFailed:false,
        stateList:payload.data
      });
    }
    case actions.ActionTypes.STATE_LIST_FAIL: {
      return Object.assign({}, state, {
        stateListLoading: false,
        stateListLoaded: false,
        stateListFailed:true,
      });
    }

    // <----------------REMOVE country FROM country ADD COMPONENT------------------> //

    case actions.ActionTypes.DO_COUNTRY_REMOVE: {
      const Data: any = state.countryList;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        CountryRemoveList: Data,
        CountryRemoveResponse: false,
        CountryRemoveRequestLoading: true,
        CountryRemoveRequestLoaded: false,
        CountryRemoveRequestFailed: false
      });
    }

    // <----------------ADD category FROM category ADD COMPONENT------------------> //

    case actions.ActionTypes.DO_COUNTRY_ADD: {
      const Data: any = state.countryList;
      Data.push(payload);
      return Object.assign({}, state, {
        CountryList: Data,
        CountryAddResponse: false,
        CountryAddRequestLoading: true,
        CountryAddRequestLoaded: false,
        CountryAddRequestFailed: false
      });
    }


    default: {
      return state;
    }
  }
}

// seller list
export const getSellerList = (state: SellerState) => state.sellerList;
export const getSellerListLoading = (state: SellerState) =>
  state.sellerListLoading;
export const getSellerListLoaded = (state: SellerState) =>
  state.sellerListLoaded;
export const getSellerListFailed = (state: SellerState) =>
  state.sellerListFailed;
export const sellerListCount = (state: SellerState) =>
  state.sellerListCount;

// seller add
export const doSellerAdd = (state: SellerState) => state.sellerAdd;
export const doSellerAddLoading = (state: SellerState) =>
  state.sellerAddLoading;
export const doSellerAddLoaded = (state: SellerState) => state.sellerAddLoaded;
export const doSellerAddFailed = (state: SellerState) => state.sellerAddFailed;

export const doSellerUpdate = (state: SellerState) => state.sellerUpdate;
export const doSellerUpdateLoading = (state: SellerState) =>
  state.sellerUpdateLoading;
export const doSellerUpdateLoaded = (state: SellerState) =>
  state.sellerUpdateLoaded;
export const doSellerUpdateFailed = (state: SellerState) =>
  state.sellerUpdateFailed;

export const getTotalSellerCount = (state: SellerState) =>
  state.totalSellerCount;
export const getTotalSellerCountLoading = (state: SellerState) =>
  state.totalSellerCountLoading;
export const getTotalSellerCountLoaded = (state: SellerState) =>
  state.totalSellerCountLoaded;
export const getTotalSellerCountFailed = (state: SellerState) =>
  state.totalSellerCountFailed;

export const getActiveSellerCount = (state: SellerState) =>
  state.activeSellerCount;
export const getActiveSellerCountLoading = (state: SellerState) =>
  state.activeSellerCountLoading;
export const getActiveSellerCountLoaded = (state: SellerState) =>
  state.activeSellerCountLoaded;
export const getActiveSellerCountFailed = (state: SellerState) =>
  state.activeSellerCountFailed;

export const getInActiveSellerCount = (state: SellerState) =>
  state.inactiveSellerCount;
export const getInActiveSellerCountLoading = (state: SellerState) =>
  state.inactiveSellerCountLoading;
export const getInActiveSellerCountLoaded = (state: SellerState) =>
  state.inactiveSellerCountLoaded;
export const getInActiveSellerCountFailed = (state: SellerState) =>
  state.inactiveSellerCountFailed;

export const getPageDetails = (state: SellerState) => state.pageDetails;
export const getpageDetailsLoadingStatus = (state: SellerState) =>
  state.pageDetailsLoading;
export const getpageDetailsLoadedStatus = (state: SellerState) =>
  state.pageDetailsLoaded;
export const getpageDetailsFailedStatus = (state: SellerState) =>
  state.pageDetailsFailed;

// customer delete
export const deleteSeller = (state: SellerState) => state.deleteSeller;
export const deleteLoading = (state: SellerState) => state.deleteLoading;
export const deleteLoaded = (state: SellerState) => state.deleteLoaded;
export const deleteFailed = (state: SellerState) => state.deleteFailed;

export const bulkDeleteSeller = (state: SellerState) => state.bulkDeleteSeller;
export const deletesLoading = (state: SellerState) => state.deletesLoading;
export const deletesLoaded = (state: SellerState) => state.deletesLoaded;
export const deletesFailed = (state: SellerState) => state.deletesFailed;



export const getSellerApproval = (state: SellerState) => state.sellerApproval;
export const getSellerApprovalLoading = (state: SellerState) =>
  state.sellerApprovalLoading;
export const getSellerApprovalLoaded = (state: SellerState) =>
  state.sellerApprovalLoaded;
export const getSellerApprovalFailed = (state: SellerState) =>
  state.sellerApprovalFailed;


export const getCountryList = (state: SellerState) => state.countryList;
export const getCountryListLoading = (state: SellerState) => state.listLoading;
export const getCountryListLoaded = (state: SellerState) => state.listLoaded;
export const getCountryListFailed = (state: SellerState) => state.listFailed;

export const vendorCount = (state: SellerState) => state.vendorCount;
export const vendorCountLoading = (state: SellerState) => state.vendorCountLoading;
export const vendorCountLoaded = (state: SellerState) => state.vendorCountLoaded;
export const vendorCountFailed = (state: SellerState) => state.vendorCountFailed;

export const zoneList = (state: SellerState) => state.zoneList;

export const getproductList = (state: SellerState) => state.getproductList;
export const getproductListLoading = (state: SellerState) =>
  state.getproductListLoading;
export const getproductListLoaded = (state: SellerState) =>
  state.getproductListLoaded;
export const getproductListFailed = (state: SellerState) =>
  state.getproductListFailed;


  export const getproductListcount = (state: SellerState) => state.getproductListcount;
  export const getproductListcountLoading = (state: SellerState) =>
    state.getproductListcountLoading;
  export const getproductListcountLoaded = (state: SellerState) =>
    state.getproductListcountLoaded;
  export const getproductListcountFailed = (state: SellerState) =>
    state.getproductListcountFailed;

    export const exportExcelLoading = (state: SellerState) => state.excelListLoading;

    export const checkAvail = (state: SellerState) => state.available;
  export const checkAvailLoading = (state: SellerState) =>
    state.availLoading;
  export const checkAvailLoaded = (state: SellerState) =>
    state.availLoaded;
  export const checkAvailFailed = (state: SellerState) =>
    state.availFailed;

    export const stateList = (state: SellerState) => state.stateList;
    export const stateListLoading = (state: SellerState) =>
      state.stateListLoading;
    export const stateListLoaded = (state: SellerState) =>
      state.stateListLoaded;
    export const stateListFailed = (state: SellerState) =>
      state.stateListFailed;

      // product remove action
export const getCountryRemoveResponse = (state: SellerState) =>
  state.CountryRemoveResponse;
export const getCountryRemoveRequestLoading = (state: SellerState) =>
  state.CountryRemoveRequestLoading;
export const getCountryRemoveRequestLoaded = (state: SellerState) =>
  state.CountryRemoveRequestLoaded;
export const getCountryRemoveRequestFailed = (state: SellerState) =>
  state.CountryRemoveRequestFailed;
// // product add action
export const getCountryAddResponse = (state: SellerState) =>
  state.CountryAddResponse;
export const getCountryAddRequestLoading = (state: SellerState) =>
  state.CountryAddRequestLoading;
export const getCountryAddRequestLoaded = (state: SellerState) =>
  state.CountryAddRequestLoaded;
export const getCountryAddRequestFailed = (state: SellerState) =>
  state.CountryAddRequestFailed;