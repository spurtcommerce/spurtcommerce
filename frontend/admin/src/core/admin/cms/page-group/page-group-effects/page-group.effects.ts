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
import * as actions from '../page-group-action/page-group.action';
import { catchError } from 'rxjs/operators';
import { PageGroupService } from '../page-group.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class PageGroupEffects {
  constructor(
    private action$: Actions,
    private apiCli: PageGroupService,
    protected appState: Store<store.AppState>
  ) {}

  // PAGES_GROUP LIST EFFECT
  
  doPageGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_GROUP_LIST_ACTION),
    map((action: actions.DoPageGroupListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pages => [new actions.DoPageGroupSuccessAction(pages)]),
        catchError(error => of(new actions.DoPageGroupFailAction(error)))
      );
    })
  ));

  // PAGES_GROUP  COUNT LIST EFFECT
  
  doPageGroupCountList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_GROUP_COUNT_LIST_ACTION),
    map((action: actions.DoPageGroupcountListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.DoPageGroupcountSuccessAction(pagesCount)
        ]),
        catchError(error => of(new actions.DoPageGroupcountFailAction(error)))
      );
    })
  ));

  // ACTIVE PAGES_GROUP  COUNT  EFFECT
  
  activePageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_COUNT),
    map((action: actions.GetActiveCount) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.GetActiveCountSuccess(pagesCount)
        ]),
        catchError(error => of(new actions.GetActiveCountFail(error)))
      );
    })
  ));
  // IN-ACTIVE PAGES_GROUP  COUNT  EFFECT
  
  in_activePageCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_IN_ACTIVE_COUNT),
    map((action: actions.GetInactiveCount) => action.payload),
    switchMap(state => {
      return this.apiCli.getpageslist(state).pipe(
        switchMap(pagesCount => [
          new actions.GetInactiveCountSuccess(pagesCount)
        ]),
        catchError(error => of(new actions.GetInactiveCountFail(error)))
      );
    })
  ));
  // add - pages
  
  doAddPageGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_PAGES_GROUP_LIST),
    map((action: actions.DoAddPageGroupAction) => action.payload),
    switchMap(state => {
      return this.apiCli.Addpages(state).pipe(
        map(analysis => new actions.DoAddPageGroupSuccessAction(analysis)),
        catchError(error => of(new actions.DoAddPageGroupFailAction(error)))
      );
    })
  ));
  // update - pages
  
  doUpdatePageGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_PAGES_GROUP_LIST),
    map((action: actions.DoUpdatepagesAction) => action.payload),
    switchMap(state => {
      const pageId = state.pageId;
      return this.apiCli.updatepages(state).pipe(
        map(
          analysis =>
            new actions.DoUpdatepagesSuccessAction(analysis)
        ),
        catchError(error => of(new actions.DoUpdatepagesFailAction(error)))
      );
    })
  ));
  
  doPageGroupDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_GROUP_DELETE),
    map((action: actions.DoPageGroupDeleteAction) => action.payload),
    switchMap(state => {
      const pageId = state.pageId;
      return this.apiCli.deletepageslist(state, pageId).pipe(
        switchMap(user => [new actions.DoPageGroupDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoPageGroupDeleteFailAction(error)))
      );
    })
  ));

  // PageGroup Bulk Delete
  
  doPageGroupBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAGES_GROUP_BULK_DELETE),
    map((action: actions.DoPageGroupBulkDelete) => action.payload),
    switchMap(state => {
      return this.apiCli.pagesBulkDelete(state).pipe(
        switchMap(user => [new actions.DoPageGroupBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoPageGroupBulkDeleteFail(error)))
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

   // PAGES_GROUP DETAILS
  
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

   // PAGES_GROUP Count
  
  pageGroupCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_GROUP_COUNT),
    map((action: actions.GetPageGroupCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getPageGroupCount().pipe(
        switchMap(pages => [new actions.GetPageGroupCountSuccessAction(pages)]),
        catchError(error => of(new actions.GetPageGroupCountFailAction(error)))
      );
    })
  ));

  // Page Group localization list
  
  pageGroupLocalizationList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_GROUP_LOCALIZATION_LIST),
    map((action: actions.pageGroupLocalizationList) => action.payload),
    switchMap(state => {
      return this.apiCli.pageGroupLocalizationList(state).pipe(
        switchMap(pageGroup => [
          new actions.pageGroupLocalizationListSuccess(pageGroup)
        ]),
        catchError(error => of(new actions.pageGroupLocalizationListFailed(error)))
      );
    })
  ));

  // Page Group localization Count
  
  pageGroupLocalizationCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT),
    map((action: actions.pageGroupLocalizationCount) => action.payload),
    switchMap(state => {
      return this.apiCli.pageGroupLocalizationCount(state).pipe(
        switchMap(pageGroup => [
          new actions.pageGroupLocalizationCountSuccess(pageGroup)
        ]),
        catchError(error => of(new actions.pageGroupLocalizationCountFailed(error)))
      );
    })
  ));

  // Page Group localization Detail
  
  pageGroupLocalizationDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL),
    map((action: actions.pageGroupLocalizationDetail) => action.payload),
    switchMap(state => {
      return this.apiCli.pageGroupLocalizationDetail(state).pipe(
        switchMap(pageGroup => [
          new actions.pageGroupLocalizationDetailSuccess(pageGroup)
        ]),
        catchError(error => of(new actions.pageGroupLocalizationDetailFailed(error)))
      );
    })
  ));

  // Page Group localization create
  
  pageGroupLocalizationCreate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE),
    map((action: actions.pageGroupLocalizationCreate) => action.payload),
    switchMap(state => {
      return this.apiCli.pageGroupLocalizationCreate(state).pipe(
        switchMap(pageGroup => [
          new actions.pageGroupLocalizationCreateSuccess(pageGroup)
        ]),
        catchError(error => of(new actions.pageGroupLocalizationCreateFailed(error)))
      );
    })
  ));
}
