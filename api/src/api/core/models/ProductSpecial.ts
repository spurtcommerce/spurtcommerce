/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
import { Product } from './ProductModel';
@Entity('product_special')
export class ProductSpecial extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'product_special_id' })
    public productSpecialId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @Column({ name: 'customer_group_id' })
    public customerGroupId: number;
    @IsNotEmpty()
    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'priority' })
    public priority: number;
    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @Column({ name: 'date_start' })
    public dateStart: Date;

    @Column({ name: 'date_end' })
    public dateEnd: Date;

    @ManyToOne(type => Product, product => product.productSpecial)
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
