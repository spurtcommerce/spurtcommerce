/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('activity')
export class Activity {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'customer_activity_id' })
    public customerActivityId: number;
    @IsNotEmpty()
    @Column({ name: 'activity_name' })
    public activityName: string;

    @Column({ name: 'is_active' })
    public isActive: number;
}
