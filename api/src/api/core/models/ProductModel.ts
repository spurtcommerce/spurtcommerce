/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ProductToCategory } from './ProductToCategory';
import { ProductImage } from './ProductImage';
import { CustomerWishlist } from './CustomerWishlist';
import { OrderProduct } from './OrderProduct';
import { OrderProductLog } from './OrderProductLog';
import { CustomerCart } from './CustomerCart';
import { ProductTirePrice } from './ProductTirePrice';
import { VendorProducts } from './VendorProducts';
import { Sku } from './SkuModel';
import { ProductViewLog } from './productViewLog';
import { ProductSpecial } from './ProductSpecial';
import { ProductDiscount } from './ProductDiscount';
import { ProductVideo } from './ProductVideo';
import { ProductTranslation } from './ProductTranslation';

@Entity('product')
export class Product extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    @IsNotEmpty()
    public productId: number;

    @IsNotEmpty()
    @Column({ name: 'sku' })
    public sku: string;

    @Column({ name: 'upc' })
    public upc: string;

    @Column({ name: 'hsn' })
    public hsn: string;

    @Column({ name: 'location' })
    public location: string;

    @IsNotEmpty()
    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'minimum_quantity' })
    public minimumQuantity: number;

    @Column({ name: 'subtract_stock' })
    public subtractStock: number;

    @IsNotEmpty()
    @Column({ name: 'stock_status_id' })
    public stockStatusId: number;

    @Column({ name: 'quotation_available' })
    public quotationAvailable: number;

    @IsNotEmpty()
    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

    @Column({ name: 'manufacturer_id' })
    public manufacturerId: number;

    @Column({ name: 'shipping' })
    public shipping: number;

    @Column({ name: 'service_charges' })
    public serviceCharges: string;

    @Column({ name: 'tax_type' })
    public taxType: number;

    @Column({ name: 'tax_value' })
    public taxValue: number;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @Column({ name: 'price_update_file_log_id' })
    public priceUpdateFileLogId: number;

    @Column({ name: 'date_available' })
    public dateAvailable: Date;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description' })
    public description: string;

    @IsNotEmpty()
    @Column({ name: 'amount' })
    public amount: number;

    @Column({ name: 'keywords' })
    public keywords: string;

    @Column({ name: 'discount' })
    public discount: number;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'is_featured' })
    public isFeatured: number;

    @Column({ name: 'today_deals' })
    public todayDeals: number;

    @Column({ name: 'condition' })
    public condition: number;

    @Column({ name: 'rating' })
    public rating: number;

    @Column({ name: 'wishlist_status' })
    public wishListStatus: number;

    @Column({ name: 'product_slug' })
    public productSlug: string;

    @IsNotEmpty()
    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'width' })
    public width: string;

    @Column({ name: 'height' })
    public height: string;

    @Column({ name: 'length' })
    public length: string;

    @Column({ name: 'weight' })
    public weight: string;

    @Column({ name: 'has_stock' })
    public hasStock: number;

    @Column({ name: 'price_type' })
    public priceType: number;

    @Column({ name: 'is_simplified' })
    public isSimplified: number;

    @Column({ name: 'owner' })
    public owner: number;

    @Column({ name: 'is_common' })
    public isCommon: number;

    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'has_tire_price' })
    public hasTirePrice: number;

    @Column({ name: 'out_of_stock_threshold' })
    public outOfStockThreshold: number;

    @Column({ name: 'notify_min_quantity_below' })
    public notifyMinQuantity: number;

    @Column({ name: 'min_quantity_allowed_cart' })
    public minQuantityAllowedCart: number;

    @Column({ name: 'max_quantity_allowed_cart' })
    public maxQuantityAllowedCart: number;

    @Column({ name: 'enable_back_orders' })
    public enableBackOrders: number;

    @Column({ name: 'pincode_based_delivery' })
    public pincodeBasedDelivery: number;

    @Column({ name: 'attribute_keyword' })
    public attributeKeyword: string;

    @Column({ name: 'setted_as_common_on' })
    public settedAsCommonOn: string;

    @Column({ name: 'product_highlights', type: 'json', default: [] })
    public productHighlights: any;

    @OneToOne(type => Sku, skuDetail => skuDetail.product)
    @JoinColumn({ name: 'sku_id' })
    public skuDetail: Sku;

    @OneToMany((type) => ProductTranslation, productTranslation => productTranslation.product)
    public productTranslation: ProductTranslation[];

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.product)
    public productToCategory: ProductToCategory[];

    @OneToMany(type => ProductImage, productImage => productImage.product)
    public productImage: ProductImage[];

    @OneToMany(type => CustomerWishlist, customerWishlist => customerWishlist.product)
    public wishlist: CustomerWishlist[];

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.productInformationDetail)
    public orderProduct: OrderProduct[];

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.product)
    public orderProductLog: OrderProductLog[];

    @OneToMany(type => CustomerCart, customerCart => customerCart.product)
    public cart: OrderProductLog[];

    @OneToMany(type => ProductSpecial, productSpecial => productSpecial.product)
    public productSpecial: ProductSpecial[];

    @OneToMany(type => ProductDiscount, productDiscount => productDiscount.product)
    public productDiscount: ProductDiscount[];

    @OneToMany(type => ProductTirePrice, productTirePrice => productTirePrice.product)
    public productTirePrice: ProductTirePrice[];

    @OneToMany(type => VendorProducts, vendorProduct => vendorProduct.product)
    public vendorProducts: VendorProducts[];

    @OneToMany(type => ProductViewLog, productviewlog => productviewlog.product)
    public productviewlog: ProductViewLog[];

    @OneToMany(type => ProductVideo, productvideo => productvideo.product)
    public productVideo: ProductVideo[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
