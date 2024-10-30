/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { Order } from './Order';
import { OrderStatus } from './OrderStatus';
import { OrderProduct } from './OrderProduct';
import { IsNotEmpty } from 'class-validator';

@Entity('order_product_log')
export class OrderProductLog extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_product_log_id' })
    public orderProductLogId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'model' })
    public model: string;
    @IsNotEmpty()
    @Column({ name: 'quantity' })
    public quantity: number;
    @IsNotEmpty()
    @Column({ name: 'product_price' })
    public productPrice: number;
    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'tracking_url' })
    public trackingUrl: string;

    @Column({ name: 'tracking_no' })
    public trackingNo: string;

    @Column({ name: 'trace' })
    public trace: number;

    @Column({ name: 'tax' })
    public tax: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => OrderProduct, orderProduct => orderProduct.orderProductLog)
    @JoinColumn({ name: 'order_product_id' })
    public orderProduct: OrderProduct;

    @ManyToOne(type => Product, product => product.orderProductLog)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Order, order => order.orderProductLog)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

    @ManyToOne(type => OrderStatus, orderStatus => orderStatus.orderProductLog)
    @JoinColumn({ name: 'order_status_id' })
    public orderStatus: OrderStatus;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
