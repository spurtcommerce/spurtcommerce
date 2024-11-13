/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerManagementActions from './action/sellermanagement.action';
// app state
import * as store from 'src/core/app.state.interface';

import {
  attributeList, attributeListLoading, attributeListLoaded, getListAttributecount, getListAttributecountLoading, getListAttributecountLoaded,
  getCategoryList, getCategoryListLoading, getCategoryListLoaded,
  getCategoryListCount, getCategoryListCountLoading, getCategoryListCountLoaded,
  rejectSellerList, rejectSellerListLoading, rejectSellerListLoaded, approvedListCount, approvedListCountLoading, approvedListCountLoaded, rejectSellerListCount, rejectSellerListCountLoading, rejectSellerListCountLoaded, approveListStatus, approveListStatusLoading, approveListStatusLoaded, countryList, countryListLoading, countryListLoaded, comment, commentLoading, commentLoaded
} from './reducer/sellermanagement.selector';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable()
export class SellerManagementSandbox {


  // attributeList 
  public attributeList$ = this.appState.select(attributeList);
  public attributeListLoading$ = this.appState.select(attributeListLoading);
  public attributeListLoaded$ = this.appState.select(attributeListLoaded);

  // getListAttributecount
  public getListAttributecount$ = this.appState.select(getListAttributecount);
  public getListAttributecountLoading$ = this.appState.select(getListAttributecountLoading);
  public getListAttributecountLoaded$ = this.appState.select(getListAttributecountLoaded);










  // CategoryList 
  public getCategoryList$ = this.appState.select(getCategoryList);
  public getCategoryListLoading$ = this.appState.select(getCategoryListLoading);
  public getCategoryListLoaded$ = this.appState.select(getCategoryListLoaded);


  // getCategoryListCount
  public getCategoryListCount$ = this.appState.select(getCategoryListCount);
  public getCategoryListCountLoading$ = this.appState.select(getCategoryListCountLoading);
  public getCategoryListCountLoaded$ = this.appState.select(getCategoryListCountLoaded);







  //rejectSellerList
  public rejectSellerList$ = this.appState.select(rejectSellerList);
  public rejectSellerListLoading$ = this.appState.select(rejectSellerListLoading);
  public rejectSellerListLoaded$ = this.appState.select(rejectSellerListLoaded);



  //approvedListCount
  public approvedListCount$ = this.appState.select(approvedListCount);
  public approvedListCountLoading$ = this.appState.select(approvedListCountLoading);
  public approvedListCountLoaded$ = this.appState.select(approvedListCountLoaded);


  //rejectSellerListCount
  public rejectSellerListCount$ = this.appState.select(rejectSellerListCount);
  public rejectSellerListCountLoading$ = this.appState.select(rejectSellerListCountLoading);
  public rejectSellerListCountLoaded$ = this.appState.select(rejectSellerListCountLoaded);


  //approveListStatus
  public approveListStatus$ = this.appState.select(approveListStatus);
  public approveListStatusLoading$ = this.appState.select(approveListStatusLoading);
  public approveListStatusLoaded$ = this.appState.select(approveListStatusLoaded);


  //countryList
  public countryList$ = this.appState.select(countryList);
  public countryListLoading$ = this.appState.select(countryListLoading);
  public countryListLoaded$ = this.appState.select(countryListLoaded);


  //comment
  public comment$ = this.appState.select(comment);
  public commentLoading$ = this.appState.select(commentLoading);
  public commentLoaded$ = this.appState.select(commentLoaded);


  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {
    // ----
  }

  // attributeList
  public attributeList(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.attributeListAction(value)
    );
  }

  // getListAttributecount
  public getListAttributecount(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.getListAttributecountAction(value)
    );
  }








  // categoryList

  public getCategoryList(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.getCategoryListAction(value)
    );
  }


  // getCategoryListCount

  public getCategoryListCount(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.getCategoryListCountAction(value)
    );
  }




  //rejectSellerList
  public rejectSellerList(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.rejectSellerListAction(value)
    );
  }

  //approvedListCount
  public approvedListCount(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.approvedListCountAction(value)
    );
  }


  //rejectSellerListCount
  public rejectSellerListCount(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.rejectSellerListCountAction(value)
    );
  }


  //rejectSellerListCount
  public approveListStatus(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.approveListStatusAction(value)
    );
  }

  //countryList
  public countryList(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.countryListAction(value)
    );
  }

  //comment
  public comment(value: any) {
    this.appState.dispatch(
      new SellerManagementActions.commentAction(value)
    );
  }




}
