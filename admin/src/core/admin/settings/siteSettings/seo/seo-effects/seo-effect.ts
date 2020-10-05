/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
import * as actions from '../seo-action/seo-action';
import { SeoService } from '../seo-service';

@Injectable()
export class SeoEffect {
  constructor(private action$: Actions, private service: SeoService) {}

  // NEW SEO SETTING
  @Effect()
  doAddseo$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_SEO_SITE_SETTINGS),
    map((action: actions.DoNewSeoSiteSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createSeo(state).pipe(
        switchMap(user => [new actions.DoNewSeoSiteSettingSuccessAction(user)]),
        catchError(error =>
          of(new actions.DoNewSeoSiteSettingFailAction(error))
        )
      );
    })
  );

  // GET SEO SETTING
  @Effect()
  dogetseosetting$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_SEO_SITE_SETTINGS),
    map((action: actions.DoGetSeoSiteSettingAction) => action.payload),
    switchMap(() => {
      return this.service.getSeo().pipe(
        switchMap(user => {
          return [new actions.DoGetSeoSiteSettingSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoGetSeoSiteSettingFailAction()))
      );
    })
  );
}
