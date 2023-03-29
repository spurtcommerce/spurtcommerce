/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('category_commission')
export class CategoryCommission {

    @PrimaryGeneratedColumn({ name: 'category_commission_id' })
    public categoryCommissionId: number;

    @Column({ name: 'category_id' })
    public categoryId: number;

    @Column({ name: 'category_commission_value' })
    public categoryCommissionValue: number;
}
