/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { CountryForm } from '../country-model/country.model';
import { CountryListForm } from '../country-model/countrylist.model';

export const ActionTypes = {
  DO_NEW_COUNTRY: type('[Settings country] Do NewCountry'),
  DO_NEW_COUNTRY_SUCCESS: type('[Settings country] Do NewCountry Success'),
  DO_NEW_COUNTRY_FAIL: type('[Settings country] Do NewCountry Fail'),

  DO_UPDATE_COUNTRY: type('[Settings country] Do UpdateCountry'),
  DO_UPDATE_COUNTRY_SUCCESS: type(
    '[Settings country] Do UpdateCountry Success'
  ),
  DO_UPDATE_COUNTRY_FAIL: type('[Settings country] Do UpdateCountry Fail'),

  GET_COUNTRY_LIST: type('[Country] Do Countrylist'),
  GET_COUNTRY_LIST_SUCCESS: type('[Country] Do Countrylist Success'),
  GET_COUNTRY_LIST_FAIL: type('[Country] Do Countrylist Fail'),

  GET_COUNTRY_COUNT_ACTION: type('[Country Pagination] Do Country Paination '),
  GET_COUNTRY_COUNT_SUCCESS: type(
    '[Country Pagination] Do Country Paination  Success'
  ),
  GET_COUNTRY_COUNT_FAIL: type(
    '[Country Pagination] Do Country Paination  Fail'
  ),

  DO_COUNTRY_DELETE: type('[Delete] Do country Delete'),
  DO_COUNTRY_DELETE_SUCCESS: type('[Delete] Do country Success'),
  DO_COUNTRY_DELETE_FAIL: type('[Delete] Do country Delete Fail')
};

// ADD COUNTRY

export class DoNewCountryAction implements Action {
  type = ActionTypes.DO_NEW_COUNTRY;

  constructor(public payload: CountryForm) {}
}

export class DoNewCountrySuccessAction implements Action {
  type = ActionTypes.DO_NEW_COUNTRY_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewCountryFailAction implements Action {
  type = ActionTypes.DO_NEW_COUNTRY_FAIL;

  constructor(public payload: any = null) {}
}

// UPDATE COUNTRY

export class DoUpdateCountryAction implements Action {
  type = ActionTypes.DO_UPDATE_COUNTRY;

  constructor(public payload: CountryForm) {}
}

export class DoUpdateCountrySuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_COUNTRY_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateCountryFailAction implements Action {
  type = ActionTypes.DO_UPDATE_COUNTRY_FAIL;

  constructor(public payload: any = null) {}
}

// COUNTRY LIST Action
export class GetCountrylistAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST;

  constructor(public payload: CountryListForm) {}
}

export class GetCountrylistSuccessAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCountrylistFailAction implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// Country Pagination Count
export class GetCountryCountAction implements Action {
  type = ActionTypes.GET_COUNTRY_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class GetCountryCountSuccessAction implements Action {
  type = ActionTypes.GET_COUNTRY_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCountryCountFailAction implements Action {
  type = ActionTypes.GET_COUNTRY_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// Country Delete Action
export class DoCountryDeleteAction implements Action {
  type = ActionTypes.DO_COUNTRY_DELETE;

  constructor(public payload: any) {}
}

export class DoCountryDeleteSuccessAction implements Action {
  type = ActionTypes.DO_COUNTRY_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCountryDeleteFailAction implements Action {
  type = ActionTypes.DO_COUNTRY_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewCountryAction
  | DoNewCountrySuccessAction
  | DoNewCountryFailAction
  | DoUpdateCountryAction
  | DoUpdateCountrySuccessAction
  | DoUpdateCountryFailAction
  | GetCountrylistAction
  | GetCountrylistSuccessAction
  | GetCountrylistFailAction
  | GetCountryCountAction
  | GetCountryCountSuccessAction
  | GetCountryCountFailAction
  | DoCountryDeleteAction
  | DoCountryDeleteSuccessAction
  | DoCountryDeleteFailAction;
