import moment from 'moment';
import { BaseModel } from '../../core/models/BaseModel';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValue } from './AttributeValue';

@Entity('attribute_value_translation')
export class AttributeValueTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'attribute_value_id' })
    public attributeValueId: number;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'attribute_value' })
    public value: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => AttributeValue, attributeValue => attributeValue.attributeValueTranslation)
    @JoinColumn({ name: 'attribute_value_id', referencedColumnName: 'id' })
    public attributeValue: AttributeValue;

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
