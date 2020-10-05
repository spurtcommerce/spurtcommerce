/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface SalesLayoutState extends Map<string, any> {
  totalOrderCount: number;
  totalOrderCountLoading: boolean;
  totalOrderCountLoaded: boolean;
  totalOrderCountFailed: boolean;
  todayOrderAmount: number;
  todayOrderAmountLoading: boolean;
  todayOrderAmountLoaded: boolean;
  todayOrderAmountFailed: boolean;
  todayOrderCount: number;
  todayOrderCountLoading: boolean;
  todayOrderCountLoaded: boolean;
  todayOrderCountFailed: boolean;
  totalOrderAmount: number;
  totalOrderAmountLoading: boolean;
  totalOrderAmountLoaded: boolean;
  totalOrderAmountFailed: boolean;
}

export const SalesLayoutStateRecord = Record({
  totalOrderCount: 0,
  totalOrderCountLoading: false,
  totalOrderCountLoaded: false,
  totalOrderCountFailed: false,
  todayOrderAmount: 0,
  todayOrderAmountLoading: false,
  todayOrderAmountLoaded: false,
  todayOrderAmountFailed: false,
  todayOrderCount: 0,
  todayOrderCountLoading: false,
  todayOrderCountLoaded: false,
  todayOrderCountFailed: false,
  totalOrderAmount: 0,
  totalOrderAmountLoading: false,
  totalOrderAmountLoaded: false,
  totalOrderAmountFailed: false
});
