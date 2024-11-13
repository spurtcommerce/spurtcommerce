/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from '../../../../shared/utility/utilityHelpers';
import { CurrencyListForm } from '../currency-model/currencyList.model';
import { CurrencyCountForm } from '../currency-model/currencycount.model';
import { CurrencyNewForm } from '../currency-model/currencynew.model';

export const ActionTypes = {
  DO_CURRENCY_LIST: type('[CURRENCY] DO CURRENCY LIST'),
  DO_CURRENCY_LIST_SUCCESS: type('[CURRENCY] DO CURRENCY LIST SUCCESS]'),
  DO_CURRENCY_LIST_FAIL: type('[CURRENCY] DO CURRENCY LIST FAIL'),
  DO_CURRENCY_LIST_COUNT: type('[CURRENCY] DO CURRENCY LIST COUNT'),
  DO_CURRENCY_LIST_COUNT_SUCCESS: type(
    '[CURRENCY] DO CURRENCY LIST COUNT SUCCESS'
  ),
  DO_CURRENCY_LIST_COUNT_FAIL: type('[CURRENCY] DO CURRENCY LIST COUNT FAIL'),
  DO_CURRENCY_LIST_NEW: type('[CURRENCY] DO CURRENCY LIST NEW'),
  DO_CURRENCY_LIST_NEW_SUCCESS: type('[CURRENCY] DO CURRENCY LIST NEW SUCCESS'),
  DO_CURRENCY_LIST_NEW_FAIL: type('[CURRENCY] DO CURRENCY LIST NEW FAIL'),
  DO_CURRENCY_UPDATE: type('[CURRENCY] DO CURRENCY UPDATE'),
  DO_CURRENCY_UPDATE_SUCCESS: type('[CURRENCY] DO CURRENCY UPDATE SUCCESS'),
  DO_CURRENCY_UPDATE_FAIL: type('[CURRENCY] DO CURRENCY UPDATE FAIL'),
  DO_CURRENCY_DELETE: type('[CURRENCY] DO CURRENCY DELETE'),
  DO_CURRENCY_DELETE_SUCCESS: type('[CURRENCY] DO CURRENCY DELETE SUCCESS'),
  DO_CURRENCY_DELETE_FAIL: type('[CURRENCY] DO CURRENCY DELETE FAIL')
};

// currency list
export class DoCurrencyListAction implements Action {
  type = ActionTypes.DO_CURRENCY_LIST;

  constructor(public payload: CurrencyListForm) {}
}

export class DoCurrencyListSuccess implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCurrencyFail implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// currency list count

export class DoCurrencyListCountAction implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_COUNT;

  constructor(public payload: CurrencyCountForm) {}
}

export class DoCurrencyListCountSuccess implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCurrencyCountFail implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// new currency add

export class DoCurrencyNewAction implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_NEW;

  constructor(public payload: CurrencyNewForm) {}
}

export class DoCurrencyNewSuccess implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_NEW_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCurrencyNewFail implements Action {
  type = ActionTypes.DO_CURRENCY_LIST_NEW_FAIL;

  constructor(public payload: any = null) {}
}

// currency Update

export class DoCurrencyUpdateAction implements Action {
  type = ActionTypes.DO_CURRENCY_UPDATE;

  constructor(public payload: CurrencyNewForm) {}
}

export class DoCurrencyUpdateSuccess implements Action {
  type = ActionTypes.DO_CURRENCY_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCurrencyUpdateFail implements Action {
  type = ActionTypes.DO_CURRENCY_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// currency Delete
export class DoCurrencyDeleteAction implements Action {
  type = ActionTypes.DO_CURRENCY_DELETE;

  constructor(public payload: any) {}
}

export class DoCurrencyDeleteSuccess implements Action {
  type = ActionTypes.DO_CURRENCY_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCurrencyDeleteFail implements Action {
  type = ActionTypes.DO_CURRENCY_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
