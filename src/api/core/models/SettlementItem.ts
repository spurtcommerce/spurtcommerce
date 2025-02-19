import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Settlement } from './Settlement';
import { IsNotEmpty } from 'class-validator';

@Entity('settlement_item')
export class SettlementItem extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;
    @IsNotEmpty()
    @Column({ name: 'settlement_id' })
    public settlementId: number;
    @Column({ name: 'order_id' })
    public orderId: number;

    @Column({ name: 'order_product_id' })
    public orderProductId: number;

    @Column({ name: 'order_product_prefix_id' })
    public orderProductPrefixId: string;

    @Column({ name: 'total' })
    public total: string;
    @IsNotEmpty()
    @Column({ name: 'company_name' })
    public companyName: string;

    @Column({ name: 'commission' })
    public commission: number;

    @Column({ name: 'commission_amount' })
    public CommissionAmount: string;

    @Column({ name: 'net_amount' })
    public netAmount: string;

    @ManyToOne(type => Settlement, settlement => settlement.settlementItem)
    @JoinColumn({ name: 'settlement_id' })
    public settlement: Settlement;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
