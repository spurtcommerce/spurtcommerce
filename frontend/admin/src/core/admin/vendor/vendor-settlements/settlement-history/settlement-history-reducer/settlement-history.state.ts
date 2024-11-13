/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';
export interface SettlementHistoryState extends Map<string, any> {
  excelLoading:boolean;
  historyList: any;
  historyListCount: any;
  historyListLoading: boolean;
  historyListLoaded: boolean;
  historyListFailed: boolean;

  settlementDetails: any;
  settlementDetailsLoading: boolean;
  settlementDetailsLoaded: boolean;
  settlementDetailsFailed: boolean;

}

export const SettlementHistoryStateRecord = Record({
  excelLoading:false,
  historyList: [],
  historyListCount: '',
  historyListLoading: false,
  historyListLoaded: false,
  historyListFailed: false,

  settlementDetails: {},
  settlementDetailsLoading: false,
  settlementDetailsLoaded: false,
  settlementDetailsFailed: false,
});
