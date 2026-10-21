/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseModel } from '../../../../src/api/core/models/BaseModel';
import moment from 'moment';
import { Product } from '../../../../src/api/core/models/ProductModel';
import { IsNotEmpty } from 'class-validator';

@Entity('product_related')
export class ProductRelated extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'related_id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'related_product_id' })
    public relatedProductId: number;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToOne(type => Product)
    @JoinColumn({ name: 'related_product_id' })
    public productRelated: Product;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
