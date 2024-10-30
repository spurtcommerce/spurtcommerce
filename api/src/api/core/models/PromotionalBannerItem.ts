/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { PromotionalBanner } from './PromotionalBanner';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('promotional_banner_item')
export class PromotionalBannerItem extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'banner_id' })
    public bannerId: number;
    @IsNotEmpty()
    @Column({ name: 'ref_id' })
    public refId: number;

    @ManyToOne(type => PromotionalBanner, promotionalBanner => promotionalBanner.promotionalBannerItem)
    @JoinColumn({ name: 'banner_id' })
    public promotionalBanner: PromotionalBanner;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
