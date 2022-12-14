/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ManufacturerDeleteModel {
    public manufacturerId: number;

    constructor(manufacturerdeleteForm: any) {
        this.manufacturerId = manufacturerdeleteForm.manufacturerId || '';
    }
}
