/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface PersonalizeOrderState extends Map<string, any> {
  newPersonalizeOrder: any;
  getPersonalizeOrder: any;
  getSettingLoading:boolean;
}

export const PersonalizeOrderRecordState = Record({
  newPersonalizeOrder: {},
  getPersonalizeOrder: {},
  getSettingLoading:false
});
