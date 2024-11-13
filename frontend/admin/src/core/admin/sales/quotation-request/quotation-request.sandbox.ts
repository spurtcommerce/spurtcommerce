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
import * as store from '../../../app.state.interface';
import * as cancelOrderActions from './actions/quotation-request.action';
import { quotationList, quotationListLoading, quotationListLoaded,
quotationListCount} from './reducer/quotation-request.selector';
@Injectable()
export class QuotationRequestSandbox {

  public quotationList$ = this.appState.select(quotationList);
  public quotationListLoading$ = this.appState.select(quotationListLoading);
  public quotationListLoaded$ = this.appState.select(quotationListLoaded);
  public quotationListCount$ = this.appState.select(quotationListCount);



constructor(protected appState: Store<store.AppState>) {}

// Quotation list

public quotationList(value: any) {
    this.appState.dispatch(new cancelOrderActions.QuotationListAction(value));
}

// Quotation list count

public quotationListCount(value: any) {
  this.appState.dispatch(new cancelOrderActions.QuotationListCountAction(value));
}

}
