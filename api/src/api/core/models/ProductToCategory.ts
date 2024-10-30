/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { Category } from './CategoryModel';

@Entity('product_to_category')
export class ProductToCategory extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'product_to_category_id' })
    @IsNotEmpty()
    public productToCategoryId: number;
    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;

    @Exclude()
    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Product, product => product.productToCategory)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Category, category => category.productToCategory)
    @JoinColumn({ name: 'category_id' })
    public category: Category;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
