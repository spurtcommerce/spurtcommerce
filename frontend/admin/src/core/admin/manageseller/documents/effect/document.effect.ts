import { Injectable } from "@angular/core";
// effects
import { createEffect, Actions, ofType } from "@ngrx/effects";
// store
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
// actions
import * as actions from "../action/document.action";
import { catchError } from "rxjs/operators";
// service
import { documentVerifyService } from "../document.service";

@Injectable()
export class documentVerifyEffect {
  constructor(
    private action$: Actions,
    private service: documentVerifyService
  ) {}

  //documentVerifyList
  
  documentVerifyList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_VERIFY_LIST_ACTION),
    map((action: actions.documentVerifyListAction) => action.payload),
    switchMap((state) => {
      return this.service.documentVerifyList(state).pipe(
        switchMap((product) => [
          new actions.documentVerifyListSuccessAction(product),
        ]),
        catchError((error) =>
          of(new actions.documentVerifyListFailAction(error))
        )
      );
    })
  ));
   //documentVerifyChecked
   
   documentVerifyChecked$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.DOCUMENT_VERIFY_CHECKED_ACTION),
     map((action: actions.documentVerifyCheckedAction) => action.payload),
     switchMap((state) => {
       return this.service.documentVerifyChecked(state).pipe(
         switchMap((product) => [
           new actions.documentVerifyCheckedSuccessAction(product),
         ]),
         catchError((error) => of(new actions.documentVerifyCheckedFailAction(error)))
       );
     })
   ));


     //DocumentVerifynew
     
     DocumentVerifynew$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.DOCUMENT_VERIFY_NEW_ACTION),
       map((action: actions.DocumentVerifynewAction) => action.payload),
       switchMap((state) => {
         return this.service.DocumentVerifynew(state).pipe(
           switchMap((product) => [
             new actions.DocumentVerifynewSuccessAction(product),
           ]),
           catchError((error) => of(new actions.DocumentVerifynewFailAction(error)))
         );
       })
     ));



     //documentView
     
     documentView$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.DOCUMENT_VIEW_ACTION),
       map((action: actions.documentViewAction) => action.payload),
       switchMap((state) => {
         return this.service.documentView(state).pipe(
           switchMap((product) => [
             new actions.documentViewSuccessAction(product),
           ]),
           catchError((error) => of(new actions.documentViewFailAction(error)))
         );
       })
     ));



}
