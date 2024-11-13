/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';
import { CurrencyListResponseModel } from '../currency-model/currencylist.response.model';
import { CurrencyNewResponse } from '../currency-model/currencynewResponse.model';

export interface CurrencyState extends Map<string, any> {
  currencyList: Array<CurrencyListResponseModel>;
  currencyListCount: any;
  currencyNew: any;
  currencyNewdetail: CurrencyNewResponse;
  currencyupdate: any;
  currencyDelete: any;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

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

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;
}

export const CurrencyRecordState = Record({
  currencyList: {},
  currencyListCount: {},
  currencyNew: {},
  currencyupdate: {},
  currencyDelete: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,

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

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false
});
