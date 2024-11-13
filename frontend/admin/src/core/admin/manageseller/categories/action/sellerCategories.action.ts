import { Action } from "@ngrx/store";
import { type } from "src/core/admin/shared/utility/utilityHelpers";

export const ActionTypes = {
  //sellerCategoriesList
  SELLER_CATEGORIES_LIST_ACTION: type("[SELLER_CATEGORIES] sellerCategoriesList"),
  SELLER_CATEGORIES_LIST_SUCCESS: type("[SELLER_CATEGORIES] sellerCategoriesList success"),
  SELLER_CATEGORIES_LIST_FAIL: type("[SELLER_CATEGORIES] sellerCategoriesList Fail"),


  //updateSellerCategories
  UPDATE_SELLER_CATEGORIES_ACTION: type("[SELLER_CATEGORIES] updateSellerCategories"),
  UPDATE_SELLER_CATEGORIES_SUCCESS: type("[SELLER_CATEGORIES] updateSellerCategories success"),
  UPDATE_SELLER_CATEGORIES_FAIL: type("[SELLER_CATEGORIES] updateSellerCategories Fail"),


  //sellerCategoryCount
  SELLER_CATEGORY_COUNT_ACTION: type("[SELLER_CATEGORIES] sellerCategoryCount"),
  SELLER_CATEGORY_COUNT_SUCCESS: type("[SELLER_CATEGORIES] sellerCategoryCount success"),
  SELLER_CATEGORY_COUNT_FAIL: type("[SELLER_CATEGORIES] sellerCategoryCount Fail"),

  //categoryVerify
  CATEGORY_VERIFY_ACTION: type("[SELLER_CATEGORIES] categoryVerify"),
  CATEGORY_VERIFY_SUCCESS: type("[SELLER_CATEGORIES] categoryVerify success"),
  CATEGORY_VERIFY_FAIL: type("[SELLER_CATEGORIES] categoryVerify Fail"),
};
//sellerCategoriesList
export class sellerCategoriesListAction implements Action {
  type = ActionTypes.SELLER_CATEGORIES_LIST_ACTION;
  constructor(public payload: any) { }
}
export class sellerCategoriesListSuccessAction implements Action {
  type = ActionTypes.SELLER_CATEGORIES_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class sellerCategoriesListFailAction implements Action {
  type = ActionTypes.SELLER_CATEGORIES_LIST_FAIL;
  constructor(public payload: any = null) { }
}


//updateSellerCategories
export class updateSellerCategoriesAction implements Action {
  type = ActionTypes.UPDATE_SELLER_CATEGORIES_ACTION;
  constructor(public payload: any) { }
}
export class updateSellerCategoriesSuccessAction implements Action {
  type = ActionTypes.UPDATE_SELLER_CATEGORIES_SUCCESS;
  constructor(public payload: any) { }
}
export class updateSellerCategoriesFailAction implements Action {
  type = ActionTypes.UPDATE_SELLER_CATEGORIES_FAIL;
  constructor(public payload: any = null) { }
}


//sellerCategoryCount
export class sellerCategoryCountAction implements Action {
  type = ActionTypes.SELLER_CATEGORY_COUNT_ACTION;
  constructor(public payload: any) { }
}
export class sellerCategoryCountSuccessAction implements Action {
  type = ActionTypes.SELLER_CATEGORY_COUNT_SUCCESS;
  constructor(public payload: any) { }
}
export class sellerCategoryCountFailAction implements Action {
  type = ActionTypes.SELLER_CATEGORY_COUNT_FAIL;
  constructor(public payload: any = null) { }
}


//categoryVerify
export class categoryVerifyAction implements Action {
  type = ActionTypes.CATEGORY_VERIFY_ACTION;
  constructor(public payload: any) { }
}
export class categoryVerifySuccessAction implements Action {
  type = ActionTypes.CATEGORY_VERIFY_SUCCESS;
  constructor(public payload: any) { }
}
export class categoryVerifyFailAction implements Action {
  type = ActionTypes.CATEGORY_VERIFY_FAIL;
  constructor(public payload: any = null) { }
}


export type Actions =
  | sellerCategoriesListAction
  | sellerCategoriesListSuccessAction
  | sellerCategoriesListFailAction
  | updateSellerCategoriesAction
  | updateSellerCategoriesSuccessAction
  | updateSellerCategoriesFailAction
  | sellerCategoryCountAction
  | sellerCategoryCountSuccessAction
  | sellerCategoryCountFailAction
  | categoryVerifyAction
  | categoryVerifySuccessAction
  | categoryVerifyFailAction;
