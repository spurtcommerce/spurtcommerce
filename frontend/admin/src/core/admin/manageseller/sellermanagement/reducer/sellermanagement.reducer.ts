/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/sellermanagement.action';
// state
import {
  SellerManagementState,
  SellerManagementStateRecord
} from './sellermanagement.state';
export const initialState: SellerManagementState = new SellerManagementStateRecord() as unknown as SellerManagementState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SellerManagementState {
  if (!type) {
    return state;
  }

  switch (type) {


    // attributeList 
    case actions.ActionTypes.ATTRIBUTE_LISTS_ACTION: {
      return Object.assign({}, state, {
        attributeList: [],
        attributeListLoading: true,
        attributeListLoaded: false,
        attributeListFailed: false,
      });
    }

    case actions.ActionTypes.ATTRIBUTE_LISTS_SUCCESS: {

      return Object.assign({}, state, {
        attributeList: payload.data,
        attributeListLoading: false,
        attributeListLoaded: true,
        attributeListFailed: false,
      });
    }

    case actions.ActionTypes.ATTRIBUTE_LISTS_FAIL: {
      return Object.assign({}, state, {
        attributeList: [],
        attributeListLoading: false,
        attributeListLoaded: false,
        attributeListFailed: true,
      });
    }

    // getListAttributecount
    case actions.ActionTypes.GET_LIST_ATTRIBUTE_COUNT_ACTION: {
      return Object.assign({}, state, {
        getListAttributecount: [],
        getListAttributecountLoading: true,
        getListAttributecountLoaded: false,
        getListAttributecountFailed: false,
      });
    }

    case actions.ActionTypes.GET_LIST_ATTRIBUTE_COUNT_SUCCESS: {

      return Object.assign({}, state, {
        getListAttributecount: payload.data,
        getListAttributecountLoading: false,
        getListAttributecountLoaded: true,
        getListAttributecountFailed: false,
      });
    }

    case actions.ActionTypes.GET_LIST_ATTRIBUTE_COUNT_FAIL: {
      return Object.assign({}, state, {
        getListAttributecount: [],
        getListAttributecountLoading: false,
        getListAttributecountLoaded: false,
        getListAttributecountFailed: true,
      });
    }
    // categoryList

    case actions.ActionTypes.GET_CATEGORY_LIST_ACTION: {
      return Object.assign({}, state, {
        getCategoryList: [],
        getCategoryListLoading: true,
        getCategoryListLoaded: false,
        getCategoryListFailed: false,
      });


    }

    case actions.ActionTypes.GET_CATEGORY_LIST_SUCCESS: {

      return Object.assign({}, state, {
        getCategoryList: payload.data,
        getCategoryListLoading: false,
        getCategoryListLoaded: true,
        getCategoryListFailed: false,
      });

    }

    case actions.ActionTypes.GET_CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        getCategoryList: [],
        getCategoryListLoading: false,
        getCategoryListLoaded: false,
        getCategoryListFailed: true,
      });

    }



    // getCategoryListCount

    case actions.ActionTypes.GET_CATEGORY_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        getCategoryListCount: [],
        getCategoryListCountLoading: true,
        getCategoryListCountLoaded: false,
        getCategoryListCountFailed: false,
      });


    }

    case actions.ActionTypes.GET_CATEGORY_LIST_COUNT_SUCCESS: {

      return Object.assign({}, state, {
        getCategoryListCount: payload.data,
        getCategoryListCountLoading: false,
        getCategoryListCountLoaded: true,
        getCategoryListCountFailed: false,
      });

    }

    case actions.ActionTypes.GET_CATEGORY_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        getCategoryListCount: [],
        getCategoryListCountLoading: false,
        getCategoryListCountLoaded: false,
        getCategoryListCountFailed: true,
      });

    }
    // rejectSellerList

    case actions.ActionTypes.REJECT_SELLER_LIST_ACTION: {
      return Object.assign({}, state, {
        rejectSellerList: [],
        rejectSellerListLoading: true,
        rejectSellerListLoaded: false,
        rejectSellerListFailed: false,
      });


    }

    case actions.ActionTypes.REJECT_SELLER_LIST_SUCCESS: {

      return Object.assign({}, state, {
        rejectSellerList: payload.data,
        rejectSellerListLoading: false,
        rejectSellerListLoaded: true,
        rejectSellerListFailed: false,
      });

    }

    case actions.ActionTypes.REJECT_SELLER_LIST_FAIL: {
      return Object.assign({}, state, {
        rejectSellerList: [],
        rejectSellerListLoading: false,
        rejectSellerListLoaded: false,
        rejectSellerListFailed: true,
      });

    }




     // approvedListCount

     case actions.ActionTypes.APPROVED_SELLER_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        approvedListCount: [],
        approvedListCountLoading: true,
        approvedListCountLoaded: false,
        approvedListCountFailed: false,
      });


    }

    case actions.ActionTypes.APPROVED_SELLER_LIST_COUNT_SUCCESS: {

      return Object.assign({}, state, {
        approvedListCount: payload.data,
        approvedListCountLoading: false,
        approvedListCountLoaded: true,
        approvedListCountFailed: false,
      });

    }

    case actions.ActionTypes.APPROVED_SELLER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        approvedListCount: [],
        approvedListCountLoading: false,
        approvedListCountLoaded: false,
        approvedListCountFailed: true,
      });

    }
     // rejectSellerListCount

     case actions.ActionTypes.REJECT_SELLER_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        rejectSellerListCount: [],
        rejectSellerListCountLoading: true,
        rejectSellerListCountLoaded: false,
        rejectSellerListCountFailed: false,
      });


    }

    case actions.ActionTypes.REJECT_SELLER_LIST_COUNT_SUCCESS: {

      return Object.assign({}, state, {
        rejectSellerListCount: payload.data,
        rejectSellerListCountLoading: false,
        rejectSellerListCountLoaded: true,
        rejectSellerListCountFailed: false,
      });

    }

    case actions.ActionTypes.REJECT_SELLER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        rejectSellerListCount: [],
        rejectSellerListCountLoading: false,
        rejectSellerListCountLoaded: false,
        rejectSellerListCountFailed: true,
      });

    }

    case actions.ActionTypes.APPROVE_LIST_STATUS_ACTION: {
      return Object.assign({}, state, {
        approveListStatus: [],
        approveListStatusLoading: true,
        approveListStatusLoaded: false,
        approveListStatusFailed: false,
      });


    }

    case actions.ActionTypes.APPROVE_LIST_STATUS_SUCCESS: {

      return Object.assign({}, state, {
        approveListStatus: payload.data,
        approveListStatusLoading: false,
        approveListStatusLoaded: true,
        approveListStatusFailed: false,
      });

    }

    case actions.ActionTypes.APPROVE_LIST_STATUS_FAIL: {
      return Object.assign({}, state, {
        approveListStatus: [],
        approveListStatusLoading: false,
        approveListStatusLoaded: false,
        approveListStatusFailed: true,
      });

    }



        // countryList

        case actions.ActionTypes.COUNTRY_LIST_ACTION: {
          return Object.assign({}, state, {
            countryList: [],
            countryListLoading: true,
            countryListLoaded: false,
            countryListFailed: false,
          });
    
    
        }
    
        case actions.ActionTypes.COUNTRY_LIST_SUCCESS: {
    
          return Object.assign({}, state, {
            countryList: payload.data,
            countryListLoading: false,
            countryListLoaded: true,
            countryListFailed: false,
          });
    
        }
    
        case actions.ActionTypes.COUNTRY_LIST_FAIL: {
          return Object.assign({}, state, {
            countryList: [],
            countryListLoading: false,
            countryListLoaded: false,
            countryListFailed: true,
          });
    
        }


         // comment

         case actions.ActionTypes.COMMENT_ACTION: {
          return Object.assign({}, state, {
            comment: [],
            commentLoading: true,
            commentLoaded: false,
            commentFailed: false,
          });
    
    
        }
    
        case actions.ActionTypes.COMMENT_SUCCESS: {
    
          return Object.assign({}, state, {
            comment: payload,
            commentLoading: false,
            commentLoaded: true,
            commentFailed: false,
          });
    
        }
    
        case actions.ActionTypes.COMMENT_FAIL: {
          return Object.assign({}, state, {
            comment: [],
            commentLoading: false,
            commentLoaded: false,
            commentFailed: true,
          });
    
        }



    default: {
      return state;
    }
  }
}


// attributeList //
export const attributeList = (state: SellerManagementState) => state.attributeList;
export const attributeListLoading = (state: SellerManagementState) => state.attributeListLoading;
export const attributeListLoaded = (state: SellerManagementState) => state.attributeListLoaded;

// getListAttributecount
export const getListAttributecount = (state: SellerManagementState) => state.getListAttributecount;
export const getListAttributecountLoading = (state: SellerManagementState) => state.getListAttributecountLoading;
export const getListAttributecountLoaded = (state: SellerManagementState) => state.getListAttributecountLoaded;


// categoryList
export const getCategoryList = (state: SellerManagementState) => state.getCategoryList;
export const getCategoryListLoading = (state: SellerManagementState) => state.getCategoryListLoading;
export const getCategoryListLoaded = (state: SellerManagementState) => state.getCategoryListLoaded;



// getCategoryListCount
export const getCategoryListCount = (state: SellerManagementState) => state.getCategoryListCount;
export const getCategoryListCountLoading = (state: SellerManagementState) => state.getCategoryListCountLoading;
export const getCategoryListCountLoaded = (state: SellerManagementState) => state.getCategoryListCountLoaded;





//rejectSellerList

export const rejectSellerList = (state: SellerManagementState) => state.rejectSellerList;
export const rejectSellerListLoading = (state: SellerManagementState) => state.rejectSellerListLoading;
export const rejectSellerListLoaded = (state: SellerManagementState) => state.rejectSellerListLoaded;



//approvedListCount

export const approvedListCount = (state: SellerManagementState) => state.approvedListCount;
export const approvedListCountLoading = (state: SellerManagementState) => state.approvedListCountLoading;
export const approvedListCountLoaded = (state: SellerManagementState) => state.approvedListCountLoaded;

//rejectSellerListCount

export const rejectSellerListCount = (state: SellerManagementState) => state.rejectSellerListCount;
export const rejectSellerListCountLoading = (state: SellerManagementState) => state.rejectSellerListCountLoading;
export const rejectSellerListCountLoaded = (state: SellerManagementState) => state.rejectSellerListCountLoaded;


//approveListStatus

export const approveListStatus = (state: SellerManagementState) => state.approveListStatus;
export const approveListStatusLoading = (state: SellerManagementState) => state.approveListStatusLoading;
export const approveListStatusLoaded = (state: SellerManagementState) => state.approveListStatusLoaded;


//countryList

export const countryList = (state: SellerManagementState) => state.countryList;
export const countryListLoading = (state: SellerManagementState) => state.countryListLoading;
export const countryListLoaded = (state: SellerManagementState) => state.countryListLoaded;

//comment

export const comment = (state: SellerManagementState) => state.comment;
export const commentLoading = (state: SellerManagementState) => state.commentLoading;
export const commentLoaded = (state: SellerManagementState) => state.commentLoaded;
