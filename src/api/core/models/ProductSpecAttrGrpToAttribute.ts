import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValue } from './AttributeValue';
import { ProductSpecToAttrGroup } from './ProductSpecToAttrGroup';
import { ProductSpecAttrGrpAttrToAttrVal } from './ProductSpecAttrGrpAttrtoAttrVal';

@Entity('prd_spec_attr_grp_to_attribute')
export class ProductSpecAttrGrouptoAttr {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'prd_spec_attr_grp_id' })
    public productSpecAttrGrpId: number;

    @Column({ name: 'attribute_id' })
    public attributeId: number;

    @ManyToMany(() => AttributeValue, attributeValue => attributeValue, { cascade: true })
    @JoinTable({
        name: 'prd_spec_attr_grp_attr_to_attr_val',
        joinColumn: { name: 'prd_spec_attr_grp_attr_id' },
        inverseJoinColumn: { name: 'attribute_value_id' },
    })
    public attributeValues: AttributeValue[];

    @ManyToOne((type) => ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup)
    @JoinColumn({ name: 'prd_spec_attr_grp_id' })
    public productSpecToAttrGroup: ProductSpecToAttrGroup;

    @OneToMany((type) => ProductSpecAttrGrpAttrToAttrVal, productSpecAttrGrpAttrToAttrVal => productSpecAttrGrpAttrToAttrVal.productSpecAttrGrouptoAttr)
    public productSpecAttrGrpAttrToAttrVal: ProductSpecAttrGrpAttrToAttrVal[];
}
