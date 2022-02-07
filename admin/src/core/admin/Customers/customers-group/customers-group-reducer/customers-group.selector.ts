/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';
import * as fromCustomersGroup from './customers-group.reducer';
import { AppState } from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * customer store functions
 */
export const getCustomersGroupState = (state: AppState) => state.customersGroup;

/* Customers*/
// customer List
export const getCustomersGroupList = createSelector(
  getCustomersGroupState,
  fromCustomersGroup.getCustomersGroupList
);
export const getCustomersGroupListLoading = createSelector(
  getCustomersGroupState,
  fromCustomersGroup.getCustomersGroupListLoading
);
export const getCustomerGroupListLoaded = createSelector(
  getCustomersGroupState,
  fromCustomersGroup.getCustomersGroupListLoaded
);
export const getCustomersGroupListFailed = createSelector(
  getCustomersGroupState,
  fromCustomersGroup.getCustomersGroupListFailed
);

// customer Add
export const getNewCustomersGroup = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getAddCustomersGroup);
export const getAddCustomersGroupLoading = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getAddCustomersGroupLoading
);
export const getAddCustomersGroupLoaded = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getAddCustomersGroupLoaded
);
export const getAddCustomersGroupFailed = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getAddCustomersGroupFailed
);

// customer update
export const getUpdateCustomersGroup = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getUpdateCustomersGroup
);
export const getUpdateCustomersGroupLoading = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getUpdateCustomersGroupLoading
);
export const getUpdateCustomersGroupLoaded = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getUpdateCustomersGroupLoaded
);
export const getUpdateCustomersGroupFailed = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getUpdateCustomersGroupFailed
);

// customer update
export const getDeleteCustomersGroup = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getDeleteCustomersGroup
);
export const getDeleteCustomersGroupLoading = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getDeleteCustomersGroupLoading
);
export const getDeleteCustomersGroupLoaded = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getDeleteCustomersGroupLoaded
);
export const getDeleteCustomersGroupFailed = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getDeleteCustomersGroupFailed
);


// customer count
export const getpagination = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getpagination
  );
  export const getcountLoading = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getcountLoading
  );
  export const getcountLoaded = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getcountLoaded
  );
  export const getcountFailed = createSelector(
    getCustomersGroupState,
    fromCustomersGroup.getcountFailed
  );
