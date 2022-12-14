/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SizeChartaction from '../sizechart/sizechart-action/sizechart.action';
import * as store from '../../../../app.state.interface';
import { SizeChartForm } from '../sizechart/sizechart-model/sizechart.model';
import { getNewSizeChart, getSizeChart, sizechartList, SizeChartListLoading, SizeChartListLoaded, SizeChartListFailed, varientList, headerTextList, headerText, createHeaderTextLoading, createHeaderTextLoaded, deleteHeaderTextLoader, updateHeaderText, updateHeaderTextLoading, updateHeaderTextLoaded, updateHeaderTextFailed, deleteChartLoaded } from '../sizechart/sizechart-reducer/sizechart.selector';


@Injectable()
export class SizeChartSandbox {
  public getNewSizeChart$ = this.appState.select(getNewSizeChart);
  public getSizeChart$ = this.appState.select(getSizeChart);

  public sizechartList$ = this.appState.select(sizechartList);
  public sizechartListLoading$ = this.appState.select(SizeChartListLoading);
  public sizechartListLoaded$ = this.appState.select(SizeChartListLoaded);
  public sizechartListFailed$ = this.appState.select(SizeChartListFailed);


  public deleteChartLoaded$ = this.appState.select(deleteChartLoaded);

  public varientList$ = this.appState.select(varientList);
  public headerTextList$ = this.appState.select(headerTextList);

  public headerText$ = this.appState.select(headerText);
  public createHeaderTextLoading$ = this.appState.select(createHeaderTextLoading);
  public createHeaderTextLoaded$ = this.appState.select(createHeaderTextLoaded);
  public deleteHeaderTextLoader$ = this.appState.select(deleteHeaderTextLoader);

  public updateHeaderText$ = this.appState.select(updateHeaderText);
  public updateHeaderTextLoading$ = this.appState.select(updateHeaderTextLoading);
  public updateHeaderTextLoaded$ = this.appState.select(updateHeaderTextLoaded);
  public updateHeaderTextFailed$ = this.appState.select(updateHeaderTextFailed);
  constructor(protected appState: Store<store.AppState>) {}

  public getsizechartpagination(value) {
    this.appState.dispatch(
      new SizeChartaction.DoSizeChartPaginationAction((value))
    );
  }

  public getSizeChartlist(value: any) {
    this.appState.dispatch(
      new SizeChartaction.DoSizeChartListAction((value))
    );
  }
  public createSizeChart(value) {
    this.appState.dispatch(
      new SizeChartaction.DoNewSizeChartAction(new SizeChartForm(value))
    );
  }

  public getSizeChart(params) {
    this.appState.dispatch(new SizeChartaction.DoGetSizeChartAction(params));
  }
  public varientList(value: any) {
    this.appState.dispatch(
      new SizeChartaction.DoVarientListAction((value))
    );
  }
  public clearVarientData(value) {
    this.appState.dispatch(
      new SizeChartaction.ClearVarientData((value))
    );
  }
  public deleteSizeChart(value: any) {
    this.appState.dispatch(new SizeChartaction.DeleteSizeChart(value));
  }
  public headerTextList(value: any) {
    this.appState.dispatch(new SizeChartaction.HeaderTextListAction((value))
    );
  }
  public createHeaderTest(value: any) {
    this.appState.dispatch(new SizeChartaction.CreateHeaderTestAction((value)));
}
  public clearHeaderText() {
    this.appState.dispatch(new SizeChartaction.ClearHeaderText());
  }
  public deleteHeaderText(value: any) {
    this.appState.dispatch(new SizeChartaction.DeleteHeaderText(value));
  }
  public updateHeaderTest(value: any) {
    this.appState.dispatch(new SizeChartaction.UpdateHeaderTest(value));
  }
  public updateSizeChart(value: any) {
    this.appState.dispatch(new SizeChartaction.UpdateSizeChart(value));
  }
}
