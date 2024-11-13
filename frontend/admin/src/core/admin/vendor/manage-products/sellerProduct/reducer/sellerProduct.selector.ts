import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as fromSellerManagement from './sellerProduct.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSellerManagementState = (state: AppState) => state.SellerProduct;



// sellerProductList //
export const sellerProductList = createSelector(getSellerManagementState, fromSellerManagement.sellerProductList);
export const sellerProductListLoading = createSelector(getSellerManagementState, fromSellerManagement.sellerProductListLoading);
export const sellerProductListLoaded = createSelector(getSellerManagementState, fromSellerManagement.sellerProductListLoaded);

// sellerProductCount //
export const sellerProductCount = createSelector(getSellerManagementState, fromSellerManagement.sellerProductCount);
export const sellerProductCountLoading = createSelector(getSellerManagementState, fromSellerManagement.sellerProductCountLoading);
export const sellerProductCountLoaded = createSelector(getSellerManagementState, fromSellerManagement.sellerProductCountLoaded);


// SingleProductDataExport //
export const SingleProductDataExport = createSelector(getSellerManagementState, fromSellerManagement.SingleProductDataExport);
export const SingleProductDataExportLoading = createSelector(getSellerManagementState, fromSellerManagement.SingleProductDataExportLoading);
export const SingleProductDataExportLoaded = createSelector(getSellerManagementState, fromSellerManagement.SingleProductDataExportLoaded);


// MultipleProductDataExport //
export const MultipleProductDataExport = createSelector(getSellerManagementState, fromSellerManagement.MultipleProductDataExport);
export const MultipleProductDataExportLoading = createSelector(getSellerManagementState, fromSellerManagement.MultipleProductDataExportLoading);
export const MultipleProductDataExportLoaded = createSelector(getSellerManagementState, fromSellerManagement.MultipleProductDataExportLoaded);



// approveProduct //
export const approveProduct = createSelector(getSellerManagementState, fromSellerManagement.approveProduct);
export const approveProductLoading = createSelector(getSellerManagementState, fromSellerManagement.approveProductLoading);
export const approveProductLoaded = createSelector(getSellerManagementState, fromSellerManagement.approveProductLoaded);


// rejectProduct //
export const rejectProduct = createSelector(getSellerManagementState, fromSellerManagement.rejectProduct);
export const rejectProductLoading = createSelector(getSellerManagementState, fromSellerManagement.rejectProductLoading);
export const rejectProductLoaded = createSelector(getSellerManagementState, fromSellerManagement.rejectProductLoaded);


// productStatus //
export const productStatus = createSelector(getSellerManagementState, fromSellerManagement.productStatus);
export const productStatusLoading = createSelector(getSellerManagementState, fromSellerManagement.productStatusLoading);
export const productStatusLoaded = createSelector(getSellerManagementState, fromSellerManagement.productStatusLoaded);