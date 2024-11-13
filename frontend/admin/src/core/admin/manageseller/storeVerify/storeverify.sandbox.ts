import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerManagementActions from './action/storeverify.action'
// app state
import * as store from 'src/core/app.state.interface';


import * as _ from 'lodash';
import { Router } from '@angular/router';
import { storeverify, storeverifyList,storeverifyListLoaded,storeverifyListLoading, storeverifyLoaded, storeverifyLoading } from './reducer/storeverify.selector';


@Injectable()
export class StoreVerifySandbox {


    // storeverifyList 
    public storeverifyList$ = this.appState.select(storeverifyList);
    public storeverifyListLoading$ = this.appState.select(storeverifyListLoading);
    public storeverifyListLoaded$ = this.appState.select(storeverifyListLoaded);


       // storeverify 
       public storeverify$ = this.appState.select(storeverify);
       public storeverifyLoading$ = this.appState.select(storeverifyLoading);
       public storeverifyLoaded$ = this.appState.select(storeverifyLoaded);


    constructor(
        protected appState: Store<store.AppState>,
        private router: Router,
    ) {
        // ----
    }

    // storeverifyList
    public storeverifyList(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.storeverifyListAction(value)
        );
    }

      // storeverify
      public storeverify(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.storeverifyAction(value)
        );
    }




}
