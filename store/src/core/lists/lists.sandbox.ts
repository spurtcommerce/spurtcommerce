/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import * as authAction from './action/lists.action';
import * as store from '../state.interface';
import {
  bannerCount,
  bannerFailedStatus,
  bannerList,
  bannerLoadedStatus,
  bannerLoadingStatus,
  contactUsFailedStatus,
  contactUsLoadedStatus,
  contactUsLoadingStatus,
  countFailedStatus,
  countLoadedStatus,
  countLoadingStatus,
  countryFailed,
  countryList,
  countryLoaded,
  countryLoading,
  getCategoryList,
  getContactDetail,
  getManufacturer,
  getPageList,
  getProductCount,
  getProductDetail,
  getProductFailed,
  getProductList,
  getProductLoaded,
  getProductLoading,
  manufacturerFailedStatus,
  manufacturerLoadedStatus,
  manufacturerLoadingStatus,
  pageDetail,
  pageDetailFailedStatus,
  pageDetailLoadedStatus,
  pageDetailLoadingStatus,
  pageListFailedStatus,
  pageListLoadedStatus,
  pageListLoadingStatus,
  productDetailFailedStatus,
  productDetailLoadedStatus,
  productDetailLoadingStatus,
  settingDetail,
  zoneList,
  zoneLoading,
  zoneLoaded,
  zoneFailed,
  getMaxProductPrice,
  todayDealList,
  todayDealLoading,
  todayDealLoaded,
  todayDealFailed,
  getAvailableOptionsArray,
  getproductDetailMandatory,
  getactiveCategoryID,
  priceLoading,
  subCategoryList,
  subCategoryLoading,
  subCategoryLoaded,
  subCategoryID,
  symbolSetting

} from './reducer/lists.selector';
import { ContactUsRequestModel } from './models/contact-us-request.model';

@Injectable()
export class ListsSandbox {
  public categoryList$ = this.appState$.select(getCategoryList);
  public manufacturer$ = this.appState$.select(getManufacturer);
  public productDetails$ = this.appState$.select(getProductDetail);
  public productDetailMandatory$ = this.appState$.select(
    getproductDetailMandatory
  );
  /* product status*/
  public productlist$ = this.appState$.select(getProductList);
  public priceLoading$ = this.appState$.select(priceLoading);

  public maxProductPrice$ = this.appState$.select(getMaxProductPrice);
  public productcount$ = this.appState$.select(getProductCount);
  public productLoading$ = this.appState$.select(getProductLoading);
  public productLoaded$ = this.appState$.select(getProductLoaded);
  public productFailed$ = this.appState$.select(getProductFailed);
  /* banner status*/

  public bannerList$ = this.appState$.select(bannerList);
  public bannerListLoading$ = this.appState$.select(bannerLoadingStatus);
  public bannerListLoaded$ = this.appState$.select(bannerLoadedStatus);
  public bannerListFailed$ = this.appState$.select(bannerFailedStatus);

  public bannerCount$ = this.appState$.select(bannerCount);
  public bannerCountLoading$ = this.appState$.select(countLoadingStatus);
  public bannerCountLoaded$ = this.appState$.select(countLoadedStatus);
  public bannerCountFailed$ = this.appState$.select(countFailedStatus);
  /* page list status*/

  public pageList$ = this.appState$.select(getPageList);
  public pageListLoading$ = this.appState$.select(pageListLoadingStatus);
  public pageListLoaded$ = this.appState$.select(pageListLoadedStatus);
  public pageListFailed$ = this.appState$.select(pageListFailedStatus);
  public settingDetail$ = this.appState$.select(settingDetail);
  /* contact us status*/

  public contactUsLoaded$ = this.appState$.select(contactUsLoadingStatus);
  public contactUsLoading$ = this.appState$.select(contactUsLoadedStatus);
  public contactUsFailed$ = this.appState$.select(contactUsFailedStatus);
  public contactUs$ = this.appState$.select(getContactDetail);
  /* page detail status*/

  public pageDetailLoading$ = this.appState$.select(pageDetailLoadingStatus);
  public pageDetailLoaded$ = this.appState$.select(pageDetailLoadedStatus);
  public pageDetailFailed$ = this.appState$.select(pageDetailFailedStatus);
  public pageDetail$ = this.appState$.select(pageDetail);
  /* brand status*/

  public manufacturerLoading$ = this.appState$.select(
    manufacturerLoadingStatus
  );
  public manufacturerLoaded$ = this.appState$.select(manufacturerLoadedStatus);
  public manufacturerFailed$ = this.appState$.select(manufacturerFailedStatus);
  /* product detail status*/

  public productDetailLoading$ = this.appState$.select(
    productDetailLoadingStatus
  );
  public productDetailLoaded$ = this.appState$.select(
    productDetailLoadedStatus
  );
  public productDetailFailed$ = this.appState$.select(
    productDetailFailedStatus
  );
  /* country list status*/

  public countryList$ = this.appState$.select(countryList);
  public countryLoaded$ = this.appState$.select(countryLoading);
  public countryLoading$ = this.appState$.select(countryLoaded);
  public countryFailed$ = this.appState$.select(countryFailed);

  /* zone list status*/

  public zoneList$ = this.appState$.select(zoneList);
  public zoneLoaded$ = this.appState$.select(zoneLoading);
  public zoneLoading$ = this.appState$.select(zoneLoaded);
  public zoneFailed$ = this.appState$.select(zoneFailed);

  /* today deal list status*/

  public todayDealList$ = this.appState$.select(todayDealList);
  public todayDealLoading$ = this.appState$.select(todayDealLoading);
  public todayDealLoaded$ = this.appState$.select(todayDealLoaded);
  public todayDealFailed$ = this.appState$.select(todayDealFailed);

  /* available options seleted */
  public availableOptionsArray$ = this.appState$.select(
    getAvailableOptionsArray
  );

  public selectedCategoryList$ = this.appState$.select(subCategoryID);
  public subCategoryList$ = this.appState$.select(subCategoryList);
  public subCategoryLoading$ = this.appState$.select(subCategoryLoading);
  public subCategoryLoaded$ = this.appState$.select(subCategoryLoaded);

  // active category
  public getactiveCategoryID$ = this.appState$.select(getactiveCategoryID);

  public symbolSetting$ = this.appState$.select(symbolSetting);


  private subscriptions: Array<Subscription> = [];
  /** create a subject send the value from menucomponent and recieve value to productFilterComponent*/
  productFilterData = new Subject<any>();
  public oneTimeSubscribe: boolean;

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
    this.getSettings();
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.getCountryList(params);
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.getZoneList(params);
  }
  public getProductList(params): void {
    this.appState$.dispatch(new authAction.GetProductList(params));
  }
  public getActiveCategory(params): void {
    this.appState$.dispatch(new authAction.GetActiveCategory(params));
  }

  public getProductCount(params): void {
    this.appState$.dispatch(new authAction.GetProductCount(params));
  }

  public getCategoryList(params): void {
    this.appState$.dispatch(new authAction.GetCategoryList(params));
  }

  public getBannerList(params): void {
    this.appState$.dispatch(new authAction.GetBannerList(params));
  }

  public getManufacturerList(params): void {
    this.appState$.dispatch(new authAction.GetManufacturerList(params));
  }

  public getProductDetails(params): void {
    this.appState$.dispatch(new authAction.GetProductDetail(params));
  }

  public getProductDetailsMandatory(params): void {
    this.appState$.dispatch(new authAction.GetProductDetailMandatory(params));
  }

  public getPageList(params): void {
    this.appState$.dispatch(new authAction.GetPageList(params));
  }

  public getSettings(): void {
    this.appState$.dispatch(new authAction.GetSettings());
  }

  public contactUs(params): void {
    this.appState$.dispatch(
      new authAction.DoContactUsAction(new ContactUsRequestModel(params))
    );
  }

  public getPageDetail(params): void {
    this.appState$.dispatch(new authAction.GetPageDetails(params));
  }

  public getAvailableValue(params): void {
    this.appState$.dispatch(new authAction.GetAvailableValue(params));
  }

  public getCountryList(params): void {
    this.appState$.dispatch(new authAction.GetCountryList(params));
  }

  public getZoneList(params): void {
    this.appState$.dispatch(new authAction.GetZoneList(params));
  }

  public getTodayDealList(params): void {
    this.appState$.dispatch(new authAction.GetTodayDealsList(params));
  }
  public removeActiveCategory(): void {
    this.appState$.dispatch(new authAction.RemoveActiveCategoryId());
  }
  public getCategory(params): void {
    this.appState$.dispatch(new authAction.GetSubCategoryList(params));
  }
  /** subscribe   value **/

  public registerEvents() {
    this.subscriptions.push(
      this.contactUs$.subscribe(contact => {
        if (contact && contact['status'] === 1) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
