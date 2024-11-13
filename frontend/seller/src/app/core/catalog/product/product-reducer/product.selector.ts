/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './product.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const productState = (state: AppState) => state.products;

/* Categories List*/
export const CategoriesList = createSelector(productState, fromProduct.CategoriesList);
export const CategoriesListLoading = createSelector(productState, fromProduct.CategoriesListLoading);
export const CategoriesListLoaded = createSelector(productState, fromProduct.CategoriesListLoaded);
export const CategoriesListFailed = createSelector(productState, fromProduct.CategoriesListFailed);

/* Tax List*/
export const TaxList = createSelector(productState, fromProduct.TaxList);
export const TaxListLoading = createSelector(productState, fromProduct.TaxListLoading);
export const TaxListLoaded = createSelector(productState, fromProduct.TaxListLoaded);
export const TaxListFailed = createSelector(productState, fromProduct.TaxListFailed);

/* Product  creation*/
export const ProductCreation = createSelector(productState, fromProduct.ProductCreation);
export const ProductCreationLoading = createSelector(productState, fromProduct.ProductCreationLoading);
export const ProductCreationLoaded = createSelector(productState, fromProduct.ProductCreationLoaded);
export const ProductCreationFailed = createSelector(productState, fromProduct.ProductCreationFailed);

 /* Product Update Details*/
export const ProductUpdateDetails = createSelector(productState, fromProduct.ProductUpdateDetails);
export const ProductUpdateDetailsLoading = createSelector(productState, fromProduct.ProductUpdateDetailsLoading);
export const ProductUpdateDetailsLoaded = createSelector(productState, fromProduct.ProductUpdateDetailsLoaded);
export const ProductUpdateDetailsFailed = createSelector(productState, fromProduct.ProductUpdateDetailsFailed);

/* Product edit*/
 export const Productedit = createSelector(productState, fromProduct.Productedit);
 export const ProducteditLoading = createSelector(productState, fromProduct.ProducteditLoading);
 export const ProducteditLoaded = createSelector(productState, fromProduct.ProducteditLoaded);
 export const ProducteditFailed = createSelector(productState, fromProduct.ProducteditFailed);


/* Product Video upload*/
 export const ProductVideoUpload = createSelector(productState, fromProduct.ProductVideoUpload);
 export const ProductVideoUploadLoading = createSelector(productState, fromProduct.ProductVideoUploadLoading);
 export const ProductVideoUploadLoaded = createSelector(productState, fromProduct.ProductVideoUploadLoaded);
 export const ProductVideoUploadFailed = createSelector(productState, fromProduct.ProductVideoUploadFailed);


/* Product Multi Delete*/
 export const ProductMultiDelete = createSelector(productState, fromProduct.ProductMultiDelete);
 export const ProductMultiDeleteLoading = createSelector(productState, fromProduct.ProductMultiDeleteLoading);
 export const ProductMultiDeleteLoaded = createSelector(productState, fromProduct.ProductMultiDeleteLoaded);
 export const ProductMultiDeleteFailed = createSelector(productState, fromProduct.ProductMultiDeleteFailed);