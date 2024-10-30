/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('order_total')
export class OrderTotal extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    public order_total_id: number;

    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;

    @IsNotEmpty()
    @Column({ name: 'value' })
    public value: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
