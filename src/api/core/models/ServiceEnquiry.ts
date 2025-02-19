/*
 * spurtcommerce API
 * version 5.1.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';
@Entity('service_enquiry')
export class ServiceEnquiry extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'enquiry_id' })
    public enquiryId: number;
    @IsNotEmpty()
    @Column({ name: 'service_id' })
    public serviceId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;
    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'mobile' })
    public mobile: number;
    @IsNotEmpty()
    @Column({ name: 'comments' })
    public comments: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
