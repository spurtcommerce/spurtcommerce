/*
 * spurtcommerce API
 * version 5.1.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { ServiceCategory } from './ServiceCategory';
@Entity('service_category_path')
export class ServiceCategoryPath extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'service_category_path_id' })
    public categoryPathId: number;
    @IsNotEmpty()
    @Column({ name: 'service_category_id' })
    public serviceCategoryId: number;
    @IsNotEmpty()
    @Column({ name: 'path_id' })
    public pathId: number;

    @Column({ name: 'level' })
    public level: number;

    @ManyToOne(type => ServiceCategory, serviceCategory => serviceCategory.category)
    @JoinColumn({ name: 'service_category_id' })
    public category: ServiceCategory;

    @ManyToOne(type => ServiceCategory, serviceCategory => serviceCategory.path)
    @JoinColumn({ name: 'path_id' })
    public path: ServiceCategory;
}
