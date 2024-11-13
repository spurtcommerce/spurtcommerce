//action
import * as actions from '../action/sellerProduct.action';
// state
import {
    SellerProductState,
    SellerProductStateRecord
} from './sellerProduct.state';

export const initialState: SellerProductState = new SellerProductStateRecord() as unknown as SellerProductState;

export function reducer(state = initialState, { type, payload }: any): SellerProductState {
    if (!type) {
        return state;
    }
    switch (type) {

        ///sellerProductList///
        case actions.ActionTypes.SELLER_PRODUCT_LIST_ACTION: {
            return Object.assign({}, state, {
                sellerProductList: [],
                sellerProductListLoading: true,
                sellerProductListLoaded: false,
                sellerProductListFailed: false,
            });
        }

        case actions.ActionTypes.SELLER_PRODUCT_LIST_SUCCESS: {
            return Object.assign({}, state, {
                sellerProductList: payload.data,
                sellerProductListLoading: false,
                sellerProductListLoaded: true,
                sellerProductListFailed: false,
            });
        }

        case actions.ActionTypes.SELLER_PRODUCT_LIST_FAIL: {
            return Object.assign({}, state, {
                sellerProductList: [],
                sellerProductListLoading: false,
                sellerProductListLoaded: false,
                sellerProductListFailed: true,
            });

        }


        ///sellerProductCount///
        case actions.ActionTypes.SELLER_PRODUCT_COUNT_ACTION: {
            return Object.assign({}, state, {
                sellerProductCount: [],
                sellerProductCountLoading: true,
                sellerProductCountLoaded: false,
                sellerProductCountFailed: false,
            });
        }

        case actions.ActionTypes.SELLER_PRODUCT_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                sellerProductCount: payload.data,
                sellerProductCountLoading: false,
                sellerProductCountLoaded: true,
                sellerProductCountFailed: false,
            });
        }

        case actions.ActionTypes.SELLER_PRODUCT_COUNT_FAIL: {
            return Object.assign({}, state, {
                sellerProductCount: [],
                sellerProductCountLoading: false,
                sellerProductCountLoaded: false,
                sellerProductCountFailed: true,
            });

        }

        ///SingleProductDataExport///
        case actions.ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_ACTION: {
            return Object.assign({}, state, {
                SingleProductDataExport: [],
                SingleProductDataExportLoading: true,
                SingleProductDataExportLoaded: false,
                SingleProductDataExportFailed: false,
            });
        }

        case actions.ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_SUCCESS: {
            return Object.assign({}, state, {
                SingleProductDataExport: payload.data,
                SingleProductDataExportLoading: false,
                SingleProductDataExportLoaded: true,
                SingleProductDataExportFailed: false,
            });
        }

        case actions.ActionTypes.SINGLE_PRODUCT_DATA_EXPORT_FAIL: {
            return Object.assign({}, state, {
                SingleProductDataExport: [],
                SingleProductDataExportLoading: false,
                SingleProductDataExportLoaded: false,
                SingleProductDataExportFailed: true,
            });

        }


        ///MultipleProductDataExport///
        case actions.ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_ACTION: {
            return Object.assign({}, state, {
                MultipleProductDataExport: [],
                MultipleProductDataExportLoading: true,
                MultipleProductDataExportLoaded: false,
                MultipleProductDataExportFailed: false,
            });
        }

        case actions.ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_SUCCESS: {
            return Object.assign({}, state, {
                MultipleProductDataExport: payload.data,
                MultipleProductDataExportLoading: false,
                MultipleProductDataExportLoaded: true,
                MultipleProductDataExportFailed: false,
            });
        }

        case actions.ActionTypes.MULTIPLE_PRODUCT_DATA_EXPORT_FAIL: {
            return Object.assign({}, state, {
                MultipleProductDataExport: [],
                MultipleProductDataExportLoading: false,
                MultipleProductDataExportLoaded: false,
                MultipleProductDataExportFailed: true,
            });

        }


        ///approveProduct///
        case actions.ActionTypes.APPROVED_PRODUCT_ACTION: {
            return Object.assign({}, state, {
                approveProduct: [],
                approveProductLoading: true,
                approveProductLoaded: false,
                approveProductFailed: false,
            });
        }

        case actions.ActionTypes.APPROVED_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                approveProduct: payload,
                approveProductLoading: false,
                approveProductLoaded: true,
                approveProductFailed: false,
            });
        }

        case actions.ActionTypes.APPROVED_PRODUCT_FAIL: {
            return Object.assign({}, state, {
                approveProduct: [],
                approveProductLoading: false,
                approveProductLoaded: false,
                approveProductFailed: true,
            });

        }


        ///rejectProduct///
        case actions.ActionTypes.REJECT_PRODUCT_ACTION: {
            return Object.assign({}, state, {
                rejectProduct: [],
                rejectProductLoading: true,
                rejectProductLoaded: false,
                rejectProductFailed: false,
            });
        }

        case actions.ActionTypes.REJECT_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                rejectProduct: payload,
                rejectProductLoading: false,
                rejectProductLoaded: true,
                rejectProductFailed: false,
            });
        }

        case actions.ActionTypes.REJECT_PRODUCT_FAIL: {
            return Object.assign({}, state, {
                rejectProduct: [],
                rejectProductLoading: false,
                rejectProductLoaded: false,
                rejectProductFailed: true,
            });

        }


                ///productStatus///
                case actions.ActionTypes.PRODUCT_STATUS_ACTION: {
                    return Object.assign({}, state, {
                        productStatus: [],
                        productStatusLoading: true,
                        productStatusLoaded: false,
                        productStatusFailed: false,
                    });
                }
        
                case actions.ActionTypes.PRODUCT_STATUS_SUCCESS: {
                    return Object.assign({}, state, {
                        productStatus: payload.data,
                        productStatusLoading: false,
                        productStatusLoaded: true,
                        productStatusFailed: false,
                    });
                }
        
                case actions.ActionTypes.PRODUCT_STATUS_FAIL: {
                    return Object.assign({}, state, {
                        productStatus: [],
                        productStatusLoading: false,
                        productStatusLoaded: false,
                        productStatusFailed: true,
                    });
        
                }
        

        default: {
            return state;
        }
    }
}


///sellerProductList///
export const sellerProductList = (state: SellerProductState) => state.sellerProductList;
export const sellerProductListLoading = (state: SellerProductState) => state.sellerProductListLoading;
export const sellerProductListLoaded = (state: SellerProductState) => state.sellerProductListLoaded;


///sellerProductCount///
export const sellerProductCount = (state: SellerProductState) => state.sellerProductCount;
export const sellerProductCountLoading = (state: SellerProductState) => state.sellerProductCountLoading;
export const sellerProductCountLoaded = (state: SellerProductState) => state.sellerProductCountLoaded;


///SingleProductDataExport///
export const SingleProductDataExport = (state: SellerProductState) => state.SingleProductDataExport;
export const SingleProductDataExportLoading = (state: SellerProductState) => state.SingleProductDataExportLoading;
export const SingleProductDataExportLoaded = (state: SellerProductState) => state.SingleProductDataExportLoaded;



///MultipleProductDataExport///
export const MultipleProductDataExport = (state: SellerProductState) => state.MultipleProductDataExport;
export const MultipleProductDataExportLoading = (state: SellerProductState) => state.MultipleProductDataExportLoading;
export const MultipleProductDataExportLoaded = (state: SellerProductState) => state.MultipleProductDataExportLoaded;


///approveProduct///
export const approveProduct = (state: SellerProductState) => state.approveProduct;
export const approveProductLoading = (state: SellerProductState) => state.approveProductLoading;
export const approveProductLoaded = (state: SellerProductState) => state.approveProductLoaded;


///rejectProduct///
export const rejectProduct = (state: SellerProductState) => state.rejectProduct;
export const rejectProductLoading = (state: SellerProductState) => state.rejectProductLoading;
export const rejectProductLoaded = (state: SellerProductState) => state.rejectProductLoaded;


///productStatus///
export const productStatus = (state: SellerProductState) => state.productStatus;
export const productStatusLoading = (state: SellerProductState) => state.productStatusLoading;
export const productStatusLoaded = (state: SellerProductState) => state.productStatusLoaded;