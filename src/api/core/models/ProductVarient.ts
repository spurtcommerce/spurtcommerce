/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import { Product } from '../../core/models/ProductModel';
import { Variant } from './Variant';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('product_varient')
export class ProductVarient extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'varients_id' })
    public variantId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToOne(type => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Variant, variant => variant.productVarient)
    @JoinColumn({ name: 'varients_id' })
    public varients: Variant;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
