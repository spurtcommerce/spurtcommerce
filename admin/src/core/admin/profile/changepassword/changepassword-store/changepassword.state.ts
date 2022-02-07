/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface ChangePasswordState extends Map<string, any> {
  changePasword: any;
  changepasswordResponse: boolean;
  changepasswordRequestLoading: boolean;
  changepasswordRequestLoaded: boolean;
  changepasswordRequestFailed: boolean;
}

export const ChangePasswordRecordState = Record({
  changePasword: [],
  changepasswordResponse: false,
  changepasswordRequestLoading: false,
  changepasswordRequestLoaded: false,
  changepasswordRequestFailed: false
});
