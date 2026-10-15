import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attribute_to_group')
export class AttributeToGroup {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'attribute_id' })
    public attributeId: number;

    @Column({ name: 'attribute_group_id' })
    public attributeGroupId: number;

    @Column({ name: 'tenant_id' })
    public tenantId: number;
}
