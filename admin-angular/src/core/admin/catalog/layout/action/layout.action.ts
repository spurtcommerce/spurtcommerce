/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  GET_CATALOG_COUNT: type('[CatalogLayout] Get Catalog Count'),
  GET_CATALOG_COUNT_SUCCESS: type('[CatalogLayout] Get Catalog Count Success'),
  GET_CATALOG_COUNT_FAIL: type('[CatalogLayout] Get Catalog Count Success Fail'),

};


/* Get Catalog Count Actions */

export class GetCatalogCountAction implements Action {
  type = ActionTypes.GET_CATALOG_COUNT;
  constructor(public payload: any = null) {}
}

export class GetCatalogCountSuccessAction implements Action {
  type = ActionTypes.GET_CATALOG_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCatalogCountFailAction implements Action {
  type = ActionTypes.GET_CATALOG_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetCatalogCountAction
  | GetCatalogCountSuccessAction
  | GetCatalogCountFailAction;

