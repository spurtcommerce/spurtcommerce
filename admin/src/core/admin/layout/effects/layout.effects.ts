/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
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
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { catchError, tap } from 'rxjs/internal/operators';
import * as actions from './../actions/layout.action';
import { Meta, Title } from '@angular/platform-browser';
import { LayoutsService } from '../layout.service';

@Injectable()
export class LayoutEffect {
  constructor(
    private actions$: Actions,
    private authApi: LayoutsService,
    private appState$: Store<store.AppState>,
    public title: Title,
    private meta: Meta
  ) {}

  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.authApi.getsettings().pipe(
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );
}
