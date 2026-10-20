/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import { Variant } from './Variant';
import moment = require('moment');
import { ProductVarientOptionDetail } from './ProductVarientOptionDetail';
import { VariantValueTranslation } from './VariantValueTranslation';

@Entity('variant_value')
export class VariantValue extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'variant_id' })
    public variantId: number;

    @Column({ name: 'value_name' })
    public value: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'is_active' })
    public is_active: number;

    @ManyToOne(type => Variant, variant => variant.variantValue)
    @JoinColumn({ name: 'variant_id' })
    public variant: Variant;

    @OneToMany((type) => VariantValueTranslation, variantValueTranslation => variantValueTranslation.variantValue)
    public variantValueTranslation: VariantValueTranslation[];

    @OneToMany(type => ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.variantValue)
    public productVarientOptionDetail: ProductVarientOptionDetail[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
