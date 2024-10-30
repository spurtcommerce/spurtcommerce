/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { IsNotEmpty } from 'class-validator';

@Entity('product_video')
export class ProductVideo extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;
    @IsNotEmpty()
    @Column({ name: 'path' })
    public path: string;
    @IsNotEmpty()
    @Column({ name: 'type' })
    public type: string;

    @ManyToOne(type => Product, product => product.productVideo)
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
