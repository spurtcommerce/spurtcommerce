import moment from 'moment';
import { BaseModel } from '../../core/models/BaseModel';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeGroup } from './AttributeGroup';
import { SpecificationTranslation } from './SpecificationTranslation';

@Entity('specification')
export class Specification extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'slug' })
    public slug: string;

    @Column({ name: 'tenant_id' })
    public tenantId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToMany(() => AttributeGroup, attributeGroup => attributeGroup.specifications)
    @JoinTable({
        name: 'specification_to_attribute_group',
        joinColumn: { name: 'specification_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    })
    public attributeGroups: AttributeGroup[];

    @OneToMany(() => SpecificationTranslation, SpecificationTranslation => SpecificationTranslation.specification)
    @JoinTable({ joinColumn: { name: 'specification_id' }})
    public specificationTranslation: SpecificationTranslation;

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
