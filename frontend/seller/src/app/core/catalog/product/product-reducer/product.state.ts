import { Map, Record } from "immutable";

export interface ProductStates extends Map<string, any> {

    /* Categories List*/
    CategoriesList: any;
    CategoriesListLoaded: boolean;
    CategoriesListLoading: boolean;
    CategoriesListFailed: boolean;

    /* Tax List*/
    TaxList: any;
    TaxListLoaded: boolean;
    TaxListLoading: boolean;
    TaxListFailed: boolean;

    /* Product  creation*/
    ProductCreation: any;
    ProductCreationLoaded: boolean;
    ProductCreationLoading: boolean;
    ProductCreationFailed: boolean;

    /* Product Update Details*/
    ProductUpdateDetails: any;
    ProductUpdateDetailsLoaded: boolean;
    ProductUpdateDetailsLoading: boolean;
    ProductUpdateDetailsFailed: boolean;

    /* Product edit*/
    Productedit: any;
    ProducteditLoaded: boolean;
    ProducteditLoading: boolean;
    ProducteditFailed: boolean;


    /* Product Video upload*/
    ProductVideoUpload: any;
    ProductVideoUploadLoaded: boolean;
    ProductVideoUploadLoading: boolean;
    ProductVideoUploadFailed: boolean;

    /* Product Multi Delete*/
    ProductMultiDelete: any;
    ProductMultiDeleteLoaded: boolean;
    ProductMultiDeleteLoading: boolean;
    ProductMultiDeleteFailed: boolean;


};

export const ProductRecord = Record({

    /* Categories List*/
    CategoriesList: [],
    CategoriesListLoaded: false,
    CategoriesListLoading: false,
    CategoriesListFailed: false,

    /* Tax List*/
    TaxList: [],
    TaxListLoaded: false,
    TaxListLoading: false,
    TaxListFailed: false,

    /* Product  creation*/
    ProductCreation: [],
    ProductCreationLoaded: false,
    ProductCreationLoading: false,
    ProductCreationFailed: false,

    /* Product Update Details*/
    ProductUpdateDetails: [],
    ProductUpdateDetailsLoaded: false,
    ProductUpdateDetailsLoading: false,
    ProductUpdateDetailsFailed: false,

    /* Product edit*/
    Productedit: [],
    ProducteditLoaded: false,
    ProducteditLoading: false,
    ProducteditFailed: false,

    /* Product Video upload*/
    ProductVideoUpload: [],
    ProductVideoUploadLoaded: false,
    ProductVideoUploadLoading: false,
    ProductVideoUploadFailed: false,

   /* Product Multi Delete*/
    ProductMultiDelete: [],
    ProductMultiDeleteLoaded: false,
    ProductMultiDeleteLoading: false,
    ProductMultiDeleteFailed: false,
});

