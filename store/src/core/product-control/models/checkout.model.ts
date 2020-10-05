/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class CheckoutProductModel {
    public product: any = [];

    constructor(productRequest: any) {
        for (let i = 0; i < productRequest.length; i++) {
            const details: any = {};
            details.productId = productRequest[i].productId || '';
            details.quantity = productRequest[i].productCount || '';
                let tempPrice: any;
                tempPrice = productRequest[i]._totalOptions + (+productRequest[i].price);
                details.price = tempPrice || '';
            details.model = productRequest[i].metaTagTitle || '';
            details.name = productRequest[i].name || '';
            this.product.push(details);
        }
    }
}

export class CheckoutModel {
    public productDetails: any;
    public shippingFirstName: any;
    public shippingLastName: any;
    public shippingCompany: any;
    public shippingAddress_1: any;
    public shippingAddress_2: any;
    public shippingCity: any;
    public shippingPostCode: any;
    public shippingCountry: any;
    public shippingZone: any;
    public shippingAddressFormat: any;
    public phoneNumber: any;
    public emailId: any;

    constructor(checkoutRequest: any) {
        this.shippingFirstName = checkoutRequest.firstName || '';
        this.shippingLastName = checkoutRequest.lastName || '';
        this.shippingCompany = checkoutRequest.company || '';
        this.shippingAddress_1 = checkoutRequest.address || '';
        this.shippingAddress_2 = checkoutRequest.addressLine || '';
        this.shippingCity = checkoutRequest.city || '';
        this.shippingPostCode = checkoutRequest.zip || '';
        this.shippingCountry = checkoutRequest.country || '';
        this.shippingZone = checkoutRequest.state || '';
        this.phoneNumber = checkoutRequest.phone || '';
        this.shippingAddressFormat = '';
        this.emailId = checkoutRequest.email || '';
        this.productDetails = new CheckoutProductModel(checkoutRequest.productDetail);
    }
}



