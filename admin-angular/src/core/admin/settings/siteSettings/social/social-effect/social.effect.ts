/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../social-action/social.action';
import { SocialService } from '../social.service';

@Injectable()
export class SocialEffect {
  constructor(private action$: Actions, private service: SocialService) {}

  // NEW SOCIAL EFFECT
  @Effect()
  doAddsocial$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_SOCIAL),
    map((action: actions.DoNewSocialAction) => action.payload),
    switchMap(state => {
      return this.service.createsocial(state).pipe(
        switchMap(user => [new actions.DoNewSocialSuccessAction(user)]),
        catchError(error => of(new actions.DoNewSocialFailAction(error)))
      );
    })
  );

  // GET SOCIAL EFFECT
  @Effect()
  dogetsocial$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_GET_SOCIAL),
    map((action: actions.DoGetSocialAction) => action.payload),
    switchMap(() => {
      return this.service.getSocial().pipe(
        switchMap(user => {
          return [new actions.DoGetSocialSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoGetSocialFailAction()))
      );
    })
  );
}
