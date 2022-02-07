/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface PersonalizeProductState extends Map<string, any> {
  newPersonalizeProduct: any;
  getPersonalizeProduct: any;
}

export const PersonalizeProductRecordState = Record({
  newPersonalizeProduct: {},
  getPersonalizeProduct: {}
});
