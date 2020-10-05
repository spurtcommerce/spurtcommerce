/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface CatalogLayoutState extends Map<string, any> {
  totalProductCount: number;
  totalProductCountLoading: boolean;
  totalProductCountLoaded: boolean;
  totalProductCountFailed: boolean;
  activeProductCount: number;
  activeProductCountLoading: boolean;
  activeProductCountLoaded: boolean;
  activeProductCountFailed: boolean;
  inactiveProductCount: number;
  inactiveProductCountLoading: boolean;
  inactiveProductCountLoaded: boolean;
  inactiveProductCountFailed: boolean;
  totalCatagoryCount: any;
  totalCatagoryCountLoading: boolean;
  totalCatagoryCountLoaded: boolean;
  totalCatagoryCountFailed: boolean;
}

export const CatalogLayoutStateRecord = Record({
  totalProductCount: 0,
  totalProductLoading: false,
  totalProductLoaded: false,
  totalProductFailed: false,
  activeProductCount: 0,
  activeProductCountLoading: false,
  activeProductCountLoaded: false,
  activeProductCountFailed: false,
  inactiveProductCount: 0,
  inactiveProductCountLoading: false,
  inactiveProductCountLoaded: false,
  inactiveProductCountFailed: false,
  totalCatagoryCount: 0,
  totalCatagoryCountLoading: false,
  totalCatagoryCountLoaded: false,
  totalCatagoryCountFailed: false,
});
