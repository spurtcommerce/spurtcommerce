/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';
import { BlogCategoryPath } from './BlogCategoryPath';
// import { BlogCategoryTranslation } from '../models/BlogCategoryTranslation';
@Entity('blog_category')
export class BlogCategory extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'blog_category_id' })
    public blogCategoryId: number;
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

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'category_slug' })
    public categorySlug: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'category_description' })
    public categoryDescription: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany(type => BlogCategoryPath, blogCategoryPath => blogCategoryPath.blogCategory)
    public blogCategoryPath: BlogCategoryPath[];

    @OneToMany(type => BlogCategoryPath, blogCategoryPath => blogCategoryPath.path)
    public path: BlogCategoryPath[];

    // @OneToMany(type => BlogCategoryTranslation, blogCategoryTranslation => blogCategoryTranslation.blogcategory)
    // public blogCategoryTranslation: BlogCategoryTranslation;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
