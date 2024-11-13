import { Map, Record } from "immutable";

export interface ProductLocalizationState extends Map<string, any> {

    // Product Localization List
    getProductLocalization: any;
    getProductLocalizationLoaded: boolean;
    getProductLocalizationLoading: boolean;
    getProductLocalizationFailed: boolean;

    // Product Localization Count
    getProductLocalizationCount: any;
    getProductLocalizationCountLoaded: boolean;
    getProductLocalizationCountLoading: boolean;
    getProductLocalizationCountFailed: boolean;

    // Product Localization Detail
    productLocalizationDetail: any;
    productLocalizationDetailLoaded: boolean;
    productLocalizationDetailLoading: boolean;
    productLocalizationDetailFailed: boolean;

    // Product Localization Create
    productLocalizationCreate: any;
    productLocalizationCreateLoaded: boolean;
    productLocalizationCreateLoading: boolean;
    productLocalizationCreateFailed: boolean;


};

export const ProductLocalizationRecord = Record({

    // Product Localization List
    getProductLocalization: [],
    getProductLocalizationLoaded: false,
    getProductLocalizationLoading: false,
    getProductLocalizationFailed: false,

    // Product Localization Count
    getProductLocalizationCount: [],
    getProductLocalizationCountLoaded: false,
    getProductLocalizationCountLoading: false,
    getProductLocalizationCountFailed: false,

    // Product Localization Detail
    productLocalizationDetail: [],
    productLocalizationDetailLoaded: false,
    productLocalizationDetailLoading: false,
    productLocalizationDetailFailed: false,

    // Product Localization Create
    productLocalizationCreate: [],
    productLocalizationCreateLoaded: false,
    productLocalizationCreateLoading: false,
    productLocalizationCreateFailed: false,


});

