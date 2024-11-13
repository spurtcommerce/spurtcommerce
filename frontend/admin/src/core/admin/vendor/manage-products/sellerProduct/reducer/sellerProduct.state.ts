import { Map, Record } from 'immutable';

export interface SellerProductState extends Map<string, any> {

    // sellerProductList //
    sellerProductList: any;
    sellerProductListLoading: boolean;
    sellerProductListLoaded: boolean;
    sellerProductListFailed: boolean;


    // sellerProductCount //
    sellerProductCount: any;
    sellerProductCountLoading: boolean;
    sellerProductCountLoaded: boolean;
    sellerProductCountFailed: boolean;


    // SingleProductDataExport //
    SingleProductDataExport: any;
    SingleProductDataExportLoading: boolean;
    SingleProductDataExportLoaded: boolean;
    SingleProductDataExportFailed: boolean;


    // MultipleProductDataExport //
    MultipleProductDataExport: any;
    MultipleProductDataExportLoading: boolean;
    MultipleProductDataExportLoaded: boolean;
    MultipleProductDataExportFailed: boolean;


    // approveProduct //
    approveProduct: any;
    approveProductLoading: boolean;
    approveProductLoaded: boolean;
    approveProductFailed: boolean;



    // rejectProduct //
    rejectProduct: any;
    rejectProductLoading: boolean;
    rejectProductLoaded: boolean;
    rejectProductFailed: boolean;

    // productStatus //
    productStatus: any;
    productStatusLoading: boolean;
    productStatusLoaded: boolean;
    productStatusFailed: boolean;
}

export const SellerProductStateRecord = Record({

    // sellerProductList /
    sellerProductList: [],
    sellerProductListLoading: false,
    sellerProductListLoaded: false,
    sellerProductListFailed: false,


    // sellerProductCount /
    sellerProductCount: [],
    sellerProductCountLoading: false,
    sellerProductCountLoaded: false,
    sellerProductCountFailed: false,

    // SingleProductDataExport /
    SingleProductDataExport: [],
    SingleProductDataExportLoading: false,
    SingleProductDataExportLoaded: false,
    SingleProductDataExportFailed: false,

    // MultipleProductDataExport /
    MultipleProductDataExport: [],
    MultipleProductDataExportLoading: false,
    MultipleProductDataExportLoaded: false,
    MultipleProductDataExportFailed: false,


    // approveProduct /
    approveProduct: [],
    approveProductLoading: false,
    approveProductLoaded: false,
    approveProductFailed: false,

    // rejectProduct /
    rejectProduct: [],
    rejectProductLoading: false,
    rejectProductLoaded: false,
    rejectProductFailed: false,



    // productStatus /
    productStatus: [],
    productStatusLoading: false,
    productStatusLoaded: false,
    productStatusFailed: false,

});