/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../../core/models/BaseModel';
import moment from 'moment';
import { Product } from '../../core/models/ProductModel';
import { Customer } from '../../core/models/Customer';
import { IsNotEmpty } from 'class-validator';
import { ProductRatingImages } from './ProductRatingImages';

@Entity('product_rating')
export class ProductRating extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'rating_id' })
    public ratingId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: string;

    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'video_path' })
    public videoPath: string;

    @Column({ name: 'video' })
    public video: string;

    @Column({ name: 'rating' })
    public rating: number;

    @Column({ name: 'review' })
    public review: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToOne(type => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @OneToMany((type) => ProductRatingImages, productRatingImages => productRatingImages.productRating, { cascade: true })
    public productRatingImages: ProductRatingImages[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
