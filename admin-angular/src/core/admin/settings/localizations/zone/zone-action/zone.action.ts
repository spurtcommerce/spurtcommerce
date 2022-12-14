/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { ZoneForm } from '../zone-model/zone.model';

export const ActionTypes = {
  GET_ZONE_LIST: type('[Zone] Do ZoneList'),
  GET_ZONE_LIST_SUCCESS: type('[Zone] Do Zone Success'),
  GET_ZONE_LIST_FAIL: type('[Zone] Do Zone Fail'),
  GET_ZONE_COUNT_ACTION: type('[Zone Pagination] Do Zone Paination '),
  GET_ZONE_COUNT_SUCCESS: type('[Zone Pagination] Do Zone Paination  Success'),
  GET_ZONE_COUNT_FAIL: type('[Zone Pagination] Do Zone Paination  Fail'),
  DO_ADD_ZONE: type('[Settings Zone] Do Add Zone '),
  DO_ADD_ZONE_SUCCESS: type('[Settings Zone] Do Add Zone Success'),
  DO_ADD_ZONE_FAIL: type('[Settings Zone] Do Add Zone Fail'),
  DO_UPDATE_ZONE: type('[Settings Zone] Do UpdateZone'),
  DO_UPDATE_ZONE_SUCCESS: type('[Settings Zone] Do UpdateZone Success'),
  DO_UPDATE_ZONE_FAIL: type('[Settings Zone] Do UpdateZone Fail'),

  DO_ZONE_DELETE: type('[Delete Zone] Do Zone Delete'),
  DO_ZONE_DELETE_SUCCESS: type('[Delete Zone] Do Zone Success'),
  DO_ZONE_DELETE_FAIL: type('[Delete Zone] Do Zone Delete Fail')
};

// ZONE LIST

export class GetZoneListAction implements Action {
  type = ActionTypes.GET_ZONE_LIST;

  constructor(public payload: any) {}
}

export class GetZoneListSuccessAction implements Action {
  type = ActionTypes.GET_ZONE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetZoneListFailAction implements Action {
  type = ActionTypes.GET_ZONE_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// ZONE LIST  PAGINATION

export class GetZoneCountAction implements Action {
  type = ActionTypes.GET_ZONE_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class GetZoneCountSuccessAction implements Action {
  type = ActionTypes.GET_ZONE_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetZoneCountFailAction implements Action {
  type = ActionTypes.GET_ZONE_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// ADD ZONE

export class DoNewZoneAction implements Action {
  type = ActionTypes.DO_ADD_ZONE;

  constructor(public payload: ZoneForm) {}
}

export class DoNewZoneSuccessAction implements Action {
  type = ActionTypes.DO_ADD_ZONE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewZoneFailAction implements Action {
  type = ActionTypes.DO_ADD_ZONE_FAIL;

  constructor(public payload: any = null) {}
}

// UPDATE ZONE

export class DoUpdateZoneAction implements Action {
  type = ActionTypes.DO_UPDATE_ZONE;

  constructor(public payload: ZoneForm) {}
}

export class DoUpdateZoneSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_ZONE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateZoneFailAction implements Action {
  type = ActionTypes.DO_UPDATE_ZONE_FAIL;

  constructor(public payload: any = null) {}
}

// Zone Delete

export class DoZoneDeleteAction implements Action {
  type = ActionTypes.DO_ZONE_DELETE;

  constructor(public payload: any) {}
}

export class DoZoneDeleteSuccessAction implements Action {
  type = ActionTypes.DO_ZONE_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoZoneDeleteFailAction implements Action {
  type = ActionTypes.DO_ZONE_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetZoneListAction
  | GetZoneListSuccessAction
  | GetZoneListFailAction
  | GetZoneCountAction
  | GetZoneCountSuccessAction
  | GetZoneCountFailAction
  | DoNewZoneAction
  | DoNewZoneSuccessAction
  | DoNewZoneFailAction
  | DoUpdateZoneAction
  | DoUpdateZoneSuccessAction
  | DoUpdateZoneFailAction
  | DoZoneDeleteAction
  | DoZoneDeleteSuccessAction
  | DoZoneDeleteFailAction;
