import { Injectable } from "@angular/core";
// effects
import { createEffect, Actions, ofType } from "@ngrx/effects";
// store
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
// actions
import * as actions from "../action/bankVerify.action";
import { catchError } from "rxjs/operators";
// service
import { bankVerifyService } from "../bankVerify.service";

@Injectable()
export class bankVerifyEffect {
  constructor(private action$: Actions, private service: bankVerifyService) {}

  //bankVerify
  
  bankVerifyList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BANK_VERIFY_LIST_ACTION),
    map((action: actions.bankVerifyListAction) => action.payload),
    switchMap((state) => {
      return this.service.bankVerifyList(state).pipe(
        switchMap((product) => [
          new actions.bankVerifyListSuccessAction(product),
        ]),
        catchError((error) => of(new actions.bankVerifyListFailAction(error)))
      );
    })
  ));

    //bankVerifyChecked
    
    bankVerifyChecked$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.BANK_VERIFY_CHECKED_ACTION),
      map((action: actions.bankVerifyCheckedAction) => action.payload),
      switchMap((state) => {
        return this.service.bankVerifyChecked(state).pipe(
          switchMap((product) => [
            new actions.bankVerifyCheckedSuccessAction(product),
          ]),
          catchError((error) => of(new actions.bankVerifyCheckedFailAction(error)))
        );
      })
    ));
}
