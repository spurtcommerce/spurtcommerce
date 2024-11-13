/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface GeneralsettingState extends Map<string, any> {
  newgeneralsettings: any;
  getgeneralsetting: any;
  mode: any;
  getSettingLoading:boolean
}

export const GeneralsettingRecordState = Record({
  newgeneralsettings: {},
  getgeneralsetting: {},
  mode: {},
  getSettingLoading:false
});
