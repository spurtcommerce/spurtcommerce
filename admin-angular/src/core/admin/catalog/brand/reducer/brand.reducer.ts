/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/brand.actions';
// state
import {BrandState, BrandStateRecord} from './brand.state';
// model
import {ManufacturerListResponseModel} from '../models/manufacturer-List.response.model';
import {ManufacturerAddresponseModel} from '../models/manufacture-Add-Response.model';

export const initialState: BrandState = new BrandStateRecord() as unknown as BrandState;

export function reducer(state = initialState, {type, payload}: any): BrandState {
    if (!type) {
        return state;
    }
    switch (type) {

// <-------------MANUFACTURER LIST--------------> //

        case actions.ActionTypes.DO_MANUFACTURER_LIST_ACTION: {
            return Object.assign({}, state, {
                listLoading: true,
                listLoaded: false,
                listFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_LIST_SUCCESS: {
            let ManufacturerModel = {};
            if (payload.data) {
                ManufacturerModel = payload.data.map(_brand => {
                    const tempmanufacturerModel = new ManufacturerListResponseModel(_brand);
                    return tempmanufacturerModel;
                });
            }
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: true,
                listFailed: false,
                manufacturerList: ManufacturerModel,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_LIST_FAIL: {
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: true,
                listFailed: true
            });
        }

// <-------------ADD MANUFACTURER--------------> //

        case actions.ActionTypes.DO_MANUFACTURE_ADD_ACTION: {
            return Object.assign({}, state, {
                addLoading: true,
                addLoaded: false,
                addFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURE_ADD_SUCCESS: {
            const brandData = new ManufacturerAddresponseModel(payload.data);
            return Object.assign({}, state, {
                manufacturerAdd: brandData,
                addLoading: false,
                addLoaded: true,
                addFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURE_ADD_FAIL: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: false,
                addFailed: true,
            });
        }

// <-------------UPDATE MANUFACTURER--------------> //

        case actions.ActionTypes.DO_MANUFACTURE_UPDATE_ACTION: {
            return Object.assign({}, state, {
                updateLoading: true,
                updateLoaded: false,
                updateFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURE_UPDATE_FAIL: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: false,
                updateFailed: true,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURE_UPDATE_SUCCESS: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: true,
                updateFailed: false,
                manufacturerUpdate: payload
            });
        }

// <-------------DELETE MANUFACTURER--------------> //

        case actions.ActionTypes.DO_MANUFACTURER_DELETE_ACTION: {
            return Object.assign({}, state, {
                deleteLoading: true,
                deleteLoaded: false,
                deleteFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: true,
                deleteFailed: false,
                manufacturerDelete: payload
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_DELETE_FAIL: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: false,
                deleteFailed: true,
            });
        }

// <-------------MANUFACTURER LIST COUNT--------------> //

        case actions.ActionTypes.DO_MANUFACTURER_COUNT_ACTION: {
            return Object.assign({}, state, {
                countLoading: true,
                countLoaded: false,
                countFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: false,
                manufactureCount: payload.data

            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_COUNT_FAIL: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: true
            });
        }

// <-------------MANUFACTURER LIST BULK DELETE--------------> //

        case actions.ActionTypes.DO_MANUFACTURER_BULK_DELETE_ACTION: {
            return Object.assign({}, state, {
                bulkDeleteLoading: true,
                bulkDeleteLoaded: false,
                bulkDeleteFailed: false,
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_BULK_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                bulkDeleteLoading: false,
                bulkDeleteLoaded: true,
                bulkDeleteFailed: false,
                bulkDelete: payload
            });
        }

        case actions.ActionTypes.DO_MANUFACTURER_BULK_DELETE_FAIL: {
            return Object.assign({}, state, {
                bulkDeleteLoading: false,
                bulkDeleteLoaded: false,
                bulkDeleteFailed: true,
            });
        }


        default: {
            return state;
        }
    }
}

// Manufacturer add
export const getManufacturerAdd = (state: BrandState) => state.manufacturerAdd;
export const getManufacturerAddLoading = (state: BrandState) => state.addLoading;
export const getManufacturerAddLoaded = (state: BrandState) => state.addLoaded;
export const getManufacturerAddFailed = (state: BrandState) => state.addFailed;

// Manufacturer update
export const getManufacturerUpdate = (state: BrandState) => state.manufacturerUpdate;
export const getManufacturerUpdateLoading = (state: BrandState) => state.updateLoading;
export const getManufacturerUpdateLoaded = (state: BrandState) => state.updateLoaded;
export const getManufacturerUpdateFailed = (state: BrandState) => state.updateFailed;

// Manufacturer list
export const getManufacturerList = (state: BrandState) => state.manufacturerList;
export const getManufacturerListLoading = (state: BrandState) => state.listLoading;
export const getManufactuerListLoaded = (state: BrandState) => state.listLoaded;
export const getmanufacturerListFailed = (state: BrandState) => state.listFailed;

// Manufacturer count
export const getManufacturerCount = (state: BrandState) => state.manufactureCount;
export const getManufacturerCountLoading = (state: BrandState) => state.countLoading;
export const getManufacturerCountLoaded = (state: BrandState) => state.countLoaded;
export const getManufacturerCountFailed = (state: BrandState) => state.countFailed;

// Manufacturer delete
export const getManufacturerDelete = (state: BrandState) => state.manufacturerDelete;
export const getManufacturerDeleteLoading = (state: BrandState) => state.deleteLoading;
export const getManufacturerDeleteLoaded = (state: BrandState) => state.deleteLoaded;
export const getManufacturerDeleteFailed = (state: BrandState) => state.deleteFailed;

// Manufacturer bulk delete
export const bulkDelete = (state: BrandState) => state.bulkDelete;
export const bulkDeleteLoading = (state: BrandState) => state.bulkDeleteLoading;
export const bulkDeleteLoaded = (state: BrandState) => state.bulkDeleteLoaded;
export const deleteFailed = (state: BrandState) => state.deleteFailed;



