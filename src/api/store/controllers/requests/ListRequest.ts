/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';

export class ListRequest {

    public limit: number;

    public offset: number;

    public keyword: string;

    public categoryslug: string;

    public priceTo: string;

    public priceFrom: string;

    public price: string;

    public count: number;
}
