/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty } from 'class-validator';

export class UpdateCouponRequest {

    @IsNotEmpty()
    public couponName: string;

    @IsNotEmpty()
    public couponCode: string;

    public couponType: number;

    public discount: number;

    public minimumPurchaseAmount: number;

    public maximumPurchaseAmount: number;

    public couponConjunction: number;

    public couponAppliesSales: number;

    public emailRestrictions: string;

    public applicableFor: number;

    public freeShipping: number;

    public startDate: string;

    public endDate: string;

    public maxUserPerCoupon: number;

    public noOfTimeCouponValidPerUser: number;

    public allQualifyingItemsApply: number;

    public appliedCartItemsCount: number;

    public productType: [];

    @IsNotEmpty()
    public status: number;

    }
