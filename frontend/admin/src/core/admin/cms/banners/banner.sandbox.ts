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
// import { ToastrManager } from 'ng6-toastr-notifications';
import * as bannerActions from '../banners/banner-action/banner.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import {
  getaddBanner,
  getbanneraddfailed,
  getbanneraddloaded,
  getbanneraddloading,
  getbannercountfailed,
  getbannercountloaded,
  getbannercountloading,
  getbannerdeletefailed,
  getbannerdeleteloaded,
  getbannerdeleteloading,
  getbannerlistfailed,
  getbannerlistloaded,
  getbannerlistloading,
  getBannerlst,
  getbannerpagination,
  getbannerupdatefailed,
  getbannerupdateloaded,
  getbannerupdateloading,
  getdeletebanner,
  getUpdatebanner,
  getbannerListCountLoading,
  getbannerListCountFailed,
  getbannerListCountLoaded,
  getbannerListCount,
  getbannerListActiveLoading,
  getbannerListACtiveFailed,
  getbannerListActiveLoaded,
  getbannerListActive,
  getbannerListInActiveLoading,
  getbannerListInACtiveFailed,
  getbannerListInActiveLoaded,
  getbannerListInActive,
  getBannerCount,
  getBannerCountLoading,
  getBannerDetails,
  getBannerDetailsLoading,
  getBannerDetailsLoaded,
  categoryLists,
  categoryListsLoading,
  categoryListsLoaded,
  categoryListsFailed,
  ProductLists,
  ProductListsLoading,
  ProductListsLoaded,
  ProductListsFailed,exportExcelLoading
} from './banner-reducer/banner.selector';
import { getAddBanners } from './banner-reducer/banner.selector';
import { BannerlistModel } from './banner-model/bannerlist.model';
import { BannerdeleteModel } from './banner-model/bannerdelete.model';
import { BannercountModel } from './banner-model/bannercount.model';
import * as pagesActions from '../pages/pagesaction/page.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BannerSandbox implements OnDestroy {

  public exportExcelLoading$ = this.appState.select(exportExcelLoading)
  public getbannerlist$ = this.appState.select(getBannerlst);
  public getbannerpagelength$ = this.appState.select(getbannerpagination);
  public getAddNewBanner$ = this.appState.select(getAddBanners);
  public getaddBanner$ = this.appState.select(getaddBanner);
  public getUpdatebanner$ = this.appState.select(getUpdatebanner);
  public getdeletebanner$ = this.appState.select(getdeletebanner);
  public getbanneraddloaded$ = this.appState.select(getbanneraddloaded);
  public getbanneraddfailed$ = this.appState.select(getbanneraddfailed);
  public getbanneraddloading$ = this.appState.select(getbanneraddloading);
  public getbannerupdateloading$ = this.appState.select(getbannerupdateloading);
  public getbannerupdateloaded$ = this.appState.select(getbannerupdateloaded);
  public getbannerupdatefailed$ = this.appState.select(getbannerupdatefailed);
  public getbannerdeleteloading$ = this.appState.select(getbannerdeleteloading);
  public getbannerdeleteloaded$ = this.appState.select(getbannerdeleteloaded);
  public getbannerdeletefailed$ = this.appState.select(getbannerdeletefailed);
  public getbannercountloading$ = this.appState.select(getbannercountloading);
  public getbannercountloaded$ = this.appState.select(getbannercountloaded);
  public getbannercountfailed$ = this.appState.select(getbannercountfailed);
  public getbannerlistloaded$ = this.appState.select(getbannerlistloaded);
  public getbannerlistfailed$ = this.appState.select(getbannerlistfailed);
  public getbannerlistloading$ = this.appState.select(getbannerlistloading);
  public getBannerCount$ = this.appState.select(getBannerCount);
  public getBannerCountLoading$ = this.appState.select(getBannerCountLoading);


  public getbannerListCount$ = this.appState.select(getbannerListCount);
  public getbannerListCountLoaded$ = this.appState.select(
    getbannerListCountLoaded
  );
  public getbannerListCountFailed$ = this.appState.select(
    getbannerListCountFailed
  );
  public getbannerListCountLoading$ = this.appState.select(
    getbannerListCountLoading
  );

  public getbannerListActive$ = this.appState.select(getbannerListActive);
  public getbannerListActiveLoaded$ = this.appState.select(
    getbannerListActiveLoaded
  );
  public getbannerListACtiveFailed$ = this.appState.select(
    getbannerListACtiveFailed
  );
  public getbannerListActiveLoading$ = this.appState.select(
    getbannerListActiveLoading
  );

  public getbannerListInActive$ = this.appState.select(getbannerListInActive);
  public getbannerListInActiveLoaded$ = this.appState.select(
    getbannerListInActiveLoaded
  );
  public getbannerListInACtiveFailed$ = this.appState.select(
    getbannerListInACtiveFailed
  );
  public getbannerListInActiveLoading$ = this.appState.select(
    getbannerListInActiveLoading
  );

  public getBannerDetails$ = this.appState.select(getBannerDetails);
  public getBannerDetailsLoading$ = this.appState.select(getBannerDetailsLoading);
  public getBannerDetailsLoaded$ = this.appState.select(getBannerDetailsLoaded);


 /*category List*/

 public categoryLists$ = this.appState.select(categoryLists);
 public categoryListsLoading$ = this.appState.select(categoryListsLoading);
 public categoryListsLoaded$ = this.appState.select(categoryListsLoaded);
 public categoryListsFailed$ = this.appState.select(categoryListsFailed);

     /*Product List*/
public ProductLists$ = this.appState.select(ProductLists);
public ProductListsLoading$ = this.appState.select(ProductListsLoading);
public ProductListsLoaded$ = this.appState.select(ProductListsLoaded);
public ProductListsFailed$ = this.appState.select(ProductListsFailed);


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    // this.subscribe();
  }

  public getBannerList(value: any) {
    this.appState.dispatch(
      new bannerActions.DoBannerListAction(new BannerlistModel(value))
    );
  }
  public getBannerListCount(value: any) {
    this.appState.dispatch(
      new bannerActions.DoBannerListCountAction(new BannerlistModel(value))
    );
  }
  public getBannerListActive(value: any) {
    this.appState.dispatch(
      new bannerActions.DoBannerListActiveAction(new BannerlistModel(value))
    );
  }

  public getBannerListInActive(value: any) {
    this.appState.dispatch(
      new bannerActions.DoBannerListInActiveAction(new BannerlistModel(value))
    );
  }

  public getBannerPagination(value: any) {
    this.appState.dispatch(
      new bannerActions.DoBannerPaginationAction(new BannercountModel(value))
    );
  }

  public addBanner(data) {
    this.appState.dispatch(new bannerActions.DoBannerAddAction(data));
  }

  public UpdateBanner(data) {
    this.appState.dispatch(new bannerActions.DoBannerUpdateAction(data));
  }

  public deletebanner(data) {
    this.appState.dispatch(
      new bannerActions.DoBannerDeleteAction(new BannerdeleteModel(data))
    );
  }

  // Do banner Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new bannerActions.DoBannerBulkDelete(value));
  }

  // Get Banner overall counts

  public getBannerCount() {
    this.appState.dispatch(new bannerActions.GetBannerCountAction());
  }

   // Get Banner Details

   public getBannerDetails(value) {
    this.appState.dispatch(new bannerActions.GetBannerDetailsAction(value));
  }
  public exportBanner(value) {
    this.appState.dispatch(new bannerActions.ExportBannerAction(value));
  }

   /*category List*/

   public categoryLists(value: any) {
    this.appState.dispatch(
      new bannerActions.categoryListsAction(value)
    );
  }

     /*Product List*/

     public ProductLists(value: any) {
      this.appState.dispatch(
        new bannerActions.ProductListsAction(value)
      );
    }


  subscribe() {
    this.subscriptions.push(
      this.getAddNewBanner$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/cms/banners/list']);
          }
        }
      })
    );

    this.subscriptions.push(
      this.getUpdatebanner$.subscribe(data => {
        if (data) {
          if (data.message) {
            this.router.navigate(['/cms/banners/list']);
          }
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
