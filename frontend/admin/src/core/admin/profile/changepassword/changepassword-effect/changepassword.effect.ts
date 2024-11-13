/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../changepassword-action/changepassword.action';
import { catchError } from 'rxjs/operators';
import { ChangePasswordService } from '../changepassword.service';
import { ChangepasswordResponseModel } from '../changepassword-models/changepassword.response.model';

@Injectable()
export class ChangepasswordEffect {
  constructor(
    private action$: Actions,
    private service: ChangePasswordService
  ) {}

  
  doChangePassword$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
}
