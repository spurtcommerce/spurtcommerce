import {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} from 'graphql';
import { Container } from 'typedi';
import { getDataSource } from '../../loaders/typeormLoader';
import { VendorService } from '../../api/core/services/VendorService';
import { VendorProducts } from '../../api/core/models/VendorProducts';
import { VendorOrders } from '../../api/core/models/VendorOrders';
import { VendorPayment } from '../../api/core/models/VendorPayment';
import { VendorSettings } from '../../api/core/models/VendorSettings';
import { VendorUsers } from '../../api/core/models/VendorUsers';
import { Banner } from '../../api/core/models/Banner';
import { Tax } from '../../api/core/models/Tax';
import { Sku } from '../../api/core/models/SkuModel';
import { Customer } from '../../api/core/models/Customer';
import {
    BannerConnectionType,
    TaxType,
    VendorDashboardStatsType,
    VendorPaymentConnectionType,
    VendorProfileType,
    VendorSettingsType,
    VendorUserConnectionType,
    VendorUserType,
} from '../types/vendorProfile';
import { buildConnection, resolvePaginationParams } from '../types/common';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';

export const vendorProfileQueries = {
    vendorProfile: {
        type: VendorProfileType,
        description: 'Get the authenticated Vendor profile.',
        resolve: async (_parent: any, _args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const vendorService = Container.get(VendorService);
            return await vendorService.findOne({
                where: { vendorId: context.vendorId, isDelete: 0 },
            });
        },
    },

    vendorCurrentUser: {
        type: VendorUserType,
        description: 'Get the currently authenticated Vendor user account.',
        resolve: async (_parent: any, _args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            return context.user;
        },
    },

    vendorDashboardStats: {
        type: VendorDashboardStatsType,
        description: 'Get aggregated KPIs for the authenticated Vendor dashboard.',
        resolve: async (_parent: any, _args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const ds = getDataSource();
            const vendorId = context.vendorId;

            const totalProducts = await ds.getRepository(VendorProducts)
                .createQueryBuilder('vp')
                .innerJoin('vp.product', 'p', 'p.deleteFlag = 0')
                .where('vp.vendorId = :vendorId', { vendorId })
                .getCount();

            const activeProducts = await ds.getRepository(VendorProducts)
                .createQueryBuilder('vp')
                .innerJoin('vp.product', 'p', 'p.deleteFlag = 0 AND p.isActive = 1')
                .where('vp.vendorId = :vendorId', { vendorId })
                .getCount();

            const totalOrders = await ds.getRepository(VendorOrders).count({
                where: { vendorId },
            });

            const pendingOrders = await ds.getRepository(VendorOrders).count({
                where: { vendorId, subOrderStatusId: 1 },
            });

            const revenueRaw = await ds.getRepository(VendorOrders)
                .createQueryBuilder('vo')
                .select('COALESCE(SUM(vo.total), 0)', 'totalRevenue')
                .where('vo.vendorId = :vendorId', { vendorId })
                .getRawOne();

            const lowStockSkus = await ds.getRepository(Sku)
                .createQueryBuilder('s')
                .innerJoin('s.product', 'p')
                .innerJoin('p.vendorProducts', 'vp', 'vp.vendorId = :vendorId', { vendorId })
                .where('p.deleteFlag = 0')
                .andWhere('s.quantity <= COALESCE(s.outOfStockThreshold, 5)')
                .getCount();

            const totalCustomers = await ds.getRepository(Customer)
                .createQueryBuilder('c')
                .innerJoin('c.order', 'o')
                .innerJoin('o.vendorOrders', 'vo', 'vo.vendorId = :vendorId', { vendorId })
                .select('COUNT(DISTINCT c.id)', 'cnt')
                .getRawOne();

            return {
                totalProducts,
                activeProducts,
                totalOrders,
                totalRevenue: Number(revenueRaw?.totalRevenue || 0),
                totalCustomers: Number(totalCustomers?.cnt || 0),
                pendingOrders,
                lowStockSkus,
            };
        },
    },

    vendorPayments: {
        type: VendorPaymentConnectionType,
        description: 'List settlements/transactions for the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
            orderId: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const { limit, offset } = resolvePaginationParams(args);
            const qb = getDataSource().getRepository(VendorPayment)
                .createQueryBuilder('vp')
                .where('vp.vendorId = :vendorId', { vendorId: context.vendorId });

            if (args.orderId) {
                qb.andWhere('vp.orderId = :orderId', { orderId: args.orderId });
            }

            const [items, totalCount] = await qb
                .orderBy('vp.vendorPaymentId', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();

            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorSettings: {
        type: VendorSettingsType,
        description: 'Get settings for the authenticated Vendor.',
        resolve: async (_parent: any, _args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            return await getDataSource().getRepository(VendorSettings).findOne({
                where: { vendorId: context.vendorId },
            });
        },
    },

    vendorUsers: {
        type: VendorUserConnectionType,
        description: 'List sub-users belonging to the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const { limit, offset } = resolvePaginationParams(args);
            const [items, totalCount] = await getDataSource().getRepository(VendorUsers)
                .createQueryBuilder('vu')
                .where('vu.tenantId = :vendorId', { vendorId: context.vendorId })
                .andWhere('vu.deleteFlag = 0')
                .orderBy('vu.id', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorBanners: {
        type: BannerConnectionType,
        description: 'List banners belonging to the authenticated Vendor.',
        args: {
            first: { type: GraphQLInt },
            after: { type: GraphQLString },
            limit: { type: GraphQLInt },
            offset: { type: GraphQLInt },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const { limit, offset } = resolvePaginationParams(args);
            const [items, totalCount] = await getDataSource().getRepository(Banner)
                .createQueryBuilder('b')
                .where('b.tenantId = :vendorId', { vendorId: context.vendorId })
                .orderBy('b.bannerId', 'DESC')
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            return buildConnection(items, totalCount, limit, offset);
        },
    },

    vendorTaxes: {
        type: new GraphQLList(TaxType),
        description: 'List active tax configurations.',
        resolve: async (_parent: any, _args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            return await getDataSource().getRepository(Tax).find({
                where: { taxStatus: 1 },
                order: { taxId: 'ASC' },
            });
        },
    },
};
