/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Map, Record} from 'immutable';
// model
import {ManufacturerListResponseModel} from '../models/manufacturer-List.response.model';

export interface BrandState extends Map<string, any> {
    manufacturerList: ManufacturerListResponseModel;
    manufactureCount: number;
    manufacturerDelete: any;
    manufacturerAdd: any;
    manufacturerUpdate: any;

    listLoading: boolean;
    listLoaded: boolean;
    listFailed: boolean;


    countLoading: boolean;
    countLoaded: boolean;
    countFailed: boolean;

    addLoading: boolean;
    addLoaded: boolean;
    addFailed: boolean;

    updateLoading: boolean;
    updateLoaded: boolean;
    updateFailed: boolean;

    deleteLoading: boolean;
    deleteLoaded: boolean;
    deleteFailed: boolean;

    bulkDeleteLoading: boolean;
    bulkDeleteLoaded: boolean;
    bulkDeleteFailed: boolean;
    bulkDelete: any;


}

export const BrandStateRecord = Record({
    manufacturerAdd: {},
    manufacturerUpdate: {},
    manufacturerList: {},
    manufactureCount: 0,
    manufacturerDelete: {},
    manufacturerLists: {},

    listLoading: false,
    listLoaded: false,
    listFailed: false,

    countLoading: false,
    countLoaded: false,
    countFailed: false,

    addLoading: false,
    addLoaded: false,
    addFailed: false,

    updateLoading: false,
    updateLoaded: false,
    updateFailed: false,

    deleteLoading: false,
    deleteLoaded: false,
    deleteFailed: false,

    bulkDeleteLoading: false,
    bulkDeleteLoaded: false,
    bulkDeleteFailed: false,
    bulkDelete: {}
});
