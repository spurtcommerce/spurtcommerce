import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/companyverify.action';
import { catchError } from 'rxjs/operators';
// service
import { CompanyVerifyService } from '../companyverify.service';


@Injectable()
export class companyVerifyEffect {

    constructor(
        private action$: Actions,
        private service: CompanyVerifyService,
    ) { }

    ///companyverify///
    
    companyVerifyList$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.COMPANY_VERIFY_LIST_ACTION),
        map((action: actions.companyVerifyListAction) => action.payload),
        switchMap(state => {
            return this.service.CompanyVerify(state).pipe(
                switchMap(product => [
                    new actions.companyVerifyListSuccessAction(product)
                ]),
                catchError(error =>
                    of(new actions.companyVerifyListFailAction(error))
                )
            );
        })
    ));



    ///companyVerifychecked///
    
    companyVerifychecked$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.COMPANY_VERIFY_CHECKED_ACTION),
        map((action: actions.companyVerifycheckedAction) => action.payload),
        switchMap(state => {
            return this.service.companyVerifychecked(state)?.pipe(
                switchMap(product => [
                    new actions.companyVerifycheckedSuccessAction(product)
                ]),
                catchError(error =>
                    of(new actions.companyVerifycheckedFailAction(error))
                )
            );
        })
    ));


    ///countryList///
    
    countryList$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.COUNTRY_LIST_ACTION),
        map((action: actions.countryListAction) => action.payload),
        switchMap(state => {
            return this.service.countryList(state)?.pipe(
                switchMap(product => [
                    new actions.countryListSuccessAction(product)
                ]),
                catchError(error =>
                    of(new actions.countryListFailAction(error))
                )
            );
        })
    ));

    // companyVerifycheckedApi

    
    companyVerifycheckedApi$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.COMPANY_VERIFY_CHECKED_API_ACTION),
        map((action: actions.companyVerifycheckedApiAction) => action.payload),
        switchMap(state => {
            return this.service.companyVerifycheckedApi(state).pipe(
                switchMap(product => [
                    new actions.companyVerifycheckedApiSuccessAction(product)
                ]),
                catchError(error =>
                    of(new actions.companyVerifycheckedApiFailAction(error))
                )
            );
        })
    ));

    
    verificationStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(actions.ActionTypes.VERIFICATION_STATUS_ACTION),
        map((action: actions.verificationStatusAction) => action.payload),
        switchMap(state => {
            return this.service.verificationStatus(state).pipe(
                switchMap(product => [
                    new actions.verificationStatusSuccessAction(product)
                ]),
                catchError(error =>
                    of(new actions.verificationStatusFailAction(error))
                )
            );
        })
    ));
}


