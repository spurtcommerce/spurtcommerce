/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../banner-action/banner.action';
import { BannerState, BannerRecordState } from '../banner-store/banner.state';
import { BannerlistResponseModel } from '../banner-model/bannerlist.response.model';
import { BanneraddResponseModel } from '../banner-model/banneradd.response.model';


export const initialState: BannerState = new BannerRecordState() as unknown as BannerState;

export function reducer(
  state = initialState,
  { type, payload }: any
): BannerState {
  if (!type) {
    return state;
  }
  switch (type) {

  // <--------------- BANNER LIST ---------------> //

    case actions.ActionTypes.DO_BANNER_LIST: {
      return Object.assign({}, state, {
        bannerListLoaded: false,
        bannerListFailed: false,
        bannerListLoading: true
      });
    }

    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS: {
      const bannerListModel = payload.data.map(_bannerlistModel => {
        const tempbannerListModel = new BannerlistResponseModel(
          _bannerlistModel
        );
        return tempbannerListModel;
      });
      return Object.assign({}, state, {
        bannerListLoaded: true,
        bannerListFailed: false,
        bannerListLoading: false,
        bannerList: bannerListModel
      });
    }

    case actions.ActionTypes.DO_BANNER_LIST_FAIL: {
      return Object.assign({}, state, {
        bannerListLoaded: false,
        bannerListFailed: true,
        bannerListLoading: false
      });
    }

  // <--------------- BANNER LIST COUNT---------------> //


    case actions.ActionTypes.DO_BANNER_LIST_COUNT: {
      return Object.assign({}, state, {
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_COUNT: {
      return Object.assign({}, state, {
        bannerListCount: payload.data,
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_COUNT: {
      return Object.assign({}, state, {
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }

  // <---------------GET BANNER LIST ACTIVE COUNT---------------> //

    case actions.ActionTypes.DO_BANNER_LIST_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActive: payload,
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActiveLoaded: true,
        bannerListAInCtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }

  // <---------------GET BANNER LIST INACTIVE COUNT---------------> //

    case actions.ActionTypes.DO_BANNER_LIST_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActiveLoaded: true,
        bannerListInACtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActive: payload,
        bannerListInActiveLoaded: true,
        bannerListInACtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }


    case actions.ActionTypes.DO_BANNER_PAGINATION_ACTION: {
      return Object.assign({}, state, {
        bannerCountLoading: true,
        bannerCountLoaded: false,
        bannerCountFailed: false
      });
    }
    case actions.ActionTypes.DO_BANNER_PAGINATION_SUCCESS: {
      return Object.assign({}, state, {
        bannerCountLoaded: true,
        bannerCountFailed: false,
        bannerCountLoading: false,
        bannerPagination: payload.bannercount.data
      });
    }
    case actions.ActionTypes.DO_BANNER_PAGINATION_FAIL: {
      return Object.assign({}, state, {
        changePSW: payload,
        failed: true
      });
    }

  // <---------------ADD BANNER LIST ---------------> //


    case actions.ActionTypes.DO_ADD_BANNER_ACTION: {
      return Object.assign({}, state, {
        addBanner:'',
        bannerAddLoaded: true,
        bannerAddFailed: false,
        bannerAddLoading: false
      });
    }

    case actions.ActionTypes.DO_ADD_BANNER_SUCCESS: {
      // const addBanner = new BanneraddResponseModel(payload.data);
      return Object.assign({}, state, {
        bannerAddLoaded: true,
        bannerAddFailed: false,
        bannerAddLoading: false,
        newBanner: payload,
        addBanner: payload.data
      });
    }

    case actions.ActionTypes.DO_ADD_BANNER_FAIL: {
      return Object.assign({}, state, {
        bannerAddLoaded: false,
        bannerAddFailed: true,
        bannerAddLoading: false,
        newBanner: payload
      });
    }

  // <---------------UPDATE BANNER LIST ---------------> //


    case actions.ActionTypes.DO_UPDATE_BANNER_ACTION: {
      return Object.assign({}, state, {
        updateBanner:'',
        bannerUpdateLoading: true,
        bannerUpdateLoaded: false,
        bannerUpdateFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_BANNER_SUCCESS: {
      return Object.assign({}, state, {
        bannerUpdateLoaded: true,
        bannerUpdateFailed: false,
        bannerUpdateLoading: false,
        updateBanner: payload
      });
    }
    case actions.ActionTypes.DO_UPDATE_BANNER_FAIL: {
      return Object.assign({}, state, {
        bannerUpdateLoaded: false,
        bannerUpdateFailed: true,
        bannerUpdateLoading: false,
        updateBanner: payload
      });
    }

  // <---------------DELETE BANNER LIST ---------------> //

    case actions.ActionTypes.DO_DELETE_BANNER_ACTION: {
      return Object.assign({}, state, {
        bannerDeleteLoading: true,
        bannerDeleteLoaded: false,
        bannerDeleteFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETE_BANNER_SUCCESS: {
      return Object.assign({}, state, {
        bannerDeleteLoaded: true,
        bannerDeleteFailed: false,
        bannerDeleteLoading: false,
        deleteBanner: payload
      });
    }

  // <---------------BULK DELETE BANNER LIST ---------------> //


    case actions.ActionTypes.DO_BANNER_BULK_DELETE: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_BANNER_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBanner: payload
      });
    }

    case actions.ActionTypes.DO_BANNER_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBanner: payload
      });
    }

  // <---------------GET BANNER COUNT ---------------> //


    case actions.ActionTypes.GET_BANNER_COUNT: {
      return Object.assign({}, state, {
        getBannerCount: {},
        getBannerCountLoading: true,
        getBannerCountLoaded: false,
        getBannerCountFailed: false,
      });
    }
    case actions.ActionTypes.GET_BANNER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        getBannerCount: payload.data,
        getBannerCountLoading: false,
        getBannerCountLoaded: true,
        getBannerCountFailed: false,
      });
    }
    case actions.ActionTypes.GET_BANNER_COUNT_FAIL: {
      return Object.assign({}, state, {
        getBannerCount: {},
        getBannerCountLoading: false,
        getBannerCountLoaded: false,
        getBannerCountFailed: true,
      });
    }

  // <---------------GET BANNER DETAILS ---------------> //

    case actions.ActionTypes.GET_BANNER_DETAILS: {
      return Object.assign({}, state, {
        getBannerDetails:'',
        getBannerDetailsLoaded: false,
        getBannerDetailsFailed: false,
        getBannerDetailsLoading: false,
      });
    }
    case actions.ActionTypes.GET_BANNER_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        getBannerDetails: payload.data,
        getBannerDetailsLoaded: false,
        getBannerDetailsFailed: false,
        getBannerDetailsLoading: false,
      });
    }
    case actions.ActionTypes.GET_BANNER_DETAILS_FAIL: {
      return Object.assign({}, state, {
        getBannerDetailsLoaded: false,
        getBannerDetailsFailed: false,
        getBannerDetailsLoading: false,
      });
    }

         /*category List*/

         case actions.ActionTypes.CATEGORY_LISTS: {
          return Object.assign({}, state, {
            categoryLists: [],
            categoryListsLoading: true,
            categoryListsActionLoaded: false,
            categoryListsActionFailed: false
          });
        }
    
        case actions.ActionTypes.CATEGORY_LISTS_SUCCESS: {
        
            return Object.assign({}, state, {
              categoryLists: payload.data,
              categoryListsLoading: false,
              categoryListsLoaded: true,
              categoryListsFailed: false
            });
          }
    
        case actions.ActionTypes.CATEGORY_LISTS_FAIL: {
            return Object.assign({}, state, {
              categoryLists: false,
              categoryListsLoading: false,
              categoryListsLoaded: true,
              categoryListsFailed: true
            });
          }
    
             /*Product List*/
             case actions.ActionTypes.PRODUCT_LISTS: {
              return Object.assign({}, state, {
                ProductLists: [],
                ProductListsActionLoading: true,
                ProductListsActionLoaded: false,
                ProductListsActionFailed: false
              });
            }
        
            case actions.ActionTypes.PRODUCT_LISTS_SUCCESS: {
            
                return Object.assign({}, state, {
                  ProductLists: payload.data,
                  ProductListsLoading: false,
                  ProductListsLoaded: true,
                  ProductListsFailed: false
                });
              }
        
            case actions.ActionTypes.PRODUCT_LISTS_FAIL: {
                return Object.assign({}, state, {
                  ProductLists: false,
                  ProductListsLoading: false,
                  ProductListsLoaded: true,
                  ProductListsFailed: true
                });
              }
                
              case actions.ActionTypes.EXPORT_BANNER_ACTION: {
            
                return Object.assign({}, state, {
                  excelLoading: true,
                  excelListLoaded: false,
                });
              }
        
            case actions.ActionTypes.EXPORT_BANNER_SUCCESS: {
                return Object.assign({}, state, {
                  excelLoading: false,
                  excelListLoaded: true,
                });
              }

    default: {
      return state;
    }
  }
}

export const getbanneraddloaded = (state: BannerState) => state.bannerAddLoaded;
export const getbanneraddfailed = (state: BannerState) => state.bannerAddFailed;
export const getbanneraddloading = (state: BannerState) =>
  state.bannerAddLoading;

export const getbannerupdateloading = (state: BannerState) =>
  state.bannerUpdateLoading;
export const getbannerupdateloaded = (state: BannerState) =>
  state.bannerUpdateLoaded;
export const getbannerupdatefailed = (state: BannerState) =>
  state.bannerUpdateFailed;

export const getbannerdeleteloading = (state: BannerState) =>
  state.bannerDeleteLoading;
export const getbannerdeleteloaded = (state: BannerState) =>
  state.bannerDeleteLoaded;
export const getbannerdeletefailed = (state: BannerState) =>
  state.bannerDeleteFailed;

export const getbannerpagination = (state: BannerState) =>
  state.bannerPagination;
export const getbannercountloading = (state: BannerState) =>
  state.bannerCountLoading;
export const getbannercountloaded = (state: BannerState) =>
  state.bannerCountLoaded;
export const getbannercountfailed = (state: BannerState) =>
  state.bannerCountFailed;

export const getbannerlistloaded = (state: BannerState) =>
  state.bannerListLoaded;
export const getbannerlistfailed = (state: BannerState) =>
  state.bannerListFailed;
export const getbannerlistloading = (state: BannerState) =>
  state.bannerListLoading;
export const getBannerlist = (state: BannerState) => state.bannerList;

export const getAddBanner = (state: BannerState) => state.newBanner;
export const getaddBanner = (state: BannerState) => state.addBanner;
export const getUpdatebanner = (state: BannerState) => state.updateBanner;
export const getdeletebanner = (state: BannerState) => state.deleteBanner;

export const getbannerListCount = (state: BannerState) => state.bannerListCount;
export const getbannerListCountLoaded = (state: BannerState) =>
  state.bannerListCountLoaded;
export const getbannerListCountFailed = (state: BannerState) =>
  state.bannerListCountFailed;
export const getbannerListCountLoading = (state: BannerState) =>
  state.bannerListCountLoading;

export const getbannerListActive = (state: BannerState) =>
  state.bannerListActive;
export const getbannerListActiveLoaded = (state: BannerState) =>
  state.bannerListActiveLoaded;
export const getbannerListACtiveFailed = (state: BannerState) =>
  state.bannerListACtiveFailed;
export const getbannerListActiveLoading = (state: BannerState) =>
  state.bannerListActiveLoading;

export const getbannerListInActive = (state: BannerState) =>
  state.bannerListInActive;
export const getbannerListInActiveLoaded = (state: BannerState) =>
  state.bannerListInActiveLoaded;
export const getbannerListInACtiveFailed = (state: BannerState) =>
  state.bannerListInACtiveFailed;
export const getbannerListInActiveLoading = (state: BannerState) =>
  state.bannerListInActiveLoading;


export const getBannerCount = (state: BannerState) =>
  state.getBannerCount;
export const getBannerCountLoading = (state: BannerState) =>
  state.getBannerCountLoading;
export const getBannerCountLoaded = (state: BannerState) =>
  state.getBannerCountLoaded;
export const getBannerCountFailed = (state: BannerState) =>
  state.getBannerCountFailed;


export const getBannerDetails = (state: BannerState) =>
  state.getBannerDetails;
export const getBannerDetailsLoaded = (state: BannerState) =>
  state.getBannerDetailsLoaded;
export const getBannerDetailsLoading = (state: BannerState) =>
  state.getBannerDetailsLoading;
export const getBannerDetailsFailed = (state: BannerState) =>
  state.getBannerDetailsFailed;

         /*category List*/

  export const categoryLists = (state: BannerState) => state.categoryLists;
export const categoryListsLoading = (state: BannerState) => state.categoryListsLoading;
export const categoryListsLoaded = (state: BannerState) => state.categoryListsLoaded;
export const categoryListsFailed = (state: BannerState) => state.categoryListsFailed;

     /*Product List*/

export const ProductLists = (state: BannerState) => state.ProductLists;
export const ProductListsLoading = (state: BannerState) => state.ProductListsLoading;
export const ProductListsLoaded = (state: BannerState) => state.ProductListsLoaded;
export const ProductListsFailed = (state: BannerState) => state.ProductListsFailed;

export const exportExcelLoading = (state: BannerState) => state.excelLoading;
