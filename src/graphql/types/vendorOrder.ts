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
import { Order } from '../../api/core/models/Order';
import { OrderProduct } from '../../api/core/models/OrderProduct';
import { OrderStatus } from '../../api/core/models/OrderStatus';
import { VendorPayment } from '../../api/core/models/VendorPayment';
import { Customer } from '../../api/core/models/Customer';
import { Product } from '../../api/core/models/ProductModel';
import { CustomerType } from './vendorCustomer';
import { VendorPaymentType } from './vendorProfile';
import { VendorProductType } from './vendorProduct';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';
import { createConnectionType, SortDirectionEnum } from './common';

export const OrderStatusType = new GraphQLObjectType({
    name: 'OrderStatus',
    fields: () => ({
        orderStatusId: { type: GraphQLInt },
        name: { type: GraphQLString },
        colorCode: { type: GraphQLString },
        priority: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
    }),
});

export const OrderProductType = new GraphQLObjectType({
    name: 'OrderProduct',
    fields: () => ({
        orderProductId: { type: GraphQLInt },
        productId: { type: GraphQLInt },
        orderProductPrefixId: { type: GraphQLString },
        orderId: { type: GraphQLInt },
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        productPrice: { type: GraphQLFloat },
        discountAmount: { type: GraphQLFloat },
        basePrice: { type: GraphQLFloat },
        taxType: { type: GraphQLInt },
        taxValue: { type: GraphQLFloat },
        total: { type: GraphQLFloat },
        discountedAmount: { type: GraphQLFloat },
        orderStatusId: { type: GraphQLInt },
        trackingUrl: { type: GraphQLString },
        trackingNo: { type: GraphQLString },
        skuName: { type: GraphQLString },
        priceGroupDetailId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        productInformationDetail: {
            type: VendorProductType,
            resolve: async (op: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (op.productInformationDetail) {
                    return op.productInformationDetail;
                }
                if (!op.productId) {
                    return null;
                }
                return await getDataSource().getRepository(Product).findOne({
                    where: { productId: op.productId },
                });
            },
        },
        orderStatus: {
            type: OrderStatusType,
            resolve: async (op: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (op.orderStatus) {
                    return op.orderStatus;
                }
                if (!op.orderStatusId) {
                    return null;
                }
                return await getDataSource().getRepository(OrderStatus).findOne({
                    where: { orderStatusId: op.orderStatusId },
                });
            },
        },
    }),
});

export const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        orderId: { type: GraphQLInt },
        customerId: { type: GraphQLInt },
        orderPrefixId: { type: GraphQLString },
        invoiceNo: { type: GraphQLString },
        invoicePrefix: { type: GraphQLString },
        email: { type: GraphQLString },
        telephone: { type: GraphQLString },
        shippingFirstname: { type: GraphQLString },
        shippingLastname: { type: GraphQLString },
        shippingAddress1: { type: GraphQLString },
        shippingCity: { type: GraphQLString },
        shippingPostcode: { type: GraphQLString },
        shippingCountry: { type: GraphQLString },
        shippingZone: { type: GraphQLString },
        paymentFirstname: { type: GraphQLString },
        paymentLastname: { type: GraphQLString },
        paymentMethod: { type: GraphQLString },
        paymentStatus: { type: GraphQLInt },
        paymentType: { type: GraphQLString },
        total: { type: GraphQLFloat },
        amount: { type: GraphQLFloat },
        currencyCode: { type: GraphQLString },
        currencySymbolLeft: { type: GraphQLString },
        orderStatusId: { type: GraphQLInt },
        tenantId: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        customer: {
            type: CustomerType,
            resolve: async (order: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (order.customer) {
                    return order.customer;
                }
                if (!order.customerId) {
                    return null;
                }
                return await getDataSource().getRepository(Customer).findOne({
                    where: { id: order.customerId },
                });
            },
        },
        orderStatus: {
            type: OrderStatusType,
            resolve: async (order: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (order.orderStatus) {
                    return order.orderStatus;
                }
                if (!order.orderStatusId) {
                    return null;
                }
                return await getDataSource().getRepository(OrderStatus).findOne({
                    where: { orderStatusId: order.orderStatusId },
                });
            },
        },
    }),
});

export const VendorOrderType = new GraphQLObjectType({
    name: 'VendorOrder',
    description: 'Vendor sub-order with nested Order, OrderProduct, OrderStatus and VendorPayment.',
    fields: () => ({
        vendorOrderId: { type: GraphQLInt },
        subOrderId: { type: GraphQLString },
        vendorId: { type: GraphQLInt },
        subOrderStatusId: { type: GraphQLInt },
        orderProductId: { type: GraphQLInt },
        orderId: { type: GraphQLInt },
        total: { type: GraphQLFloat },
        commission: { type: GraphQLFloat },
        trackingUrl: { type: GraphQLString },
        trackingNo: { type: GraphQLString },
        makeSettlement: { type: GraphQLInt },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        orderDetail: {
            type: OrderType,
            resolve: async (vo: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (vo.orderDetail) {
                    return vo.orderDetail;
                }
                if (!vo.orderId) {
                    return null;
                }
                return await getDataSource().getRepository(Order).findOne({
                    where: { orderId: vo.orderId },
                });
            },
        },
        orderProductDetail: {
            type: OrderProductType,
            resolve: async (vo: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (vo.orderProductDetail || vo.orderProduct) {
                    return vo.orderProductDetail || vo.orderProduct;
                }
                if (!vo.orderProductId) {
                    return null;
                }
                return await getDataSource().getRepository(OrderProduct).findOne({
                    where: { orderProductId: vo.orderProductId },
                });
            },
        },
        orderStatus: {
            type: OrderStatusType,
            resolve: async (vo: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                if (!vo.subOrderStatusId) {
                    return null;
                }
                return await getDataSource().getRepository(OrderStatus).findOne({
                    where: { orderStatusId: vo.subOrderStatusId },
                });
            },
        },
        vendorPayment: {
            type: new GraphQLList(VendorPaymentType),
            resolve: async (vo: any, _args: any, context: VendorGraphQLContext) => {
                requireVendorAuth(context);
                return await getDataSource().getRepository(VendorPayment).find({
                    where: { vendorOrderId: vo.vendorOrderId, vendorId: context.vendorId },
                });
            },
        },
    }),
});

export const VendorOrderSortFieldEnum = new GraphQLEnumType({
    name: 'VendorOrderSortField',
    values: {
        VENDOR_ORDER_ID: { value: 'vendorOrderId' },
        TOTAL: { value: 'total' },
        CREATED_DATE: { value: 'createdDate' },
    },
});

export const VendorOrderFilterInput = new GraphQLInputObjectType({
    name: 'VendorOrderFilterInput',
    fields: {
        subOrderId: { type: GraphQLString },
        subOrderStatusId: { type: GraphQLInt },
        orderId: { type: GraphQLInt },
        makeSettlement: { type: GraphQLInt },
    },
});

export const VendorOrderSortInput = new GraphQLInputObjectType({
    name: 'VendorOrderSortInput',
    fields: {
        field: { type: VendorOrderSortFieldEnum },
        direction: { type: SortDirectionEnum },
    },
});

export const VendorOrderConnectionType = createConnectionType('VendorOrder', VendorOrderType);
