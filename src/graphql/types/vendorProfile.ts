import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { VendorSettings } from '../../api/core/models/VendorSettings';
import { VendorUsers } from '../../api/core/models/VendorUsers';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';
import { createConnectionType } from './common';

export const VendorSettingsType = new GraphQLObjectType({
    name: 'VendorSettings',
    description: 'Vendor store settings.',
    fields: () => ({
        id: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
        storeName: { type: GraphQLString },
        storeEmail: { type: GraphQLString },
        storeMobileNo: { type: GraphQLString },
        storeUrl: { type: GraphQLString },
        storeAddressLine1: { type: GraphQLString },
        storeCity: { type: GraphQLString },
        siteName: { type: GraphQLString },
        businessName: { type: GraphQLString },
        invoicePrefix: { type: GraphQLString },
        isMaintenance: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
    }),
});

export const VendorProfileType = new GraphQLObjectType({
    name: 'VendorProfile',
    description: 'Authenticated Vendor profile and store details.',
    fields: () => ({
        vendorId: { type: GraphQLInt },
        vendorPrefixId: { type: GraphQLString },
        customerId: { type: GraphQLInt },
        vendorGroupId: { type: GraphQLInt },
        commission: { type: GraphQLFloat },
        industryId: { type: GraphQLInt },
        contactPersonName: { type: GraphQLString },
        vendorSlugName: { type: GraphQLString },
        designation: { type: GraphQLString },
        companyName: { type: GraphQLString },
        companyLocation: { type: GraphQLString },
        companyAddress1: { type: GraphQLString },
        companyAddress2: { type: GraphQLString },
        companyCity: { type: GraphQLString },
        companyState: { type: GraphQLString },
        zoneId: { type: GraphQLInt },
        companyCountryId: { type: GraphQLInt },
        pincode: { type: GraphQLInt },
        companyDescription: { type: GraphQLString },
        companyMobileNumber: { type: GraphQLString },
        companyEmailId: { type: GraphQLString },
        companyWebsite: { type: GraphQLString },
        companyGstNumber: { type: GraphQLString },
        companyPanNumber: { type: GraphQLString },
        companyLogo: { type: GraphQLString },
        companyLogoPath: { type: GraphQLString },
        companyCoverImage: { type: GraphQLString },
        companyCoverImagePath: { type: GraphQLString },
        displayNameUrl: { type: GraphQLString },
        approvalFlag: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        isEmailVerify: { type: GraphQLInt },
        kycStatus: { type: GraphQLString },
        appId: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        settings: {
            type: VendorSettingsType,
            resolve: async (vendor: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                return await getDataSource().getRepository(VendorSettings).findOne({
                    where: { vendorId: context.vendorId },
                });
            },
        },
        users: {
            type: new GraphQLList(VendorUserType),
            resolve: async (vendor: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                return await getDataSource().getRepository(VendorUsers).find({
                    where: { tenantId: context.vendorId, deleteFlag: 0 },
                });
            },
        },
    }),
});

export const VendorUserType = new GraphQLObjectType({
    name: 'VendorUser',
    description: 'Vendor dashboard user account.',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        avatar: { type: GraphQLString },
        avatarPath: { type: GraphQLString },
        userGroupId: { type: GraphQLInt },
        tenantId: { type: GraphQLInt },
        isSuperVendor: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        lastLogin: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        vendor: { type: VendorProfileType },
    }),
});

export const VendorDashboardStatsType = new GraphQLObjectType({
    name: 'VendorDashboardStats',
    description: 'Aggregated vendor dashboard KPIs.',
    fields: {
        totalProducts: { type: GraphQLInt },
        activeProducts: { type: GraphQLInt },
        totalOrders: { type: GraphQLInt },
        totalRevenue: { type: GraphQLFloat },
        totalCustomers: { type: GraphQLInt },
        pendingOrders: { type: GraphQLInt },
        lowStockSkus: { type: GraphQLInt },
    },
});

export const VendorPaymentType = new GraphQLObjectType({
    name: 'VendorPayment',
    description: 'Vendor settlement / transaction record.',
    fields: () => ({
        vendorPaymentId: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
        vendorOrderId: { type: GraphQLInt },
        orderId: { type: GraphQLInt },
        paymentItemId: { type: GraphQLInt },
        amount: { type: GraphQLFloat },
        commissionAmount: { type: GraphQLFloat },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        settings: {
            type: VendorSettingsType,
            resolve: async (vendor: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                return await getDataSource().getRepository(VendorSettings).findOne({
                    where: { vendorId: context.vendorId },
                });
            },
        },
        users: {
            type: new GraphQLList(VendorUserType),
            resolve: async (vendor: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                return await getDataSource().getRepository(VendorUsers).find({
                    where: { tenantId: context.vendorId, deleteFlag: 0 },
                });
            },
        },
    }),
});

export const BannerType = new GraphQLObjectType({
    name: 'Banner',
    description: 'Vendor storefront banner.',
    fields: () => ({
        bannerId: { type: GraphQLInt },
        title: { type: GraphQLString },
        sortOrder: { type: GraphQLInt },
        url: { type: GraphQLString },
        link: { type: GraphQLString },
        content: { type: GraphQLString },
        position: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        tenantId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
    }),
});

export const TaxType = new GraphQLObjectType({
    name: 'Tax',
    description: 'Tax configuration.',
    fields: () => ({
        taxId: { type: GraphQLInt },
        taxName: { type: GraphQLString },
        taxPercentage: { type: GraphQLFloat },
        taxStatus: { type: GraphQLInt },
    }),
});

export const VendorPaymentConnectionType = createConnectionType('VendorPayment', VendorPaymentType);
export const VendorUserConnectionType = createConnectionType('VendorUser', VendorUserType);
export const BannerConnectionType = createConnectionType('Banner', BannerType);
