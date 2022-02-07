/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface PersonalizeOrderState extends Map<string, any> {
  newPersonalizeOrder: any;
  getPersonalizeOrder: any;
}

export const PersonalizeOrderRecordState = Record({
  newPersonalizeOrder: {},
  getPersonalizeOrder: {}
});
