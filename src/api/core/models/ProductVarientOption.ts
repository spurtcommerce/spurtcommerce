/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import { Product } from '../../core/models/ProductModel';
import { Sku } from '../../core/models/SkuModel';
import { ProductVarientOptionDetail } from './ProductVarientOptionDetail';
import { ProductVarientOptionImage } from './ProductVarientOptionImage';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('product_varient_option')
export class ProductVarientOption extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'varient_name' })
    public varientName: string;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToOne(type => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @OneToOne(type => Sku, { cascade: true })
    @JoinColumn({ name: 'sku_id' })
    public skuDetail: Sku;

    @OneToMany(type => ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.productVarientOption, { cascade: true })
    public productVarientOptionDetail: ProductVarientOptionDetail;

    @OneToMany(type => ProductVarientOptionImage, productVarientOptionImage => productVarientOptionImage.productVarientOption)
    public image: ProductVarientOptionImage[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
