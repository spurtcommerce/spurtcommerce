import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './Attribute';
@Entity('specification_to_attribute_group')
export class SpecificationToAttributeGroup {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'specification_id' })
    public specificationId: number;

    @Column({ name: 'attribute_group_id' })
    public attributeGroupId: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @ManyToMany(() => Attribute, attribute => attribute.specificationToAttributeGroup, { cascade: true })
    @JoinTable({
        name: 'spec_attr_grp_to_attribute',
        joinColumn: { name: 'spec_attr_grp_id' },
        inverseJoinColumn: { name: 'attribute_id' },
    })
    public attributes: Attribute[];
}
