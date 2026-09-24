import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IsNotEmpty } from 'class-validator';
import moment from 'moment';

@Entity('order_archive_log')
export class OrderArchiveLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_archive_log_id' })
    public orderArchiveLogId: number;

    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number; // reference to original order

    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'order_log_id' })
    public orderLogId: number;

    @Column({ name: 'currency_id' })
    public currencyId: number;

    @Column({ name: 'shipping_zone_id' })
    public shippingZoneId: number;

    @Column({ name: 'payment_zone_id' })
    public paymentZoneId: number;

    @Column({ name: 'shipping_country_id' })
    public shippingCountryId: number;

    @Column({ name: 'payment_country_id' })
    public paymentCountryId: number;

    @Column({ name: 'invoice_no' })
    public invoiceNo: string;

    @Column({ name: 'invoice_prefix' })
    public invoicePrefix: string;

    @Column({ name: 'order_prefix_id' })
    public orderPrefixId: string;

    @IsNotEmpty()
    @Column({ name: 'firstname' })
    public firstname: string;

    @Column({ name: 'lastname' })
    public lastname: string;

    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @IsNotEmpty()
    @Column({ name: 'telephone' })
    public telephone: number;

    @Column({ name: 'fax' })
    public fax: string;

    @Column({ name: 'shipping_firstname' })
    public shippingFirstname: string;

    @Column({ name: 'shipping_lastname' })
    public shippingLastname: string;

    @Column({ name: 'shipping_company' })
    public shippingCompany: string;

    @Column({ name: 'shipping_address_1' })
    public shippingAddress1: string;

    @Column({ name: 'shipping_address_2' })
    public shippingAddress2: string;

    @Column({ name: 'shipping_city' })
    public shippingCity: string;

    @Column({ name: 'shipping_postcode' })
    public shippingPostcode: string;

    @Column({ name: 'shipping_country' })
    public shippingCountry: string;

    @Column({ name: 'shipping_zone' })
    public shippingZone: string;

    @Column({ name: 'shipping_address_format' })
    public shippingAddressFormat: string;

    @Column({ name: 'shipping_method' })
    public shippingMethod: string;

    @Column({ name: 'payment_firstname' })
    public paymentFirstname: string;

    @Column({ name: 'payment_lastname' })
    public paymentLastname: string;

    @Column({ name: 'payment_company' })
    public paymentCompany: string;

    @Column({ name: 'payment_address_1' })
    public paymentAddress1: string;

    @Column({ name: 'payment_address_2' })
    public paymentAddress2: string;

    @Column({ name: 'payment_city' })
    public paymentCity: string;

    @Column({ name: 'payment_postcode' })
    public paymentPostcode: string;

    @Column({ name: 'payment_country' })
    public paymentCountry: string;

    @Column({ name: 'payment_zone' })
    public paymentZone: string;

    @Column({ name: 'payment_address_format' })
    public paymentAddressFormat: string;

    @Column({ name: 'payment_method' })
    public paymentMethod: string;

    @Column({ name: 'comment' })
    public comment: string;

    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'reward' })
    public reward: number;

    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'affiliate_id' })
    public affiliateId: number;

    @Column({ name: 'commision' })
    public commision: number;

    @Column({ name: 'currency_code' })
    public currencyCode: string;

    @Column({ name: 'currency_value' })
    public currencyValue: number;

    @Column({ name: 'ip' })
    public ip: string;

    @Column({ name: 'payment_flag' })
    public paymentFlag: number;

    @Column({ name: 'order_name' })
    public orderName: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'po_number' })
    public poNumber: string;

    @Column({ name: 'must_ship_before' })
    public mustShipBefore: Date;

    @Column({ name: 'notes' })
    public notes: string;

    @Column({ name: 'payment_rule_id' })
    public paymentRuleId: number;

    @Column({ name: 'payment_term_id' })
    public paymentTermId: number;

    @Column({ name: 'shipping_cost_override', type: 'decimal', precision: 10, scale: 2 })
    public shippingCostOverride: number;

    @Column({ name: 'order_source', type: 'enum', enum: ['quote', 'rfq', 'shoppingCart', 'quick-order'] })
    public orderSource: string;

    @Column({ name: 'created_by_type', type: 'enum', enum: ['seller', 'buyer'] })
    public createdByType: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
