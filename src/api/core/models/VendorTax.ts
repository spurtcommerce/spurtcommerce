import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Tax } from './Tax';
@Entity('vendor_tax')
export class VendorTax extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id', type: 'int' })
    public tenantId: number;

    @Column({ name: 'tax_id', type: 'int' })
    public taxId: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: 0 })
    public isDelete: number;

    @ManyToOne(type => Tax, tax => tax.vendorTax)
    @JoinColumn({ name: 'tax_id' })
    public tax: Tax;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
