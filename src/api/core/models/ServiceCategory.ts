/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ServiceToCategory } from './ServiceToCategory';
import { ServiceCategoryPath } from './ServiceCategoryPath';
import { IsNotEmpty } from 'class-validator';

@Entity('service_category')
export class ServiceCategory extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'service_category_id' })
    public serviceCategoryId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

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

    @OneToMany(type => ServiceToCategory, serviceToCategory => serviceToCategory.serviceCategory)
    public serviceToCategory: ServiceToCategory[];

    @OneToMany(type => ServiceCategoryPath, serviceCategoryPath => serviceCategoryPath.category)
    public category: ServiceCategoryPath[];

    @OneToMany(type => ServiceCategoryPath, serviceCategoryPath => serviceCategoryPath.path)
    public path: ServiceCategoryPath[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
