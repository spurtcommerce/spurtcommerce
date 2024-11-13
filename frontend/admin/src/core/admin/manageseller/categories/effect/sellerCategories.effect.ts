import { Injectable } from "@angular/core";
// effects
import { createEffect, Actions, ofType } from "@ngrx/effects";
// store
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
// actions
import * as actions from "../action/sellerCategories.action";
import { catchError } from "rxjs/operators";
// service
import { SellerCategoriesService} from "../sellerCategories.service";

@Injectable()
export class SellerCategoriesEffect {
  constructor(
    private action$: Actions,
    private service: SellerCategoriesService) {}

  //sellerCategoriesList
  
  sellerCategoriesList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_CATEGORIES_LIST_ACTION),
    map((action: actions.sellerCategoriesListAction) => action.payload),
    switchMap((state) => {
      return this.service.sellerCategoriesList(state).pipe(
        switchMap((product) => [
          new actions.sellerCategoriesListSuccessAction(product),
        ]),
        catchError((error) =>
          of(new actions.sellerCategoriesListFailAction(error))
        )
      );
    })
  ));
  
  //updateSellerCategories
  
  updateSellerCategories$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_SELLER_CATEGORIES_ACTION),
    map((action: actions.updateSellerCategoriesAction) => action.payload),
    switchMap((state) => {
      return this.service.updateSellerCategories(state).pipe(
        switchMap((product) => [
          new actions.updateSellerCategoriesSuccessAction(product),
        ]),
        catchError((error) =>
          of(new actions.updateSellerCategoriesFailAction(error))
        )
      );
    })
  ));


  //sellerCategoryCount
  
  sellerCategoryCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_CATEGORY_COUNT_ACTION),
    map((action: actions.sellerCategoryCountAction) => action.payload),
    switchMap((state) => {
      return this.service.sellerCategoryCount(state).pipe(
        switchMap((product) => [
          new actions.sellerCategoryCountSuccessAction(product),
        ]),
        catchError((error) =>
          of(new actions.sellerCategoryCountFailAction(error))
        )
      );
    })
  ));



    //categoryVerify
    
    categoryVerify$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.CATEGORY_VERIFY_ACTION),
      map((action: actions.categoryVerifyAction) => action.payload),
      switchMap((state) => {
        return this.service.categoryVerify(state).pipe(
          switchMap((product) => [
            new actions.categoryVerifySuccessAction(product),
          ]),
          catchError((error) =>
            of(new actions.categoryVerifyFailAction(error))
          )
        );
      })
    ));

}
