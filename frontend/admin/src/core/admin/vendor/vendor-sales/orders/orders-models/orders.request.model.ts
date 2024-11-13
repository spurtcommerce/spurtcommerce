/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class OrdersListRequest {


    public limit: number;
    public offset: number;
    public customerName: string;
    public startDate: string;
    public count: number;
    public keyUp:boolean;
    public keyword:string;
    orderPrefixId:any;

    constructor(ordersListRequest: any) {
        this.limit = ordersListRequest.limit || 0;
        this.offset = ordersListRequest.offset || 0;
        this.customerName	 = ordersListRequest.customerName	 || '';
        this.orderPrefixId = ordersListRequest.orderPrefixId || '';
        this.startDate = ordersListRequest.startDate || '';
        this.count = ordersListRequest.count || 0;
        this.keyUp = ordersListRequest.keyUp;
        this.keyword=ordersListRequest.keyword
    }
}
