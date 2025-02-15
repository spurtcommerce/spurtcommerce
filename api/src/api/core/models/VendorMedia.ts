import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Vendor } from './Vendor';

@Entity('vendor_media')

export class VendorMedia extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'file_name' })
    public fileName: string;

    @Column({ name: 'file_path' })
    public filePath: string;

    @Column({ name: 'media_type' })
    public mediaType: number;

    @Column({ name: 'default_image' })
    public defaultImage: number;

    @Column({ name: 'video_type' })
    public videoType: number;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'show_home_page' })
    public showHomePage: number;

    @Column({ name: 'url' })
    public url: string;

    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'is_delete' })
    public isDelete: number;

    @ManyToOne(type => Vendor, vendor => vendor.vendorMedia)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
