import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { vendorProfileQueries } from './resolvers/vendorProfileResolver';
import { vendorProductQueries } from './resolvers/vendorProductResolver';
import { vendorOrderQueries } from './resolvers/vendorOrderResolver';
import { vendorCatalogAndCustomerQueries } from './resolvers/vendorCatalogAndCustomerResolver';
import { vendorMutations } from './resolvers/vendorMutations';

const RootQueryType = new GraphQLObjectType({
    name: 'VendorQuery',
    description: 'Shopify-style GraphQL Query API strictly for authenticated SpurtCommerce Vendors.',
    fields: () => ({
        ...vendorProfileQueries,
        ...vendorProductQueries,
        ...vendorOrderQueries,
        ...vendorCatalogAndCustomerQueries,
    }),
});

const RootMutationType = new GraphQLObjectType({
    name: 'VendorMutation',
    description: 'Shopify-style GraphQL Mutation API strictly for authenticated SpurtCommerce Vendors.',
    fields: () => ({
        ...vendorMutations,
    }),
});

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});
