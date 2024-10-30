/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { PromotionalBannerItem } from './PromotionalBannerItem';
import { IsNotEmpty } from 'class-validator';

@Entity('promotional_banner')
export class PromotionalBanner extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'banner_id' })
    public bannerId: number;
    @IsNotEmpty()
    @Column({ name: 'banner_title' })
    public bannerTitle: string;
    @IsNotEmpty()
    @Column({ name: 'banner_link_type' })
    public bannerLinkType: number;

    @Column({ name: 'banner_description' })
    public bannerDescription: string;

    @Column({ name: 'position' })
    public position: number;
    @IsNotEmpty()
    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;
    @IsNotEmpty()
    @Column({ name: 'expire_date' })
    public expireDate: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => PromotionalBannerItem, promotionalBannerItem => promotionalBannerItem.promotionalBanner)
    public promotionalBannerItem: PromotionalBannerItem[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
