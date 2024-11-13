/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/product-localization.action';
// state
import { ProductLocalizationState, ProductLocalizationRecord } from './product-localization.state';



export const initialState: ProductLocalizationState = new ProductLocalizationRecord() as unknown as ProductLocalizationState;

export function reducer(state = initialState, { type, payload }: any): ProductLocalizationState {
    if (!type) {
        return state;
    }
    switch (type) {

        // <-------------GET PRODUCT LOCALIZALION LIST--------------> //

        case actions.ActionTypes.GET_PRODUCT_LOCALIZATION: {
            return Object.assign({}, state, {
                getProductLocalizationLoading: true,
                getProductLocalizationLoaded: false,
                getProductLocalizationFailed: false,
            });
        }

        case actions.ActionTypes.GET_PRODUCT_LOCALIZATION_SUCCESS: {
            return Object.assign({}, state, {
                getProductLocalization: payload.data,
                getProductLocalizationLoading: false,
                getProductLocalizationLoaded: true,
                getProductLocalizationFailed: false,
            });
        }

        case actions.ActionTypes.GET_PRODUCT_LOCALIZATION_FAILED: {
            return Object.assign({}, state, {
                getProductLocalizationLoading: false,
                getProductLocalizationLoaded: false,
                getProductLocalizationFailed: true,
            });
        }

          // <-------------GET PRODUCT LOCALIZALION COUNT--------------> //

          case actions.ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT: {
            return Object.assign({}, state, {
                getProductLocalizationCountLoading: true,
                getProductLocalizationCountLoaded: false,
                getProductLocalizationCountFailed: false,
            });
        }

        case actions.ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                getProductLocalizationCount: payload.data,
                getProductLocalizationCountLoading: false,
                getProductLocalizationCountLoaded: true,
                getProductLocalizationCountFailed: false,
            });
        }

        case actions.ActionTypes.GET_PRODUCT_LOCALIZATION_COUNT_FAILED: {
            return Object.assign({}, state, {
                getProductLocalizationCountLoading: false,
                getProductLocalizationCountLoaded: false,
                getProductLocalizationCountFailed: true,
            });
        }

        // <-------------PRODUCT LOCALIZALION DETAIL--------------> //

        case actions.ActionTypes.PRODUCT_LOCALIZATION_DETAIL: {
            return Object.assign({}, state, {
                productLocalizationDetailLoading: true,
                productLocalizationDetailLoaded: false,
                productLocalizationDetailFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_LOCALIZATION_DETAIL_SUCCESS: {
            return Object.assign({}, state, {
                productLocalizationDetail: payload.data,
                productLocalizationDetailLoading: false,
                productLocalizationDetailLoaded: true,
                productLocalizationDetailFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_LOCALIZATION_DETAIL_FAILED: {
            return Object.assign({}, state, {
                productLocalizationDetailLoading: false,
                productLocalizationDetailLoaded: false,
                productLocalizationDetailFailed: true,
            });
        }

          // <-------------PRODUCT LOCALIZALION CREATE--------------> //

          case actions.ActionTypes.PRODUCT_LOCALIZATION_CREATE: {
            return Object.assign({}, state, {
                productLocalizationCreateLoading: true,
                productLocalizationCreateLoaded: false,
                productLocalizationCreateFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_LOCALIZATION_CREATE_SUCCESS: {
            return Object.assign({}, state, {
                productLocalizationCreate: payload,
                productLocalizationCreateLoading: false,
                productLocalizationCreateLoaded: true,
                productLocalizationCreateFailed: false,
            });
        }

        case actions.ActionTypes.PRODUCT_LOCALIZATION_CREATE_FAILED: {
            return Object.assign({}, state, {
                productLocalizationCreateLoading: false,
                productLocalizationCreateLoaded: false,
                productLocalizationCreateFailed: true,
            });
        }

        default: {
            return state;
        }
    }
}

// product localization list 
export const getProductLocalization = (state: ProductLocalizationState) => state.getProductLocalization;
export const getProductLocalizationLoading = (state: ProductLocalizationState) => state.getProductLocalizationLoading;
export const getProductLocalizationLoaded = (state: ProductLocalizationState) => state.getProductLocalizationLoaded;
export const getProductLocalizationFailed = (state: ProductLocalizationState) => state.getProductLocalizationFailed;

// product localization Count
export const getProductLocalizationCount = (state: ProductLocalizationState) => state.getProductLocalizationCount;
export const getProductLocalizationCountLoading = (state: ProductLocalizationState) => state.getProductLocalizationCountLoading;
export const getProductLocalizationCountLoaded = (state: ProductLocalizationState) => state.getProductLocalizationCountLoaded;
export const getProductLocalizationCountFailed = (state: ProductLocalizationState) => state.getProductLocalizationCountFailed;

// product localization Detail 
export const productLocalizationDetail = (state: ProductLocalizationState) => state.productLocalizationDetail;
export const productLocalizationDetailLoading = (state: ProductLocalizationState) => state.productLocalizationDetailLoading;
export const productLocalizationDetailLoaded = (state: ProductLocalizationState) => state.productLocalizationDetailLoaded;
export const productLocalizationDetailFailed = (state: ProductLocalizationState) => state.productLocalizationDetailFailed;

// product localization Create
export const productLocalizationCreate = (state: ProductLocalizationState) => state.productLocalizationCreate;
export const productLocalizationCreateLoading = (state: ProductLocalizationState) => state.productLocalizationCreateLoading;
export const productLocalizationCreateLoaded = (state: ProductLocalizationState) => state.productLocalizationCreateLoaded;
export const productLocalizationCreateFailed = (state: ProductLocalizationState) => state.productLocalizationCreateFailed;

