/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface CustomerLayoutState extends Map<string, any> {
  totalCustomerCount: number;
  totalCustomerCountLoading: boolean;
  totalCustomerCountLoaded: boolean;
  totalCustomerCountFailed: boolean;
  activeCustomerCount: number;
  activeCustomerCountLoading: boolean;
  activeCustomerCountLoaded: boolean;
  activeCustomerCountFailed: boolean;
  inactiveCustomerCount: number;
  inactiveCustomerCountLoading: boolean;
  inactiveCustomerCountLoaded: boolean;
  inactiveCustomerCountFailed: boolean;
}

export const CustomerLayoutStateRecord = Record({
  totalCustomerCount: 0,
  totalCustomerCountLoading: false,
  totalCustomerCountLoaded: false,
  totalCustomerCountFailed: false,
  activeCustomerCount: 0,
  activeCustomerCountLoading: false,
  activeCustomerCountLoaded: false,
  activeCustomerCountFailed: false,
  inactiveCustomerCount: 0,
  inactiveCustomerCountLoading: false,
  inactiveCustomerCountLoaded: false,
  inactiveCustomerCountFailed: false
});
