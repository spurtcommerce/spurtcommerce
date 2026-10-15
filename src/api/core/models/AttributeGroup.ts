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
import { Attribute } from './Attribute';
import { Specification } from './Specification';
import { ProductToSpecification } from './ProductToSpecification';
import { AttributeGroupTranslation } from './AttributeGroupTranslation';
@Entity('attribute_group')
export class AttributeGroup extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @OneToMany((type) => AttributeGroupTranslation, attributeGroupTranslation => attributeGroupTranslation.attributeGroup, { cascade: true })
    public attributeGroupTranslation: AttributeGroupTranslation[];

    @ManyToMany(() => Attribute, attributeGroup => attributeGroup.attributeGroups, { cascade: true })
    @JoinTable({
        name: 'attribute_to_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    })
    public attributes: Attribute[];

    @ManyToMany(() => Specification, specification => specification.attributeGroups, { cascade: true })
    @JoinTable({
        name: 'specification_to_attribute_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'specification_id' },
    })
    public specifications: Specification[];

    @ManyToMany(() => ProductToSpecification, productToSpecification => productToSpecification.attributeGroups)
    @JoinTable({
        name: 'product_spec_to_attribute_group',
        joinColumn: { name: 'attribute_group_id' },
        inverseJoinColumn: { name: 'product_spec_id' },
    })
    public productToSpecification: ProductToSpecification[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
