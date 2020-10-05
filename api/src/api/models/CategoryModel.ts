/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {ProductToCategory} from './ProductToCategory';
@Entity('category')
export class Category extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'category_id' })
    public categoryId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'parent_int' })
    public parentInt: number;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.category)
    public productToCategory: ProductToCategory[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
