/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CustomersGroupListResponseModel {

    public limit: number;
    public offset: number;
    public keyword: number;
    public groupName: string;
    public count: string;
    public status: string;


    constructor(customersGroupListResponseModel: any) {
        this.limit = customersGroupListResponseModel.limit || '';
        this.offset = customersGroupListResponseModel.offset || '';
        this.keyword = customersGroupListResponseModel.keyword || '';
        this.count = customersGroupListResponseModel.count || '';
        this.groupName = customersGroupListResponseModel.groupName || '';
        this.status = '';
    }
}
