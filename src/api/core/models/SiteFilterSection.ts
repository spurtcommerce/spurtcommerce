/*
 * Spurtcommerce PRO
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SiteFilterSectionItem } from './SiteFilterSectionItem';

@Entity('site_filter_section')
export class SiteFilterSection {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'site_filter_id' })
    public filterId: number;
    @IsNotEmpty()
    @Column({ name: 'section_id' })
    public sectionId: number;
    @IsNotEmpty()
    @Column({ name: 'section_name' })
    public sectionName: string;
    @IsNotEmpty()
    @Column({ name: 'section_type' })
    public sectionType: number;

    @Column({ name: 'section_slug' })
    public sectionSlug: string;

    @Column({ name: 'sequence' })
    public sequence: number;

    @OneToMany(type => SiteFilterSectionItem, filterSectionItem => filterSectionItem.filterSectionDetail)
    public filterSectionItem: SiteFilterSectionItem[];
}
