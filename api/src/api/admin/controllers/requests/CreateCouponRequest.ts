/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class CreateCouponRequest {

    @MaxLength(255, {
        message: 'coupon name should be maximum 255 characters',
    })
    @IsNotEmpty({
        message: 'coupon name is required',
    })
    public couponName: string;
    @MaxLength(30, {
        message: 'coupon code should be maximum 32 characters',
    })
    @IsNotEmpty({
        message: 'coupon code is required',
    })
    public couponCode: string;

    @IsNotEmpty({
        message: 'coupon type is required',
    })
    public couponType: number;

    @IsNotEmpty({
        message: 'discount is required',
    })
    public discount: number;

    @IsNotEmpty({
        message: 'minimum purchase amount is required',
    })
    public minimumPurchaseAmount: number;

    @IsNotEmpty({
        message: 'maximum purchase amount is required',
    })
    public maximumPurchaseAmount: number;

    public couponConjunction: number;

    public couponAppliesSales: number;
    @MaxLength(255, {
        message: 'email restrictions should be maximum 255 characters',
    })
    public emailRestrictions: string;

    public applicableFor: number;

    public freeShipping: number;

    public startDate: string;

    public endDate: string;

    @IsNotEmpty({
        message: 'maxUserPerCoupon is required',
    })
    public maxUserPerCoupon: number;

    @IsNotEmpty({
        message: 'noOfTimeCouponValidPerUser is required',
    })
    public noOfTimeCouponValidPerUser: number;

    public allQualifyingItemsApply: number;

    public appliedCartItemsCount: number;

    public productType: [];

    @IsNotEmpty({
        message: 'status is required',
    })
    public status: number;

}
