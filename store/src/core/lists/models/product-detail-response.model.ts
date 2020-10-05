/*
 * spurtcommerce
 * version 1.0
* www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */



export class ProductDetailResponseModel {
    public Category: Array<any>;
    public dateAvailable: string;
    public description: string;
    public location: string;
    public manufacturerId: string;
    public metaTagTitle: string;
    public minimumQuantity: string;
    public name: string;
    public price: string;
    public productId: string;
    public productImage: Array<any>;
    public quantity: string;
    public shipping: string;
    public sku: string;
    public sortOrder: string;
    public stockStatusId: string;
    public subtractStock: string;
    public upc: string;
    public wishListStatus: number;

    constructor(listResponse: any) {
        this.description = listResponse.description || '';
        this.Category = listResponse.Category || [];
        this.location = listResponse.location || '';
        this.dateAvailable = listResponse.dateAvailable || '';
        this.manufacturerId = listResponse.manufacturerId || '';
        this.metaTagTitle = listResponse.metaTagTitle || '';
        this.minimumQuantity = listResponse.minimumQuantity || '';
        this.name = listResponse.name || '';
        this.price = listResponse.price || '';
        this.productId = listResponse.productId || '';
        this.productImage = listResponse.productImage || [];
        this.quantity = listResponse.quantity || '';
        this.shipping = listResponse.shipping || '';
        this.sku = listResponse.sku || '';
        this.sortOrder = listResponse.sortOrder || '';
        this.stockStatusId = listResponse.stockStatusId || '';
        this.subtractStock = listResponse.subtractStock || '';
        this.upc = listResponse.upc || '';
        this.wishListStatus = listResponse.wishListStatus || 0;
    }
}
