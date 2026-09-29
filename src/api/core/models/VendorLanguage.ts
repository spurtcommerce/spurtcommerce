import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Language } from './Language';
@Entity('vendor_language')
export class VendorLanguage extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id', type: 'int' })
    public tenantId: number;

    @Column({ name: 'language_id', type: 'int' })
    public languageId: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: 0 })
    public isDelete: number;

    @ManyToOne(type => Language, language => language.vendorLanguage)
    @JoinColumn({ name: 'language_id' })
    public language: Language;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
