/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
import * as fromBrand from './brand.reducer';
import { AppState } from '../../../../app.state.interface';

export const getBrandState = (state: AppState) => state.brand;
// manufacturer list
export const getManufacturerList = createSelector(
  getBrandState,
  fromBrand.getManufacturerList
);
export const manufacturerListLoading = createSelector(
  getBrandState,
  fromBrand.getManufacturerListLoading
);
export const manufacturerListLoaded = createSelector(
  getBrandState,
  fromBrand.getManufactuerListLoaded
);
export const manufacturerListFailed = createSelector(
  getBrandState,
  fromBrand.getmanufacturerListFailed
);
// manufacturer count
export const getManufacturerContdata = createSelector(
  getBrandState,
  fromBrand.getManufacturerCount
);
export const manufacturerCountLoading = createSelector(
  getBrandState,
  fromBrand.getManufacturerCountLoading
);
export const manufacturerCountLoaded = createSelector(
  getBrandState,
  fromBrand.getManufacturerCountLoaded
);
export const manufacturerCountFailed = createSelector(
  getBrandState,
  fromBrand.getManufacturerCountFailed
);
// manufacturer add
export const getManufacturerAdd = createSelector(
  getBrandState,
  fromBrand.getManufacturerAdd
);
export const manufacturerAddLoading = createSelector(
  getBrandState,
  fromBrand.getManufacturerAddLoading
);
export const manufacturerAddLoaded = createSelector(
  getBrandState,
  fromBrand.getManufacturerAddLoaded
);
export const manufacturerAddFailed = createSelector(
  getBrandState,
  fromBrand.getManufacturerAddFailed
);
// manufacturer update
export const getManufacturerUpdate = createSelector(
  getBrandState,
  fromBrand.getManufacturerUpdate
);
export const manufacturerUpdateLoading = createSelector(
  getBrandState,
  fromBrand.getManufacturerUpdateLoading
);
export const manufacturerUpdateLoaded = createSelector(
  getBrandState,
  fromBrand.getManufacturerUpdateLoaded
);
export const manufacturerUpdateFailed = createSelector(
  getBrandState,
  fromBrand.getManufacturerUpdateFailed
);
// manufacturer delete
export const getManufacturerDelete = createSelector(
  getBrandState,
  fromBrand.getManufacturerDelete
);
export const manufacturerDeleteLoading = createSelector(
  getBrandState,
  fromBrand.getManufacturerDeleteLoading
);
export const manufacturerDeleteLoaded = createSelector(
  getBrandState,
  fromBrand.getManufacturerDeleteLoaded
);
export const manufacturerDeleteFailed = createSelector(
  getBrandState,
  fromBrand.getManufacturerDeleteFailed
);
