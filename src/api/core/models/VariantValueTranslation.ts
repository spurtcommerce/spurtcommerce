import moment from 'moment';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';
import { VariantValue } from './VariantValue';

@Entity('variant_value_translation')
export class VariantValueTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'value' })
    public value: string;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'variant_value_id' })
    public variantValueId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => VariantValue, variantValue => variantValue.variantValueTranslation)
    @JoinColumn({ name: 'variant_value_id' })
    public variantValue: VariantValue;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
