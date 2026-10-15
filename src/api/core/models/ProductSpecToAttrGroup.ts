import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './Attribute';
import { ProductToSpecification } from './ProductToSpecification';
import { ProductSpecAttrGrouptoAttr } from './ProductSpecAttrGrpToAttribute';

@Entity('product_spec_to_attribute_group')
export class ProductSpecToAttrGroup {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'product_spec_id' })
    public productSpecId: number;

    @ManyToMany(() => Attribute, attribute => attribute.productSpecToAttrGroup, { cascade: true })
    @JoinTable({
        name: 'prd_spec_attr_grp_to_attribute',
        joinColumn: { name: 'prd_spec_attr_grp_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    })
    public attributes: Attribute[];

    @ManyToOne((type) => ProductToSpecification, productToSpecification => productToSpecification.productSpecToAttrGroup)
    @JoinColumn({ name: 'product_spec_id' })
    public productToSpecification: ProductToSpecification[];

    @OneToMany((type) => ProductSpecAttrGrouptoAttr, productSpecAttrGrouptoAttr => productSpecAttrGrouptoAttr.productSpecToAttrGroup)
    public productSpecAttrGrouptoAttr: ProductSpecAttrGrouptoAttr[];
}
