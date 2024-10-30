/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {
    Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Customer } from './Customer';
import { Product } from './ProductModel';

@Entity('product_view_log')
export class ProductViewLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Exclude()
    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'username' })
    public username: string;
    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @Exclude()
    @Column({ name: 'mobile' })
    public mobileNumber: number;

    @Column({ name: 'address' })
    public address: string;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Customer, customer => customer.productviewlog)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @ManyToOne(type => Product, product => product.productviewlog)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
