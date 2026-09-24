import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Currency } from './Currency';

@Entity('vendor_currency')
export class VendorCurrency extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id', type: 'int' })
    public tenantId: number;

    @Column({ name: 'currency_id', type: 'int' })
    public currencyId: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: 0 })
    public isDelete: number;

    @ManyToOne(type => Currency, currency => currency.vendorCurrency)
    @JoinColumn({ name: 'currency_id' })
    public currency: Currency;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
