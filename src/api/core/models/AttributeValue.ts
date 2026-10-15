import moment from 'moment';
import { BaseModel } from '../../core/models/BaseModel';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './Attribute';
import { ProductSpecAttrGrouptoAttr } from './ProductSpecAttrGrpToAttribute';
import { AttributeValueTranslation } from './AttributeValueTranslation';

@Entity('attribute_value')
export class AttributeValue extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'attribute_id' })
    public attributeId: string;

    @Column({ name: 'value' })
    public value: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne(() => Attribute, attribute => attribute.attributeValues)
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

    @OneToMany((type) => AttributeValueTranslation, attributeValueTranslation => attributeValueTranslation.attributeValue, { cascade: true, onDelete: 'CASCADE' })
    public attributeValueTranslation: AttributeValueTranslation[];

    @ManyToMany(() => ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.attributeValues)
    @JoinTable({
        name: 'prd_spec_attr_grp_attr_to_attr_val',
        joinColumn: { name: 'attribute_value_id' },
        inverseJoinColumn: { name: 'prd_spec_attr_grp_attr_id' },
    })
    public attributeValue: AttributeValue[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
