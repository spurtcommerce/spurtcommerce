/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
