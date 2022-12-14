/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as pagesActions from './pagesaction/page.action';
import {
  pagesList,
  pageCount,
  pageCountLoading,
  pageDetails,
  pageDetailsLoaded,
  pageDetailsLoading,
  groupList,
  pagesListCount,
  addPages,
  addPagesStatus,
  updatePages,
  pagesDelete,
  pageActiveCount,
  pageInactiveCount
} from './pages-reducer/page.selector';
import { Subscription } from 'rxjs/index';
import { PageslistModel } from './pages-model/pageslist.model';
import { PagesaddModel } from './pages-model/pagesadd.model';
import { PagesupdateModel } from './pages-model/pagesupdate.model';
import { PagescountModel } from './pages-model/pagescount.model';

@Injectable()
export class PagesSandbox implements OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public pagesList$ = this.appState.select(pagesList);
  public pagesListCount$ = this.appState.select(pagesListCount);
  public addPages$ = this.appState.select(addPages);

  public addPagesStatus$ = this.appState.select(addPagesStatus);
  public updatePages$ = this.appState.select(updatePages);
  public pagesDelete$ = this.appState.select(pagesDelete);

  public activePageCount$ = this.appState.select(pageActiveCount);
  public inactivePageCount$ = this.appState.select(pageInactiveCount);

  public pageCount$ = this.appState.select(pageCount);
  public pageCountLoading$ = this.appState.select(pageCountLoading);

  public pageDetails$ = this.appState.select(pageDetails);
  public pageDetailsLoading$ = this.appState.select(pageDetailsLoading);
  public pageDetailsLoaded$ = this.appState.select(pageDetailsLoaded);

  public groupList$ = this.appState.select(groupList);


  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {
    this.subscribe();
  }

  public getPagesList(value: any) {
    this.appState.dispatch(
      new pagesActions.DoPagesListAction(new PageslistModel(value))
    );
  }

  //  update
  public updatePagesList(value) {
    this.appState.dispatch(
      new pagesActions.DoUpdatepagesAction(new PagesupdateModel(value))
    );
  }

  //  pagination

  public getPagePagination(value: any) {
    this.appState.dispatch(
      new pagesActions.DoPagescountListAction(new PagescountModel(value))
    );
  }
  //  active pages count

  public getActivePageCount(value: any) {
    this.appState.dispatch(new pagesActions.GetActiveCount(value));
  }
  //  inactive pages count

  public getInactivePageCount(value: any) {
    this.appState.dispatch(new pagesActions.GetInactiveCount(value));
  }
  //  add pages

  public getAddpages(data) {
    this.appState.dispatch(
      new pagesActions.DoAddPagesAction(new PagesaddModel(data))
    );
  }

  //  delete  list  page
  public deletePagesList(value) {
    this.appState.dispatch(new pagesActions.DoPagesDeleteAction(value));
  }

  // Do Product Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new pagesActions.DoPagesBulkDelete(value));
  }

  // Get Page Overall count

  public getPageCount() {
    this.appState.dispatch(new pagesActions.GetPageCountAction());
  }

  // Get Page Details

  public getPageDetails(value) {
    this.appState.dispatch(new pagesActions.GetPageDetailsAction(value));
  }

  public getGroupList(value) {
    this.appState.dispatch(new pagesActions.GroupListAction(value));
  }

  public subscribe() {

    this.subscriptions.push(
      this.pagesDelete$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/pages/list']);
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
