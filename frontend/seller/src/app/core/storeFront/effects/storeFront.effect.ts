/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from '../action/storeFront.action';
import { StoreFrontService } from '../storeFront.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class SellerOnBoardingEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: StoreFrontService,
    public toastr: ToastrService
  ) { }

  
  getWishlistCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_WISHLIST_COUNT),
    map((action: actions.GetWishlistCount) => action.payload),
    switchMap(state => {
      return this.authApi.getWishlistCount(state).pipe(
        map(wishlish => new actions.GetWishlistCountSuccess(wishlish)),
        catchError(error => of(new actions.GetWishlistCountFail(error)))
      );
    })
  ));
  


  
  getSettings$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS),
    map((action: actions.GetSetting) => action.payload),
    switchMap(state => {
      return this.authApi.doGetSettings(state).pipe(
        tap(val => {
          if (val.data) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendor-settings', JSON.stringify(val?.data[0]));
            }
          }
        }),
        map(profile => new actions.GetSettingSuccess(profile)),
        catchError(error => of(new actions.GetSettingFail(error)))
      );
    })
  ));

  

  }