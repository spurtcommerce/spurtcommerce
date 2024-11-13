import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerManagementActions from './action/pending-layout.action';
// app state
import * as store from 'src/core/app.state.interface';


import * as _ from 'lodash';
import { Router } from '@angular/router';
import { pendingLayoutsList, pendingLayoutsListLoaded, pendingLayoutsListLoading } from './reducer/pending-layout.selector';



@Injectable()
export class PendingLayoutSandox {


    // pendingLayoutsList 
    public pendingLayoutsList$ = this.appState.select(pendingLayoutsList);
    public pendingLayoutsListLoading$ = this.appState.select(pendingLayoutsListLoading);
    public pendingLayoutsListLoaded$ = this.appState.select(pendingLayoutsListLoaded);



    constructor(
        protected appState: Store<store.AppState>,
        private router: Router,
    ) {
        // ----
    }

    // pendingLayoutsList
    public pendingLayoutsList(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.pendingLayoutsListAction(value)
        );
    }





}
