/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as customerTopupActions from './action/sales-report.action';

import {
  exportListLoading,
  salesReportList,
  salesReportListLoading,
  salesReportListLoaded,
  salesReportListCount,
  productList,
  productListLoading,
  productListLoaded,

  categoryList,
  categoryListLoading,
  categoryListLoaded,
  selectedProductList

} from './reducer/sales-report.selectors';


@Injectable()
export class SalesReportSandbox {


  public salesReportList$ = this.appState.select(salesReportList);
  public salesReportListLoading$ = this.appState.select(salesReportListLoading);
  public salesReportListLoaded$ = this.appState.select(salesReportListLoaded);
  public salesReportListCount$ = this.appState.select(salesReportListCount);

  public productList$ = this.appState.select(productList);
  public selectedProductList$ = this.appState.select(selectedProductList);


  public productListLoading$ = this.appState.select(productListLoading);
  public productListLoaded$ = this.appState.select(productListLoaded);

  public categoryList$ = this.appState.select(categoryList);
  public categoryListLoading$ = this.appState.select(categoryListLoading);
  public categoryListLoaded$ = this.appState.select(categoryListLoaded);

  public exportListLoading$ =this.appState.select(exportListLoading)

  constructor(protected appState: Store<store.AppState>) { }

  public salesReportList(value) {
    this.appState.dispatch(
      new customerTopupActions.SalesReportListAction(value));
  }

  public salesReportListCount(value) {
    this.appState.dispatch(
      new customerTopupActions.SalesReportListCountAction(value));
  }

  public exportSalesReport(value) {
    this.appState.dispatch(
      new customerTopupActions.ExportSalesReportAction(value));
  }

  public exportAllSalesReport(value) {
    this.appState.dispatch(
      new customerTopupActions.ExportAllSalesReportAction(value));
  }

  public getProductList(value) {
    this.appState.dispatch(
      new customerTopupActions.ProductListAction(value));
  }

  public getCategoryList(value) {
    this.appState.dispatch(
      new customerTopupActions.CategoryListAction(value));
  }

  public searchProduct(value) {
    this.appState.dispatch(
      new customerTopupActions.SearchProductList(value));
  }

  public selectProduct(params): void {
    this.appState.dispatch(new customerTopupActions.SelectProductList(params));
  }

  public searchCategory(value) {
    this.appState.dispatch(
      new customerTopupActions.SearchCategoryList(value));
  }

  public selectCategory(params): void {
    this.appState.dispatch(new customerTopupActions.SelectCategoryList(params));
  }

  public clearList(params): void {
    this.appState.dispatch(new customerTopupActions.ClearList(params));
  }




}
