import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/pending-layout.action';
import { catchError } from 'rxjs/operators';
// service
import { PendingLayoutService } from '../pending-layout.service';



@Injectable()
export class PendingLayoutEffect {

    constructor(
        private action$: Actions,
        private service: PendingLayoutService,
    ) { }

 // pendingLayoutsList 
 
 pendingLayoutsList$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.PEDNING_LAYOUT_LIST_ACTION),
   map((action: actions.pendingLayoutsListAction) => action.payload),
   switchMap(state => {
     return this.service.pendingLayoutsList(state).pipe(
       switchMap(product => [
         new actions.pendingLayoutsListSuccessAction(product)
       ]),
       catchError(error =>
         of(new actions.pendingLayoutsListFailAction(error))
       )
     );
   })
 ));


    
}
