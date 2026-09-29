/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
/* tslint:disable:max-classes-per-file */

// import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

class ProductDetail {
    public productId: number;
    public productPrice: number;
    public tirePrice: number;
    public quantity: number;
    public skuId: string;
    public type: string;

}
export class CreateCartRequest {

    public optionName: string;

    public optionValueName: string;

    public varientName: string;

    public productVarientOptionId: string;

    public cartDetails: ProductDetail[];
}
