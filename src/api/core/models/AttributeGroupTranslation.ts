import moment from 'moment';
import { AttributeGroup } from './AttributeGroup';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';

@Entity('attribute_group_translation')
export class AttributeGroupTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'attribute_group_id' })
    public attributeGroupId: number;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => AttributeGroup, attributeGroup => attributeGroup.attributeGroupTranslation)
    @JoinColumn({ name: 'attribute_group_id' })
    public attributeGroup: AttributeGroup;

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
