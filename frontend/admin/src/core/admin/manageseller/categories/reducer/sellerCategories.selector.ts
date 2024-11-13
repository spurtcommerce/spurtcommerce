import { AppState } from "src/core/app.state.interface";
//selector
import { createSelector } from "reselect";
//reducer
import * as SellerCategories from "./sellerCategories.reducer";
/** Auth store functions*/
export const SellerCategoriesState = (state: AppState) => state.SellerCategories;

//sellerCategoriesList
export const sellerCategoriesList = createSelector(SellerCategoriesState,SellerCategories.sellerCategoriesList);
export const sellerCategoriesListLoading = createSelector(SellerCategoriesState,SellerCategories.sellerCategoriesListLoading);
export const sellerCategoriesListLoaded = createSelector(SellerCategoriesState,SellerCategories.sellerCategoriesListLoaded);


//updateSellerCategories
export const updateSellerCategories = createSelector(SellerCategoriesState,SellerCategories.updateSellerCategories);
export const updateSellerCategoriesLoading = createSelector(SellerCategoriesState,SellerCategories.updateSellerCategoriesLoading);
export const updateSellerCategoriesLoaded = createSelector(SellerCategoriesState,SellerCategories.updateSellerCategoriesLoaded);


//sellerCategoryCount
export const sellerCategoryCount = createSelector(SellerCategoriesState,SellerCategories.sellerCategoryCount);
export const sellerCategoryCountLoading = createSelector(SellerCategoriesState,SellerCategories.sellerCategoryCountLoading);
export const sellerCategoryCountLoaded = createSelector(SellerCategoriesState,SellerCategories.sellerCategoryCountLoaded);


//categoryVerify
export const categoryVerify = createSelector(SellerCategoriesState,SellerCategories.categoryVerify);
export const categoryVerifyLoading = createSelector(SellerCategoriesState,SellerCategories.categoryVerifyLoading);
export const categoryVerifyLoaded = createSelector(SellerCategoriesState,SellerCategories.categoryVerifyLoaded);
