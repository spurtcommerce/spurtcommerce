/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SeosettingState extends Map<string, any> {
  newSeo: any;
  getSeo: any;
  getSettingLoading: boolean;
}

export const SeosettingRecordState = Record({
  newSeo: {},
  getSeo: {},
  getSettingLoading:false
});
