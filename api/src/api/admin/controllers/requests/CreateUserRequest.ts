/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, IsEmail, MinLength, Matches} from 'class-validator';

export class CreateUser {

    @IsEmail({}, {
        message: 'Please provide username as emailId',
    })
    @IsNotEmpty({
        message: 'username is required',
    })
    @MaxLength(96, {
        message: 'username should be maximum 96 character',
    })
    public username: string;
    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, {message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
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
    @MaxLength(96, {
        message: 'email should be maximum 96 character',
    })
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
