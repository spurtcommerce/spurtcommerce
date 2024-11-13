import { Injectable } from "@angular/core";
// effects
import { createEffect, Actions, ofType } from "@ngrx/effects";
// store
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
// actions
import * as actions from "../action/SellerSignupRequests.action";
import { catchError } from "rxjs/operators";
// service
import { SellerSignupRequestsService } from "../SellerSignupRequests.service";

@Injectable()
export class SellerSignupRequestsEffect {
  constructor(private action$: Actions, private service: SellerSignupRequestsService) {}

  //sellerSignupList
  
  sellerSignupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SELLER_SIGNUP_LIST_ACTION),
    map((action: actions.sellerSignupListAction) => action.payload),
    switchMap((state) => {
      return this.service.sellerSignupList(state).pipe(
        switchMap((product) => [
          new actions.sellerSignupListSuccessAction(product),
        ]),
        catchError((error) => of(new actions.sellerSignupListFailAction(error)))
      );
    })
  ));





   //sellerSignupListCount
   
   sellerSignupListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.SELLER_SIGNUP_LIST_COUNT_ACTION),
     map((action: actions.sellerSignupListCountAction) => action.payload),
     switchMap((state) => {
       return this.service.sellerSignupListCount(state).pipe(
         switchMap((product) => [
           new actions.sellerSignupListCountSuccessAction(product),
         ]),
         catchError((error) => of(new actions.sellerSignupListCountFailAction(error)))
       );
     })
   ));



      //updateSeller
      
      updateSeller$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.UPDATE_SELLER_ACTION),
        map((action: actions.updateSellerAction) => action.payload),
        switchMap((state) => {
          return this.service.updateSeller(state).pipe(
            switchMap((product) => [
              new actions.updateSellerSuccessAction(product),
            ]),
            catchError((error) => of(new actions.updateSellerFailAction(error)))
          );
        })
      ));
}
