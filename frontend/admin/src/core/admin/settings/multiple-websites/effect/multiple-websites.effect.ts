/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { MultipleWebsitesService } from '../multiple-websites.service';
import * as actions from '../action/multiple-websites.action';
import { Router } from '@angular/router';
@Injectable()
export class MultipleWebsitesEffect {
  constructor(public action$: Actions, public service: MultipleWebsitesService, private router:Router) {}

    /*Get Multiple websites List*/

  
  MultipleWebsitesList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_WEBSITES_LIST),
    map((action: actions.MultipleWebsitesListAction) => action.payload),
    switchMap(state => {
      return this.service.GetMultipleWebsitesList(state).pipe(
        switchMap(user => [new actions.MultipleWebsitesListSuccessAction(user)]),
        catchError(error => of(new actions.MultipleWebsitesListFailAction(error)))
      );
    })
  ));

   /*Create Multiple websites*/

   
   CreateMultipleWebsites$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.CREATE_MULTIPLE_WEBSITES),
     map((action: actions.CreateMultipleWebsitesAction) => action.payload),
     switchMap(state => {
       return this.service.CreateMultipleWebsites(state).pipe(
         switchMap(user => [new actions.CreateMultipleWebsitesSuccessAction(user)]),
         tap((res) => {
          if (res.payload.status == 1) {
            this.router.navigate(['/settings/multiple-websites']);
          }
         }),
         catchError(error => of(new actions.CreateMultipleWebsitesFailAction(error)))
       );
     })
   ));

   /*Update Multiple websites*/

   
   UpdateMultipleWebsites$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.UPDATE_MULTIPLE_WEBSITES),
     map((action: actions.UpdateMultipleWebsitesAction) => action.payload),
     switchMap(state => {
       return this.service.UpdateMultipleWebsites(state).pipe(
         switchMap(user => [new actions.UpdateMultipleWebsitesSuccessAction(user)]),
         tap((res) => {
          if (res.payload.status == 1) {
            this.router.navigate(['/settings/multiple-websites']);
          }
         }),
         catchError(error => of(new actions.UpdateMultipleWebsitesFailAction(error)))
       );
     })
   ));
  //  settings get details
  
   GetSettingsMultipleWebsites$: Observable<Action> = createEffect(() => this.action$.pipe(
     ofType(actions.ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES),
     map((action: actions.GetSettingsMultipleWebsitesAction) => action.payload),
     switchMap(state => {
       return this.service.GetSettingsMultipleWebsites(state).pipe(
         switchMap(user => [new actions.GetSettingsMultipleWebsitesSuccessAction(user)]),
         tap((res) => {}),
         catchError(error => of(new actions.GetSettingsMultipleWebsitesFailAction(error)))
       );
     })
   ));
}
