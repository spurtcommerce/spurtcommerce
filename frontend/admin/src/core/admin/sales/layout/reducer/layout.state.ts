/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SalesLayoutState extends Map<string, any> {

  salesCount: any;
  salesCountLoading: boolean;
  salesCountLoaded: boolean;
  salesCountFailed: boolean;

}

export const SalesLayoutStateRecord = Record({

  salesCount: {},
  salesCountLoading: false,
  salesCountLoaded: false,
  salesCountFailed: false,

});
