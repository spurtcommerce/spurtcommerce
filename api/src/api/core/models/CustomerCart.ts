/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { IsNotEmpty } from 'class-validator';
import { Customer } from './Customer';

@Entity('customer_cart')
export class CustomerCart extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;
    @Column({ name: 'quantity' })
    public quantity: string;

    @Column({ name: 'product_price' })
    public productPrice: string;

    @Column({ name: 'tire_price' })
    public tirePrice: string;

    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @Column({ name: 'vendor_id' })
    public vendorId: string;

    @Column({ name: 'ip'})
    public ip: string;

    @Column({ name: 'product_varient_option_id' })
    public productVarientOptionId: string;

    @ManyToOne(type => Product, product => product.cart)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(() => Customer, customer => customer.customerCart)
    @JoinColumn({ name: 'customer_id'})
    public customer: Customer;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
