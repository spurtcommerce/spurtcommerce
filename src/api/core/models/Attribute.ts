/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';
import moment from 'moment';
import { AttributeGroup } from './AttributeGroup';
import { AttributeValue } from './AttributeValue';
import { ProductSpecToAttrGroup } from './ProductSpecToAttrGroup';
import { SpecificationToAttributeGroup } from './SpecificationToAttributeGroup';
import { AttributeTranslation } from './AttributeTranslation';
@Entity('attribute')
export class Attribute extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'type' })
    public type: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'is_mandatory' })
    public isMandatory: number;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'label' })
    public label: string;

    @Column({ name: 'use_as_filter' })
    public useAsFilter: number;

    @Column({ name: 'section_name' })
    public sectionName: string;

    @Column({ name: 'default_value' })
    public defaultValue: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany((type) => AttributeTranslation, attributeTranslation => attributeTranslation.attribute, { cascade: true, onDelete: 'CASCADE' })
    public attributeTranslation: AttributeTranslation[];

    @ManyToMany(() => AttributeGroup, attributeGroup => attributeGroup.attributes)
    @JoinTable({
        name: 'attribute_to_group',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    })
    public attributeGroups: AttributeGroup[];

    @ManyToMany(() => SpecificationToAttributeGroup, specificationToAttributeGroup => specificationToAttributeGroup.attributes)
    @JoinTable({
        name: 'spec_attr_grp_to_attribute',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'spec_attr_grp_id' },
    })
    public specificationToAttributeGroup: SpecificationToAttributeGroup[];

    @ManyToMany(() => ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup.attributes)
    @JoinTable({
        name: 'prd_spec_attr_grp_to_attribute',
        joinColumn: { name: 'attribute_id' },
        inverseJoinColumn: { name: 'prd_spec_attr_grp_id' },
    })
    public productSpecToAttrGroup: ProductSpecToAttrGroup[];

    @OneToMany(() => AttributeValue, attributeValue => attributeValue.attribute, { cascade: true })
    public attributeValues: AttributeValue[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
