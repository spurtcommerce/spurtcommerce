/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('order_fulfillment_status')
export class OrderFullfillmentStatus extends BaseModel {

    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'priority' })
    public priority: number;

    @Column({ name: 'default_status' })
    public defaultStatus: number;

    @Column({ name: 'is_admin' })
    public isAdmin: number;

    @Column({ name: 'is_vendor' })
    public isVendor: number;

    @Column({ name: 'is_buyer' })
    public isBuyer: number;

    @Column({ name: 'is_api' })
    public isApi: number;

    @Column({ name: 'color_code' })
    public colorCode: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
