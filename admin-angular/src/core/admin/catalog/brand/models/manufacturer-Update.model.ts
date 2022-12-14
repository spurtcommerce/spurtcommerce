/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ManufacturerUpdateModel {


    public manufacturerId: number;
    public name: string;
    public image: string;
    public sortOrder: number;
    public status: number;

    constructor(manufacturerUpdate: any) {
        this.name = manufacturerUpdate.name || '';
        this.manufacturerId = manufacturerUpdate.manufacturerId || 0;
        this.image = manufacturerUpdate.image || '';
        this.sortOrder = manufacturerUpdate.sortOrder || 0;
        this.status = manufacturerUpdate.status || 0;
    }
}
