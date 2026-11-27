import {
    GraphQLInt,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { VendorOrders } from '../../api/core/models/VendorOrders';
import {
    VendorOrderConnectionType,
    VendorOrderFilterInput,
    VendorOrderSortInput,
    VendorOrderType,
} from '../types/vendorOrder';
import { buildConnection, resolvePaginationParams } from '../types/common';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';

export const vendorOrderQueries = {
    vendorOrders: {
        type: VendorOrderConnectionType,
        description: 'Paginated, filterable list of sub-orders belonging to the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            filter: { type: VendorOrderFilterInput },
            sort: { type: VendorOrderSortInput },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-order');
            const { limit, offset } = resolvePaginationParams(args);
            const filter = args.filter || {};
            const sort = args.sort || {};

            const qb = getDataSource().getRepository(VendorOrders)
                .createQueryBuilder('vo')
                .where('vo.vendorId = :vendorId', { vendorId: context.vendorId });

            if (filter.subOrderId) {
                qb.andWhere('vo.subOrderId LIKE :subOrderId', { subOrderId: `%${filter.subOrderId}%` });
            }
            if (filter.subOrderStatusId) {
                qb.andWhere('vo.subOrderStatusId = :statusId', { statusId: filter.subOrderStatusId });
            }
            if (filter.orderId) {
                qb.andWhere('vo.orderId = :orderId', { orderId: filter.orderId });
            }
            if (filter.makeSettlement === 0 || filter.makeSettlement === 1) {
                qb.andWhere('vo.makeSettlement = :ms', { ms: filter.makeSettlement });
            }

            const allowedSortFields: Record<string, string> = {
                vendorOrderId: 'vo.vendorOrderId',
                total: 'vo.total',
                createdDate: 'vo.createdDate',
            };
            const sortCol = allowedSortFields[sort.field] || 'vo.vendorOrderId';
            const sortDir: 'ASC' | 'DESC' = sort.direction === 'ASC' ? 'ASC' : 'DESC';

            const [items, totalCount] = await qb
                .orderBy(sortCol, sortDir)
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorOrder: {
        type: VendorOrderType,
        description: 'Get a single vendor sub-order by vendorOrderId (strictly owned by the authenticated Vendor).',
        args: {
            vendorOrderId: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'list-order');
            if (!args.vendorOrderId) {
                return null;
            }
            return await getDataSource().getRepository(VendorOrders).findOne({
                where: { vendorOrderId: args.vendorOrderId, vendorId: context.vendorId },
            });
        },
    },
};
