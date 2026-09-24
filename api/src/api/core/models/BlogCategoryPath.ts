/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { BlogCategory } from './BlogCategory';
@Entity('blog_category_path')
export class BlogCategoryPath extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'blog_category_path_id' })
    public blogCategoryPathId: number;
    @IsNotEmpty()
    @Column({ name: 'blog_category_id' })
    public blogCategoryId: number;
    @IsNotEmpty()
    @Column({ name: 'path_id' })
    public pathId: number;

    @Column({ name: 'level' })
    public level: number;

    @ManyToOne(type => BlogCategory, blogCategory => blogCategory.blogCategoryPath)
    @JoinColumn({ name: 'blog_category_id' })
    public blogCategory: BlogCategory;

    @ManyToOne(type => BlogCategory, category => category.path)
    @JoinColumn({ name: 'path_id' })
    public path: BlogCategory;
}
