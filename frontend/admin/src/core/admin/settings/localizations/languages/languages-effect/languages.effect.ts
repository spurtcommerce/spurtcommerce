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
import { catchError } from 'rxjs/operators';
import * as actions from '../languages-action/languages.action';
import { LanguagesService } from '../languages.service';

@Injectable()
export class LanguagesEffect {
  constructor(private action$: Actions, private service: LanguagesService) {}

  // Language LIST
  
  doLanguagelists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_LANG_LIST),
    map((action: actions.DoLanguageListAction) => action.payload),
    switchMap(state => {
      return this.service.Languageslist(state).pipe(
        switchMap(language => [
          new actions.DoLanguageListSuccessAction(language)
        ]),
        catchError(error => of(new actions.DoLanguageListFailAction(error)))
      );
    })
  ));
  // Language ADD
  
  doLanguageAdds$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_LANG_ACTION),
    map((action: actions.DoAddLanguageAction) => action.payload),
    switchMap(state => {
      return this.service.ADDLanguage(state).pipe(
        switchMap(language => [
          new actions.DoAddLanguageSuccessAction(language)
        ]),
        catchError(error => of(new actions.DoAddLanguageFailAction(error)))
      );
    })
  ));
  // Language Update
  
  doLanguageUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_LANG_ACTION),
    map((action: actions.DoUpdateLanguageAction) => action.payload),
    switchMap(state => {
      const languageId = state.languageId;
      return this.service.UpdateLanguage(state, languageId).pipe(
        switchMap(language => [
          new actions.DoUpdateLanguageSuccessAction(language)
        ]),
        catchError(error => of(new actions.DoUpdateLanguageFailAction(error)))
      );
    })
  ));
  // Language Delete
  
  doLanguageDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_LANG_ACTION),
    map((action: actions.DoDeleteLanguageAction) => action.payload),
    switchMap(state => {
      const languageId = state.languageId;
      return this.service.DeleteLanguage(state, languageId).pipe(
        switchMap(language => [
          new actions.DoDeleteLanguageSuccessAction(language)
        ]),
        catchError(error => of(new actions.DoDeleteLanguageFailAction(error)))
      );
    })
  ));
  // Language LIST
  
  doLanguagelistspagination$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_LANG_LIST_PAGIATION),
    map((action: actions.DoLanguagePaginationAction) => action.payload),
    switchMap(state => {
      return this.service.Languageslistpagination(state).pipe(
        switchMap(language => [
          new actions.DoLanguagePaginationSuccessAction(language)
        ]),
        catchError(error =>
          of(new actions.DoLanguagePaginationFailAction(error))
        )
      );
    })
  ));
}
