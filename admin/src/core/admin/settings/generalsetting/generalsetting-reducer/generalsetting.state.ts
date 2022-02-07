/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface GeneralsettingState extends Map<string, any> {
  newgeneralsettings: any;
  getgeneralsetting: any;
}

export const GeneralsettingRecordState = Record({
  newgeneralsettings: {},
  getgeneralsetting: {}
});
