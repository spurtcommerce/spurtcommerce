import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';

@Entity('vendor_global_setting')
export class VendorGlobalSetting extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'vendor_global_setting_id' })
    @IsNotEmpty()
    public settingId: number;
    @IsNotEmpty()
    @Column({ name: 'default_commission' })
    public defaultCommission: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
