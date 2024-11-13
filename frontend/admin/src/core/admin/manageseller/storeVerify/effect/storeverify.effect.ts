import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/storeverify.action';
import { catchError } from 'rxjs/operators';
// service
import { StoreVerifyService } from '../storeverify.service';



@Injectable()
export class StoreVerifyEffect {

    constructor(
        private action$: Actions,
        private service: StoreVerifyService,
    ) { }

 // storeverifyList 
 
 storeverifyList$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.STORE_VERIFY_LIST_ACTION),
   map((action: actions.storeverifyListAction) => action.payload),
   switchMap(state => {
     return this.service.storeverifyList(state).pipe(
       switchMap(product => [
         new actions.storeverifyListSuccessAction(product)
       ]),
       catchError(error =>
         of(new actions.storeverifyListFailAction(error))
       )
     );
   })
 ));


  // storeverify 
  
  storeverify$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.STORE_VERIFY_ACTION),
    map((action: actions.storeverifyAction) => action.payload),
    switchMap(state => {
      return this.service.storeverify(state).pipe(
        switchMap(product => [
          new actions.storeverifySuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.storeverifyFailAction(error))
        )
      );
    })
  ));

    
}