import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerManagementActions from './action/decisionverify.action';
// app state
import * as store from 'src/core/app.state.interface';


import * as _ from 'lodash';
import { Router } from '@angular/router';
import { decisionVerifyList, decisionVerifyListLoaded, decisionVerifyListLoading } from './reducer/decisionverify.selector';


@Injectable()
export class DecisionVerifySandbox {


    // decisionVerifyList 
    public decisionVerifyList$ = this.appState.select(decisionVerifyList);
    public decisionVerifyListLoading$ = this.appState.select(decisionVerifyListLoading);
    public decisionVerifyListLoaded$ = this.appState.select(decisionVerifyListLoaded);



    constructor(
        protected appState: Store<store.AppState>,
        private router: Router,
    ) {
        // ----
    }

    // decisionVerifyList
    public decisionVerifyList(value: any) {
        this.appState.dispatch(
            new SellerManagementActions.decisionVerifyListAction(value)
        );
    }





}

