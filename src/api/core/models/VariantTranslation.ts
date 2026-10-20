import moment from 'moment';
import { Variant } from './Variant';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';

@Entity('variant_translation')
export class VariantTranslation extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'language_id' })
    public languageId: number;

    @Column({ name: 'variant_id' })
    public variantId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne((type) => Variant, variant => variant.variantTranslation)
    @JoinColumn({ name: 'variant_id' })
    public variant: Variant;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
