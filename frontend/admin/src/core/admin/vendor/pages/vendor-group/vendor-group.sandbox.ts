/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import * as SellerActions from './vendor-group-action/vendor-group.action';
import { Subscription } from 'rxjs/index';

import {
  vendorGroup,
  vendorGroupLoading,
  vendorGroupLoaded,
  vendorGroupFailed,
  vendorGroupCount,
  vendorGroupCountLoading,
  vendorGroupCountLoaded,
  vendorGroupCountFailed,
  vendorGroupAdd,
  vendorGroupAddLoading,
  vendorGroupAddLoaded,
  vendorGroupAddFailed,
  vendorGroupDetail,
  vendorGroupDetailLoading,
  vendorGroupDetailLoaded,
  vendorGroupDetailFailed,
  vendorGroupDelete,
  vendorGroupDeleteLoading,
  vendorGroupDeleteLoaded,
  vendorGroupDeleteFailed,
  vendorGroupUpdate,
  vendorGroupUpdateLoading,
  vendorGroupUpdateLoaded,
  vendorGroupUpdateFailed,
  vendorGroupCounts,
  vendorGroupCountsLoading,
  vendorGroupCountsLoaded,
  vendorGroupCountsFailed,
  industryList,
  industryListLoading,
  industryListLoaded,
  industryListFailed

} from './vendor-group-reducer/vendor-group.selector';

@Injectable()
export class VendorGroupSandbox {
  constructor(
    protected appState: Store<store.AppState>,
  ) {}
  private subscriptions: Array<Subscription> = [];
  
  public vendorGroup$ = this.appState.select(vendorGroup);
  public vendorGroupLoading$ = this.appState.select(vendorGroupLoading);
  public vendorGroupLoaded$ = this.appState.select(vendorGroupLoaded);
  public vendorGroupFailed$ = this.appState.select(vendorGroupFailed);

  public industryList$ = this.appState.select(industryList);
  public industryListLoading$ = this.appState.select(industryListLoading);
  public industryListLoaded$ = this.appState.select(industryListLoaded);
  public industryListFailed$ = this.appState.select(industryListFailed);




  public vendorGroupCount$ = this.appState.select(vendorGroupCount);
  public vendorGroupCountLoading$ = this.appState.select(vendorGroupCountLoading);
  public vendorGroupCountLoaded$ = this.appState.select(vendorGroupCountLoaded);
  public vendorGroupCountFailed$ = this.appState.select(vendorGroupCountFailed);

  public vendorGroupAdd$ = this.appState.select(vendorGroupAdd);
  public vendorGroupAddLoading$ = this.appState.select(vendorGroupAddLoading);
  public vendorGroupAddLoaded$ = this.appState.select(vendorGroupAddLoaded);
  public vendorGroupAddFailed$ = this.appState.select(vendorGroupAddFailed);

  public vendorGroupDetail$ = this.appState.select(vendorGroupDetail);
  public vendorGroupDetailLoading$ = this.appState.select(vendorGroupDetailLoading);
  public vendorGroupDetailLoaded$ = this.appState.select(vendorGroupDetailLoaded);
  public vendorGroupDetailFailed$ = this.appState.select(vendorGroupDetailFailed);

  public vendorGroupDelete$ = this.appState.select(vendorGroupDelete);
  public vendorGroupDeleteLoading$ = this.appState.select(vendorGroupDeleteLoading);
  public vendorGroupDeleteLoaded$ = this.appState.select(vendorGroupDeleteLoaded);
  public vendorGroupDeleteFailed$ = this.appState.select(vendorGroupDeleteFailed);

  public vendorGroupUpdate$ = this.appState.select(vendorGroupUpdate);
  public vendorGroupUpdateLoading$ = this.appState.select(vendorGroupUpdateLoading);
  public vendorGroupUpdateLoaded$ = this.appState.select(vendorGroupUpdateLoaded);
  public vendorGroupUpdateFailed$ = this.appState.select(vendorGroupUpdateFailed);

  public vendorGroupCounts$ = this.appState.select(vendorGroupCounts);
  public vendorGroupCountsLoading$ = this.appState.select(vendorGroupCountsLoading);
  public vendorGroupCountsLoaded$ = this.appState.select(vendorGroupCountsLoaded);
  public vendorGroupCountsFailed$ = this.appState.select(vendorGroupCountsFailed);


  public vendorGroupList(params) {
    this.appState.dispatch(new SellerActions.vendorGroup(params));
  }

  public industryList(params) {
    this.appState.dispatch(new SellerActions.industryList(params));
  }

  public vendorGroupListCount(params) {
    this.appState.dispatch(new SellerActions.vendorGroupCount(params));
  }

  public vendorGroupListAdd(params) {
    this.appState.dispatch(new SellerActions.vendorGroupAdd(params));
  }

  public vendorGroupDetail(params) {
    this.appState.dispatch(new SellerActions.vendorGroupDetail(params));
  }

  public vendorGroupDelete(params) {
    this.appState.dispatch(new SellerActions.vendorGroupDelete(params));
  }

  public vendorGroupUpdate(params) {
    this.appState.dispatch(new SellerActions.vendorGroupUpdate(params));
  }

  public vendorGroupCount(params) {
    this.appState.dispatch(new SellerActions.vendorGroupCountAction(params));
  }

}
