import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Zone } from './Zone';
import { VendorCountry } from './VendorCountry';
// import { Address } from './Address';
@Entity('vendor_zone')
export class VendorZone extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'tenant_id', type: 'int' })
    public tenantId: number;

    @Column({ name: 'zone_id', type: 'int' })
    public zoneId: number;

    @Column({ name: 'vendor_country_id', type: 'int' })
    public vendorCountryId: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    public isActive: number;

    @Column({ name: 'is_delete', type: 'tinyint', default: 0 })
    public isDelete: number;

    @ManyToOne(type => Zone, zone => zone.vendorZone)
    @JoinColumn({ name: 'zone_id' })
    public zone: Zone;

    @ManyToOne(type => VendorCountry, vendorCountry => vendorCountry.vendorZone)
    @JoinColumn({ name: 'vendor_country_id' })
    public vendorCountry: VendorCountry;

    // @OneToMany(type => Address, address => address.vendorZone)
    // public address: Address;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
