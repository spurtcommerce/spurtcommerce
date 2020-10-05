/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as pagesActions from './pagesaction/page.action';
import {
  getaddPages,
  getaddpagesstatus,
  getpagesaddfailed,
  getpagesaddloaded,
  getpagesaddloading,
  getpagescountfailed,
  getpagescountloaded,
  getpagescountloading,
  getpagesdelete,
  getpagesdeletefailed,
  getpagesdeleteloaded,
  getpagesdeleteloading,
  getpageslist,
  getpageslistcount,
  getpageslistfailed,
  getInactivePageCount,
  getpageslistloaded,
  getActivePageCount,
  getpageslistloading,
  getpagesupdatefailed,
  getpagesupdateloaded,
  getpagesupdateloading,
  getupdatepages
} from './pages-reducer/page.selector';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PageslistModel } from './pages-model/pageslist.model';
import { PagesaddModel } from './pages-model/pagesadd.model';
import { PagesupdateModel } from './pages-model/pagesupdate.model';
import { PagescountModel } from './pages-model/pagescount.model';
import * as productActions from '../../catalog/product/product-action/product.action';

@Injectable()
export class PagesSandbox implements OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public getpageslist$ = this.appState.select(getpageslist);
  public getpageslistloading$ = this.appState.select(getpageslistloading);
  public getpageslistloaded$ = this.appState.select(getpageslistloaded);
  public getpageslistfailed$ = this.appState.select(getpageslistfailed);

  public getpageslistcount$ = this.appState.select(getpageslistcount);
  public getaddPages$ = this.appState.select(getaddPages);
  public getpagesaddloading$ = this.appState.select(getpagesaddloading);
  public getpagesaddloaded$ = this.appState.select(getpagesaddloaded);
  public getpagesaddfailed$ = this.appState.select(getpagesaddfailed);

  public getpagesupdateloading$ = this.appState.select(getpagesupdateloading);
  public getpagesupdateloaded$ = this.appState.select(getpagesupdateloaded);
  public getpagesupdatefailed$ = this.appState.select(getpagesupdatefailed);

  public getpagesdeleteloading$ = this.appState.select(getpagesdeleteloading);
  public getpagesdeleteloaded$ = this.appState.select(getpagesdeleteloaded);
  public getpagesdeletefailed$ = this.appState.select(getpagesdeletefailed);

  public getaddpagesstatus$ = this.appState.select(getaddpagesstatus);
  public getupdatepages$ = this.appState.select(getupdatepages);
  public getpagesdelete$ = this.appState.select(getpagesdelete);

  public getpagescountfailed$ = this.appState.select(getpagescountfailed);
  public getpagescountloaded$ = this.appState.select(getpagescountloaded);
  public getpagescountloading$ = this.appState.select(getpagescountloading);

  public activePageCount$ = this.appState.select(getActivePageCount);
  public inactivePageCount$ = this.appState.select(getInactivePageCount);

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
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

  public subscribe() {
    this.getpageslistcount$.subscribe(data => {});
    this.subscriptions.push(
      this.getaddpagesstatus$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/pages/list']);
          }
        }
      })
    );

    this.subscriptions.push(
      this.getupdatepages$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/pages/list']);
          }
        }
      })
    );
    this.subscriptions.push(
      this.getpagesdelete$.subscribe(data => {
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
