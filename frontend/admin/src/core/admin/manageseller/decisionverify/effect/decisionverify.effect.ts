import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/decisionverify.action';
import { catchError } from 'rxjs/operators';
// service
import { DecisionVerifyService } from '../decisionverify.service';



@Injectable()
export class decisionVerifyEffect {

    constructor(
        private action$: Actions,
        private service: DecisionVerifyService,
    ) { }

 // decisionVerifyList 
 
 decisionVerifyList$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.DECISION_VERIFY_LIST_ACTION),
   map((action: actions.decisionVerifyListAction) => action.payload),
   switchMap(state => {
     return this.service.decisionVerifyList(state).pipe(
       switchMap(product => [
         new actions.decisionVerifyListSuccessAction(product)
       ]),
       catchError(error =>
         of(new actions.decisionVerifyListFailAction(error))
       )
     );
   })
 ));


    
}
