/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {
    Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn,
} from 'typeorm';
import {BaseModel} from './BaseModel';
import moment = require('moment/moment');
import {Exclude} from 'class-transformer';

@Entity('product_view_log')
export class ProductViewLog extends BaseModel {
    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'customer_id'})
    public customerId: number;

    @Column({name: 'first_name'})
    public firstName: string;

    @Exclude()
    @Column({name: 'last_name'})
    public lastName: string;

    @Column({name: 'username'})
    public username: string;

    @Column({name: 'email'})
    public email: string;

    @Exclude()
    @Column({name: 'mobile'})
    public mobileNumber: number;

    @Column({name: 'address'})
    public address: string;

    @Exclude()
    @Column({name: 'is_active'})
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
