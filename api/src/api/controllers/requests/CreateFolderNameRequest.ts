/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MinLength} from 'class-validator';

export class FolderNameRequest {
    @IsNotEmpty()
    @MinLength(4, {
        message: 'folder is minimum 4 character',
    })
    public folderName: string;

}
