/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CustomersGroupListResponseModel {

    public limit: number;
    public offset: number;
    public keyword: number;

    public count: string;
    public status: string;




    constructor(customersGroupListResponseModel: any) {
        this.limit = customersGroupListResponseModel.limit || '';
        this.offset = customersGroupListResponseModel.offset || '';
        this.keyword = customersGroupListResponseModel.keyword || '';
        this.count = customersGroupListResponseModel.count || '';
        this.status = '';



    }
}
