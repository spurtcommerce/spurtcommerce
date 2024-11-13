/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../sizechart-action/sizechart.action';
import { SizeChartState, SizeChartRecordState } from './sizechart.state';

export const initialState: SizeChartState = new SizeChartRecordState() as unknown as SizeChartState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SizeChartState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.GET_SIZE_CHART_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_SIZE_CHART_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_SIZE_CHART: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    
    case actions.ActionTypes.GET_VARIENT_LIST: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_LIST: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_SIZE_CHART_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sizechartList: payload.data,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_SIZE_CHART_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        userpagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIENT_LIST_SUCCESS: {
      var varientData = [];
      varientData = payload.data.map((item) =>
        Object.assign({}, item, { checkData: false })
      );
      return Object.assign({}, state, {
        varientList: varientData,
      });
    }



    case actions.ActionTypes.GET_ATTRIBUTE_LIST_SUCCESS: {
      var attributeData = [];
      attributeData = payload.data.map((item) =>
        Object.assign({}, item, { checkData: false })
      );
      attributeData.forEach(element => {
        element.attribute = element.attribute.map((item1) =>
          Object.assign({}, item1, { checkData: false })
        );
      });
      return Object.assign({}, state, {
        attributeList: attributeData,
      });
    }
    case actions.ActionTypes.DO_NEW_SIZE_CHART_SUCCESS: {
      return Object.assign({}, initialState, {
        newSizeChart: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    case actions.ActionTypes.GET_SIZE_CHART_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.GET_VARIENT_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.DO_NEW_SIZE_CHART_FAIL: {
      return Object.assign({}, initialState, {
        newSizeChart: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    case actions.ActionTypes.GET_SIZE_CHART_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.DO_NEW_SIZE_CHART_FAIL: {
      return Object.assign({}, initialState, {
        newSizeChart: payload,
      });
    }
    //  CLEAR_VARIENT_DATA
    case actions.ActionTypes.CLEAR_VARIENT_DATA: {
      let tempVarientList = state.varientList;
      tempVarientList.forEach(element => {
        if (element.id === payload.id) {
          element.checkData = false;
        }
      });
      return Object.assign({}, initialState, {
        varientList: tempVarientList
      });
    }
    // Delete SizeChart
    case actions.ActionTypes.DELETE_SIZE_CHART: {
      return Object.assign({}, state, {
        deleteChartLoaded: false
      });
    }
    case actions.ActionTypes.DELETE_SIZE_CHART_SUCCESS: {
      return Object.assign({}, state, {
        sizechartDelete: payload,
        deleteChartLoaded: true
      });
    }
    case actions.ActionTypes.DELETE_SIZE_CHART_FAIL: {
      return Object.assign({}, state, {
        deleteChartLoaded: false
      });
    }
    // Hearer Text List
    case actions.ActionTypes.HEADER_TEXT_LIST: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.HEADER_TEXT_LIST_SUCCESS: {
      var headerTextData = [];
      headerTextData = payload.data.map((item) =>
        Object.assign({}, item, { checkData: false })
      );
      return Object.assign({}, state, {
        headerTextList: headerTextData,
      });
    }
    case actions.ActionTypes.HEADER_TEXT_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }
    // Create Header Text
    case actions.ActionTypes.CREATE_HEADER_TEXT: {
      return Object.assign({}, state, {
        createHeaderTextLoading: true,
        createHeaderTextLoaded: false,
        createHeaderTextFailed: false,
      });
    }
    case actions.ActionTypes.CREATE_HEADER_TEXT_SUCCESS: {
      return Object.assign({}, state, {
        headerText: payload.data,
        createHeaderTextLoading: false,
        createHeaderTextLoaded: true,
        createHeaderTextFailed: false,
      });
    }
    case actions.ActionTypes.CREATE_HEADER_TEXT_FAIL: {
      return Object.assign({}, state, {
        createHeaderTextLoading: false,
        createHeaderTextLoaded: false,
        createHeaderTextFailed: true,
      });
    }
    // CLEAR_HEADER_TEXT
    case actions.ActionTypes.CLEAR_HEADER_TEXT: {
      return Object.assign({}, state, {
        createHeaderTextLoaded: false,
        deleteHeaderTextLoader: false,
        updateHeaderTextLoaded: false,
        deleteChartLoaded: false
      });
    }
    // Delete Header Text
    case actions.ActionTypes.DELETE_HEADER_TEXT: {
      return Object.assign({}, state, {
        deleteHeaderTextLoader: false
      });
    }
    case actions.ActionTypes.DELETE_HEADER_TEXT_SUCCESS: {
      return Object.assign({}, state, {
        headerTextDelete: payload,
        deleteHeaderTextLoader: true
      });
    }
    case actions.ActionTypes.DELETE_HEADER_TEXT_FAIL: {
      return Object.assign({}, state, {
        deleteHeaderTextLoader: false
      });
    }
    // UPDATE_HEADER_TEXT
    case actions.ActionTypes.UPDATE_HEADER_TEXT: {
      return Object.assign({}, state, {
        updateHeaderTextLoading: true,
        updateHeaderTextLoaded: false,
        updateHeaderTextFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_HEADER_TEXT_SUCCESS: {
      return Object.assign({}, state, {
        updateHeaderText: payload.data,
        updateHeaderTextLoading: false,
        updateHeaderTextLoaded: true,
        updateHeaderTextFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_HEADER_TEXT_FAIL: {
      return Object.assign({}, state, {
        updateHeaderTextLoading: false,
        updateHeaderTextLoaded: false,
        updateHeaderTextFailed: true,
      });
    }
    case actions.ActionTypes.DO_GET_SIZE_CHART: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.DO_GET_SIZE_CHART_SUCCESS: {
      let tempHeaderList = state.headerTextList;
      if (payload.data) {
        payload.data.header.forEach(element => {
          tempHeaderList.forEach(element1 => {
            if (element.headerId === element1.id) {
              element1.checkData = true;

            }
          });
        });
      }
      return Object.assign({}, state, {
        getSizeChart: payload.data,
        headerTextList: tempHeaderList
      });
    }
    case actions.ActionTypes.DO_GET_SIZE_CHART_FAIL: {
      return Object.assign({}, initialState, {
      });
    }
    // UPDATE_SIZE_CHART
    case actions.ActionTypes.UPDATE_SIZE_CHART: {
      return Object.assign({}, state, {
        updateSizeChartLoading: true,
        updateSizeChartLoaded: false,
        updateSizeChartFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_SIZE_CHART_SUCCESS: {
      return Object.assign({}, state, {
        updateSizeChart: payload.data,
        updateSizeChartLoading: false,
        updateSizeChartLoaded: true,
        updateSizeChartFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_SIZE_CHART_FAIL: {
      return Object.assign({}, state, {
        updateSizeChartLoading: false,
        updateSizeChartLoaded: false,
        updateSizeChartFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}

export const getNewSizeChart = (state: SizeChartState) => state.newsizechart;
export const getSizeChart = (state: SizeChartState) => state.getSizeChart;
export const sizechartList = (state: SizeChartState) => state.sizechartList;


export const getSizeChartListLoading = (state: SizeChartState) => state.listLoading;
export const getSizeChartListLoaded = (state: SizeChartState) => state.listLoaded;
export const getSizeChartListFailed = (state: SizeChartState) => state.listFailed;

export const varientList = (state: SizeChartState) => state.varientList;
export const attributeList = (state: SizeChartState) => state.attributeList;

export const sizechartDelete = (state: SizeChartState) => state.sizechartDelete;
export const deleteChartLoaded = (state: SizeChartState) => state.deleteChartLoaded;

export const headerTextList = (state: SizeChartState) => state.headerTextList;

export const headerText = (state: SizeChartState) => state.headerText;
export const createHeaderTextLoading = (state: SizeChartState) => state.createHeaderTextLoading;
export const createHeaderTextLoaded = (state: SizeChartState) => state.createHeaderTextLoaded;
export const createHeaderTextFailed = (state: SizeChartState) => state.createHeaderTextFailed;

export const headerTextDelete = (state: SizeChartState) => state.headerTextDelete;
export const deleteHeaderTextLoader = (state: SizeChartState) => state.deleteHeaderTextLoader;

export const updateHeaderText = (state: SizeChartState) => state.updateHeaderText;
export const updateHeaderTextLoading = (state: SizeChartState) => state.updateHeaderTextLoading;
export const updateHeaderTextLoaded = (state: SizeChartState) => state.updateHeaderTextLoaded;
export const updateHeaderTextFailed = (state: SizeChartState) => state.updateHeaderTextFailed;

export const updateSizeChart = (state: SizeChartState) => state.updateSizeChart;
export const updateSizeChartLoading = (state: SizeChartState) => state.updateSizeChartLoading;
export const updateSizeChartLoaded = (state: SizeChartState) => state.updateSizeChartLoaded;
export const updateSizeChartFailed = (state: SizeChartState) => state.updateSizeChartFailed;
