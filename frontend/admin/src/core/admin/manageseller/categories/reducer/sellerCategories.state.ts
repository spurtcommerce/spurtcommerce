import { Map, Record } from "immutable";

export interface SellerCategoriesState extends Map<string, any> {
  //sellerCategoriesList
  sellerCategoriesList: any;
  sellerCategoriesListLoading: boolean;
  sellerCategoriesListLoaded: boolean;
  sellerCategoriesListFailed: boolean;


  //updateSellerCategories
  updateSellerCategories: any;
  updateSellerCategoriesLoading: boolean;
  updateSellerCategoriesLoaded: boolean;
  updateSellerCategoriesFailed: boolean;


  //sellerCategoryCount
  sellerCategoryCount: any;
  sellerCategoryCountLoading: boolean;
  sellerCategoryCountLoaded: boolean;
  sellerCategoryCountFailed: boolean;

  //categoryVerify
  categoryVerify: any;
  categoryVerifyLoading: boolean;
  categoryVerifyLoaded: boolean;
  categoryVerifyFailed: boolean;

}

export const SellerCategoriesStateRecord = Record({
  //sellerCategoriesList
  sellerCategoriesList: [],
  sellerCategoriesListLoading: false,
  sellerCategoriesListLoaded: false,
  sellerCategoriesListFailed: false,

  // updateSellerCategories
  updateSellerCategories: [],
  updateSellerCategoriesLoading: false,
  updateSellerCategoriesLoaded: false,
  updateSellerCategoriesFailed: false,

  // sellerCategoryCount
  sellerCategoryCount: [],
  sellerCategoryCountLoading: false,
  sellerCategoryCountLoaded: false,
  sellerCategoryCountFailed: false,


  // categoryVerify
  categoryVerify: [],
  categoryVerifyLoading: false,
  categoryVerifyLoaded: false,
  categoryVerifyFailed: false,

});
