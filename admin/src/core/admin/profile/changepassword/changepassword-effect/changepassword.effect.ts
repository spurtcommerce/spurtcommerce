/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../changepassword-action/changepassword.action';
import { catchError } from 'rxjs/internal/operators';
import { ChangePasswordService } from '../changepassword.service';
import { ChangepasswordResponseModel } from '../changepassword-models/changepassword.response.model';

@Injectable()
export class ChangepasswordEffect {
  constructor(
    private action$: Actions,
    private service: ChangePasswordService
  ) {}

  @Effect()
  doChangePassword$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CHANGE_PASWORD),
    map((action: actions.DoChangePasswordAction) => action.payload),
    switchMap(state => {
      return this.service.changePassword(state).pipe(
        switchMap(user => [
          new actions.DoChangePasswordSucessAction(
            new ChangepasswordResponseModel(user)
          )
        ]),
        catchError(error => of(new actions.DoChangePasswordFailAction(error)))
      );
    })
  );
}
