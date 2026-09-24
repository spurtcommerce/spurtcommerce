import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IsNotEmpty } from 'class-validator';
import moment from 'moment';
import { OrderArchive } from './OrderArchive';

@Entity('order_product_archive')
export class OrderProductArchive extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_product_archive_id' })
    public orderProductArchiveId: number;

    @IsNotEmpty()
    @Column({ name: 'order_archive_id' })
    public orderArchiveId: number;

    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number; // reference to original product

    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number; // reference to original order

    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'order_product_prefix_id' })
    public orderProductPrefixId: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'model' })
    public model: string;

    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'product_price' })
    public productPrice: number;

    @Column({ name: 'discount_amount' })
    public discountAmount: number;

    @Column({ name: 'base_price' })
    public basePrice: number;

    @Column({ name: 'tax_type' })
    public taxType: number;

    @Column({ name: 'tax_value' })
    public taxValue: number;

    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'discounted_amount' })
    public discountedAmount: number;

    @IsNotEmpty()
    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'fullfillment_status_id' })
    public fullfillmentStatusId: number;

    @Column({ name: 'tags' })
    public tags: string;

    @Column({ name: 'tracking_url' })
    public trackingUrl: string;

    @Column({ name: 'tracking_no' })
    public trackingNo: string;

    @Column({ name: 'trace' })
    public trace: number;

    @Column({ name: 'tax' })
    public tax: number;

    @Column({ name: 'cancel_request' })
    public cancelRequest: number;

    @Column({ name: 'cancel_request_status' })
    public cancelRequestStatus: number;

    @Column({ name: 'cancel_reason' })
    public cancelReason: string;

    @Column({ name: 'cancel_reason_description' })
    public cancelReasonDescription: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @Column({ name: 'coupon_discount_amount' })
    public couponDiscountAmount: string;

    @Column({ name: 'price_group_detail_id' })
    public priceGroupDetailId: number;

    @ManyToOne(type => OrderArchive, orderArchive => orderArchive.orderProductArchive)
    @JoinColumn({ name: 'order_archive_id' })
    public orderArchive: OrderArchive;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
