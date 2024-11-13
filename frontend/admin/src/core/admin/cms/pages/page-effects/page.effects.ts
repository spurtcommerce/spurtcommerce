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
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../pagesaction/page.action';
import { catchError } from 'rxjs/operators';
import { PagesApiclientService } from '../pages.ApiclientService';
import { PagesupdateResponseModel } from '../pages-model/pagesupdate.response.model';
import { PagescountResponseModel } from '../pages-model/pagescount.response.model';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class PageEffects {
  constructor(
    private action$: Actions,
    private apiCli: PagesApiclientService,
    protected appState: Store<store.AppState>
  ) { }

  // PAGES LIST EFFECT
  
  doPagesList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_LIST_ACTION),
    map((action: actions.DoPagesListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pages => [new actions.DoPagesSuccessAction(pages)]),
        catchError(error => of(new actions.DoPagesFailAction(error)))
      );
    })
  ));

  // PAGES  COUNT LIST EFFECT
  
  doPagesCountList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_COUNT_LIST_ACTION),
    map((action: actions.DoPagescountListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.DoPagescountSuccessAction(
            new PagescountResponseModel(pagesCount)
          )
        ]),
        catchError(error => of(new actions.DoPagescountFailAction(error)))
      );
    })
  ));

  // ACTIVE PAGES  COUNT  EFFECT
  
  activePageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_COUNT),
    map((action: actions.GetActiveCount) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.GetActiveCountSuccess(
            new PagescountResponseModel(pagesCount)
          )
        ]),
        catchError(error => of(new actions.GetActiveCountFail(error)))
      );
    })
  ));
  // IN-ACTIVE PAGES  COUNT  EFFECT
  
  in_activePageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_IN_ACTIVE_COUNT),
    map((action: actions.GetInactiveCount) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.GetInactiveCountSuccess(
            new PagescountResponseModel(pagesCount)
          )
        ]),
        catchError(error => of(new actions.GetInactiveCountFail(error)))
      );
    })
  ));
  // add - pages
  
  doAddPagesList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_PAGES_LIST),
    map((action: actions.DoAddPagesAction) => action.payload),
    switchMap(state => {
      return this.apiCli.Addpages(state).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.GetActiveCount({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.GetInactiveCount({ count: 1, status: 1 })
          );
        }),
        map(analysis => new actions.DoAddPagesSuccessAction(analysis)),
        catchError(error => of(new actions.DoAddPagesFailAction(error)))
      );
    })
  ));
  // update - pages
  
  doUpdatePagesList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_PAGES_LIST),
    map((action: actions.DoUpdatepagesAction) => action.payload),
    switchMap(state => {
      const pageId = state.pageId;
      return this.apiCli.updatepages(state, pageId).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.GetActiveCount({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.GetInactiveCount({ count: 1, status: 1 })
          );
        }),
        map(
          analysis =>
            new actions.DoUpdatepagesSuccessAction(
              new PagesupdateResponseModel(analysis)
            )
        ),
        catchError(error => of(new actions.DoUpdatepagesFailAction(error)))
      );
    })
  ));
  
  doPagesDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_DELETE),
    map((action: actions.DoPagesDeleteAction) => action.payload),
    switchMap(state => {
      const pageId = state.pageId;

      return this.apiCli.deletepageslist(state, pageId).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.GetActiveCount({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.GetInactiveCount({ count: 1, status: 1 })
          );
        }),
        switchMap(user => [new actions.DoPagesDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoPagesDeleteFailAction(error)))
      );
    })
  ));

  // Pages Bulk Delete
  
  doPagesBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_BULK_DELETE),
    map((action: actions.DoPagesBulkDelete) => action.payload),
    switchMap(state => {
      return this.apiCli.pagesBulkDelete(state).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.GetActiveCount({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.GetInactiveCount({ count: 1, status: 0 })
          );
        }),
        switchMap(user => [new actions.DoPagesBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoPagesBulkDeleteFail(error)))
      );
    })
  ));

  // get all counts in pages

  
  pageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_COUNT),
    map((action: actions.GetPageCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getPageCount().pipe(
        switchMap(pages => [new actions.GetPageCountSuccessAction(pages)]),
        catchError(error => of(new actions.GetPageCountFailAction(error)))
      );
    })
  ));

  // PAGES DETAILS
  
  pageDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_DETAILS),
    map((action: actions.GetPageDetailsAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageDetails(state).pipe(
        switchMap(pages => [new actions.GetPageDetailsSuccessAction(pages)]),
        catchError(error => of(new actions.GetPageDetailsFailAction(error)))
      );
    })
  ));

  
  groupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GROUP_LIST),
    map((action: actions.GroupListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.groupList(state).pipe(
        switchMap(pages => [new actions.GroupListSuccessAction(pages)]),
        catchError(error => of(new actions.GroupListFailAction(error)))
      );
    })
  ));

  // Page  localization list
  
  pageLocalizationList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_LOCALIZATION_LIST),
    map((action: actions.pageLocalizationList) => action.payload),
    switchMap(state => {
      return this.apiCli.pageLocalizationList(state).pipe(
        switchMap(page => [
          new actions.pageLocalizationListSuccess(page)
        ]),
        catchError(error => of(new actions.pageLocalizationListFailed(error)))
      );
    })
  ));

  // Page  localization Count
  
  pageLocalizationCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_LOCALIZATION_COUNT),
    map((action: actions.pageLocalizationCount) => action.payload),
    switchMap(state => {
      return this.apiCli.pageLocalizationCount(state).pipe(
        switchMap(page => [
          new actions.pageLocalizationCountSuccess(page)
        ]),
        catchError(error => of(new actions.pageLocalizationCountFailed(error)))
      );
    })
  ));

  // Page  localization Detail
  
  pageLocalizationDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_LOCALIZATION_DETAIL),
    map((action: actions.pageLocalizationDetail) => action.payload),
    switchMap(state => {
      return this.apiCli.pageLocalizationDetail(state).pipe(
        switchMap(page => [
          new actions.pageLocalizationDetailSuccess(page)
        ]),
        catchError(error => of(new actions.pageLocalizationDetailFailed(error)))
      );
    })
  ));

  // Page  localization create
  
  pageLocalizationCreate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_LOCALIZATION_CREATE),
    map((action: actions.pageLocalizationCreate) => action.payload),
    switchMap(state => {
      return this.apiCli.pageLocalizationCreate(state).pipe(
        switchMap(page => [
          new actions.pageLocalizationCreateSuccess(page)
        ]),
        catchError(error => of(new actions.pageLocalizationCreateFailed(error)))
      );
    })
  ));
}
