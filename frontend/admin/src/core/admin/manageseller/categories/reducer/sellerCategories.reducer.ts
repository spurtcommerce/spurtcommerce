//action
import * as actions from "../action/sellerCategories.action";
// state
import {
  SellerCategoriesState,
  SellerCategoriesStateRecord,

} from "./sellerCategories.state";

export const initialState: SellerCategoriesState =
  new SellerCategoriesStateRecord() as unknown as SellerCategoriesState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SellerCategoriesState {
  if (!type) {
    return state;
  }
  switch (type) {
    //sellerCategoriesList
    case actions.ActionTypes.SELLER_CATEGORIES_LIST_ACTION: {
      return Object.assign({}, state, {
        sellerCategoriesList: [],
        sellerCategoriesListLoading: true,
        sellerCategoriesListLoaded: false,
        sellerCategoriesListFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_CATEGORIES_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerCategoriesList: payload.data,
        sellerCategoriesListLoading: false,
        sellerCategoriesListLoaded: true,
        sellerCategoriesListFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_CATEGORIES_LIST_FAIL: {
      return Object.assign({}, state, {
        sellerCategoriesList: [],
        sellerCategoriesListLoading: false,
        sellerCategoriesListLoaded: false,
        sellerCategoriesListFailed: true,
      });
    }

    //updateSellerCategories
    case actions.ActionTypes.UPDATE_SELLER_CATEGORIES_ACTION: {
      return Object.assign({}, state, {
        updateSellerCategories: [],
        updateSellerCategoriesLoading: true,
        updateSellerCategoriesLoaded: false,
        updateSellerCategoriesFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_SELLER_CATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        updateSellerCategories: payload,
        updateSellerCategoriesLoading: false,
        updateSellerCategoriesLoaded: true,
        updateSellerCategoriesFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_SELLER_CATEGORIES_FAIL: {
      return Object.assign({}, state, {
        updateSellerCategories: [],
        updateSellerCategoriesLoading: false,
        updateSellerCategoriesLoaded: false,
        updateSellerCategoriesFailed: true,
      });
    }

    //sellerCategoryCount
    case actions.ActionTypes.SELLER_CATEGORY_COUNT_ACTION: {
      return Object.assign({}, state, {
        sellerCategoryCount: [],
        sellerCategoryCountLoading: true,
        sellerCategoryCountLoaded: false,
        sellerCategoryCountFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_CATEGORY_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        sellerCategoryCount: payload.data,
        sellerCategoryCountLoading: false,
        sellerCategoryCountLoaded: true,
        sellerCategoryCountFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_CATEGORY_COUNT_FAIL: {
      return Object.assign({}, state, {
        sellerCategoryCount: [],
        sellerCategoryCountLoading: false,
        sellerCategoryCountLoaded: false,
        sellerCategoryCountFailed: true,
      });
    }

    //categoryVerify
    case actions.ActionTypes.CATEGORY_VERIFY_ACTION: {
      return Object.assign({}, state, {
        categoryVerify: [],
        categoryVerifyLoading: true,
        categoryVerifyLoaded: false,
        categoryVerifyFailed: false,
      });
    }

    case actions.ActionTypes.CATEGORY_VERIFY_SUCCESS: {
      return Object.assign({}, state, {
        categoryVerify: payload.data,
        categoryVerifyLoading: false,
        categoryVerifyLoaded: true,
        categoryVerifyFailed: false,
      });
    }

    case actions.ActionTypes.CATEGORY_VERIFY_FAIL: {
      return Object.assign({}, state, {
        categoryVerify: [],
        categoryVerifyLoading: false,
        categoryVerifyLoaded: false,
        categoryVerifyFailed: true,
      });
    }


    default: {
      return state;
    }
  }
}
//sellerCategoriesList
export const sellerCategoriesList = (state: SellerCategoriesState) => state.sellerCategoriesList;
export const sellerCategoriesListLoading = (state: SellerCategoriesState) => state.sellerCategoriesListLoading;
export const sellerCategoriesListLoaded = (state: SellerCategoriesState) => state.sellerCategoriesListLoaded;


//updateSellerCategories
export const updateSellerCategories = (state: SellerCategoriesState) => state.updateSellerCategories;
export const updateSellerCategoriesLoading = (state: SellerCategoriesState) => state.updateSellerCategoriesLoading;
export const updateSellerCategoriesLoaded = (state: SellerCategoriesState) => state.updateSellerCategoriesLoaded;


//sellerCategoryCount
export const sellerCategoryCount = (state: SellerCategoriesState) => state.sellerCategoryCount;
export const sellerCategoryCountLoading = (state: SellerCategoriesState) => state.sellerCategoryCountLoading;
export const sellerCategoryCountLoaded = (state: SellerCategoriesState) => state.sellerCategoryCountLoaded;



//categoryVerify
export const categoryVerify = (state: SellerCategoriesState) => state.categoryVerify;
export const categoryVerifyLoading = (state: SellerCategoriesState) => state.categoryVerifyLoading;
export const categoryVerifyLoaded = (state: SellerCategoriesState) => state.categoryVerifyLoaded;

