/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('m_seo_meta')
export class MSeoMeta {

    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'seo_id' })
    public seoId: number;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'seo_type'})
    public seoType: string;

    @Column({ name: 'ref_id' })
    public refId: number;

}
