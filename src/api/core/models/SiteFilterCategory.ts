/*
 * Spurtcommerce PRO
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('site_filter_category')
export class SiteFilterCategory {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'site_filter_id' })
    public filterId: number;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;

}
