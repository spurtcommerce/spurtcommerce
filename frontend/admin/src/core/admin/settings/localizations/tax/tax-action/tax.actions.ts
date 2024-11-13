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
import { TaxListForm } from '../tax-model/taxList.model';
import { TaxCountForm } from '../tax-model/taxcount.model';
import { TaxNewForm } from '../tax-model/taxnew.model';

export const ActionTypes = {
  DO_TAX_LIST: type('[TAX] DO TAX LIST'),
  DO_TAX_LIST_SUCCESS: type('[TAX] DO TAX LIST SUCCESS]'),
  DO_TAX_LIST_FAIL: type('[TAX] DO TAX LIST FAIL'),
  DO_TAX_LIST_COUNT: type('[TAX] DO TAX LIST COUNT'),
  DO_TAX_LIST_COUNT_SUCCESS: type(
    '[TAX] DO TAX LIST COUNT SUCCESS'
  ),
  DO_TAX_LIST_COUNT_FAIL: type('[TAX] DO TAX LIST COUNT FAIL'),
  DO_TAX_LIST_NEW: type('[TAX] DO TAX LIST NEW'),
  DO_TAX_LIST_NEW_SUCCESS: type('[TAX] DO TAX LIST NEW SUCCESS'),
  DO_TAX_LIST_NEW_FAIL: type('[TAX] DO TAX LIST NEW FAIL'),
  DO_TAX_UPDATE: type('[TAX] DO TAX UPDATE'),
  DO_TAX_UPDATE_SUCCESS: type('[TAX] DO TAX UPDATE SUCCESS'),
  DO_TAX_UPDATE_FAIL: type('[TAX] DO TAX UPDATE FAIL'),
  DO_TAX_DELETE: type('[TAX] DO TAX DELETE'),
  DO_TAX_DELETE_SUCCESS: type('[TAX] DO TAX DELETE SUCCESS'),
  DO_TAX_DELETE_FAIL: type('[TAX] DO TAX DELETE FAIL')
};

// tax list
export class DoTaxListAction implements Action {
  type = ActionTypes.DO_TAX_LIST;

  constructor(public payload: TaxListForm) {}
}

export class DoTaxListSuccess implements Action {
  type = ActionTypes.DO_TAX_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTaxFail implements Action {
  type = ActionTypes.DO_TAX_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// tax list count

export class DoTaxListCountAction implements Action {
  type = ActionTypes.DO_TAX_LIST_COUNT;

  constructor(public payload: TaxCountForm) {}
}

export class DoTaxListCountSuccess implements Action {
  type = ActionTypes.DO_TAX_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTaxCountFail implements Action {
  type = ActionTypes.DO_TAX_LIST_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// new tax add

export class DoTaxNewAction implements Action {
  type = ActionTypes.DO_TAX_LIST_NEW;

  constructor(public payload: TaxNewForm) {}
}

export class DoTaxNewSuccess implements Action {
  type = ActionTypes.DO_TAX_LIST_NEW_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTaxNewFail implements Action {
  type = ActionTypes.DO_TAX_LIST_NEW_FAIL;

  constructor(public payload: any = null) {}
}

// tax Update

export class DoTaxUpdateAction implements Action {
  type = ActionTypes.DO_TAX_UPDATE;

  constructor(public payload: TaxNewForm) {}
}

export class DoTaxUpdateSuccess implements Action {
  type = ActionTypes.DO_TAX_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTaxUpdateFail implements Action {
  type = ActionTypes.DO_TAX_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// tax Delete
export class DoTaxDeleteAction implements Action {
  type = ActionTypes.DO_TAX_DELETE;

  constructor(public payload: any) {}
}

export class DoTaxDeleteSuccess implements Action {
  type = ActionTypes.DO_TAX_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTaxDeleteFail implements Action {
  type = ActionTypes.DO_TAX_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
