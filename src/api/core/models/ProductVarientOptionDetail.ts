/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from '../../core/models/BaseModel';
import { ProductVarientOption } from './ProductVarientOption';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
import { VariantValue } from './VariantValue';
@Entity('product_varient_option_details')
export class ProductVarientOptionDetail extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_varient_option_id' })
    public productVarientOptionId: number;
    @IsNotEmpty()
    @Column({ name: 'varients_value_id' })
    public variantValueId: number;

    @Column({ name: 'product_variant_id' })
    public productVariantId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => ProductVarientOption, productVarientOption => productVarientOption.productVarientOptionDetail)
    @JoinColumn({ name: 'product_varient_option_id' })
    public productVarientOption: ProductVarientOption;

    @ManyToOne(type => VariantValue, variantValue => variantValue.productVarientOptionDetail)
    @JoinColumn({ name: 'varients_value_id' })
    public variantValue: VariantValue;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
