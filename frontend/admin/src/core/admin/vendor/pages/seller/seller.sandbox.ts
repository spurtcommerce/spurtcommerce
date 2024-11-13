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
import * as SellerActions from './seller-action/seller.action';
import { Subscription } from 'rxjs/index';
import { SellerListRequest } from './seller-model/seller.request.model';
import { DetailRequest } from './seller-model/details.model';
import { SellerUpdateRequest } from './seller-model/seller-update.request.model';
import { SellerAddRequest } from './seller-model/seller-add.request.model';
import { ApprovalRequest } from './seller-model/seller-approval.request.model';
import { CountryListForm } from './seller-model/countrylist.model';

import {
  getSellerList,
  getSellerListLoaded,
  getSellerListLoading,
  getSellerListFailed,
  doSellerAdd,
  doSellerAddLoaded,
  doSellerAddLoading,
  doSellerAddFailed,
  doSellerUpdate,
  doSellerUpdateLoaded,
  doSellerUpdateLoading,
  doSellerUpdateFailed,
  getActiveSellerCount,
  getActiveSellerCountLoading,
  getActiveSellerCountLoaded,
  getInActiveSellerCount,
  getInActiveSellerCountLoading,
  getInActiveSellerCountLoaded,
  getTotalSellerCount,
  getTotalSellerCountLoading,
  getTotalSellerCountLoaded,
  pageDetailsFailedStatus,
  pageDetailsLoadedStatus,
  pageDetailsLoadingStatus,
  pageDetails,

  bulkDeleteSeller,
  deleteFailed,
  deleteLoaded,
  deleteLoading,
  deleteSeller,
  deletesLoading,
  deletesLoaded,
  deletesFailed,


  getSellerApproval,
  getSellerApprovalLoaded,
  getSellerApprovalLoading,
  getSellerApprovalFailed,
  getCountryList,
  CountryListFailed,
  CountryListLoaded,
  CountryListLoading,
  vendorCount,
  vendorCountLoading,
  zoneList,
  sellerListCount,

  getproductList,
  getproductListFailed,
  getproductListLoaded,
  getproductListLoading,
  getproductListcount,
  getproductListcountLoading,
  getproductListcountLoaded,
  getproductListcountFailed,exportExcelLoading,checkAvail,checkAvailLoaded,checkAvailLoading,checkAvailFailed, stateList, stateListLoading, stateListLoaded, stateListFailed, getCountryRemoveRequestFailed, getCountryRemoveRequestLoaded, getCountryRemoveRequestLoading, getCountryRemoveResponse, getCountryAddRequestFailed, getCountryAddRequestLoaded, getCountryAddRequestLoading, getCountryAddResponse

} from './seller-reducer/seller.selector';

@Injectable()
export class SellerSandbox {
  constructor(
    protected appState: Store<store.AppState>,
  ) {}
  private subscriptions: Array<Subscription> = [];
  
  public exportExcelLoading$ = this.appState.select(exportExcelLoading)

  public getSellerList$ = this.appState.select(getSellerList);
  public getSellerListLoading$ = this.appState.select(getSellerListLoading);
  public getSellerListLoaded$ = this.appState.select(getSellerListLoaded);
  public getSellerListFailed$ = this.appState.select(getSellerListFailed);

  public doSellerAdd$ = this.appState.select(doSellerAdd);
  public doSellerAddLoading$ = this.appState.select(doSellerAddLoading);
  public doSellerAddLoaded$ = this.appState.select(doSellerAddLoaded);
  public doSellerAddFailed$ = this.appState.select(doSellerAddFailed);

  public stateList$ = this.appState.select(stateList);
  public stateListLoading$ = this.appState.select(stateListLoading);
  public stateListLoaded$ = this.appState.select(stateListLoaded);
  public stateListFailed$ = this.appState.select(stateListFailed);


  public doSellerUpdate$ = this.appState.select(doSellerUpdate);
  public doSellerUpdateLoading$ = this.appState.select(doSellerUpdateLoading);
  public doSellerUpdateLoaded$ = this.appState.select(doSellerUpdateLoaded);
  public doSellerUpdateFailed$ = this.appState.select(doSellerUpdateFailed);


  public totalSellerCount$ = this.appState.select(getTotalSellerCount);
  public totalSellerCountLoading$ = this.appState.select(
    getTotalSellerCountLoading
  );
  public totalSellerCountLoaded$ = this.appState.select(
    getTotalSellerCountLoaded
  );

  public activeSellerCount$ = this.appState.select(getActiveSellerCount);
  public activeSellerCountLoading$ = this.appState.select(
    getActiveSellerCountLoading
  );
  public activeSellerCountLoaded$ = this.appState.select(
    getActiveSellerCountLoaded
  );

  public inActiveSellerCount$ = this.appState.select(getInActiveSellerCount);
  public inActiveSellerCountLoading$ = this.appState.select(
    getInActiveSellerCountLoading
  );
  public inActiveSellerCountLoaded$ = this.appState.select(
    getInActiveSellerCountLoaded
  );


  public pageDetails$ = this.appState.select(pageDetails);
  public pageDetailsLoadingStatus$ = this.appState.select(
    pageDetailsLoadingStatus
  );
  public pageDetailsLoadedStatus$ = this.appState.select(
    pageDetailsLoadedStatus
  );
  public pageDetailsFailedStatus$ = this.appState.select(
    pageDetailsFailedStatus
  );
  public getdeleteseller$ = this.appState.select(deleteSeller);
  public deleteLoading$ = this.appState.select(deleteLoading);
  public deleteLoaded$ = this.appState.select(deleteLoaded);
  public deleteFailed$ = this.appState.select(deleteFailed);

  public bulkDeleteSeller$ = this.appState.select(bulkDeleteSeller);
  public deletesLoading$ = this.appState.select(deletesLoading);
  public deletesLoaded$ = this.appState.select(deletesLoaded);
  public deletesFailed$ = this.appState.select(deletesFailed);

  public getSellerApproval$ = this.appState.select(getSellerApproval);
  public getSellerApprovalLoading$ = this.appState.select(getSellerApprovalLoading);
  public getSellerApprovalLoaded$ = this.appState.select(getSellerApprovalLoaded);
  public getSellerApprovalFailed$ = this.appState.select(getSellerApprovalFailed);


  public getCountryList$ = this.appState.select(getCountryList);
  public countryListLoading$ = this.appState.select(CountryListLoading);
  public countryListLoaded$ = this.appState.select(CountryListLoaded);
  public countryListFailed$ = this.appState.select(CountryListFailed);


  public vendorCount$ = this.appState.select(vendorCount);
  public vendorCountLoading$ = this.appState.select(vendorCountLoading);
  public zoneList$ = this.appState.select(zoneList);
  public sellerListCount$ = this.appState.select(sellerListCount);


  public getproductList$ = this.appState.select(getproductList);
  public getproductListLoading$ = this.appState.select(getproductListLoading);
  public getproductListLoaded$ = this.appState.select(getproductListLoaded);
  public getproductListFailed$ = this.appState.select(getproductListFailed);

  public getproductListcount$ = this.appState.select(getproductListcount);
  public getproductListcountLoading$ = this.appState.select(getproductListcountLoading);
  public getproductListcountLoaded$ = this.appState.select(getproductListcountLoaded);
  public getproductListcountFailed$ = this.appState.select(getproductListcountFailed);

  public checkAvail$ = this.appState.select(checkAvail);
  public checkAvailLoading$ = this.appState.select(checkAvailLoading);
  public checkAvailLoaded$ = this.appState.select(checkAvailLoaded);
  public checkAvailFailed$ = this.appState.select(checkAvailFailed);

public getCountryAddResponse$ = this.appState.select(getCountryAddResponse);
  public getCountryAddRequestLoading$ = this.appState.select(
    getCountryAddRequestLoading
  );
  public getCountryAddRequestLoaded$ = this.appState.select(
    getCountryAddRequestLoaded
  );
  public getCountryAddRequestFailed$ = this.appState.select(
    getCountryAddRequestFailed
  );

  public getCountryRemoveResponse$ = this.appState.select(
    getCountryRemoveResponse
  );
  public getCountryRemoveRequestLoading$ = this.appState.select(
    getCountryRemoveRequestLoading
  );
  public getCountryRemoveRequestLoaded$ = this.appState.select(
    getCountryRemoveRequestLoaded
  );
  public getCountryRemoveRequestFailed$ = this.appState.select(
    getCountryRemoveRequestFailed
  );
  public sellerList(params) {
    this.appState.dispatch(
      new SellerActions.GetSellerList(new SellerListRequest(params))
    );
  }

  public sellerAdd(params) {
    this.appState.dispatch(
      new SellerActions.DoSellerAdd(new SellerAddRequest(params))
    );
  }

  

  public sellerUpdate(params) {
        this.appState.dispatch(
      new SellerActions.DoSellerUpdate(new SellerUpdateRequest(params))
    );
  }


  public pageDetails(params: any): void {
    this.appState.dispatch(new SellerActions.PageDetails( new DetailRequest(params)));
  }



  public deleteSeller(value) {
    this.appState.dispatch(new SellerActions.DoDeleteSellerAction(value));
  }


  public sellerExcel(value) {
    this.appState.dispatch(new SellerActions.DoSellerExcel(value));
  }



  // Do Customer Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new SellerActions.DoSellerBulkDelete(value));
  }


  public sellerApproval(params) {
    this.appState.dispatch(
      new SellerActions.DoSellerApproval(new ApprovalRequest(params))
    );
  }

  //check avilability
  public CheckAVailbility(params) {
      this.appState.dispatch(new SellerActions.checkAvailAction(params))
  }

  public getCountriesList(value: any) {
    this.appState.dispatch(
      new SellerActions.GetCountrylistAction(new CountryListForm(value))
    );
  }

  public getVendorCounts() {
    this.appState.dispatch(
      new SellerActions.GetVendorCountsAction()
    );
  }

  public zoneList(params) {
    this.appState.dispatch(
      new SellerActions.ZoneListAction(params)
    );
  }
  public sellerListCount(params) {
    this.appState.dispatch(
      new SellerActions.SellerListCountAction(params)
    );
  }

  public getproductList(params) {
    this.appState.dispatch(
      new SellerActions.getproductListAction(params)
    );
  }
  public getproductListcount(params) {
    this.appState.dispatch(
      new SellerActions.getproductListcountAction(params)
    );
  }

  public stateList(params) {
    this.appState.dispatch(
      new SellerActions.stateListAction(params)
    );
  }
public countryRemove(value) {
    this.appState.dispatch(new SellerActions.DoCountryremoveAction(value));
  }

  public countryAdd(value) {
    this.appState.dispatch(new SellerActions.DoCountryaddAction(value));
  }
}