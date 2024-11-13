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
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../delivery-action/delivery.action';

import { catchError } from 'rxjs/operators';
// service
import { DeliveryService } from '../delivery.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class DeliveryEffect {
  constructor(
    private action$: Actions,
    private service: DeliveryService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }

  
  doDeliveryAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_ADD_LOCATION),
    map((action: actions.DoDeliveryAddAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryAdd(state).pipe(
        switchMap(user => [new actions.DoDeliveryAddSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success(data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoDeliveryAddFailAction(error)))
      );
    })
  ));
  
  doDeliveryPersonAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_PERSON_ADD),
    map((action: actions.DoDeliveryPersonAddAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryPersonAdd(state).pipe(
        switchMap(user => [new actions.DoDeliveryPersonAddSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success(data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoDeliveryPersonAddFailAction(error)))
      );
    })
  ));
  // Delivery detail
  
  doDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_DETAIL),
    map((action: actions.GetDeliveryDetailAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryDetail(state).pipe(
        switchMap(user => [new actions.GetDeliveryDetailSuccess(user)]),
        catchError(error => of(new actions.GetDeliveryDetailFail(error)))
      );
    })
  ));
  
  doDeliveryDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_LOCATION_DELETE),
    map((action: actions.DoDeliveryDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryDelete(state).pipe(
        switchMap(user => [new actions.DoDeliveryDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoDeliveryDeleteFailAction(error)))
      );
    })
  ));
  
  doDeliveryPersonDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_PERSON_DELETE),
    map((action: actions.DoDeliveryPersonDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryPersonDelete(state).pipe(
        switchMap(user => [new actions.DoDeliveryPersonDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoDeliveryPersonDeleteFailAction(error)))
      );
    })
  ));
  
  doDeliveryBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BULK_DELIVERY_LOCATION_DELETE),
    map((action: actions.DoDeliveryBulkDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryBulkDelete(state).pipe(
        switchMap(user => [new actions.DoDeliveryBulkDeleteSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success(data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoDeliveryBulkDeleteFailAction(error)))
      );
    })
  ));
  // Delivery update
  
  doDeliveryUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_UPDATE),
    map((action: actions.DoDeliveryUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryUpdate(state).pipe(
        switchMap(user => [new actions.DoDeliveryUpdateSuccessAction(user)]),
        tap(resp => {
        }),
        catchError(error => of(new actions.DoDeliveryUpdateFailAction(error)))
      );
    })
  ));
  // Delivery person update

  
  doDeliveryPersonUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELIVERY_PERSON_UPDATE),
    map((action: actions.DoDeliveryPersonUpdateAction) => action.payload),
    switchMap((state) => {
      return this.service.deliveryPersonUpdate(state).pipe(
        map((user) => new actions.DoDeliveryPersonUpdateSuccessAction(user)),
        catchError(error => of(new actions.DoDeliveryPersonUpdateFailAction(error))),
        tap(resp => {
          if (resp) {
          }
        })
      );
    })
  ));
  // delivery status change
  
  doDeliveryStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoDeliveryStatus) => action.payload),
    switchMap(state => {
      return this.service.deliveryStatus(state).pipe(
        switchMap(status => [new actions.DoDeliveryStatusSuccess(status)]),
        catchError(error => of(new actions.DoDeliveryStatusFail(error)))
      );
    })
  ));

  
  getDeliveryLocationlist$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_LOCATION_LIST),
    map((action: actions.GetDeliveryLocationlistAction) => action.payload),
    switchMap(state => {
      return this.service.DeliveryLocationlist(state).pipe(
        map(user => new actions.GetDeliveryLocationlistSuccessAction(user)),
        catchError(error => of(new actions.GetDeliveryLocationlistFailAction(error)))
      );
    })
  ));

  
  getStockStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_STOCK_STATUS_LIST),
    map((action: actions.GetStockStatuslistAction) => action.payload),
    switchMap(state => {
      return this.service.stockStatusList(state).pipe(
        map(user => new actions.GetStockStatuslistSuccessAction(user)),
        catchError(error => of(new actions.GetStockStatuslistFailAction(error)))
      );
    })
  ));
  
  getDeliveryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_PERSONS_LIST),
    map((action: actions.GetDeliveryPersonslistAction) => action.payload),
    switchMap(state => {
      return this.service.DeliveryPersonslist(state).pipe(
        map(user => new actions.GetDeliveryPersonslistSuccessAction(user)),
        catchError(error => of(new actions.GetDeliveryPersonslistFailAction(error)))
      );
    })
  ));
  
  doTotalDeliveryLocationlistCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_DELIVERY_COUNT),
    map((action: actions.GetTotalDeliveryCountAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetTotalDeliveryCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalDeliveryCountFailAction(error))
        )
      );
    })
  ));

  
  doDeliveryPersonsListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_DELIVERY_PERSONS_COUNT),
    map((action: actions.GetDeliveryPersonsCountAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryPersonsCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetDeliveryPersonsCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetDeliveryPersonsCountFailAction(error))
        )
      );
    })
  ));

  
  doInActiveDeliveryLocationlistCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_INACTIVE_DELIVERY_COUNT),
    map((action: actions.GetInActiveDeliveryCountAction) => action.payload),
    switchMap(state => {
      return this.service.deliveryCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetInActiveDeliveryCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetInActiveDeliveryCountFailAction(error))
        )
      );
    })
  ));
  
  downloadMainPriceCsv$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_MAIN_PRICE_CSV),
    map((action: actions.DownloadPriceCsv) => action.payload),
    switchMap(state => {
      return this.service.downloadMainCsv(state).pipe(
        tap(data => {
          const filename = 'DeliveryCSV_' + Date.now() + '.csv';
          const blob = new Blob([data], { type: 'text/csv' });
          saveAs(blob, filename);
        }),
        switchMap(response => [
          new actions.DownloadPriceCsvSuccess(response)
        ]),
        catchError(error =>
          of(new actions.DownloadPriceCsvFail(error))
        )
      );
    })
  ));
  
  uploadMainPriceCsv$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPLOAD_MAIN_PRICE_CSV),
    map((action: actions.UploadPriceCsv) => action.payload),
    switchMap(state => {
      return this.service.uploadMainCsv(state).pipe(

        switchMap(response => [
          new actions.UploadPriceCsvSuccess(response)
        ]),
        tap(data => {
          if (data) {
            this.toaster.success(data['payload']['message']);
          }
        }),
        catchError(error =>
          of(new actions.UploadPriceCsvFail(error))
        )
      );
    })
  ));

  
  priceCsvList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PRICE_CSV_LIST),
    map((action: actions.PriceCsvList) => action.payload),
    switchMap(state => {
      return this.service.priceCsvList(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.PriceCsvListSuccess(response)
        ]),
        catchError(error =>
          of(new actions.PriceCsvListFail(error))
        )
      );
    })
  ));

  
  priceCsvCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.PRICE_CSV_COUNT),
    map((action: actions.PriceCsvCount) => action.payload),
    switchMap(state => {
      return this.service.priceCsvCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.PriceCsvCountSuccess(response)
        ]),
        catchError(error =>
          of(new actions.PriceCsvCountFail(error))
        )
      );
    })
  ));

  
  deleteCsvList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_CSV_LIST),
    map((action: actions.DeleteCsvList) => action.payload),
    switchMap(state => {
      return this.service.deleteCsvList(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.DeleteCsvListSuccess(response)
        ]),
        tap(data => {
          if (data) {
          }
        }),
        catchError(error =>
          of(new actions.DeleteCsvListFail(error))
        )
      );
    })
  ));



  
  downloadPriceCsv$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_PRICE_CSV),
    map((action: actions.DownloadPriceCsvList) => action.payload),
    switchMap(state => {
      return this.service.downloadCsv(state).pipe(
        tap(data => {
          const filename = 'DeliveryCSV_' + Date.now() + '.csv';
          const blob = new Blob([data], { type: 'text/csv' });
          saveAs(blob, filename);
        }),
        switchMap(response => [
          new actions.DownloadPriceCsvSuccessList(response)
        ]),
        catchError(error =>
          of(new actions.DownloadPriceCsvFailList(error))
        )
      );
    })
  ));
}
