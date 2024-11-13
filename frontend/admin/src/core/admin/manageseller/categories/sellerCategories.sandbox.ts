import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// store
import { Store } from "@ngrx/store";
// actions
import * as SellerCategoriesActions from "./action/sellerCategories.action";
// app state
import * as store from "../../../../core/app.state.interface";
//selector
import {
  sellerCategoriesList,
  sellerCategoriesListLoading,
  sellerCategoriesListLoaded, updateSellerCategories, updateSellerCategoriesLoading, updateSellerCategoriesLoaded,
  sellerCategoryCount, sellerCategoryCountLoading, sellerCategoryCountLoaded,categoryVerify,categoryVerifyLoading,categoryVerifyLoaded
} from "./reducer/sellerCategories.selector";

@Injectable()
export class SellerCategoriesSandbox {
  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) { }

  //sellerCategoriesList
  public sellerCategoriesList$ = this.appState.select(sellerCategoriesList);
  public sellerCategoriesListLoading$ = this.appState.select(sellerCategoriesListLoading);
  public sellerCategoriesListLoaded$ = this.appState.select(sellerCategoriesListLoaded);

  //updateSellerCategories
  public updateSellerCategories$ = this.appState.select(updateSellerCategories);
  public updateSellerCategoriesLoading$ = this.appState.select(updateSellerCategoriesLoading);
  public updateSellerCategoriesLoaded$ = this.appState.select(updateSellerCategoriesLoaded);

  //sellerCategoryCount
  public sellerCategoryCount$ = this.appState.select(sellerCategoryCount);
  public sellerCategoryCountLoading$ = this.appState.select(sellerCategoryCountLoading);
  public sellerCategoryCountLoaded$ = this.appState.select(sellerCategoryCountLoaded);

  //categoryVerify
  public categoryVerify$ = this.appState.select(categoryVerify);
  public categoryVerifyLoading$ = this.appState.select(categoryVerifyLoading);
  public categoryVerifyLoaded$ = this.appState.select(categoryVerifyLoaded);


  //sellerCategoriesList
  public sellerCategoriesList(value: any) {
    this.appState.dispatch(
      new SellerCategoriesActions.sellerCategoriesListAction(value)
    );
  }

  //updateSellerCategories
  public updateSellerCategories(value: any) {
    this.appState.dispatch(
      new SellerCategoriesActions.updateSellerCategoriesAction(value)
    );
  }

  //sellerCategoryCount
  public sellerCategoryCount(value: any) {
    this.appState.dispatch(
      new SellerCategoriesActions.sellerCategoryCountAction(value)
    );
  }

  //categoryVerify
  public categoryVerify(value: any) {
    this.appState.dispatch(
      new SellerCategoriesActions.categoryVerifyAction(value)
    );
  }

}
