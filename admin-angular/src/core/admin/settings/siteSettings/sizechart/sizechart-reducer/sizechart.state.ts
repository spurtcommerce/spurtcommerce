/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SizeChartState extends Map<string, any> {
  newsizechart: any;
  getSizeChart: any;

  sizechartList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  varientList: any;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  userGroupLoading: boolean;
  userGroupLoaded: boolean;
  userGroupFailed: boolean;

  sizechartDelete: any;
  deleteChartLoaded: boolean;
  headerTextList: any;

  headerText: any;
  createHeaderTextLoading: boolean;
  createHeaderTextLoaded: boolean;
  createHeaderTextFailed: boolean;

  headerTextDelete: any;
  deleteHeaderTextLoader: boolean;

  updateHeaderText: any;
  updateHeaderTextLoading: boolean;
  updateHeaderTextLoaded: boolean;
  updateHeaderTextFailed: boolean;

  updateSizeChart: any;
  updateSizeChartLoading: boolean;
  updateSizeChartLoaded: boolean;
  updateSizeChartFailed: boolean;
}

export const SizeChartRecordState = Record({
  newsizechart: {},
  getSizeChart: {},

  sizechartList: [],
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  varientList: [],

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  userGroupLoading: false,
  userGroupLoaded: false,
  userGroupFailed: false,
  sizechartDelete: {},
  deleteChartLoaded: false,
  headerTextList: [],

  headerText: [],
  createHeaderTextLoading: false,
  createHeaderTextLoaded: false,
  createHeaderTextFailed: false,

  headerTextDelete: {},
  deleteHeaderTextLoader: false,

  updateHeaderText: [],
  updateHeaderTextLoading: false,
  updateHeaderTextLoaded: false,
  updateHeaderTextFailed: false,

  updateSizeChart: [],
  updateSizeChartLoading: false,
  updateSizeChartLoaded: false,
  updateSizeChartFailed: false
});
