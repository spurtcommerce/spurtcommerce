/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SeosettingState extends Map<string, any> {
  newSeo: any;
  getSeo: any;
}

export const SeosettingRecordState = Record({
  newSeo: {},
  getSeo: {}
});
