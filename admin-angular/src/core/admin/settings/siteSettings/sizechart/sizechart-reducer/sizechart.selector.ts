/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromSizeChart from './sizechart.reducer';

export const getSizeChartState = (state: AppState) => state.sizechart;

export const sizechartList = createSelector(getSizeChartState, fromSizeChart.sizechartList);
export const getNewSizeChart = createSelector(getSizeChartState, fromSizeChart.getNewSizeChart);
export const getSizeChart = createSelector(getSizeChartState, fromSizeChart.getSizeChart);
export const SizeChartListLoading = createSelector(getSizeChartState, fromSizeChart.getSizeChartListLoading);
export const SizeChartListLoaded = createSelector(getSizeChartState, fromSizeChart.getSizeChartListLoaded);
export const SizeChartListFailed = createSelector(getSizeChartState, fromSizeChart.getSizeChartListFailed);
export const varientList = createSelector(getSizeChartState, fromSizeChart.varientList);
export const sizechartDelete = createSelector(getSizeChartState, fromSizeChart.sizechartDelete);
export const deleteChartLoaded = createSelector(getSizeChartState, fromSizeChart.deleteChartLoaded);
export const headerTextList = createSelector(getSizeChartState, fromSizeChart.headerTextList);

export const headerText = createSelector(getSizeChartState, fromSizeChart.headerText);
export const createHeaderTextLoading = createSelector(getSizeChartState, fromSizeChart.createHeaderTextLoading);
export const createHeaderTextLoaded = createSelector(getSizeChartState, fromSizeChart.createHeaderTextLoaded);
export const createHeaderTextFailed = createSelector(getSizeChartState, fromSizeChart.createHeaderTextFailed);

export const headerTextDelete = createSelector(getSizeChartState, fromSizeChart.headerTextDelete);
export const deleteHeaderTextLoader = createSelector(getSizeChartState, fromSizeChart.deleteHeaderTextLoader);

export const updateHeaderText = createSelector(getSizeChartState, fromSizeChart.updateHeaderText);
export const updateHeaderTextLoading = createSelector(getSizeChartState, fromSizeChart.updateHeaderTextLoading);
export const updateHeaderTextLoaded = createSelector(getSizeChartState, fromSizeChart.updateHeaderTextLoaded);
export const updateHeaderTextFailed = createSelector(getSizeChartState, fromSizeChart.updateHeaderTextFailed);

export const updateSizeChart = createSelector(getSizeChartState, fromSizeChart.updateSizeChart);
export const updateSizeChartLoading = createSelector(getSizeChartState, fromSizeChart.updateSizeChartLoading);
export const updateSizeChartLoaded = createSelector(getSizeChartState, fromSizeChart.updateSizeChartLoaded);
export const updateSizeChartFailed = createSelector(getSizeChartState, fromSizeChart.updateSizeChartFailed);
