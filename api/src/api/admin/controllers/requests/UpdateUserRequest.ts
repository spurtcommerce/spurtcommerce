/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, IsEmail} from 'class-validator';

export class UpdateUserRequest {

    @IsEmail({}, {
        message: 'Please provide username as emailId',
    })
    @IsNotEmpty({
        message: 'username is required',
    })
    public username: string;

    public password: string;

    @MaxLength(32, {
        message: 'First name is maximum 32 character',
    })
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;

    @MaxLength(32, {
        message: 'Last name is maximum 32 character',
    })
    @IsNotEmpty({
        message: 'Last name is required',
    })
    public lastName: string;

    @IsEmail({}, {
        message: 'Please provide valid email Id',
    })
    @IsNotEmpty({
        message: 'Email - Id is required',
    })
    public email: string;

    @IsNotEmpty({
        message: 'User Group Id is required',
    })
    public userGroupId: number;
}
