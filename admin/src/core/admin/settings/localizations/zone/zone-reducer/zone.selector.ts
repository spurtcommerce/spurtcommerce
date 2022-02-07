/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromZone from './zone.reducer';

export const getZoneState = (state: AppState) => state.zone;
export const getzoneslist = createSelector(
  getZoneState,
  fromZone.getzoneslist
);
export const getzonepagination = createSelector(
  getZoneState,
  fromZone.getzonepagination
);
export const getzonedelte = createSelector(
  getZoneState,
  fromZone.getzonedelte
);
export const getnewzone = createSelector(
  getZoneState,
  fromZone.getnewzone
);
export const getupdatzone = createSelector(
  getZoneState,
  fromZone.getupdatzone
);

export const ZoneListLoading = createSelector(
  getZoneState,
  fromZone.getZoneListLoading
);
export const ZoneListLoaded = createSelector(
  getZoneState,
  fromZone.getZoneListLoaded
);
export const ZoneListFailed = createSelector(
  getZoneState,
  fromZone.getZoneListFailed
);

export const ZoneCountLoading = createSelector(
  getZoneState,
  fromZone.getZoneCountLoading
);
export const ZoneCountLoaded = createSelector(
  getZoneState,
  fromZone.getZoneCountLoaded
);
export const ZoneCountFailed = createSelector(
  getZoneState,
  fromZone.getZoneCountFailed
);

export const ZoneAddLoading = createSelector(
  getZoneState,
  fromZone.getZoneAddLoading
);
export const ZoneAddLoaded = createSelector(
  getZoneState,
  fromZone.getZoneAddLoaded
);
export const ZoneAddFailed = createSelector(
  getZoneState,
  fromZone.getZoneAddFailed
);

export const ZoneDeleteLoading = createSelector(
  getZoneState,
  fromZone.getZoneDeleteLoading
);
export const ZoneDeleteLoaded = createSelector(
  getZoneState,
  fromZone.getZoneDeleteLoaded
);
export const ZoneDeleteFailed = createSelector(
  getZoneState,
  fromZone.getZoneDeleteFailed
);

export const ZoneUpdateLoading = createSelector(
  getZoneState,
  fromZone.getZoneUpdateLoading
);
export const ZoneUpdateLoaded = createSelector(
  getZoneState,
  fromZone.getZoneUpdateLoaded
);
export const ZoneUpdateFailed = createSelector(
  getZoneState,
  fromZone.getZoneUpdateFailed
);
