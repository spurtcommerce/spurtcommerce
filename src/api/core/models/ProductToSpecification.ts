import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeGroup } from './AttributeGroup';
import { ProductSpecToAttrGroup } from './ProductSpecToAttrGroup';
import { Specification } from './Specification';

@Entity('product_to_specification')
export class ProductToSpecification {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'specification_id' })
    public specificationId: number;

    @ManyToMany(() => AttributeGroup, attributeGroup => attributeGroup.productToSpecification, { cascade: true })
    @JoinTable({
        name: 'product_spec_to_attribute_group',
        joinColumn: { name: 'product_spec_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    })
    public attributeGroups: AttributeGroup[];

    @ManyToOne(() => Specification, specification => specification)
    @JoinColumn({ name: 'specification_id' })
    public specification: Specification;

    @OneToMany((type) => ProductSpecToAttrGroup, productSpecToAttrGroup => productSpecToAttrGroup.productToSpecification)
    public productSpecToAttrGroup: ProductSpecToAttrGroup[];

}
