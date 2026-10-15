import moment from 'moment';
import { BaseModel } from '../../core/models/BaseModel';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './Attribute';

@Entity('attribute_translation')
export class AttributeTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'attribute_id' })
    public attributeId: number;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'name' })
    public attributeName: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'label' })
    public label: string;

    @Column({ name: 'section_name' })
    public sectionName: string;

    @Column({ name: 'default_value' })
    public defaultValue: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => Attribute, attribute => attribute.attributeTranslation)
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

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
