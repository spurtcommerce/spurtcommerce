/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromProducts from './vendor-product.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getProductState = (state: AppState) => state.products;

export const exportListLoading = createSelector(
  getProductState,
  fromProducts.exportListLoading
);

export const getCatListResponse = createSelector(
  getProductState,
  fromProducts.getCatListResponse
);
export const getCatListRequestLoading = createSelector(
  getProductState,
  fromProducts.getCatListRequestLoading
);
export const getCatListRequestLoaded = createSelector(
  getProductState,
  fromProducts.getCatListRequestLoaded
);
export const getCatListRequestFailed = createSelector(
  getProductState,
  fromProducts.getCatListRequestFailed
);

export const getSellerList = createSelector(
  getProductState,
  fromProducts.getSellerList
);
export const getSellerListLoading = createSelector(
  getProductState,
  fromProducts.getSellerListLoading
);
export const getSellerListLoaded = createSelector(
  getProductState,
  fromProducts.getSellerListLoaded
);
export const getSellerListFailed = createSelector(
  getProductState,
  fromProducts.getSellerListFailed
);

export const optionList = createSelector(
  getProductState,
  fromProducts.optionList
);
export const optionlistLoading = createSelector(
  getProductState,
  fromProducts.optionListLoading
);
export const optionlistLoaded = createSelector(
  getProductState,
  fromProducts.optionListLoaded
);
export const optionlistFailed = createSelector(
  getProductState,
  fromProducts.optionListFailed
);

export const getProductAdd = createSelector(
  getProductState,
  fromProducts.getProductAdd
);
export const ProductAddLoading = createSelector(
  getProductState,
  fromProducts.getProductAddLoading
);
export const ProductAddLoaded = createSelector(
  getProductState,
  fromProducts.getProductAddLoaded
);
export const ProductAddFailed = createSelector(
  getProductState,
  fromProducts.getProductAddFailed
);
export const getProductCommission = createSelector(
  getProductState,
  fromProducts.getProductCommission
);
export const ProductCommissionLoading = createSelector(
  getProductState,
  fromProducts.getProductCommissionLoading
);
export const ProductCommissionLoaded = createSelector(
  getProductState,
  fromProducts.getProductCommissionLoaded
);
export const ProductCommissionFailed = createSelector(
  getProductState,
  fromProducts.getProductCommissionFailed
);
export const gettingOptionList = createSelector(
  getProductState,
  fromProducts.gettingOptionList
);
export const gettingOptionListLoading = createSelector(
  getProductState,
  fromProducts.gettingOptionListLoading
);
export const gettingOptionListLoaded = createSelector(
  getProductState,
  fromProducts.gettingOptionListLoaded
);
export const gettingOptionListFailed = createSelector(
  getProductState,
  fromProducts.gettingOptionListFailed
);



export const getProductList = createSelector(
  getProductState,
  fromProducts.getProductList
);
export const ProductListLoading = createSelector(
  getProductState,
  fromProducts.getProductListLoading
);
export const ProductListLoaded = createSelector(
  getProductState,
  fromProducts.getProductListLoaded
);
export const ProductListFailed = createSelector(
  getProductState,
  fromProducts.getProductListFailed
);


export const getProductDelete = createSelector(
  getProductState,
  fromProducts.getProductDelete
);
export const ProductDeleteLoading = createSelector(
  getProductState,
  fromProducts.getProductDeleteLoading
);
export const ProductDeleteLoaded = createSelector(
  getProductState,
  fromProducts.getProductDeleteLoaded
);
export const ProductDeleteFailed = createSelector(
  getProductState,
  fromProducts.getProductDeleteFailed
);




export const getSellerApproval = createSelector(
  getProductState,
  fromProducts.getSellerApproval
);
export const getSellerApprovalLoading = createSelector(
  getProductState,
  fromProducts.getSellerApprovalLoading
);
export const getSellerApprovalLoaded = createSelector(
  getProductState,
  fromProducts.getSellerApprovalLoaded
);
export const getSellerApprovalFailed = createSelector(
  getProductState,
  fromProducts.getSellerApprovalFailed
);


export const getProductUpdate = createSelector(
  getProductState,
  fromProducts.getProductUpdate
);

export const ProductUpdateLoading = createSelector(
  getProductState,
  fromProducts.getProductUpdateLoading
);
export const ProductUpdateLoaded = createSelector(
  getProductState,
  fromProducts.getProductUpdateLoaded
);
export const ProductUpdateFailed = createSelector(
  getProductState,
  fromProducts.getProductUpdateFailed
);



export const getProductDetails = createSelector(
  getProductState,
  fromProducts.getProductDetail
);
export const ProductDetailLoading = createSelector(
  getProductState,
  fromProducts.getProducDetailLoading
);
export const ProductDetailLoaded = createSelector(
  getProductState,
  fromProducts.getProductDetailLoaded
);
export const ProductDetailFailed = createSelector(
  getProductState,
  fromProducts.getProductDetailFailed
);

export const videoUpload = createSelector(
  getProductState,
  fromProducts.videoUpload
);
export const videoUploadLoading = createSelector(
  getProductState,
  fromProducts.videoUploadLoading
);
export const videoUploadLoaded = createSelector(
  getProductState,
  fromProducts.videoUploadLoaded
);



export const getProductStatus = createSelector(
  getProductState,
  fromProducts.getProductStatus
);
export const getProductStatusLoading = createSelector(
  getProductState,
  fromProducts.getProductStatusLoading
);
export const getProductStatusLoaded = createSelector(
  getProductState,
  fromProducts.getProductStatusLoaded
);
export const getProductStatusFailed = createSelector(
  getProductState,
  fromProducts.getProductStatusFailed
);

export const vendorProductCount = createSelector(
  getProductState,
  fromProducts.vendorProductCount
);
export const vendorProductCountLoading = createSelector(
  getProductState,
  fromProducts.vendorProductCountLoading
);
export const vendorProductCountLoaded = createSelector(
  getProductState,
  fromProducts.vendorProductCountLoaded
);
export const vendorProductCountFailed = createSelector(
  getProductState,
  fromProducts.vendorProductCountFailed
);


export const vendorProductListCount = createSelector(
  getProductState,
  fromProducts.vendorProductListCount
);
export const vendorProductListCountLoading = createSelector(
  getProductState,
  fromProducts.vendorProductListCountLoading
);
export const vendorProductListCountLoaded = createSelector(
  getProductState,
  fromProducts.vendorProductListCountLoaded
);
export const vendorProductListCountFailed = createSelector(
  getProductState,
  fromProducts.vendorProductListCountFailed
);

export const manufacturerList = createSelector(
  getProductState,
  fromProducts.manufacturerList
);
export const manufacturerListLoading = createSelector(
  getProductState,
  fromProducts.manufacturerListLoading
);
export const manufacturerListLoaded = createSelector(
  getProductState,
  fromProducts.manufacturerListLoaded
);

export const skuArrayList = createSelector(
  getProductState,
  fromProducts.skuArrayList
);

export const productListCount = createSelector(
  getProductState,
  fromProducts.productListCount
);

