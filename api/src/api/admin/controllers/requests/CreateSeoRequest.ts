/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { MaxLength } from 'class-validator';

export class AddSeoRequest {

    @MaxLength(70, {
        message: 'metatagTitle should be maximum 70 characters',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    })
    public metaTagDescription: string;
    @MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;
}
