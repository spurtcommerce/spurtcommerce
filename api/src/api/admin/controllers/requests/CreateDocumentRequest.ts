/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class CreateDocumentRequest {

    public id: number;

    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;

    public isMandatory: number;

    public maxUploadSize: number;

    @IsNotEmpty()
    public isActive: number;
}
