/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../product-action/product.action';
// state
import { ProductStates, ProductRecord } from './product.state';



export const initialState: ProductStates = new ProductRecord() as unknown as ProductStates;

export function reducer(state = initialState, { type, payload }: any): ProductStates {
    if (!type) {
        return state;
    }
    switch (type) {

        // <-------------GET PRODUCT LOCALIZALION LIST--------------> //

        case actions.ActionTypes.CATEGORIES_LIST_ACTION: {
            return Object.assign({}, state, {
                CategoriesListLoading: true,
                CategoriesListLoaded: false,
                CategoriesListFailed: false,
            });
        }

        case actions.ActionTypes.CATEGORIES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                CategoriesList: payload,
                CategoriesListLoading: false,
                CategoriesListLoaded: true,
                CategoriesListFailed: false,
            });
        }

        case actions.ActionTypes.CATEGORIES_LIST_FAIL: {
            return Object.assign({}, state, {
                CategoriesListLoading: false,
                CategoriesListLoaded: false,
                CategoriesListFailed: true,
            });
        }


          /* Tax List*/

          case actions.ActionTypes.TAX_LIST_ACTION: {
            return Object.assign({}, state, {
                TaxListLoading: true,
                TaxListLoaded: false,
                TaxListFailed: false,
            });
        }

        case actions.ActionTypes.TAX_LIST_SUCCESS: {
            return Object.assign({}, state, {
                TaxList: payload,
                TaxListLoading: false,
                TaxListLoaded: true,
                TaxListFailed: false,
            });
        }

        case actions.ActionTypes.TAX_LIST_FAIL: {
            return Object.assign({}, state, {
                TaxListLoading: false,
                TaxListLoaded: false,
                TaxListFailed: true,
            });
        }


         /* Product  creation*/

         case actions.ActionTypes.PRODUCT_CREATION_ACTION: {
            return Object.assign({}, state, {
                ProductCreation:'',
                ProductCreationLoading: true,
                ProductCreationLoaded: false,
                ProductCreationFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_CREATION_SUCCESS: {
            return Object.assign({}, state, {
                ProductCreation: payload,
                ProductCreationLoading: false,
                ProductCreationLoaded: true,
                ProductCreationFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_CREATION_FAIL: {
            return Object.assign({}, state, {
                ProductCreationLoading: false,
                ProductCreationLoaded: false,
                ProductCreationFailed: true,
            });
        }

         /* Product Update Details*/

        case actions.ActionTypes.PRODUCT_UPDATE_DETAILS_ACTION: {
            return Object.assign({}, state, {
                ProductUpdateDetailsLoading: true,
                ProductUpdateDetailsLoaded: false,
                ProductUpdateDetailsFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_UPDATE_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                ProductUpdateDetails: payload,
                ProductUpdateDetailsLoading: false,
                ProductUpdateDetailsLoaded: true,
                ProductUpdateDetailsFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_UPDATE_DETAILS_FAIL: {
            return Object.assign({}, state, {
                ProductUpdateDetailsLoading: false,
                ProductUpdateDetailsLoaded: false,
                ProductUpdateDetailsFailed: true,
            });
        }


         /* Product edit*/

          case actions.ActionTypes.PRODUCT_EDIT_ACTION: {
            return Object.assign({}, state, {
                ProducteditLoading: true,
                ProducteditLoaded: false,
                ProducteditFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_EDIT_SUCCESS: {
            return Object.assign({}, state, {
                Productedit: payload,
                ProducteditLoading: false,
                ProducteditLoaded: true,
                ProducteditFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_EDIT_FAIL: {
            return Object.assign({}, state, {
                ProducteditLoading: false,
                ProducteditLoaded: false,
                ProducteditFailed: true,
            });
        }

        /* Product Video upload*/

        case actions.ActionTypes.PRODUCT_VIDEO_UPLOAD_ACTION: {
            return Object.assign({}, state, {
                ProductVideoUploadLoading: true,
                ProductVideoUploadLoaded: false,
                ProductVideoUploadFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_VIDEO_UPLOAD_SUCCESS: {
            return Object.assign({}, state, {
                ProductVideoUpload: payload,
                ProductVideoUploadLoading: false,
                ProductVideoUploadLoaded: true,
                ProductVideoUploadFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_VIDEO_UPLOAD_FAIL: {
            return Object.assign({}, state, {
                ProductVideoUploadLoading: false,
                ProductVideoUploadLoaded: false,
                ProductVideoUploadFailed: true,
            });
        }

         /* Product Multi Delete*/

         case actions.ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_ACTION: {
            return Object.assign({}, state, {
                ProductMultiDeleteLoading: true,
                ProductMultiDeleteLoaded: false,
                ProductMultiDeleteFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                ProductMultiDelete: payload,
                ProductMultiDeleteLoading: false,
                ProductMultiDeleteLoaded: true,
                ProductMultiDeleteFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_VIDEO_MULTI_DELETE_FAIL: {
            return Object.assign({}, state, {
                ProductMultiDeleteLoading: false,
                ProductMultiDeleteLoaded: false,
                ProductMultiDeleteFailed: true,
            });
        }

        default: {
            return state;
        }
    }
}

// product localization list 
export const CategoriesList = (state: ProductStates) => state.CategoriesList;
export const CategoriesListLoading = (state: ProductStates) => state.CategoriesListLoading;
export const CategoriesListLoaded = (state: ProductStates) => state.CategoriesListLoaded;
export const CategoriesListFailed = (state: ProductStates) => state.CategoriesListFailed;

/* Tax List*/
export const TaxList = (state: ProductStates) => state.TaxList;
export const TaxListLoading = (state: ProductStates) => state.TaxListLoading;
export const TaxListLoaded = (state: ProductStates) => state.TaxListLoaded;
export const TaxListFailed = (state: ProductStates) => state.TaxListFailed;

/* Product  creation*/
export const ProductCreation = (state: ProductStates) => state.ProductCreation;
export const ProductCreationLoading = (state: ProductStates) => state.ProductCreationLoading;
export const ProductCreationLoaded = (state: ProductStates) => state.ProductCreationLoaded;
export const ProductCreationFailed = (state: ProductStates) => state.ProductCreationFailed;

 /* Product Update Details*/
export const ProductUpdateDetails = (state: ProductStates) => state.ProductUpdateDetails;
export const ProductUpdateDetailsLoading = (state: ProductStates) => state.ProductUpdateDetailsLoading;
export const ProductUpdateDetailsLoaded = (state: ProductStates) => state.ProductUpdateDetailsLoaded;
export const ProductUpdateDetailsFailed = (state: ProductStates) => state.ProductUpdateDetailsFailed;

/* Product edit*/
 export const Productedit = (state: ProductStates) => state.Productedit;
 export const ProducteditLoading = (state: ProductStates) => state.ProducteditLoading;
 export const ProducteditLoaded = (state: ProductStates) => state.ProducteditLoaded;
 export const ProducteditFailed = (state: ProductStates) => state.ProducteditFailed;

/* Product Video upload*/
 export const ProductVideoUpload = (state: ProductStates) => state.ProductVideoUpload;
 export const ProductVideoUploadLoading = (state: ProductStates) => state.ProductVideoUploadLoading;
 export const ProductVideoUploadLoaded = (state: ProductStates) => state.ProductVideoUploadLoaded;
 export const ProductVideoUploadFailed = (state: ProductStates) => state.ProductVideoUploadFailed;

/* Product Multi Delete*/
 export const ProductMultiDelete = (state: ProductStates) => state.ProductMultiDelete;
 export const ProductMultiDeleteLoading = (state: ProductStates) => state.ProductMultiDeleteLoading;
 export const ProductMultiDeleteLoaded = (state: ProductStates) => state.ProductMultiDeleteLoaded;
 export const ProductMultiDeleteFailed = (state: ProductStates) => state.ProductMultiDeleteFailed;
