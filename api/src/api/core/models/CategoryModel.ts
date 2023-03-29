/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ProductToCategory } from './ProductToCategory';
import { CategoryPath } from './CategoryPath';
import { IsNotEmpty } from 'class-validator';
@Entity('category')
export class Category extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'category_id' })
    public categoryId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;
    @IsNotEmpty()
    @Column({ name: 'parent_int' })
    public parentInt: number;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'category_slug' })
    public categorySlug: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'category_description' })
    public categoryDescription: string;

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.category)
    public productToCategory: ProductToCategory[];

    @OneToMany(type => CategoryPath, categoryPath => categoryPath.category)
    public category: CategoryPath[];

    @OneToMany(type => CategoryPath, categoryPath => categoryPath.path)
    public path: CategoryPath[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
