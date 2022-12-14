/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface CustomerLayoutState extends Map<string, any> {

  customerCount: any;
  customerCountLoading: boolean;
  customerCountLoaded: boolean;
  customerCountFailed: boolean;
}

export const CustomerLayoutStateRecord = Record({

  customerCount: {},
  customerCountLoading: false,
  customerCountLoaded: false,
  customerCountFailed: false,
});
