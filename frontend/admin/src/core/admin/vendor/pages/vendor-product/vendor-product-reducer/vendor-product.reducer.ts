/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../vendor-product-action/vendor-product.action';
import {
  ProductsState,
  ProductsRecord
} from '../vendor-product-reducer/vendor-product.state';
import { ApprovalRequest } from '../vendor-product-models/seller-approval.request.model';
import { DetailModel } from '../vendor-product-models/detail.model';
import { DetailResponseModel } from '../vendor-product-models/detail-response.model';

export const initialState: ProductsState = new ProductsRecord() as unknown as ProductsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductsState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <--------------CATEGORY LIST---------------> //

    case actions.ActionTypes.DO_CAT_LIST: {
      return Object.assign({}, state, {
        catListRequestLoading: true,
        catListRequestLoaded: false,
        catListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_CAT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        catListResponse: payload.data,
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_CAT_LIST_FAIL: {
      return Object.assign({}, state, {
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: true
      });
    }


    // <--------------VIDEO UPLOAD---------------> //

    case actions.ActionTypes.VIDEO_UPLOAD: {
      return Object.assign({}, state, {
        videoUploadLoading: true,
        videoUploadLoaded: false,
        videoUploadFailed: false
      });
    }

    case actions.ActionTypes.VIDEO_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        videoUpload: payload,
        videoUploadLoading: false,
        videoUploadLoaded: true,
        videoUploadFailed: false
      });
    }

    case actions.ActionTypes.VIDEO_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        videoUploadLoading: false,
        videoUploadLoaded: true,
        videoUploadFailed: true
      });
    }

    // <--------------VENDOR LIST---------------> //

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
        sellerListLoaded: true,
        sellerListFailed: true
      });
    }

    // <--------------PRODUCT ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        productAdded: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

    // <--------------PRODUCT COMMISION---------------> //

    case actions.ActionTypes.DO_PRODUCT_COMMISSION: {
      return Object.assign({}, state, {
        commissionLoading: true,
        commissionLoaded: false,
        commissionFailed: false,
        productCommission: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_COMMISSION_SUCCESS: {
      if (payload) {
        let array: any = [];
        array = state.productCommission.productId.split(',');
        state.productList.map(data => {
          array.forEach(datas => {
            if (data.productId === Number(datas)) {
              data.vendorProductCommission = state.productCommission.commission;
            }
          });
        });
      }
      return Object.assign({}, state, {
        commissionLoading: false,
        commissionLoaded: true,
        commissionFailed: false,
        productList: state.productList
      });
    }

    case actions.ActionTypes.DO_PRODUCT_COMMISSION_FAIL: {
      return Object.assign({}, state, {
        commissionLoading: false,
        commissionLoaded: false,
        commissionFailed: true
      });
    }

    // <--------------CLEAR PRODUCT DETAILS---------------> //

    case actions.ActionTypes.DO_CLEAR_PRODUCT_DETAILS: {
      return Object.assign({}, state, {
        productDetail: {}
      });
    }

    // <--------------PRODUCT REMOVE---------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE_LIST: {
      const Data: any = state.productList;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveLists: Data,
        productRemoveListResponse: false,
        productRemoveListRequestLoading: true,
        productRemoveListRequestLoaded: false,
        productRemoveListRequestFailed: false
      });
    }

    // <--------------PRODUCT ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD_LIST: {
      const Data: any = JSON.parse(JSON.stringify(state.productList));
      Data.push(payload);

      return Object.assign({}, state, {
        productList: Data,
        productAddListResponse: false,
        productAddListRequestLoading: true,
        productAddListRequestLoaded: false,
        productAddListRequestFailed: false
      });
    }

    // <--------------CATEGORY REMOVE---------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE: {
      const Data: any = state.catListResponse;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveRequestLoading: true,
        productRemoveRequestLoaded: false,
        productRemoveRequestFailed: false
      });
    }

    // <--------------CATEGORY ADD---------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD_VENDOR: {
      const Data: any = state.catListResponse;
      Data.push(payload);
      return Object.assign({}, state, {
        catListResponse: Data,
        productAddResponse: Data,
        productAddRequestLoading: true,
        productAddRequestLoaded: false,
        productAddRequestFailed: false
      });
    }

    // <--------------GET PRODUCT LIST---------------> //

    case actions.ActionTypes.GET_PRODUCT_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        productList: payload.data,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }

    // <--------------PRODUCT DELETE---------------> //

    case actions.ActionTypes.DO_PRODUCT_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        productDelete: payload

      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_SUCCESS: {
      if (payload) {
        state.productList = state.productList.filter(data => {
          if (data.productId === state.productDelete.productId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false,
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
      });
    }

    // <--------------SELLER APPROVAL---------------> //

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

    // <--------------PRODUCT UPDATE---------------> //

    case actions.ActionTypes.DO_PRODUCT_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        productUpdate: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }

    // <--------------PRODUCT STATUS CHANGE---------------> //

    case actions.ActionTypes.DO_STATUS: {
      return Object.assign({}, state, {
        productStatusLoading: true,
        productStatusLoaded: false,
        productStatusFailed: false
      });
    }

    case actions.ActionTypes.DO_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        productStatusLoading: false,
        productStatusLoaded: true,
        productStatusFailed: false,
        productStatus: payload
      });
    }

    case actions.ActionTypes.DO_STATUS_FAIL: {
      return Object.assign({}, state, {
        productStatusLoading: false,
        productStatusLoaded: false,
        productStatusFailed: true
      });
    }

    // <--------------PRODUCT DETAILS---------------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      let tempProbabilityArray: any = [];
      let skuArray: any = [];
      if (payload.data && payload.data.isSimplified == 1) {
          skuArray.push({"skuName":payload.data.sku});
      }

      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        productDetail: new DetailResponseModel(payload.data),
        probabiltyOptions: tempProbabilityArray,
        originalProbabiltyArray: tempProbabilityArray,
        skuArrayList: skuArray,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

    // <--------------PRODUCT Overall COUNT---------------> //


    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        vendorProductCount: {},
        vendorProductCountLoading: true,
        vendorProductCountLoaded: false,
        vendorProductCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorProductCount: payload.data,
        vendorProductCountLoading: false,
        vendorProductCountLoaded: true,
        vendorProductCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorProductCount: {},
        vendorProductCountLoading: false,
        vendorProductCountLoaded: false,
        vendorProductCountFailed: true,
      });
    }

    // <--------------PRODUCT PRODUCT COUNT FOR PAGINATION---------------> //

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        vendorProductListCount: {},
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorProductListCount: payload.data,
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorProductListCount: {},
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    // <--------------MANUFACTURER LIST---------------> //

    case actions.ActionTypes.MANUFACTURER_LIST: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: true,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        manufacturerList: payload.data,
        manufacturerListLoading: false,
        manufacturerListLoaded: true,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_FAIL: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: true,
      });
    }

    // <--------------SELECT CATEGORY ---------------> //

    case actions.ActionTypes.SELECT_CATEGORY: {
      let tempCategoryList = state.catListResponse;
      if (state.catListResponse && state.catListResponse.length > 0) {
        tempCategoryList = tempCategoryList.filter(data => {
          if (data.categoryId === payload.list.categoryId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        catListResponse: tempCategoryList
      });
    }

    // <--------------REMOVE CATEGORY ---------------> //

    case actions.ActionTypes.REMOVE_CATEGORY: {
      const tempCategoryList = state.catListResponse;
      tempCategoryList.push(payload.list);
      return Object.assign({}, state, {
        catListResponse: tempCategoryList
      });
    }


    // <--------------PRODUCT COUNT---------------> //


    case actions.ActionTypes.PRODUCT_LIST_COUNT: {
      return Object.assign({}, state, {
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        productListCount: payload.data,
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        productListCountLoading: false,
        productListCountLoaded: false,
        productListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_EXCEL: {
      return Object.assign({}, state, {
        exportListLoading: true,
        exportListLoaded: false,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_EXCEL_SUCCESS: {
      return Object.assign({}, state, {
        exportListLoading: false,
        exportListLoaded: true,
      });
    }


    default: {
      return state;
    }
  }
}

export const getCatListResponse = (state: ProductsState) =>
  state.catListResponse;
export const getCatListRequestLoading = (state: ProductsState) =>
  state.catListRequestLoading;
export const getCatListRequestLoaded = (state: ProductsState) =>
  state.catListRequestLoaded;
export const getCatListRequestFailed = (state: ProductsState) =>
  state.catListRequestFailed;

export const getSellerList = (state: ProductsState) => state.sellerList;
export const getSellerListLoading = (state: ProductsState) =>
  state.sellerListLoading;
export const getSellerListLoaded = (state: ProductsState) =>
  state.sellerListLoaded;
export const getSellerListFailed = (state: ProductsState) =>
  state.sellerListFailed;

export const optionList = (state: ProductsState) => state.optionList;
export const optionListLoading = (state: ProductsState) =>
  state.optionListLoading;
export const optionListLoaded = (state: ProductsState) =>
  state.optionListLoaded;
export const optionListFailed = (state: ProductsState) =>
  state.optionListFailed;

export const getProductAdd = (state: ProductsState) => state.productAdded;

export const getProductAddLoading = (state: ProductsState) => state.addLoading;
export const getProductAddLoaded = (state: ProductsState) => state.addLoaded;
export const getProductAddFailed = (state: ProductsState) => state.addFailed;

export const getProductCommission = (state: ProductsState) => state.productCommission;

export const getProductCommissionLoading = (state: ProductsState) => state.commissionLoading;
export const getProductCommissionLoaded = (state: ProductsState) => state.commissionLoaded;
export const getProductCommissionFailed = (state: ProductsState) => state.commissionFailed;


export const gettingOptionList = (state: ProductsState) =>
  state.gettingoptionList;
export const gettingOptionListLoading = (state: ProductsState) =>
  state.gettingOptionLoading;
export const gettingOptionListLoaded = (state: ProductsState) =>
  state.gettingOptionLoaded;
export const gettingOptionListFailed = (state: ProductsState) =>
  state.gettingOptionFailed;



export const getProductList = (state: ProductsState) => state.productList;
export const getProductListLoading = (state: ProductsState) => state.listLoading;
export const getProductListLoaded = (state: ProductsState) => state.listLoaded;
export const getProductListFailed = (state: ProductsState) => state.listFailed;


export const getProductDelete = (state: ProductsState) => state.productDelete;
export const getProductDeleteLoading = (state: ProductsState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: ProductsState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: ProductsState) =>
  state.deleteFailed;



export const getSellerApproval = (state: ProductsState) => state.sellerApproval;
export const getSellerApprovalLoading = (state: ProductsState) =>
  state.sellerApprovalLoading;
export const getSellerApprovalLoaded = (state: ProductsState) =>
  state.sellerApprovalLoaded;
export const getSellerApprovalFailed = (state: ProductsState) =>
  state.sellerApprovalFailed;

export const getProductStatus = (state: ProductsState) => state.productStatus;
export const getProductStatusLoading = (state: ProductsState) =>
  state.productStatusLoading;
export const getProductStatusLoaded = (state: ProductsState) =>
  state.productStatusLoaded;
export const getProductStatusFailed = (state: ProductsState) =>
  state.productStatusFailed;


export const getProductUpdate = (state: ProductsState) => state.productUpdate;
export const getProductUpdateLoading = (state: ProductsState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: ProductsState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: ProductsState) =>
  state.updateFailed;


export const getProductDetail = (state: ProductsState) => state.productDetail;
export const getProducDetailLoading = (state: ProductsState) =>
  state.detailLoading;
export const getProductDetailLoaded = (state: ProductsState) =>
  state.detailLoaded;
export const getProductDetailFailed = (state: ProductsState) =>
  state.detailFailed;

export const vendorProductCount = (state: ProductsState) =>
  state.vendorProductCount;
export const vendorProductCountLoading = (state: ProductsState) =>
  state.vendorProductCountLoading;
export const vendorProductCountLoaded = (state: ProductsState) =>
  state.vendorProductCountLoaded;
export const vendorProductCountFailed = (state: ProductsState) =>
  state.vendorProductCountFailed;

export const vendorProductListCount = (state: ProductsState) =>
  state.vendorProductListCount;
export const vendorProductListCountLoading = (state: ProductsState) =>
  state.vendorProductListCountLoading;
export const vendorProductListCountLoaded = (state: ProductsState) =>
  state.vendorProductListCountLoaded;
export const vendorProductListCountFailed = (state: ProductsState) =>
  state.vendorProductListCountFailed;


export const manufacturerList = (state: ProductsState) =>
  state.manufacturerList;
export const manufacturerListLoading = (state: ProductsState) =>
  state.manufacturerListLoading;
export const manufacturerListLoaded = (state: ProductsState) =>
  state.manufacturerListLoaded;

export const videoUpload = (state: ProductsState) =>
  state.videoUpload;
export const videoUploadLoading = (state: ProductsState) =>
  state.videoUploadLoading;
export const videoUploadLoaded = (state: ProductsState) =>
  state.videoUploadLoaded;
  
export const skuArrayList = (state: ProductsState) =>
  state.skuArrayList;


export const productListCount = (state: ProductsState) =>
  state.productListCount;

  export const exportListLoading = (state: ProductsState) =>
  state.exportListLoading;
