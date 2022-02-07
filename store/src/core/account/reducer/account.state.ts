/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Map, Record} from 'immutable';
import {OrderHistoryResponseModel} from '../models/order-history-response.model';

export interface AccountState extends Map<string, any> {
    newPassword: any;
    orderHistory: Array<OrderHistoryResponseModel>;
    orderHistoryCount: number;
    orderHistoryDetail: any;
    orderHistoryDetailLoading: boolean;
    orderHistoryDetailLoaded: boolean;
    orderHistoryDetailFailed: boolean;

    historyListLoading: boolean;
    historyListLoaded: boolean;
    historyListFailed: boolean;

    changepasswordLoading: boolean;
    changepasswordLoaded: boolean;
    changepasswordFailed: boolean;

    edited: any;
    editProfileLoading: boolean;
    editProfileLoaded: boolean;
    editProfileFailed: boolean;
}

export const accountrecord = Record({
        newPassword: {},
        orderHistory: [],
        orderHistoryCount: 0,
        orderHistoryDetail: {},
        addresslist: {},
        updateCustomerAddress: {},
        deleteCustomerAddress: {},

        orderHistoryDetailLoading: false,
        orderHistoryDetailLoaded: false,
        orderHistoryDetailFailed: false,

        historyListLoading: false,
        historyListLoaded: false,
        historyListFailed: false,

        changepasswordLoading: false,
        changepasswordLoaded: false,
        changepasswordFailed: false,

        editProfileLoading: false,
        editProfileLoaded: false,
        editProfileFailed: false,
    })
;
