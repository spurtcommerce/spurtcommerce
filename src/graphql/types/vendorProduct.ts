import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { Sku } from '../../api/core/models/SkuModel';
import { ProductImage } from '../../api/core/models/ProductImage';
import { ProductToCategory } from '../../api/core/models/ProductToCategory';
import { ProductSpecial } from '../../api/core/models/ProductSpecial';
import { ProductDiscount } from '../../api/core/models/ProductDiscount';
import { ProductTirePrice } from '../../api/core/models/ProductTirePrice';
import { VendorProducts } from '../../api/core/models/VendorProducts';
import { CategoryType } from './vendorCategory';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';
import { createConnectionType, SortDirectionEnum } from './common';

export const SkuType = new GraphQLObjectType({
    name: 'Sku',
    description: 'Product SKU & inventory details.',
    fields: () => ({
        id: { type: GraphQLInt },
        skuName: { type: GraphQLString },
        price: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        outOfStockThreshold: { type: GraphQLInt },
        notifyMinQuantity: { type: GraphQLInt },
        minQuantityAllowedCart: { type: GraphQLInt },
        maxQuantityAllowedCart: { type: GraphQLInt },
        enableBackOrders: { type: GraphQLInt },
        backOrderStockLimit: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
    }),
});

export const ProductImageType = new GraphQLObjectType({
    name: 'ProductImage',
    fields: () => ({
        productImageId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        image: { type: GraphQLString },
        containerName: { type: GraphQLString },
        sortOrder: { type: GraphQLInt },
        defaultImage: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
    }),
});

export const ProductSpecialType = new GraphQLObjectType({
    name: 'ProductSpecial',
    fields: () => ({
        productSpecialId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        customerGroupId: { type: GraphQLInt },
        skuId: { type: GraphQLInt },
        priority: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        dateStart: { type: GraphQLString },
        dateEnd: { type: GraphQLString },
    }),
});

export const ProductDiscountType = new GraphQLObjectType({
    name: 'ProductDiscount',
    fields: () => ({
        productDiscountId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        skuId: { type: GraphQLInt },
        priority: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        isActive: { type: GraphQLInt },
        dateStart: { type: GraphQLString },
        dateEnd: { type: GraphQLString },
    }),
});

export const ProductTirePriceType = new GraphQLObjectType({
    name: 'ProductTirePrice',
    fields: () => ({
        id: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        skuId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat },
    }),
});

export const ProductToCategoryType = new GraphQLObjectType({
    name: 'ProductToCategory',
    fields: () => ({
        productToCategoryId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        category: { type: CategoryType },
    }),
});

export const VendorProductMappingType = new GraphQLObjectType({
    name: 'VendorProductMapping',
    description: 'Vendor-Product ownership & approval mapping (vendor_product table).',
    fields: () => ({
        vendorProductId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
        approvalFlag: { type: GraphQLInt },
        quotationAvailable: { type: GraphQLInt },
        vendorProductCommission: { type: GraphQLFloat },
        pincodeBasedDelivery: { type: GraphQLInt },
        sku_id: { type: GraphQLInt },
        reuse: { type: GraphQLInt },
        reuseStatus: { type: GraphQLInt },
        sku: { type: SkuType },
    }),
});

export const VendorProductType = new GraphQLObjectType({
    name: 'VendorProduct',
    description: 'Vendor Product with Shopify-style nested relationships.',
    fields: () => ({
        productId: { type: GraphQLInt },
        sku: { type: GraphQLString },
        upc: { type: GraphQLString },
        hsn: { type: GraphQLString },
        location: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        minimumQuantity: { type: GraphQLInt },
        subtractStock: { type: GraphQLInt },
        stockStatusId: { type: GraphQLInt },
        quotationAvailable: { type: GraphQLInt },
        image: { type: GraphQLString },
        imagePath: { type: GraphQLString },
        manufacturerId: { type: GraphQLInt },
        shipping: { type: GraphQLInt },
        taxType: { type: GraphQLInt },
        taxValue: { type: GraphQLFloat },
        taxId: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        sortOrder: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        keywords: { type: GraphQLString },
        discount: { type: GraphQLInt },
        deleteFlag: { type: GraphQLInt },
        isFeatured: { type: GraphQLInt },
        todayDeals: { type: GraphQLInt },
        condition: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        productSlug: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        width: { type: GraphQLString },
        height: { type: GraphQLString },
        length: { type: GraphQLString },
        weight: { type: GraphQLString },
        hasStock: { type: GraphQLInt },
        priceType: { type: GraphQLInt },
        isSimplified: { type: GraphQLInt },
        owner: { type: GraphQLInt },
        skuId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        skuDetail: {
            type: SkuType,
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (product.skuDetail) {
                    return product.skuDetail;
                }
                if (!product.skuId) {
                    return null;
                }
                return await getDataSource().getRepository(Sku).findOne({
                    where: { id: product.skuId },
                });
            },
        },
        productImage: {
            type: new GraphQLList(ProductImageType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (Array.isArray(product.productImage)) {
                    return product.productImage;
                }
                return await getDataSource().getRepository(ProductImage).find({
                    where: { productId: product.productId },
                    order: { sortOrder: 'ASC' },
                });
            },
        },
        productToCategory: {
            type: new GraphQLList(ProductToCategoryType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (Array.isArray(product.productToCategory)) {
                    return product.productToCategory;
                }
                return await getDataSource().getRepository(ProductToCategory).find({
                    where: { productId: product.productId },
                    relations: ['category'],
                });
            },
        },
        productSpecial: {
            type: new GraphQLList(ProductSpecialType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (Array.isArray(product.productSpecial)) {
                    return product.productSpecial;
                }
                return await getDataSource().getRepository(ProductSpecial).find({
                    where: { productId: product.productId },
                });
            },
        },
        productDiscount: {
            type: new GraphQLList(ProductDiscountType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (Array.isArray(product.productDiscount)) {
                    return product.productDiscount;
                }
                return await getDataSource().getRepository(ProductDiscount).find({
                    where: { productId: product.productId },
                });
            },
        },
        productTirePrice: {
            type: new GraphQLList(ProductTirePriceType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (Array.isArray(product.productTirePrice)) {
                    return product.productTirePrice;
                }
                return await getDataSource().getRepository(ProductTirePrice).find({
                    where: { productId: product.productId },
                });
            },
        },
        vendorProducts: {
            type: new GraphQLList(VendorProductMappingType),
            resolve: async (product: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                // Strictly filter vendorProducts to authenticated vendor only
                if (Array.isArray(product.vendorProducts)) {
                    return product.vendorProducts.filter((vp: any) => Number(vp.vendorId) === context.vendorId);
                }
                return await getDataSource().getRepository(VendorProducts).find({
                    where: { productId: product.productId, vendorId: context.vendorId },
                    relations: ['sku'],
                });
            },
        },
    }),
});

export const VendorProductSortFieldEnum = new GraphQLEnumType({
    name: 'VendorProductSortField',
    values: {
        PRODUCT_ID: { value: 'productId' },
        NAME: { value: 'name' },
        PRICE: { value: 'price' },
        CREATED_DATE: { value: 'createdDate' },
    },
});

export const VendorProductFilterInput = new GraphQLInputObjectType({
    name: 'VendorProductFilterInput',
    fields: {
        keyword: { type: GraphQLString },
        sku: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        isFeatured: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
        approvalFlag: { type: GraphQLInt },
    },
});

export const VendorProductSortInput = new GraphQLInputObjectType({
    name: 'VendorProductSortInput',
    fields: {
        field: { type: VendorProductSortFieldEnum },
        direction: { type: SortDirectionEnum },
    },
});

export const VendorProductConnectionType = createConnectionType('VendorProduct', VendorProductType);
export const SkuConnectionType = createConnectionType('Sku', SkuType);
