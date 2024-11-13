/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as deliveryActions from './delivery-action/delivery.action';
// app state
import * as store from '../app.state.interface';

import {
  // delivery add selectors
  getDeliveryAdd,
  deliveryAddFailed,
  deliveryAddLoaded,
  deliveryAddLoading,
  deliveryDeleteFailed, deliveryDeleteLoaded, deliveryDeleteLoading, getDeliveryDelete,
  deliveryBulkDeleteFailed,
  deliveryBulkDeleteLoaded,
  deliveryBulkDeleteLoading,
  getDeliveryBulkDelete,
  deliveryLocationlistFailed,
  deliveryLocationlistLoaded,
  uploadMainCsv,
  uploadMainCsvFailed,
  uploadMainCsvLoaded,
  uploadMainCsvLoading,
  priceCsvList,
  priceCsvListLoading,
  priceCsvListLoaded,
  priceCsvListFailed,
  priceCsvCount, priceCsvCountFailed,
  priceCsvCountLoaded, priceCsvCountLoading,
  deleteCsvList,
  deleteCsvListLoading, deliveryPersonUpdateFailed, deliveryPersonUpdateLoaded, deliveryPersonUpdateLoading, getDeliveryPersonUpdate,
  deleteCsvListLoaded, deliveryDeletePersonLoading, deliveryPersonDeleteFailed, deliveryPersonDeleteLoaded, getDeliveryPersonDelete,
  deleteCsvListFailed, deliveryPersonslist, deliveryPersonslistLoaded, deliveryPersonslistFailed, deliveryPersonslistLoading,
  stockStatusList, stockStatusListFailed, stockStatusListLoaded, stockStatusListLoading,
  downloadCsv, downloadCsvLoaded, downloadCsvLoading,
  deliveryLocationlistLoading, downloadMainCsv, downloadMainCsvFailed, downloadMainCsvLoaded, downloadMainCsvLoading,
  categoryListLoading,  getDeliveryPersonsCount,  getDeliveryPersonsCountFailed,
   getDeliveryPersonsCountLoaded,  getDeliveryPersonsCountLoading, getInActiveDeliveryCount,
  getInActiveDeliveryCountFailed, getInActiveDeliveryCountLoaded,
  getInActiveDeliveryCountLoading, getTotalDeliveryCount, getTotalDeliveryCountFailed,
  getTotalDeliveryCountLoaded, getTotalDeliveryCountLoading, deliveryPersonAddFailed, deliveryPersonAddLoaded, deliveryPersonAddLoading, getDeliveryPersonAdd,
  categoryList, getDeliveryStatus, getDeliveryStatusFailed, getDeliveryStatusLoaded, getDeliveryStatusLoading,
  tempCategoryList, deliveryUpdateFailed, deliveryUpdateLoaded, deliveryUpdateLoading, getDeliveryUpdate,
  deliveryLocationList, deliveryDetailFailed, deliveryDetailLoaded, deliveryDetailLoading, getDeliveryDetail
  // delivery update selectors

} from './delivery-reducer/delivery.selector';
import { DeliveryLocationlistModel } from './delivery-model/delivery-list.model';
import { DeliveryDeleteModel } from './delivery-model/delivery-delete.model';
import { DeliveryAddModel } from './delivery-model/delivery-add.model';
import { DetailModel } from './delivery-model/detail.model';
import { DeliveryUpdateModel } from './delivery-model/delivery-update.model';
import { StatusRequest } from './delivery-model/delivery-status.request.model';
import { DeliveryBulkDeleteModel } from './delivery-model/delivery-bulk-delete.model';

@Injectable()
export class DeliverySandbox {

  public deliveryAdd$ = this.appState.select(getDeliveryAdd);


  public deliveryAddLoading$ = this.appState.select(deliveryAddLoading);
  public deliveryAddLoaded$ = this.appState.select(deliveryAddLoaded);
  public deliveryAddFailed$ = this.appState.select(deliveryAddFailed);
  public deliveryPersonAdd$ = this.appState.select(getDeliveryPersonAdd);


  public deliveryPersonAddLoading$ = this.appState.select(deliveryPersonAddLoading);
  public deliveryPersonAddLoaded$ = this.appState.select(deliveryPersonAddLoaded);
  public deliveryPersonAddFailed$ = this.appState.select(deliveryPersonAddFailed);

  public deliveryDelete$ = this.appState.select(getDeliveryDelete);
  public deliveryDeleteLoading$ = this.appState.select(deliveryDeleteLoading);
  public deliveryDeleteLoaded$ = this.appState.select(deliveryDeleteLoaded);
  public deliveryDeleteFailed$ = this.appState.select(deliveryDeleteFailed);

  public deliveryPersonDelete$ = this.appState.select(getDeliveryPersonDelete);
  public deliveryPersonDeleteLoading$ = this.appState.select(deliveryDeletePersonLoading);
  public deliveryPersonDeleteLoaded$ = this.appState.select(deliveryPersonDeleteLoaded);
  public deliveryPersonDeleteFailed$ = this.appState.select(deliveryPersonDeleteFailed);

  public deliveryBulkDelete$ = this.appState.select(getDeliveryBulkDelete);
  public deliveryBulkDeleteLoading$ = this.appState.select(deliveryBulkDeleteLoading);
  public deliveryBulkDeleteLoaded$ = this.appState.select(deliveryBulkDeleteLoaded);
  public deliveryBulkDeleteFailed$ = this.appState.select(deliveryBulkDeleteFailed);

  public deliveryDetails$ = this.appState.select(getDeliveryDetail);
  public deliveryDetailLoading$ = this.appState.select(deliveryDetailLoading);
  public deliveryDetailLoaded$ = this.appState.select(deliveryDetailLoaded);
  public deliveryDetailFailed$ = this.appState.select(deliveryDetailFailed);

  public deliveryLocationlistLoading$ = this.appState.select(deliveryLocationlistLoading);
  public deliveryLocationlistLoaded$ = this.appState.select(deliveryLocationlistLoaded);
  public deliveryLocationlistFailed$ = this.appState.select(deliveryLocationlistFailed);
  public deliveryLocationList$ = this.appState.select(deliveryLocationList);

  public deliveryPersonslistLoading$ = this.appState.select(deliveryPersonslistLoading);
  public deliveryPersonslistLoaded$ = this.appState.select(deliveryPersonslistLoaded);
  public deliveryPersonslistFailed$ = this.appState.select(deliveryPersonslistFailed);
  public deliveryPersonslist$ = this.appState.select(deliveryPersonslist);

  public stockStatusListLoading$ = this.appState.select(stockStatusListLoading);
  public stockStatusListLoaded$ = this.appState.select(stockStatusListLoaded);
  public stockStatusListFailed$ = this.appState.select(stockStatusListFailed);
  public stockStatusList$ = this.appState.select(stockStatusList);

  public deliveryUpdate$ = this.appState.select(getDeliveryUpdate);
  public deliveryUpdateLoading$ = this.appState.select(deliveryUpdateLoading);
  public deliveryUpdateLoaded$ = this.appState.select(deliveryUpdateLoaded);
  public deliveryUpdateFailed$ = this.appState.select(deliveryUpdateFailed);

  public deliveryPersonUpdate$ = this.appState.select(getDeliveryPersonUpdate);
  public deliveryPersonUpdateLoading$ = this.appState.select(deliveryPersonUpdateLoading);
  public deliveryPersonUpdateLoaded$ = this.appState.select(deliveryPersonUpdateLoaded);
  public deliveryPersonUpdateFailed$ = this.appState.select(deliveryPersonUpdateFailed);

  public categoryListLoading$ = this.appState.select(categoryListLoading);
  public categoryList$ = this.appState.select(categoryList);
  public tempCategoryList$ = this.appState.select(tempCategoryList);

  public getDeliveryStatus$ = this.appState.select(getDeliveryStatus);
  public getDeliveryStatusLoading$ = this.appState.select(
    getDeliveryStatusLoading
  );
  public getDeliveryStatusLoaded$ = this.appState.select(getDeliveryStatusLoaded);
  public getDeliveryStatusFailed$ = this.appState.select(getDeliveryStatusFailed);
  public totalDeliveryCount$ = this.appState.select(getTotalDeliveryCount);
  public totalDeliveryCountLoading$ = this.appState.select(
    getTotalDeliveryCountLoading
  );
  public totalDeliveryCountLoaded$ = this.appState.select(
    getTotalDeliveryCountLoaded
  );

  public  deliveryPersonsCount$ = this.appState.select( getDeliveryPersonsCount);
  public  deliveryPersonsCountLoading$ = this.appState.select(
     getDeliveryPersonsCountLoading
  );
  public  deliveryPersonsCountLoaded$ = this.appState.select(
     getDeliveryPersonsCountLoaded
  );

  public inActiveDeliveryCount$ = this.appState.select(getInActiveDeliveryCount);
  public inActiveDeliveryCountLoading$ = this.appState.select(
    getInActiveDeliveryCountLoading
  );
  public inActiveDeliveryCountLoaded$ = this.appState.select(
    getInActiveDeliveryCountLoaded
  );
  public downloadMainCsv$ = this.appState.select(downloadMainCsv);
  public downloadMainCsvLoading$ = this.appState.select(
    downloadMainCsvLoading
  );
  public downloadMainCsvLoaded$ = this.appState.select(
    downloadMainCsvLoaded
  );
  public uploadMainCsv$ = this.appState.select(uploadMainCsv);
  public uploadMainCsvLoading$ = this.appState.select(
    uploadMainCsvLoading
  );
  public uploadMainCsvLoaded$ = this.appState.select(
    uploadMainCsvLoaded
  );

  public priceCsvList$ = this.appState.select(priceCsvList);
  public priceCsvListLoading$ = this.appState.select(priceCsvListLoading);
  public priceCsvListLoaded$ = this.appState.select(priceCsvListLoaded);
  public priceCsvListFailed$ = this.appState.select(priceCsvListFailed);

  public priceCsvCount$ = this.appState.select(priceCsvCount);
  public priceCsvCountLoading$ = this.appState.select(priceCsvCountLoading);
  public priceCsvCountLoaded$ = this.appState.select(priceCsvCountLoaded);
  public priceCsvCountFailed$ = this.appState.select(priceCsvCountFailed);

  public deleteCsvList$ = this.appState.select(deleteCsvList);
  public deleteCsvListLoading$ = this.appState.select(deleteCsvListLoading);
  public deleteCsvListLoaded$ = this.appState.select(deleteCsvListLoaded);
  public deleteCsvListFailed$ = this.appState.select(deleteCsvListFailed);



  public downloadCsv$ = this.appState.select(downloadCsv);
  public downloadCsvLoading$ = this.appState.select(
    downloadCsvLoading
  );
  public downloadCsvLoaded$ = this.appState.select(
    downloadCsvLoaded
  );

  constructor(
    protected appState: Store<store.AppState>,
  ) {}

  public getDeliveryDetail(value) {
    this.appState.dispatch(
      new deliveryActions.GetDeliveryDetailAction(new DetailModel(value))
    );
  }

  public doDeliveryAdd(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryAddAction(new DeliveryAddModel(value))
    );
  }
  public doDeliveryPersonAdd(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryPersonAddAction(value)
    );
  }

  public doDeliveryUpdate(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryUpdateAction(new DeliveryUpdateModel(value))
    );
  }

  public doDeliveryPersonUpdate(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryPersonUpdateAction(value)
    );
  }
  public doDeliveryDelete(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryDeleteAction(new DeliveryDeleteModel(value))
    );
  }
  public doDeliveryPersonDelete(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryPersonDeleteAction(value)
    );
  }
  public doDeliveryBulkDelete(value) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryBulkDeleteAction(new DeliveryBulkDeleteModel(value))
    );
  }
  public getDeliveryLocationlist(value) {
    this.appState.dispatch(
      new deliveryActions.GetDeliveryLocationlistAction(new DeliveryLocationlistModel(value))
    );
  }
  public getDeliveryPersonslist(value) {
    this.appState.dispatch(
      new deliveryActions.GetDeliveryPersonslistAction(new DeliveryLocationlistModel(value))
    );
  }
  public getStockStatusList(value) {
    this.appState.dispatch(
      new deliveryActions.GetStockStatuslistAction(value)
    );
  }
  public getCategoryList(value) {
    this.appState.dispatch(
      new deliveryActions.GetDeliveryPersonslistAction(value)
    );
  }

  public deliveryStatus(params) {
    this.appState.dispatch(
      new deliveryActions.DoDeliveryStatus(new StatusRequest(params))
    );
  }

  public getDeliveryLocationlistCount(params: any) {
    this.appState.dispatch(
      new deliveryActions.GetTotalDeliveryCountAction(
        new DeliveryLocationlistModel(params)
      )
    );
  }

  public getDeliveryPersonlistCount(params) {
    this.appState.dispatch(
      new deliveryActions.GetDeliveryPersonsCountAction(
        new DeliveryLocationlistModel(params)
      )
    );
  }

  public getInActiveDeliveryLocationlistCount(params) {
    this.appState.dispatch(
      new deliveryActions.GetInActiveDeliveryCountAction(
        new DeliveryLocationlistModel(params)
      )
    );
  }


  // Do Delivery Excel
  public deliveryExcel(value) {
    this.appState.dispatch(new deliveryActions.DoDeliveryExcel(value));
  }

  public deliveryAllExcel(value) {
    this.appState.dispatch(new deliveryActions.DoDeliverysExcel(value));
  }
  public downloadMainCsv(value) {
    this.appState.dispatch(new deliveryActions.DownloadPriceCsv(value));
  }
  public uploadMainCsv(value) {
    this.appState.dispatch(new deliveryActions.UploadPriceCsv(value));
  }
  public changeCount(value) {
    this.appState.dispatch(new deliveryActions.ChangeCount(value));
  }

  public priceCsvList(value) {
    this.appState.dispatch(new deliveryActions.PriceCsvList(value));
  }
  public priceCsvCount(value) {
    this.appState.dispatch(new deliveryActions.PriceCsvCount(value));
  }

  public deleteCsvList(value) {
    this.appState.dispatch(new deliveryActions.DeleteCsvList(value));
  }


  public downloadCsv(value) {
    this.appState.dispatch(new deliveryActions.DownloadPriceCsvList(value));
  }
}
