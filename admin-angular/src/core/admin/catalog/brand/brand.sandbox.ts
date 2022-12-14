/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
// routing
import {Router} from '@angular/router';
// store
import {Store} from '@ngrx/store';
import {ToastrManager} from 'ng6-toastr-notifications';
// app state
import * as store from '../../../app.state.interface';
// actions
import * as brandActions from '../brand/action/brand.actions';
// model
import {ManufacturerCountModel} from './models/manufacturer-count.model';
import {ManufacturerUpdateModel} from './models/manufacturer-Update.model';
import {ManufactureAddModel} from './models/manufacture-Add.model';
import {ManufacturerListModel} from './models/manufacture-list.model';
import {
    // Manufacturer list selectors
    getManufacturerList,
    manufacturerListLoading,
    manufacturerListLoaded,
    manufacturerListFailed,
    // Manufacturer add selectors
    getManufacturerAdd,
    manufacturerAddLoading,
    manufacturerAddFailed,
    manufacturerAddLoaded,
    // Manufacturer update selectors
    getManufacturerUpdate,
    manufacturerUpdateLoading,
    manufacturerUpdateLoaded,
    manufacturerUpdateFailed,
    // Manufacturer count
    getManufacturerContdata,
    manufacturerCountFailed,
    manufacturerCountLoading,
    manufacturerCountLoaded,
    // Manufacturer delete
    getManufacturerDelete,
    manufacturerDeleteLoading,
    manufacturerDeleteLoaded,
    manufacturerDeleteFailed,
    bulkDelete,
    bulkDeleteLoading,
    bulkDeleteLoaded
} from './reducer/brand.selector';
import {ManufacturerDeleteModel} from './models/manufacturer-delete.model';


@Injectable()
export class BrandSandbox {

    public getManufactureList$ = this.appState.select(getManufacturerList);
    public manufacturerListLoading$ = this.appState.select(manufacturerListLoading);
    public manufacturerListLoaded$ = this.appState.select(manufacturerListLoaded);
    public manufacturerListFailed$ = this.appState.select(manufacturerListFailed);

    public getManufacturercount$ = this.appState.select(getManufacturerContdata);
    public manufacturerCountLoading$ = this.appState.select(manufacturerCountLoading);
    public manufacturerCountLoaded$ = this.appState.select(manufacturerCountLoaded);
    public manufacturerCountFailed$ = this.appState.select(manufacturerCountFailed);

    public getManufacturerAdd$ = this.appState.select(getManufacturerAdd);
    public manufacturerAddLoading$ = this.appState.select(manufacturerAddLoading);
    public manufacturerAddLoaded$ = this.appState.select(manufacturerAddLoaded);
    public manufacturerAddFailed$ = this.appState.select(manufacturerAddFailed);

    public getManufacturerUpdate$ = this.appState.select(getManufacturerUpdate);
    public manufacturerUpdateLoading$ = this.appState.select(manufacturerUpdateLoading);
    public manufacturerUpdateLoaded$ = this.appState.select(manufacturerUpdateLoaded);
    public manufacturerUpdateFailed$ = this.appState.select(manufacturerUpdateFailed);

    public getManufacturerDelete$ = this.appState.select(getManufacturerDelete);
    public manufacturerDeleteLoading$ = this.appState.select(manufacturerDeleteLoading);
    public manufacturerDeleteLoaded$ = this.appState.select(manufacturerDeleteLoaded);
    public manufacturerDeleteFailed$ = this.appState.select(manufacturerDeleteFailed);

    public bulkDelete$ = this.appState.select(bulkDelete);
    public bulkDeleteLoading$ = this.appState.select(bulkDeleteLoading);
    public bulkDeleteLoaded$ = this.appState.select(bulkDeleteLoaded);

    public subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>,
                private router: Router,
                private toastr: ToastrManager) {
        this.subscribeData();
    }

    public manufacturerCount(value: any) {
        this.appState.dispatch(new brandActions.DoManufactCountAction(new ManufacturerCountModel(value)));
    }

    public updateManufactuer(value: any) {
        this.appState.dispatch(new brandActions.DoManufacturerUpdateAction(new ManufacturerUpdateModel(value)));
    }

    public addManufacturer(value: any) {
        this.appState.dispatch(new brandActions.DoAddManufacturerAction(new ManufactureAddModel(value)));
    }

    public manufacturerList(value: any) {
        this.appState.dispatch(new brandActions.DOManufacturerListAction(new ManufacturerListModel(value)));
    }

    deleteManufacturer(value) {
        this.appState.dispatch(new brandActions.ManufacturerDeleteAction(new ManufacturerDeleteModel(value)));
    }
    bulkDeleteManufacturer(value) {
        this.appState.dispatch(new brandActions.ManufacturerBulkDeleteAction(value));
    }
    exportManufacturer(value) {
        this.appState.dispatch(new brandActions.ExportManufacturerAction(value));
    }

    public subscribeData() {

        this.subscriptions.push(this.getManufacturerAdd$.subscribe((data) => {
            if (data) {
                if (data.name) {
                    this.router.navigate(['/catalog/brand/list']);
                }
            }
        }));

        this.subscriptions.push(this.getManufacturerUpdate$.subscribe((data) => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/catalog/brand/list']);
                }
            }
        }));

    }

}
