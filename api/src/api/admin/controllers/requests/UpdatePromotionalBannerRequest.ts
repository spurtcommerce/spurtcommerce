/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class UpdatePromotionalBanner {

    @IsNotEmpty()
    public bannerId: number;

    @IsNotEmpty()
    public title: string;

    public content: string;

    public image: string;

    @IsNotEmpty()
    public bannerLinkType: string;

    public expireDate: string;

    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;

    public position: number;
    @IsNotEmpty()
    public status: number;

    public refId: [];
}
