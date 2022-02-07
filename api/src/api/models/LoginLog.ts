/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty, IsEmail } from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn
} from 'typeorm';

import {BaseModel} from './BaseModel';
import moment from 'moment';

@Entity('login_log')
export class LoginLog extends BaseModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @IsEmail()
    @Column({ name: 'email_id' })
    public emailId: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'ip_address' })
    public ipAddress: string;

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
