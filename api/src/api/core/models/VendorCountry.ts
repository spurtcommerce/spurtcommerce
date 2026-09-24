import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Country } from './Country';
import { VendorZone } from './VendorZone';

@Entity('vendor_country')
export class VendorCountry extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id', type: 'int' })
    public tenantId: number;

    @Column({ name: 'country_id', type: 'int' })
    public countryId: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: 0 })
    public isDelete: number;

    @ManyToOne(type => Country, country => country.vendorCountry)
    @JoinColumn({ name: 'country_id' })
    public country: Country;

    @OneToMany(type => VendorZone, vendorZone => vendorZone.vendorCountry)
    public vendorZone: VendorZone[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
