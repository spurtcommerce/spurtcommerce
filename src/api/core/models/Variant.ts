/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import { VariantValue } from './VariantValue';
import moment = require('moment');
import { ProductVarient } from './ProductVarient';
import { VariantTranslation } from './VariantTranslation';
@Entity('variant')
export class Variant extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'type' })
    public type: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany(type => VariantValue, variantValue => variantValue.variant, { cascade: true })
    public variantValue: VariantValue[];

    @OneToMany(type => ProductVarient, productVarient => productVarient.varients)
    public productVarient: ProductVarient[];

    @OneToMany((type) => VariantTranslation, variantTranslation => variantTranslation.variant)
    public variantTranslation: VariantTranslation[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
