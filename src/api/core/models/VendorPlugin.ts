import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Vendor } from './Vendor';
import { Plugins } from './Plugin';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('vendor_plugin')
export class VendorPlugin extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'plugin_id' })
    public pluginId: number;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    public isActive: boolean;

    @Column({ name: 'plugin_additional_info', type: 'json', nullable: true })
    public pluginAdditionalInfo: any;

    @Column({ name: 'plugin_form_info' })
    public pluginFormInfo: string;

    @Column({ name: 'plugin_avatar' })
    public pluginAvatar: string;

    @Column({ name: 'plugin_avatar_path' })
    public pluginAvatarPath: string;

    @ManyToOne(() => Vendor)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @ManyToOne(type => Plugins, plugins => plugins.vendorPlugin)
    @JoinColumn({ name: 'plugin_id' })
    public plugins: Plugins;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
