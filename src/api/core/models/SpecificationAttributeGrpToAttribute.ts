import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spec_attr_grp_to_attribute')
export class SpecificationAttrGrpToAttribute {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'spec_attr_grp_id' })
    public specAttrGrpId: number;

    @Column({ name: 'attribute_id' })
    public attributeId: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;
}
