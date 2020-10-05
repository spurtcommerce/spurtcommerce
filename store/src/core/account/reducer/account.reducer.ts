/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/account.action';
import {AccountState, accountrecord} from './account.state';
import {OrderHistoryResponseModel} from '../models/order-history-response.model';

export const initialState: AccountState = new accountrecord() as unknown as AccountState;


export function  reducer(state = initialState, {type, payload}: any): AccountState {

    if (!type) {

        return state;
    }
    switch (type) {
        case actions.ActionTypes.DO_CHANGE_PASSWORD:
        {
            return Object.assign({}, state, {
                changepasswordLoading: true,
                changepasswordLoaded: false,
                changepasswordFailed: false,
            });
        }

        case actions.ActionTypes.CHANGE_PASSWORD_SUCCESS: {

            return Object.assign({}, state, {
                newPassword: payload,
                changepasswordLoading: false,
                changepasswordLoaded: true,
                changepasswordFailed: false,
            });
        }
        case actions.ActionTypes.CHANGE_PASSWORD_FAIL:
        {
            return Object.assign({}, state, {
                changepasswordLoading: false,
                changepasswordLoaded: true,
                changepasswordFailed: true,
            });
        }

        case actions.ActionTypes.EDIT_PROFILE:
        {
            return Object.assign({}, state, {
                editProfileLoading: true,
                editProfileLoaded: false,
                editProfileFailed: false,
            });
        }

        case actions.ActionTypes.EDIT_PROFILE_SUCCESS: {
            return Object.assign({}, state, {
                edited: payload,
                editProfileLoading: false,
                editProfileLoaded: true,
                editProfileFailed: false,
            });
        }
        case actions.ActionTypes.EDIT_PROFILE_FAIL:
        {
            return Object.assign({}, state, {
                editProfileLoading: false,
                editProfileLoaded: true,
                editProfileFailed: true,
            });
        }
        case actions.ActionTypes.GET_ORDER_HISTORY:
        {

            return Object.assign({}, state, {
                historyListLoading: true,
                historyListLoaded: false,
                historyListFailed: false,
            });
        }

        case actions.ActionTypes.GET_ORDER_HISTORY_SUCCESS: {
            const tempHistory = payload.data.map(history => {
               const historyModel = new OrderHistoryResponseModel(history);
                return historyModel;
            });
            return Object.assign({}, state, {
                orderHistory: tempHistory,
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_HISTORY_SUCCESS_COUNT: {
            return Object.assign({}, state, {
                orderHistoryCount: payload.data,
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_HISTORY_FAIL:
        {
            return Object.assign({}, state, {
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: true,
            });
        }
        case actions.ActionTypes.GET_ORDER_DETAIL:
        {

            return Object.assign({}, state, {
                orderHistoryDetail: {},
                orderHistoryDetailLoading: true,
                orderHistoryDetailLoaded: false,
                orderHistoryDetailFailed: false,
            });
        }
        case actions.ActionTypes.CLEAR_ORDER_DETAIL:
        {

            return Object.assign({}, state, {
                orderHistoryDetail: {},
            });
        }

        case actions.ActionTypes.GET_ORDER_DETAIL_SUCCESS: {
            return Object.assign({}, state, {
                orderHistoryDetail: payload.data,
                orderHistoryDetailLoading: false,
                orderHistoryDetailLoaded: true,
                orderHistoryDetailFailed: false,
            });
        }
        case actions.ActionTypes.CHANGE_PASSWORD_FAIL:
        {
            return Object.assign({}, state, {
                ratingLoading: false,
                ratingLoaded: false,
                ratingFailed: true,
            });
        }
        default: {
            return state;
        }
    }
}

export const getNewPassword = (state: AccountState) => state.newPassword;
export const getorderHistoryList = (state: AccountState) => state.orderHistory;
export const getorderHistoryCount = (state: AccountState) => state.orderHistoryCount;

export const getorderHistoryDetail = (state: AccountState) => state.orderHistoryDetail;
export const getOrderHistoryDetailLoading = (state: AccountState) => state.orderHistoryDetailLoading;
export const getOrderHistoryDetailLoaded = (state: AccountState) => state.orderHistoryDetailLoaded;
export const getOrderHistoryDetailFailed = (state: AccountState) => state.orderHistoryDetailFailed;

export const getHistoryListLoading = (state: AccountState) => state.historyListLoading;
export const getHistoryListLoaded = (state: AccountState) => state.historyListLoaded;
export const getHistoryListFailed = (state: AccountState) => state.historyListFailed;

export const getChangepasswordLoading = (state: AccountState) => state.changepasswordLoading;
export const getChangepasswordLoaded = (state: AccountState) => state.changepasswordLoaded;
export const getChangepasswordFailed = (state: AccountState) => state.changepasswordFailed;

export const getEdittedStatus = (state: AccountState) => state.edited;
export const getEditProfileLoading = (state: AccountState) => state.editProfileLoading;
export const getEditProfileLoaded = (state: AccountState) => state.editProfileLoaded;
export const getEditProfileFailed = (state: AccountState) => state.editProfileFailed;

