/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromAuth from './account.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.account;
export const getNewPassword = createSelector(getState, fromAuth.getNewPassword);
export const getOrderHistoryList = createSelector(getState, fromAuth.getorderHistoryList);
export const getorderHistoryCount = createSelector(getState, fromAuth.getorderHistoryCount);

export const getOrderHistoryDetail = createSelector(getState, fromAuth.getorderHistoryDetail);
export const getOrderHistoryDetailLoaded = createSelector(getState, fromAuth.getOrderHistoryDetailLoaded);
export const getOrderHistoryDetailLoading = createSelector(getState, fromAuth.getOrderHistoryDetailLoading);
export const getOrderHistoryDetailFailed = createSelector(getState, fromAuth.getOrderHistoryDetailFailed);

export const getHistoryListLoaded = createSelector(getState, fromAuth.getHistoryListLoaded);
export const getHistoryListLoading = createSelector(getState, fromAuth.getHistoryListLoading);
export const getHistoryListFailed = createSelector(getState, fromAuth.getHistoryListFailed);

export const getChangepasswordLoading = createSelector(getState, fromAuth.getChangepasswordLoading);
export const getChangepasswordLoaded = createSelector(getState, fromAuth.getChangepasswordLoaded);
export const getChangepasswordFailed = createSelector(getState, fromAuth.getChangepasswordFailed);

export const getEdittedStatus = createSelector(getState, fromAuth.getEdittedStatus);
export const getEditProfileLoading = createSelector(getState, fromAuth.getEditProfileLoading);
export const getEditProfileLoaded = createSelector(getState, fromAuth.getEditProfileLoaded);
export const getEditProfileFailed = createSelector(getState, fromAuth.getEditProfileFailed);


