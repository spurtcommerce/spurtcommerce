/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class SellerListRequest {


    public limit: number;
    public offset: number;
    public name: string;
    public email: string;
    public status: number;
    public count: number;
    public vendorPrefixId: string;
    public keyword: string;
    public vendorName: string;
    public companyName: string;

    constructor(sellerListRequest: any) {
        this.limit = sellerListRequest.limit || 0;
        this.offset = sellerListRequest.offset || 0;
        this.name = sellerListRequest.name || '';
        this.email = sellerListRequest.email || '';
        this.status = sellerListRequest.status || '';
        this.count = sellerListRequest.count || 0;
        this.keyword = sellerListRequest.keyword || '';
        this.vendorName = sellerListRequest.vendorName || '';
        this.companyName = sellerListRequest.companyName || '';
        this.vendorPrefixId = sellerListRequest.vendorId || '';
    }
}
