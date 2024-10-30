/*
 * Spurtcommerce PRO
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SiteFilterSection } from './SiteFilterSection';

@Entity('site_filter_section_item')
export class SiteFilterSectionItem {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'site_filter_section_id' })
    public filterSectionId: number;
    @IsNotEmpty()
    @Column({ name: 'item_name' })
    public itemName: string;

    @Column({ name: 'item_slug' })
    public itemSlug: string;

    @ManyToOne(type => SiteFilterSection, filterSection => filterSection.filterSectionItem)
    @JoinColumn({ name: 'site_filter_section_id' })
    public filterSectionDetail: SiteFilterSection;
}
