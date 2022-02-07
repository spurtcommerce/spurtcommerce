/*
 * spurtcommerce community API
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {IsNotEmpty} from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import {Exclude} from 'class-transformer';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {Product} from './ProductModel';

@Entity('product_image')
export class ProductImage extends BaseModel {
    @PrimaryGeneratedColumn({name: 'product_image_id'})
    @IsNotEmpty()
    public productImageId: number;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'image'})
    public image: string;

    @Column({name: 'container_name'})
    public containerName: string;

    @Exclude()
    @Column({name: 'sort_order'})
    public sortOrder: number;

    @Column({name: 'default_image'})
    public defaultImage: number;

    @Exclude()
    @Column({name: 'is_active'})
    public isActive: number;

    @ManyToOne(type => Product, product => product.productImage)
    @JoinColumn({name: 'product_id'})
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
