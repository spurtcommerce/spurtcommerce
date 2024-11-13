/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as pageGroupActions from './page-group-action/page-group.action';
import {
  pageCount,
  pageCountLoading,
  pageDetails,
  pageDetailsLoaded,
  pageDetailsLoading,
  pageGroupList,
  pageGroupDelete,
  pageGroupListCount,
  pageGroupListLoaded,
  pageGroupListLoading,
  addPages,
  addPagesStatus,
  updatePages,
  pageActiveCount,
  pageInactiveCount,
  pageGroupCount,
  pageGroupCountLoading,
  pageGroupCountLoaded,

  pageGroupLocalizationList,
  pageGroupLocalizationListFailed,
  pageGroupLocalizationListLoaded,
  pageGroupLocalizationListLoading,

  pageGroupLocalizationCount,
  pageGroupLocalizationCountLoading,
  pageGroupLocalizationCountLoaded,
  pageGroupLocalizationCountFailed,

  pageGroupLocalizationDetail,
  pageGroupLocalizationDetailFailed,
  pageGroupLocalizationDetailLoaded,
  pageGroupLocalizationDetailLoading,
  
  pageGroupLocalizationCreate,
  pageGroupLocalizationCreateLoading,
  pageGroupLocalizationCreateLoaded,
  pageGroupLocalizationCreateFailed

} from './page-group-reducer/page-group.selector';
import { Subscription } from 'rxjs/index';
import { ToastrService } from 'ngx-toastr';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class PageGroupSandbox implements OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public pageGroupList$ = this.appState.select(pageGroupList);
  public getpageGrouplistloading$ = this.appState.select(pageGroupListLoading);
  public getpageGrouplistloaded$ = this.appState.select(pageGroupListLoaded);
  public pageGroupListCount$ = this.appState.select(pageGroupListCount);
  public addPages$ = this.appState.select(addPages);


  public addPagesStatus$ = this.appState.select(addPagesStatus);
  public updatePages$ = this.appState.select(updatePages);
  public pageGroupDelete$ = this.appState.select(pageGroupDelete);


  public activePageCount$ = this.appState.select(pageActiveCount);
  public inactivePageCount$ = this.appState.select(pageInactiveCount);

  public pageCount$ = this.appState.select(pageCount);
  public pageCountLoading$ = this.appState.select(pageCountLoading);

  public pageDetails$ = this.appState.select(pageDetails);
  public pageDetailsLoading$ = this.appState.select(pageDetailsLoading);
  public pageDetailsLoaded$ = this.appState.select(pageDetailsLoaded);

  public pageGroupCount$ = this.appState.select(pageGroupCount);
  public pageGroupCountLoading$ = this.appState.select(pageGroupCountLoading);
  public pageGroupCountLoaded$ = this.appState.select(pageGroupCountLoaded);

  // Page Group Localization List
  public pageGroupLocalizationList$ = this.appState.select(pageGroupLocalizationList);
  public pageGroupLocalizationListLoading = this.appState.select(pageGroupLocalizationListLoading);
  public pageGroupLocalizationListLoaded = this.appState.select(pageGroupLocalizationListLoaded);
  public pageGroupLocalizationListFailed = this.appState.select(pageGroupLocalizationListFailed);

  // Page Group Localization List
  public pageGroupLocalizationCount$ = this.appState.select(pageGroupLocalizationCount);
  public pageGroupLocalizationCountLoading = this.appState.select(pageGroupLocalizationCountLoading);
  public pageGroupLocalizationCountLoaded = this.appState.select(pageGroupLocalizationCountLoaded);
  public pageGroupLocalizationCountFailed = this.appState.select(pageGroupLocalizationCountFailed);

  // Page Group Localization Detail
  public pageGroupLocalizationDetail$ = this.appState.select(pageGroupLocalizationDetail);
  public pageGroupLocalizationDetailLoading = this.appState.select(pageGroupLocalizationDetailLoading);
  public pageGroupLocalizationDetailLoaded = this.appState.select(pageGroupLocalizationDetailLoaded);
  public pageGroupLocalizationDetailFailed = this.appState.select(pageGroupLocalizationDetailFailed);

  // Page Group Localization Create
  public pageGroupLocalizationCreate$ = this.appState.select(pageGroupLocalizationCreate);
  public pageGroupLocalizationCreateLoading = this.appState.select(pageGroupLocalizationCreateLoading);
  public pageGroupLocalizationCreateLoaded = this.appState.select(pageGroupLocalizationCreateLoaded);
  public pageGroupLocalizationCreateFailed = this.appState.select(pageGroupLocalizationCreateFailed);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.subscribe();
  }

  public getPageGroupList(value: any) {
    this.appState.dispatch(
      new pageGroupActions.DoPageGroupListAction(value));
  }

  //  update
  public updatePageGroupList(value) {
    this.appState.dispatch(
      new pageGroupActions.DoUpdatepagesAction(value));
  }

  //  pagination

  public getPagePagination(value: any) {
    this.appState.dispatch(
      new pageGroupActions.DoPageGroupcountListAction(value));
  }
  //  active pageGroup count

  public getActivePageCount(value: any) {
    this.appState.dispatch(new pageGroupActions.GetActiveCount(value));
  }
  //  inactive pageGroup count

  public getInactivePageCount(value: any) {
    this.appState.dispatch(new pageGroupActions.GetInactiveCount(value));
  }
  //  add pageGroup

  public addPageGroup(data) {
    this.appState.dispatch(
      new pageGroupActions.DoAddPageGroupAction(data));
  }

  //  delete  list  page
  public deletePageGroupList(value) {
    this.appState.dispatch(new pageGroupActions.DoPageGroupDeleteAction(value));
  }

  // Do Product Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new pageGroupActions.DoPageGroupBulkDelete(value));
  }

  // Get Page Overall count

  public getPageCount() {
    this.appState.dispatch(new pageGroupActions.GetPageCountAction());
  }

  // Get Page Details

  public getPageDetails(value) {
    this.appState.dispatch(new pageGroupActions.GetPageDetailsAction(value));
  }

   // Get PageGroup Overall count

   public getPageGroupCount() {
    this.appState.dispatch(new pageGroupActions.GetPageGroupCountAction());
  }

  // Page Group Localization List
  public pageGroupLocalizationList(data) {
    this.appState.dispatch(new pageGroupActions.pageGroupLocalizationList(data));
  }

  // Page Group Localization Count
  public pageGroupLocalizationCount(data) {
    this.appState.dispatch(new pageGroupActions.pageGroupLocalizationCount(data));
  }

  // Page Group Localization Detail 
  public pageGroupLocalizationDetail(data) {
    this.appState.dispatch(new pageGroupActions.pageGroupLocalizationDetail(data));
  }

  // Page Group Localization Create 
  public pageGroupLocalizationCreate(data) {
    this.appState.dispatch(new pageGroupActions.pageGroupLocalizationCreate(data));
  }

  public subscribe() {
    this.subscriptions.push(
      this.pageGroupDelete$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/page-group/list']);
          }
        }
      })
    );
  }

  ngOnDestroy() {
    {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }
}
