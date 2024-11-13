/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface EarningState extends Map<string, any> {


  // earning list

  GetEarning: any;
  GetEarningLoading: boolean;
  GetEarningLoaded: boolean;
  GetEarningFailed: boolean;

  /* get earning  count*/

  GetEarningCount: any;
  GetEarningCountLoading: boolean;
  GetEarningCountLoaded: boolean;
  GetEarningCountFailed: boolean;

  /*Exportexcel*/

  GetEarningExport: any;
  GetEarningExportLoading: boolean;
  GetEarningExportLoaded: boolean;
  GetEarningExportFailed: boolean;


}

export const EarningRecord = Record({


  // earning list
  GetEarning: [],
  GetEarningLoading: false,
  GetEarningLoaded: false,
  GetEarningFailed: false,


  /* get earning  count*/

  GetEarningCount: [],
  GetEarningCountLoading: false,
  GetEarningCountLoaded: false,
  GetEarningCountFailed: false,

  /*Exportexcel*/

  GetEarningExport: [],
  GetEarningExportLoading: false,
  GetEarningExportLoaded: false,
  GetEarningExportFailed: false,

});
