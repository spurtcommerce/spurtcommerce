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
import * as actions from '../action/earning.action';
import { EarningService } from '../earning.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class EarningEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: EarningService,
    public toastr: ToastrService
  ) { }


 /* get earning list*/

  
  GetEarning$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.EARNING_LIST),
    map((action: actions.GetEarning) => action.payload),
    switchMap(state => {
      return this.authApi.GetEarning(state).pipe(
        map(value => new actions.GetEarningSuccess(value)),
        catchError(error => of(new actions.GetEarningFail(error)))
      );
    })
  ));




   /* get earning  count*/

 
 GetEarningCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
   ofType(actions.ActionTypes.EARNING_COUNT),
   map((action: actions.GetEarningCount) => action.payload),
   switchMap(state => {
     return this.authApi.GetEarningCount(state).pipe(
       map(value => new actions.GetEarningCountSuccess(value)),
       catchError(error => of(new actions.GetEarningCountFail(error)))
     );
   })
 ));



    /*Exportexcel*/

  //  @Effect()
  //  GetEarningExport$: Observable<Action> = this.actions$.pipe(
  //    ofType(actions.ActionTypes.EARNING_EXPORT),
  //    map((action: actions.GetEarningExport) => action.payload),
  //    switchMap(state => {
      
  //      return this.authApi.GetEarningExport(state).pipe(
        
  //        map(value => new actions.GetEarningExportSuccess(value)),
  //        catchError(error => of(new actions.GetEarningExportFail(error)))
  //      );
  //    })
  //  );

   
   GetEarningExport$: Observable<Action> = createEffect(() => this.actions$.pipe(
     ofType(actions.ActionTypes.EARNING_EXPORT),
     map((action: actions.GetEarningExport) => action.payload),
     switchMap(state => {
       return this.authApi.GetEarningExport(state).pipe(
         tap(data => {
          
           const filename = 'product_list_' + Date.now() + '.xlsx';
           const blob = new Blob([data], { type: 'text/xlsx' });
           saveAs(blob, filename);
         }),
         switchMap(list => [new actions.GetEarningExportSuccess(list)]),
         catchError(error => of(new actions.GetEarningExportFail(error)))
       );
     })
   ));
  }