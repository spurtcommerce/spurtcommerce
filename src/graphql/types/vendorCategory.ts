import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { createConnectionType } from './common';

export const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'Product category.',
    fields: () => ({
        categoryId: { type: GraphQLInt },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        imagePath: { type: GraphQLString },
        parentInt: { type: GraphQLInt },
        sortOrder: { type: GraphQLInt },
        categorySlug: { type: GraphQLString },
        industryId: { type: GraphQLInt },
        tenantId: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
        categoryDescription: { type: GraphQLString },
        familyId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
    }),
});

export const VendorCategoryType = new GraphQLObjectType({
    name: 'VendorCategory',
    description: 'Category assigned to the authenticated Vendor.',
    fields: () => ({
        vendorCategoryId: { type: GraphQLInt },
        vendorId: { type: GraphQLInt },
        categoryId: { type: GraphQLInt },
        vendorCategoryCommission: { type: GraphQLInt },
        category: { type: CategoryType },
    }),
});

export const CategoryConnectionType = createConnectionType('Category', CategoryType);
export const VendorCategoryConnectionType = createConnectionType('VendorCategory', VendorCategoryType);
