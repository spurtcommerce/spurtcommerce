/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class CreateCustomerContact {

    public firstName: string;

    public lastName: string;

    public email: string;

    public phoneNumber: string;

    public description?: string;

    public customerId?: number;

    public isActive: number;

    public shippingAddress1: string;

    public shippingAddress2?: string;

    public shippingCity?: string;

    public shippingPostcode?: string;

    public shippingCountryId?: number;

    public shippingZoneId?: number;

    public shippingFirstName?: string;

    public shippingLastName?: string;
}
