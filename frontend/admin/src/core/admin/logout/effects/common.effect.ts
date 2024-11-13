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
import * as actions from '../action/common.action';

import { catchError } from 'rxjs/operators';

import { AppApiClient } from '../../../appApiClient.service';
import { LogoutResponseModel } from '../models/logout.response.model';

@Injectable()
export class CommonEffect {
  constructor(private action$: Actions, private apiCli: AppApiClient) {}

  // LOGOUT
  
  dologoutCategory$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_LOGOUT),
    map((action: actions.DoLogoutAction) => action.payload),
    switchMap(() => {
      return this.apiCli.logoutapi().pipe(
        switchMap(user => {
          return [
            new actions.DoLogoutSuccessAction(new LogoutResponseModel(user))
          ];
        }),
        catchError(error => of(new actions.DoLogoutFailAction(error)))
      );
    })
  ));
}
