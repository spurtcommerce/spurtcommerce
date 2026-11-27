import {
    GraphQLInt,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { Product } from '../../api/core/models/ProductModel';
import { Sku } from '../../api/core/models/SkuModel';
import {
    SkuConnectionType,
    VendorProductConnectionType,
    VendorProductFilterInput,
    VendorProductSortInput,
    VendorProductType,
} from '../types/vendorProduct';
import { buildConnection, resolvePaginationParams } from '../types/common';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';

export const vendorProductQueries = {
    vendorProducts: {
        type: VendorProductConnectionType,
        description: 'Paginated, filterable, sortable list of products owned by the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            filter: { type: VendorProductFilterInput },
            sort: { type: VendorProductSortInput },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-product');
            const { limit, offset } = resolvePaginationParams(args);
            const filter = args.filter || {};
            const sort = args.sort || {};

            const qb = getDataSource().getRepository(Product)
                .createQueryBuilder('product')
                .innerJoin('product.vendorProducts', 'vp', 'vp.vendorId = :vendorId', { vendorId: context.vendorId })
                .where('product.deleteFlag = 0');

            if (filter.keyword) {
                qb.andWhere('(product.name LIKE :kw OR product.sku LIKE :kw)', { kw: `%${filter.keyword}%` });
            }
            if (filter.sku) {
                qb.andWhere('product.sku LIKE :sku', { sku: `%${filter.sku}%` });
            }
            if (filter.isActive === 0 || filter.isActive === 1) {
                qb.andWhere('product.isActive = :isActive', { isActive: filter.isActive });
            }
            if (filter.isFeatured === 0 || filter.isFeatured === 1) {
                qb.andWhere('product.isFeatured = :isFeatured', { isFeatured: filter.isFeatured });
            }
            if (filter.approvalFlag === 0 || filter.approvalFlag === 1) {
                qb.andWhere('vp.approvalFlag = :approvalFlag', { approvalFlag: filter.approvalFlag });
            }
            if (filter.categoryId) {
                qb.innerJoin('product.productToCategory', 'ptc', 'ptc.categoryId = :categoryId', { categoryId: filter.categoryId });
            }

            const allowedSortFields: Record<string, string> = {
                productId: 'product.productId',
                name: 'product.name',
                price: 'product.price',
                createdDate: 'product.createdDate',
            };
            const sortCol = allowedSortFields[sort.field] || 'product.productId';
            const sortDir: 'ASC' | 'DESC' = sort.direction === 'ASC' ? 'ASC' : 'DESC';

            const [items, totalCount] = await qb
                .orderBy(sortCol, sortDir)
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorProduct: {
        type: VendorProductType,
        description: 'Get a single product by productId (strictly owned by the authenticated Vendor).',
        args: {
            productId: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-product');
            if (!args.productId) {
                return null;
            }
            return await getDataSource().getRepository(Product)
                .createQueryBuilder('product')
                .innerJoin('product.vendorProducts', 'vp', 'vp.vendorId = :vendorId', { vendorId: context.vendorId })
                .where('product.productId = :productId', { productId: args.productId })
                .andWhere('product.deleteFlag = 0')
                .getOne();
        },
    },

    vendorInventory: {
        type: SkuConnectionType,
        description: 'List SKUs & stock levels owned by the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            keyword: { type: GraphQLString },
            lowStockOnly: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'stock-list');
            const { limit, offset } = resolvePaginationParams(args);

            const qb = getDataSource().getRepository(Sku)
                .createQueryBuilder('sku')
                .innerJoin('sku.product', 'p')
                .innerJoin('p.vendorProducts', 'vp', 'vp.vendorId = :vendorId', { vendorId: context.vendorId })
                .where('p.deleteFlag = 0');

            if (args.keyword) {
                qb.andWhere('sku.skuName LIKE :kw', { kw: `%${args.keyword}%` });
            }
            if (args.lowStockOnly === 1) {
                qb.andWhere('sku.quantity <= COALESCE(sku.outOfStockThreshold, 5)');
            }

            const [items, totalCount] = await qb
                .orderBy('sku.id', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },
};
