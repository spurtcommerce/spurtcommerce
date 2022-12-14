/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {type} from '../utility';
import {Action} from '@ngrx/store';
// model
import {ManufactureAddModel} from '../models/manufacture-Add.model';
import {ManufacturerUpdateModel} from '../models/manufacturer-Update.model';
import {ManufacturerListModel} from '../models/manufacture-list.model';
import {ManufacturerCountModel} from '../models/manufacturer-count.model';
import {ManufacturerDeleteModel} from '../models/manufacturer-delete.model';

export const ActionTypes = {

    DO_MANUFACTURE_UPDATE_ACTION: type('[brand] DO_MANUFACTURER'),
    DO_MANUFACTURE_UPDATE_SUCCESS: type('[brand] DO_MANUFACTURER_SUCCESS'),
    DO_MANUFACTURE_UPDATE_FAIL: type('[brand] DO_MANUFACTURER_FAIL'),

    DO_MANUFACTURE_ADD_ACTION: type('[brand] MANUFACTURE_ACTION'),
    DO_MANUFACTURE_ADD_SUCCESS: type('[brand] MANUFACTURE_SUCESS'),
    DO_MANUFACTURE_ADD_FAIL: type('[brand] MANUFACTURE_FAIL'),

    DO_MANUFACTURER_LIST_ACTION: type('[Brand] DOMANUFACTURER'),
    DO_MANUFACTURER_LIST_SUCCESS: type('[brand] DOMANUFACTURER Success'),
    DO_MANUFACTURER_LIST_FAIL: type('[brand] DOMANUFACTURER Fail'),

    DO_MANUFACTURER_COUNT_ACTION: type('[brand] DOMANUFACTURER COUNTACTION'),
    DO_MANUFACTURER_COUNT_SUCCESS: type('[brand] DOMANUFACTURER COUNTSUCCESS'),
    DO_MANUFACTURER_COUNT_FAIL: type('[brand] DOMANUFACTURER COUNTFAIL'),

    DO_MANUFACTURER_DELETE_ACTION: type('[brand] DOMANUFACTURER DELETE_ACTION'),
    DO_MANUFACTURER_DELETE_SUCCESS: type('[brand] DOMANUFACTURER DELETE_SUCCESS'),
    DO_MANUFACTURER_DELETE_FAIL: type('[brand] DOMANUFACTURER DELETE_FAIL'),

    DO_MANUFACTURER_BULK_DELETE_ACTION: type('[brand] DOMANUFACTURER BULK_DELETE_ACTION'),
    DO_MANUFACTURER_BULK_DELETE_SUCCESS: type('[brand] DOMANUFACTURER BULK_DELETE_SUCCESS'),
    DO_MANUFACTURER_BULK_DELETE_FAIL: type('[brand] DOMANUFACTURER BULK_DELETE_FAIL'),

    EXPORT_MANUFACTURER_ACTION: type('[brand] EXPORT_MANUFACTURER_ACTION'),
    EXPORT_MANUFACTURER_SUCCESS: type('[brand] EXPORT_MANUFACTURER_SUCCESS'),
    EXPORT_MANUFACTURER_FAIL: type('[brand] EXPORT_MANUFACTURER_FAIL'),
};

// Manufacturer add
export class DoAddManufacturerAction implements Action {
    type = ActionTypes.DO_MANUFACTURE_ADD_ACTION;

    constructor(public payload: ManufactureAddModel) {
    }
}

export class DoAddManufaeturerSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURE_ADD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddManufaeturerFail implements Action {
    type = ActionTypes.DO_MANUFACTURE_ADD_FAIL;

    constructor(public payload: any = null) {
    }
}

// Manufacturer update
export class DoManufacturerUpdateAction implements Action {
    type = ActionTypes.DO_MANUFACTURE_UPDATE_ACTION;

    constructor(public payload: ManufacturerUpdateModel) {
    }
}

export class DoManufacturerUpdataSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURE_UPDATE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoManufacturerUpdateFail implements Action {
    type = ActionTypes.DO_MANUFACTURE_UPDATE_FAIL;

    constructor(public payload: any = null) {
    }
}

// Manufacturer List
export class DOManufacturerListAction implements Action {
    type = ActionTypes.DO_MANUFACTURER_LIST_ACTION;

    constructor(public payload: ManufacturerListModel) {
    }
}

export class DoManufacturerListSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURER_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DomanufacturerListFail implements Action {
    type = ActionTypes.DO_MANUFACTURER_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

// Manufacturer count
export class DoManufactCountAction implements Action {
    type = ActionTypes.DO_MANUFACTURER_COUNT_ACTION;

    constructor(public payload: ManufacturerCountModel) {
    }
}

export class DoManufactCountSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURER_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DomanufactCountFail implements Action {
    type = ActionTypes.DO_MANUFACTURER_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}

//  Manufacturer delete
export class ManufacturerDeleteAction implements Action {
    type = ActionTypes.DO_MANUFACTURER_DELETE_ACTION;

    constructor(public payload: ManufacturerDeleteModel) {
    }
}

export class ManufacturerdeleteSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURER_DELETE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class ManufacturerDeleteFail implements Action {
    type = ActionTypes.DO_MANUFACTURER_DELETE_FAIL;

    constructor(public payload: any = null) {

    }
}

//  Manufacturer bulk delete
export class ManufacturerBulkDeleteAction implements Action {
    type = ActionTypes.DO_MANUFACTURER_BULK_DELETE_ACTION;

    constructor(public payload: any) {
    }
}

export class ManufacturerBulkDeleteSuccess implements Action {
    type = ActionTypes.DO_MANUFACTURER_BULK_DELETE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class ManufacturerBulkDeleteFail implements Action {
    type = ActionTypes.DO_MANUFACTURER_BULK_DELETE_FAIL;

    constructor(public payload: any = null) {

    }
}


//  Manufacturer export
export class ExportManufacturerAction implements Action {
    type = ActionTypes.EXPORT_MANUFACTURER_ACTION;
    constructor(public payload: any) {
    }
}

export class ExportManufacturerSuccess implements Action {
    type = ActionTypes.EXPORT_MANUFACTURER_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ExportManufacturerFail implements Action {
    type = ActionTypes.EXPORT_MANUFACTURER_FAIL;
    constructor(public payload: any = null) {

    }
}


export type Actions =
    DoAddManufacturerAction
    | DoAddManufaeturerSuccess
    | DoAddManufaeturerFail
    | DoManufacturerUpdateAction
    | DoManufacturerUpdataSuccess
    | DoManufacturerUpdateFail
    | DOManufacturerListAction
    | DoManufacturerListSuccess
    | DomanufacturerListFail
    | DoManufactCountAction
    | DoManufactCountSuccess
    | DomanufactCountFail
    | ManufacturerDeleteAction
    | ManufacturerdeleteSuccess
    | ManufacturerDeleteFail
    | ManufacturerBulkDeleteAction
    | ManufacturerBulkDeleteSuccess
    | ManufacturerBulkDeleteFail;
