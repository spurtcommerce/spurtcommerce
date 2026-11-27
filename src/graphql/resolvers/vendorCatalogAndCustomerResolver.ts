import {
    GraphQLInt,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { VendorCategory } from '../../api/core/models/VendorCategory';
import { Customer } from '../../api/core/models/Customer';
import { CustomerGroup } from '../../api/core/models/CustomerGroup';
import { ProductRating } from '../../api/core/models/ProductRating';
import { VendorCategoryConnectionType } from '../types/vendorCategory';
import {
    CustomerConnectionType,
    CustomerGroupConnectionType,
    ProductRatingConnectionType,
} from '../types/vendorCustomer';
import { buildConnection, resolvePaginationParams } from '../types/common';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';

export const vendorCatalogAndCustomerQueries = {
    vendorCategories: {
        type: VendorCategoryConnectionType,
        description: 'List categories assigned to the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            keyword: { type: GraphQLString },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const { limit, offset } = resolvePaginationParams(args);

            const qb = getDataSource().getRepository(VendorCategory)
                .createQueryBuilder('vc')
                .innerJoinAndSelect('vc.category', 'cat')
                .where('vc.vendorId = :vendorId', { vendorId: context.vendorId });

            if (args.keyword) {
                qb.andWhere('cat.name LIKE :kw', { kw: `%${args.keyword}%` });
            }

            const [items, totalCount] = await qb
                .orderBy('vc.vendorCategoryId', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorCustomers: {
        type: CustomerConnectionType,
        description: 'List customers who have ordered from the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            keyword: { type: GraphQLString },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-customer');
            const { limit, offset } = resolvePaginationParams(args);

            const qb = getDataSource().getRepository(Customer)
                .createQueryBuilder('c')
                .innerJoin('c.order', 'o')
                .innerJoin('o.vendorOrders', 'vo', 'vo.vendorId = :vendorId', { vendorId: context.vendorId })
                .where('c.deleteFlag = 0');

            if (args.keyword) {
                qb.andWhere('(c.firstName LIKE :kw OR c.lastName LIKE :kw OR c.email LIKE :kw)', { kw: `%${args.keyword}%` });
            }

            const [items, totalCount] = await qb
                .distinct(true)
                .orderBy('c.id', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorCustomerGroups: {
        type: CustomerGroupConnectionType,
        description: 'List customer groups owned by the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            keyword: { type: GraphQLString },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-customer-group');
            const { limit, offset } = resolvePaginationParams(args);

            const qb = getDataSource().getRepository(CustomerGroup)
                .createQueryBuilder('cg')
                .where('cg.vendorId = :vendorId', { vendorId: context.vendorId });

            if (args.keyword) {
                qb.andWhere('cg.name LIKE :kw', { kw: `%${args.keyword}%` });
            }

            const [items, totalCount] = await qb
                .orderBy('cg.id', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorProductRatings: {
        type: ProductRatingConnectionType,
        description: 'List ratings & reviews for products owned by the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            productId: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const { limit, offset } = resolvePaginationParams(args);

            const qb = getDataSource().getRepository(ProductRating)
                .createQueryBuilder('pr')
                .innerJoin('pr.product', 'p')
                .innerJoin('p.vendorProducts', 'vp', 'vp.vendorId = :vendorId', { vendorId: context.vendorId });

            if (args.productId) {
                qb.andWhere('pr.productId = :productId', { productId: args.productId });
            }

            const [items, totalCount] = await qb
                .orderBy('pr.ratingId', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },
};
