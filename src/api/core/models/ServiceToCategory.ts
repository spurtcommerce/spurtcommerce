/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Services } from './Service';
import { ServiceCategory } from './ServiceCategory';

@Entity('service_to_category')
export class ServiceToCategory extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'service_to_category_id' })
    @IsNotEmpty()
    public serviceToCategoryId: number;
    @IsNotEmpty()
    @Column({ name: 'service_id' })
    public serviceId: number;
    @IsNotEmpty()
    @Column({ name: 'service_category_id' })
    public serviceCategoryId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Services, service => service.serviceToCategory)
    @JoinColumn({ name: 'service_id' })
    public service: Services;

    @ManyToOne(type => ServiceCategory, serviceCategory => serviceCategory.serviceToCategory)
    @JoinColumn({ name: 'service_category_id' })
    public serviceCategory: ServiceCategory;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
