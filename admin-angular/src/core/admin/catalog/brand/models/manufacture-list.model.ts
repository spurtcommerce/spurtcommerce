/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class ManufacturerListModel {

    public limit: number;
    public offset: number;
    public keyword: string;
    public count: boolean;
    public status: boolean;

    constructor(manufactuerListFrom: any) {
        this.limit = manufactuerListFrom.limit || 0;
        this.offset = manufactuerListFrom.offset || 0;
        this.keyword = manufactuerListFrom.keyword || '';
        this.count = manufactuerListFrom.count || false;
        this.status = manufactuerListFrom.status || '';
    }
}
