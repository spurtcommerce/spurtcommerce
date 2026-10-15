import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSpecAttrGrouptoAttr } from './ProductSpecAttrGrpToAttribute';

@Entity('prd_spec_attr_grp_attr_to_attr_val')
export class ProductSpecAttrGrpAttrToAttrVal {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'prd_spec_attr_grp_attr_id' })
    public productSpecAttrGrpAttrId: number;

    @Column({ name: 'attribute_value_id' })
    public attributeValueId: number;

    @Column({ name: 'value' })
    public value: string;

    @ManyToOne((type) => ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.productSpecAttrGrpAttrToAttrVal)
    @JoinColumn({ name: 'prd_spec_attr_grp_attr_id' })
    public productSpecAttrGrouptoAttr: ProductSpecAttrGrouptoAttr[];

}
