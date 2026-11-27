import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { getDataSource } from '../../loaders/typeormLoader';
import { CustomerGroup } from '../../api/core/models/CustomerGroup';
import { CustomerToGroup } from '../../api/core/models/CustomerToGroup';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';
import { createConnectionType } from './common';

export const CustomerGroupType = new GraphQLObjectType({
    name: 'CustomerGroup',
    description: 'Vendor customer group.',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        colorCode: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        isDelete: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
        paymentTermId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
    }),
});

export const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    description: 'Customer / buyer accessible by the authenticated Vendor.',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        dob: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        address: { type: GraphQLString },
        countryId: { type: GraphQLInt },
        zoneId: { type: GraphQLInt },
        city: { type: GraphQLString },
        avatar: { type: GraphQLString },
        avatarPath: { type: GraphQLString },
        customerGroupId: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        customerGroup: {
            type: CustomerGroupType,
            resolve: async (customer: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (customer.customerGroup) {
                    return customer.customerGroup;
                }
                if (!customer.customerGroupId) {
                    return null;
                }
                return await getDataSource().getRepository(CustomerGroup).findOne({
                    where: { id: customer.customerGroupId, vendorId: context.vendorId },
                });
            },
        },
        customerGroups: {
            type: new GraphQLList(CustomerGroupType),
            resolve: async (customer: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                const mappings = await getDataSource().getRepository(CustomerToGroup).find({
                    where: { customerId: customer.id },
                    relations: ['customerGroup'],
                });
                return mappings
                    .map(m => m.customerGroup)
                    .filter((g: any) => g && Number(g.vendorId) === context.vendorId);
            },
        },
    }),
});

export const ProductRatingType = new GraphQLObjectType({
    name: 'ProductRating',
    description: 'Customer rating and review for a vendor product.',
    fields: () => ({
        ratingId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        orderProductId: { type: GraphQLInt },
        customerId: { type: GraphQLString },
        skuId: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        rating: { type: GraphQLInt },
        review: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
    }),
});

export const CustomerConnectionType = createConnectionType('Customer', CustomerType);
export const CustomerGroupConnectionType = createConnectionType('CustomerGroup', CustomerGroupType);
export const ProductRatingConnectionType = createConnectionType('ProductRating', ProductRatingType);
