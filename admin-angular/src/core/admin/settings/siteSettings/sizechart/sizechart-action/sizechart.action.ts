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
import { SizeChartForm } from '../sizechart-model/sizechart.model';

export const ActionTypes = {
  GET_SIZE_CHART_LIST: type('[Settings sizechart] Do SizeChartList'),
  GET_SIZE_CHART_LIST_SUCCESS: type('[Settings sizechart] Do SizeChartList Success'),
  GET_SIZE_CHART_LIST_FAIL: type('[Settings sizechart] Do SizeChartList Fail'),
  DO_SIZE_CHART_COUNT_ACTION: type('[Settings sizechart] Do SizeChart Paination '),
  DO_SIZE_CHART_COUNT_SUCCESS: type('[Settings sizechart] Do SizeChart Paination  Success'),
  DO_SIZE_CHART_COUNT_FAIL: type('[Settings sizechart] Do SizeChart Paination  Fail'),
  DO_NEW_SIZE_CHART: type('[Settings sizechart] Do New sizechart'),
  DO_NEW_SIZE_CHART_SUCCESS: type('[Settings sizechart] Do New sizechart Success'),
  DO_NEW_SIZE_CHART_FAIL: type('[Settings sizechart] Do New sizechart Fail'),
  DO_GET_SIZE_CHART: type('[Settings sizechart] Do get sizechart'),
  DO_GET_SIZE_CHART_SUCCESS: type('[Settings sizechart] Do get sizechart Success'),
  DO_GET_SIZE_CHART_FAIL: type('[Settings sizechart] Do get sizechart Fail'),
  GET_VARIENT_LIST: type('[Settings sizechart] Do VarientList'),
  GET_VARIENT_LIST_SUCCESS: type('[Settings sizechart] Do VarientList Success'),
  GET_VARIENT_LIST_FAIL: type('[Settings sizechart] Do VarientList Fail'),
  CLEAR_VARIENT_DATA: type('[Settings sizechart] Clear Varient Data'),

  DELETE_SIZE_CHART: type('[Settings sizechart] Delete SizeChart'),
  DELETE_SIZE_CHART_SUCCESS: type('[Settings sizechart] Delete SizeChart Success'),
  DELETE_SIZE_CHART_FAIL: type('[Settings sizechart] Delete SizeChart Fail'),

  HEADER_TEXT_LIST: type('[Settings sizechart] Header Text List'),
  HEADER_TEXT_LIST_SUCCESS: type('[Settings sizechart] Header Text List Success'),
  HEADER_TEXT_LIST_FAIL: type('[Settings sizechart] Header Text List Fail'),

  CREATE_HEADER_TEXT: type('[Settings sizechart] Create Header Text'),
  CREATE_HEADER_TEXT_SUCCESS: type('[Settings sizechart] Create Header Text Success'),
  CREATE_HEADER_TEXT_FAIL: type('[Settings sizechart] Create Header Text Fail'),

  CLEAR_HEADER_TEXT: type('[Settings sizechart] Clear Header Text'),

  DELETE_HEADER_TEXT: type('[Settings sizechart] Delete Header Text'),
  DELETE_HEADER_TEXT_SUCCESS: type('[Settings sizechart] Delete Header Text Success'),
  DELETE_HEADER_TEXT_FAIL: type('[Settings sizechart] Delete Header Text Fail'),

  UPDATE_HEADER_TEXT: type('[Settings sizechart] Update Header Text'),
  UPDATE_HEADER_TEXT_SUCCESS: type('[Settings sizechart] Update Header Text Success'),
  UPDATE_HEADER_TEXT_FAIL: type('[Settings sizechart] Update Header Text Fail'),

  UPDATE_SIZE_CHART: type('[Settings sizechart] Update Size Chart'),
  UPDATE_SIZE_CHART_SUCCESS: type('[Settings sizechart] Update Size Chart Success'),
  UPDATE_SIZE_CHART_FAIL: type('[Settings sizechart] Update Size Chart Fail'),
};

// SizeChartPagination

export class DoSizeChartPaginationAction implements Action {
  type = ActionTypes.DO_SIZE_CHART_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class DoSizeChartPaginationSuccessAction implements Action {
  type = ActionTypes.DO_SIZE_CHART_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoSizeChartPaginationFailAction implements Action {
  type = ActionTypes.DO_SIZE_CHART_COUNT_FAIL;

  constructor(public payload: any = null) {}
}
// SizeChartList
export class DoSizeChartListAction implements Action {
  type = ActionTypes.GET_SIZE_CHART_LIST;

  constructor(public payload: any) {}
}

export class DoSizeChartListSuccessAction implements Action {
  type = ActionTypes.GET_SIZE_CHART_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoSizeChartListFailAction implements Action {
  type = ActionTypes.GET_SIZE_CHART_LIST_FAIL;

  constructor(public payload: any = null) {}
}


// NEW SIZE_CHART SETTINGS
export class DoNewSizeChartAction implements Action {
  type = ActionTypes.DO_NEW_SIZE_CHART;

  constructor(public payload: SizeChartForm) {}
}

export class DoNewSizeChartSuccessAction implements Action {
  type = ActionTypes.DO_NEW_SIZE_CHART_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewSizeChartFailAction implements Action {
  type = ActionTypes.DO_NEW_SIZE_CHART_FAIL;

  constructor(public payload: any = null) {}
}

// GET SIZE_CHART SETTINGS
export class DoGetSizeChartAction implements Action {
  type = ActionTypes.DO_GET_SIZE_CHART;

  constructor(public payload: any) {}
}

export class DoGetSizeChartSuccessAction implements Action {
  type = ActionTypes.DO_GET_SIZE_CHART_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetSizeChartFailAction implements Action {
  type = ActionTypes.DO_GET_SIZE_CHART_FAIL;

  constructor(public payload: any = null) {}
}
export class DoVarientListAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST;

  constructor(public payload: any) {}
}

export class DoVarientListSuccessAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoVarientListFailAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// clearVarientData
export class ClearVarientData implements Action {
  type = ActionTypes.CLEAR_VARIENT_DATA;
  constructor(public payload: any) {}
}
// Delete SizeChart

export class DeleteSizeChart implements Action {
  type = ActionTypes.DELETE_SIZE_CHART;

  constructor(public payload: any) {}
}

export class DeleteSizeChartSuccess implements Action {
  type = ActionTypes.DELETE_SIZE_CHART_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteSizeChartFail implements Action {
  type = ActionTypes.DELETE_SIZE_CHART_FAIL;

  constructor(public payload: any = null) {}
}
// HeaderTextListAction
export class HeaderTextListAction implements Action {
  type = ActionTypes.HEADER_TEXT_LIST;

  constructor(public payload: any) {}
}

export class HeaderTextListSuccessAction implements Action {
  type = ActionTypes.HEADER_TEXT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class HeaderTextListFailAction implements Action {
  type = ActionTypes.HEADER_TEXT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// CreateHeaderTestAction
export class CreateHeaderTestAction implements Action {
  type = ActionTypes.CREATE_HEADER_TEXT;

  constructor(public payload: any) {}
}

export class CreateHeaderTextSuccessAction implements Action {
  type = ActionTypes.CREATE_HEADER_TEXT_SUCCESS;

  constructor(public payload: any) {}
}

export class CreateHeaderTextFailAction implements Action {
  type = ActionTypes.CREATE_HEADER_TEXT_FAIL;

  constructor(public payload: any = null) {}
}
// ClearHeaderText
export class ClearHeaderText implements Action {
  type = ActionTypes.CLEAR_HEADER_TEXT;

  constructor() {
  }
}
// DeleteHeaderText

export class DeleteHeaderText implements Action {
  type = ActionTypes.DELETE_HEADER_TEXT;

  constructor(public payload: any) {}
}

export class DeleteHeaderTextSuccess implements Action {
  type = ActionTypes.DELETE_HEADER_TEXT_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteHeaderTextFail implements Action {
  type = ActionTypes.DELETE_HEADER_TEXT_FAIL;

  constructor(public payload: any = null) {}
}
// UpdateHeaderTest
export class UpdateHeaderTest implements Action {
  type = ActionTypes.UPDATE_HEADER_TEXT;

  constructor(public payload: any) {}
}

export class UpdateHeaderTestSuccessAction implements Action {
  type = ActionTypes.UPDATE_HEADER_TEXT_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateHeaderTestFailAction implements Action {
  type = ActionTypes.UPDATE_HEADER_TEXT_FAIL;

  constructor(public payload: any = null) {}
}
// UpdateSizeChart
export class UpdateSizeChart implements Action {
  type = ActionTypes.UPDATE_SIZE_CHART;

  constructor(public payload: any) {}
}

export class UpdateSizeChartSuccessAction implements Action {
  type = ActionTypes.UPDATE_SIZE_CHART_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateSizeChartFailAction implements Action {
  type = ActionTypes.UPDATE_SIZE_CHART_FAIL;

  constructor(public payload: any = null) {}
}
export type Actions =
  | DoNewSizeChartAction
  | DoNewSizeChartSuccessAction
  | DoNewSizeChartFailAction
  | DoGetSizeChartAction
  | DoGetSizeChartSuccessAction
  | DoGetSizeChartFailAction;
