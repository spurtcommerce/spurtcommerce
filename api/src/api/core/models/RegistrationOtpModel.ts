/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('registration_user_otp')
export class RegistrationOtp extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'otp_id' })
    public id: number;

    @Column({ name: 'email_id' })
    public emailId: string;

    @Column({ name: 'otp' })
    public otp: number;

    // 1-SELLER, 2-BUYER
    @Column({ name: 'user_type' })
    public userType: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
