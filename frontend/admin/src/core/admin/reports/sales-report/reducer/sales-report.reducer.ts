/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../action/sales-report.action';
// state
import { SalesReportState, SalesReportStateRecord } from './sales-report.state';

export const initialState: SalesReportState = new SalesReportStateRecord() as unknown as SalesReportState;

export function reducer(
  state = initialState,
  { type, payload }: any): SalesReportState {
  if (!type) {
    return state;
  }


  switch (type) {

    // <------------------SALES REPORT LIST--------------------> //

    case actions.ActionTypes.SALES_REPORT_LIST: {
      return Object.assign({}, state, {
        salesReportListLoading: true,
        salesReportListLoaded: false,
        salesReportListFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        salesReportList: payload,
        salesReportListLoading: false,
        salesReportListLoaded: true,
        salesReportListFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORT_LIST_FAIL: {
      return Object.assign({}, state, {
        salesReportListLoading: false,
        salesReportListLoaded: false,
        salesReportListFailed: true,
      });
    }

    // <------------------SALES REPORT LIST COUNT--------------------> //

    case actions.ActionTypes.SALES_REPORT_LIST_COUNT: {
      return Object.assign({}, state, {
        salesReportListCountLoading: true,
        salesReportListCountLoaded: false,
        salesReportListCountFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        salesReportListCount: payload.data,
        salesReportListCountLoading: false,
        salesReportListCountLoaded: true,
        salesReportListCountFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        salesReportListCountLoading: false,
        salesReportListCountLoaded: false,
        salesReportListCountFailed: true,
      });
    }


    // PRODUCT LIST


  case actions.ActionTypes.PRODUCT_LIST: {
    return Object.assign({}, state, {
      productListLoading: true,
      productListLoaded: false,
      productListFailed: false,
    });
  }
  case actions.ActionTypes.PRODUCT_LIST_SUCCESS: {
    if (payload && payload.data) {
      payload.data.map(data => {
        if (data.products && data.products.length > 0) {
          data.products = data.products.map(item => {
            item.isSelected = false;
            return item;
          });
        }
      })
  }
    return Object.assign({}, state, {
      productList: payload.data,
      originalProductList: payload.data,
      productListLoading: false,
      productListLoaded: true,
      productListFailed: false,
    });
  }
  case actions.ActionTypes.PRODUCT_LIST_FAIL: {
    return Object.assign({}, state, {
      productListLoading: false,
      productListLoaded: false,
      productListFailed: true,
    });
  }


    // <------------ SELECT PRODUCT LIST -----------> //


    case actions.ActionTypes.SELECT_PRODUCT_LIST: {
      let tempProductList = state.productList ? state.productList : [];
      let tempOrignProductList = state.originalProductList ? state.originalProductList : [];
      let tempSelectedProduct = state.selectedProductList ? state.selectedProductList : [];

      if (payload) {
        if (payload.checked) {
          tempProductList = tempProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = true;
              tempSelectedProduct.push(data);
              return data;
            } else {
              return data;
            }
          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = true;
              return data;
            } else {
              return data;
            }
          });

        } else {

          tempProductList = tempProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = false;
              tempSelectedProduct = tempSelectedProduct.filter(val => {
                if (val.productId === data.productId) {
                  return false;
                } else {
                  return true;
                }
              });
              return data;
            } else {
              return data;
            }
          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = false;
              return data;
            } else {
              return data;
            }
          });
        }
      }
      return Object.assign({}, state, {
        productList: tempProductList,
        originalProductList: tempOrignProductList,
        selectedProductList: tempSelectedProduct
      });
    }

    // <------------ SEARCH PRODUCT LIST -----------> //


    case actions.ActionTypes.SEARCH_PRODUCT_LIST: {
      let tempProduct = state.originalProductList ? JSON.parse(JSON.stringify(state.originalProductList)) : [];
      tempProduct = tempProduct.filter((data: any) => {
        return data.name.toLowerCase().includes(payload.keyword.toLowerCase());
      });
      return Object.assign({}, state, {
        productList: tempProduct,
        productListLoading: false,
        productListLoaded: false,
        productListFailed: true,
      });
    }



    // CATEGORY LIST

    case actions.ActionTypes.CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryListLoading: true,
        categoryListLoaded: false,
        categoryListFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_LIST_SUCCESS: {
      if (payload && payload.data) {
        payload.data = payload.data.map(data => {
          data.isSelected = false;
          return data;
        });
      }
      return Object.assign({}, state, {
        categoryList: payload.data,
        originalCategoryList: payload.data,
        categoryListLoading: false,
        categoryListLoaded: true,
        categoryListFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryListLoaded: false,
        categoryListFailed: true,
      });
    }


    // <------------ SELECT CATEGORY LIST -----------> //


    case actions.ActionTypes.SELECT_CATEGORY_LIST: {
      let tempCategoryList = state.categoryList ? state.categoryList : [];
      let tempProductList = state.productList ? state.productList : [];
      let tempOrignProductList = state.originalProductList ? state.originalProductList : [];
      let tempSelectedProduct = state.selectedProductList ? state.selectedProductList : [];



      if (payload) {
        if (payload.checked) {
          tempCategoryList = tempCategoryList.map(data => {
            if (data.categoryId === payload.list.categoryId) {
              data.isSelected = true;
              return data;
            } else {
              return data;
            }
          });
          tempProductList = tempProductList.map(data => {
            if (data.categoryName === payload.list.name) {
              data.isSelected = true;
              tempSelectedProduct.push(data);
              return data;
            }
          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.categoryName === payload.list.name) {
              data.isSelected = true;
              return data;
            }
          });

        } else {
          tempCategoryList = tempCategoryList.map(data => {
            if (data.categoryId === payload.list.categoryId) {
              data.isSelected = false;
              return data;
            } else {
              return data;
            }
          });
          tempProductList.map(data => {
            if (data.categoryName === payload.list.name) {
              data.isSelected = false;
              tempSelectedProduct = tempSelectedProduct.filter(val => {
                if (val.productId === data.productId) {
                  return false;
                } else {
                  return true;
                }
              });
              return data;
            }
          });

          tempOrignProductList.map(data => {
            if (data.categoryName === payload.list.name) {
              data.isSelected = false;
              return data;
            }
          });

        }
      }
      return Object.assign({}, state, {
        categoryList: tempCategoryList,
        selectedProductList: tempSelectedProduct
      });
    }

    // <------------ SEARCH CATEGORY LIST -----------> //


    case actions.ActionTypes.SEARCH_CATEGORY_LIST: {
      let tempCategory = state.originalCategoryList ? state.originalCategoryList : [];
      tempCategory = tempCategory.filter((item: any) => {
        return item.name.toLowerCase().includes(payload.keyword.toLowerCase());
      });
      return Object.assign({}, state, {
        categoryList: tempCategory,
      });
    }

    case actions.ActionTypes.CLEAR_LIST: {
      return Object.assign({}, state, {
        categoryList: [],
        productList: [],
        originalCategoryList: [],
        originalProductList: [],
        selectedProductList: [],
        salesReportList: [],
        salesReportListLoading: false,
        salesReportListLoaded: false,
        salesReportListFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SALES_REPORT: {
      return Object.assign({}, state, {
        exportLoading: true,
        exportLoaded: false,
        
      });
    }
    case actions.ActionTypes.EXPORT_SALES_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        
        exportLoading: false,
        exportLoaded: true,
      });
    }



    default: {
      return state;
    }
  }
}

// customer bank list

export const salesReportList = (state: SalesReportState) =>
  state.salesReportList;
export const salesReportListLoading = (state: SalesReportState) =>
  state.salesReportListLoading;
export const salesReportListLoaded = (state: SalesReportState) =>
  state.salesReportListLoaded;

// customer bank list count

export const salesReportListCount = (state: SalesReportState) =>
  state.salesReportListCount;
export const salesReportListCountLoading = (state: SalesReportState) =>
  state.salesReportListCountLoading;
export const salesReportListCountLoaded = (state: SalesReportState) =>
  state.salesReportListCountLoaded;


export const productList = (state: SalesReportState) =>
  state.productList;
export const productListLoading = (state: SalesReportState) =>
  state.productListLoading;
export const productListLoaded = (state: SalesReportState) =>
  state.productListLoaded;
export const selectedProductList = (state: SalesReportState) =>
  state.selectedProductList;

export const categoryList = (state: SalesReportState) =>
  state.categoryList;
export const categoryListLoading = (state: SalesReportState) =>
  state.categoryListLoading;
export const categoryListLoaded = (state: SalesReportState) =>
  state.categoryListLoaded;

  export const exportListLoading = (state: SalesReportState) =>
  state.exportLoading;

