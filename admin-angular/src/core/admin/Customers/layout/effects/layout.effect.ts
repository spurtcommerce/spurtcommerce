/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as actions from '../action/layout.action';
import {catchError} from 'rxjs/operators';
import {LayoutService} from '../layout.service';


@Injectable()
export class LayoutEffects {

    constructor(private action$: Actions, private layoutService: LayoutService) {
    }

    @Effect()
    customerCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_CUSTOMER_COUNT),
            map((action: actions.GetCustomerCountAction) => action.payload),
            switchMap((state) => {
                return this.layoutService.getCustomerCount()
                    .pipe(
                        switchMap((response) => [
                            new actions.GetCustomerCountSuccessAction(response),
                        ]),
                        catchError(error => of(new actions.GetCustomerCountFailAction(error)))
                    );
            })
        );
}
