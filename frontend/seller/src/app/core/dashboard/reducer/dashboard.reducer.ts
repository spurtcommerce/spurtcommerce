/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/dashboard.action';
import { DashboardState, DashboardRecord } from './dashboard.state';
import { ProfileModel } from '../models/profile.model';

export const initialState: DashboardState = (new DashboardRecord() as unknown) as DashboardState;
export function reducer(
  state = initialState,
  { type, payload }: any
): DashboardState {
  if (!type) {
    return state;
  }
  switch (type) {

    // <-----------------GET DASHBOARD COUNT------------------> //

    case actions.ActionTypes.GET_DASHBOARD_COUNT: {
      return Object.assign({}, state, {
        dashboardCountLoading: true,
        dashboardCountLoaded: false,
        dashboardCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        dashboardCount: payload.data,
        dashboardCountLoading: false,
        dashboardCountLoaded: true,
        dashboardCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_COUNT_FAIL: {
      return Object.assign({}, state, {
        dashboardCount: 0,
        dashboardCountLoading: false,
        dashboardCountLoaded: true,
        dashboardCountFailed: true
      });
    }

    // <-----------------GET PROFILE------------------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        profile: new ProfileModel(payload.data),
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true
      });
    }

    // <-----------------EDIT PROFILE------------------> //

    case actions.ActionTypes.EDIT_PROFILE: {
      return Object.assign({}, state, {
        editProfileLoading: true,
        editProfileLoaded: false,
        editProfileFailed: false
      });
    }

    case actions.ActionTypes.EDIT_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        editprofile: new ProfileModel(payload.data),
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: false
      });
    }

    case actions.ActionTypes.EDIT_PROFILE_FAIL: {
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: true
      });
    }

    // <-----------------LOGOUT------------------> //

    case actions.ActionTypes.DO_SIGN_OUT: {
      const validUser = false;
      return Object.assign({}, state, {
        profileValid: validUser,
        dashboardCount: 0,
        profile: {}
      });
    }


    // <-----------------GET LANGUAGE LIST------------------> //

    case actions.ActionTypes.GET_LANGUAGELIST: {
      return Object.assign({}, state, {
        getlanguageLoading: true,
        getlanguageLoaded: false,
        getlanguageFailed: false
      });
    }

    case actions.ActionTypes.GET_LANGUAGELIST_SUCCESS: {
      return Object.assign({}, state, {
        languageList: payload.data,
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: false
      });
    }

    case actions.ActionTypes.GET_LANGUAGELIST_FAIL: {
      return Object.assign({}, state, {
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: true
      });
    }

    // <-----------------GET TOP SELLING PRODUCT LIST------------------> //

    case actions.ActionTypes.TOP_SELLING_PRODUCTS: {
      return Object.assign({}, state, {
        getTopSellingProductsLoading: true,
        getTopSellingProductsLoaded: false,
        getTopSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.TOP_SELLING_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        getTopSellingProducts: payload.data,
        getTopSellingProductsLoading: false,
        getTopSellingProductsLoaded: true,
        getTopSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.TOP_SELLING_PRODUCTS_FAIL: {
      return Object.assign({}, state, {
        getTopSellingProductsLoading: false,
        getTopSellingProductsLoaded: true,
        getTopSellingProductsFailed: true
      });
    }

    // <-----------------GET ORDER LIST------------------> //

    case actions.ActionTypes.GET_ORDER_LIST: {
      return Object.assign({}, state, {
        orderList: [],
        orderListLoading: false,
        orderListLoaded: false,
        orderListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ORDER_LIST_SUCCESS: {
      const currentDate = new Date();
      let todayOrderModel: any = [];
      let previousOrderModel: any = [];
      const date = new Date();
      const todayDate = (new Date().getDate());
      let previousDate: any = new Date();
      previousDate.setDate(previousDate.getDate() - 1);
      previousDate = previousDate.getDate();
      const currentMonth = (new Date().getMonth());
      const currentYear = (new Date().getFullYear());
      if (payload?.data) {
        todayOrderModel = (payload?.data).filter(data => {
          if ((new Date(data.createdDate).getDate() === todayDate) && (new Date(data.createdDate).getMonth() === currentMonth) && (new Date(data.createdDate).getFullYear() === currentYear)) {
            return true;
          } else {
            return false;
          }
        });
        previousOrderModel = (payload?.data).filter(data => {
          if (
            ((new Date(data.createdDate).getDate()) === previousDate) && (new Date(data.createdDate).getMonth() === currentMonth) && (new Date(data.createdDate).getMonth() === currentMonth) &&
            (new Date(data.createdDate).getFullYear() === currentYear)) {
            return true;
          } else {
            return false;
          }
        });
      }
      return Object.assign({}, state, {
        orderList: payload.data,
        todayOrderList: todayOrderModel,
        previousOrderList: previousOrderModel,
        orderListLoading: false,
        orderListLoaded: false,
        orderListFailed: false,
      });
    }
    case actions.ActionTypes.GET_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        orderList: [],
        orderListLoading: false,
        orderListLoaded: false,
        orderListFailed: false,
      });
    }

  

////////////////////////////count////////////


case actions.ActionTypes.GET_ORDER_LIST_COUNT: {
  return Object.assign({}, state, {
    orderListCount: [],
    orderListCountLoading: false,
    orderListCountLoaded: false,
    orderListCountFailed: false,
  });
}

case actions.ActionTypes.GET_ORDER_LIST_COUNT_SUCCESS: {
  const currentDate = new Date();
  let todayOrderModel: any = [];
  let previousOrderModel: any = [];
  const date = new Date();
  const todayDate = (new Date().getDate());
  let previousDate: any = new Date();
  previousDate.setDate(previousDate.getDate() - 1);
  previousDate = previousDate.getDate();
  const currentMonth = (new Date().getMonth());
  const currentYear = (new Date().getFullYear());
    //  if (payload?.data) {
    //     todayOrderModel = payload?.data.filter(data => {
    //       if ((new Date(data.createdDate).getDate() === todayDate) && (new Date(data.createdDate).getMonth() === currentMonth) && (new Date(data.createdDate).getFullYear() === currentYear)) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     });
    //     previousOrderModel = payload?.data.filter(data => {
    //       if (
    //         ((new Date(data.createdDate).getDate()) === previousDate) && (new Date(data.createdDate).getMonth() === currentMonth) && (new Date(data.createdDate).getMonth() === currentMonth) &&
    //         (new Date(data.createdDate).getFullYear() === currentYear)) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     });
    //   }
  return Object.assign({}, state, {
    orderListCount: payload.data,
    todayOrderListCount: todayOrderModel,
    previousOrderListCount: previousOrderModel,
    orderListCountLoading: false,
    orderListCountLoaded: false,
    orderListCountFailed: false,
  });
}
case actions.ActionTypes.GET_ORDER_LIST_COUNT_FAIL: {
  return Object.assign({}, state, {
    orderListCount: [],
    orderListCountLoading: false,
    orderListCountLoaded: false,
    orderListCountFailed: false,
  });
}

default: {
  return state;
}
















  }



}

export const getDashboardCount = (state: DashboardState) => state.dashboardCount;
export const getProfile = (state: DashboardState) => state.profile;
export const getProfileValid = (state: DashboardState) => state.profileValid;

export const getDashboardCountLoading = (state: DashboardState) =>
  state.dashboardCountLoading;
export const getDashboardCountLoaded = (state: DashboardState) =>
  state.dashboardCountLoaded;
export const getDashboardCountFailed = (state: DashboardState) =>
  state.dashboardCountFailed;

export const getProfileLoading = (state: DashboardState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: DashboardState) => state.getProfileLoaded;
export const getProfileFailed = (state: DashboardState) => state.getProfileFailed;

export const editProfile = (state: DashboardState) =>
  state.editProfile;
export const editProfileLoading = (state: DashboardState) =>
  state.editProfileLoading;
export const editProfileLoaded = (state: DashboardState) => state.editProfileLoaded;
export const editProfileFailed = (state: DashboardState) => state.editProfileFailed;

export const getLanguages = (state: DashboardState) => state.languageList;
export const getLanguageLoading = (state: DashboardState) =>
  state.getlanguageLoading;
export const getLanguageLoaded = (state: DashboardState) =>
  state.getlanguageLoaded;
export const getLanguageFailed = (state: DashboardState) =>
  state.getlanguageFailed;

export const getTopSellingProducts = (state: DashboardState) => state.getTopSellingProducts;
export const getTopSellingProductsLoading = (state: DashboardState) =>
  state.getTopSellingProductsLoading;
export const getTopSellingProductsLoaded = (state: DashboardState) =>
  state.getTopSellingProductsLoaded;
export const getTopSellingProductsFailed = (state: DashboardState) =>
  state.getTopSellingProductsFailed;

export const orderList = (state: DashboardState) => state.orderList;
export const todayOrderList = (state: DashboardState) => state.todayOrderList;
export const previousOrderList = (state: DashboardState) => state.previousOrderList;

export const orderListLoading = (state: DashboardState) =>
  state.orderListLoading;
export const orderListLoaded = (state: DashboardState) =>
  state.orderListLoaded;
export const orderListFailed = (state: DashboardState) =>
  state.orderListFailed;



  export const orderListCount = (state: DashboardState) => state.orderListCount;
export const todayOrderListCount = (state: DashboardState) => state.todayOrderListCount;
export const previousOrderListCount = (state: DashboardState) => state.previousOrderListCount;

export const orderListCountLoading = (state: DashboardState) =>
  state.orderListCountLoading;
export const orderListCountLoaded = (state: DashboardState) =>
  state.orderListCountLoaded;
export const orderListCountFailed = (state: DashboardState) =>
  state.orderListCountFailed;

