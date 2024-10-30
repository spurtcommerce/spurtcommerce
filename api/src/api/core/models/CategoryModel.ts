/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ProductToCategory } from './ProductToCategory';
import { VendorCategory } from './VendorCategory';
import { CategoryPath } from './CategoryPath';
import { IsNotEmpty } from 'class-validator';
import { VendorGroupCategory } from './VendorGroupCategory';
import { CategoryTranslation } from './CategoryTranslation';
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

    @Column({ name: 'parent_int' })
    public parentInt: number;
    @IsNotEmpty()
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

    @OneToMany((type) => CategoryTranslation, categoryTranslation => categoryTranslation.category)
    public categoryTranslation: CategoryTranslation[];

    @OneToMany(type => VendorCategory, vendorCategory => vendorCategory.category)
    public vendorCategory: VendorCategory[];

    @OneToMany(type => CategoryPath, categoryPath => categoryPath.category)
    public category: CategoryPath[];

    @OneToMany(type => CategoryPath, categoryPath => categoryPath.path)
    public path: CategoryPath[];

    @OneToMany(type => VendorGroupCategory, vendorGroupCategory => vendorGroupCategory.category)
    public vendorGroupCategory: VendorGroupCategory[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
