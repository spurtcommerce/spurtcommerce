import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { Container } from 'typedi';
import { getDataSource } from '../../loaders/typeormLoader';
import { Product } from '../../api/core/models/ProductModel';
import { Sku } from '../../api/core/models/SkuModel';
import { VendorProducts } from '../../api/core/models/VendorProducts';
import { ProductToCategory } from '../../api/core/models/ProductToCategory';
import { ProductImage } from '../../api/core/models/ProductImage';
import { VendorOrders } from '../../api/core/models/VendorOrders';
import { Order } from '../../api/core/models/Order';
import { OrderProduct } from '../../api/core/models/OrderProduct';
import { CustomerGroup } from '../../api/core/models/CustomerGroup';
import { CustomerToGroup } from '../../api/core/models/CustomerToGroup';
import { ProductRating } from '../../api/core/models/ProductRating';
import { Vendor } from '../../api/core/models/Vendor';
import { VendorUsers } from '../../api/core/models/VendorUsers';
import { VendorSettings } from '../../api/core/models/VendorSettings';
import { Banner } from '../../api/core/models/Banner';
import { Country } from '../../api/core/models/Country';
import moment from 'moment';
import { ProductService } from '../../api/core/services/ProductService';
import { SkuService } from '../../api/core/services/SkuService';
import { VendorProductService } from '../../api/core/services/VendorProductService';
import { VendorProductType, SkuType } from '../types/vendorProduct';
import { OrderType, VendorOrderType } from '../types/vendorOrder';
import { CustomerGroupType, ProductRatingType } from '../types/vendorCustomer';
import { BannerType, VendorProfileType } from '../types/vendorProfile';
import { UserErrorType } from '../types/common';
import { requireVendorAuth, VendorGraphQLContext } from '../context/vendorAuthContext';

const CreateVendorProductInput = new GraphQLInputObjectType({
    name: 'CreateVendorProductInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        sku: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        quantity: { type: GraphQLInt },
        description: { type: GraphQLString },
        upc: { type: GraphQLString },
        hsn: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        categoryIds: { type: new GraphQLList(GraphQLInt) },
        image: { type: GraphQLString },
        containerName: { type: GraphQLString },
    },
});

const UpdateVendorProductInput = new GraphQLInputObjectType({
    name: 'UpdateVendorProductInput',
    fields: {
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        description: { type: GraphQLString },
        upc: { type: GraphQLString },
        hsn: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        isFeatured: { type: GraphQLInt },
        categoryIds: { type: new GraphQLList(GraphQLInt) },
        image: { type: GraphQLString },
        containerName: { type: GraphQLString },
    },
});

const UpdateVendorStockInput = new GraphQLInputObjectType({
    name: 'UpdateVendorStockInput',
    fields: {
        skuId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        outOfStockThreshold: { type: GraphQLInt },
    },
});

const CreateVendorOrderItemInput = new GraphQLInputObjectType({
    name: 'CreateVendorOrderItemInput',
    fields: {
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        skuName: { type: GraphQLString },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
    },
});

const CreateVendorOrderInput = new GraphQLInputObjectType({
    name: 'CreateVendorOrderInput',
    fields: {
        customerId: { type: GraphQLInt },
        emailId: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        shippingFirstName: { type: new GraphQLNonNull(GraphQLString) },
        shippingLastName: { type: GraphQLString },
        shippingAddress1: { type: new GraphQLNonNull(GraphQLString) },
        shippingCity: { type: new GraphQLNonNull(GraphQLString) },
        shippingZone: { type: new GraphQLNonNull(GraphQLString) },
        shippingPostCode: { type: new GraphQLNonNull(GraphQLString) },
        shippingCountryId: { type: new GraphQLNonNull(GraphQLInt) },
        paymentMethod: { type: GraphQLInt },
        notes: { type: GraphQLString },
        items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CreateVendorOrderItemInput))) },
    },
});

const CreateVendorOrderPayloadType = new GraphQLObjectType({
    name: 'CreateVendorOrderPayload',
    fields: {
        order: { type: OrderType },
        vendorOrders: { type: new GraphQLList(VendorOrderType) },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const UpdateVendorOrderStatusInput = new GraphQLInputObjectType({
    name: 'UpdateVendorOrderStatusInput',
    fields: {
        vendorOrderId: { type: new GraphQLNonNull(GraphQLInt) },
        subOrderStatusId: { type: new GraphQLNonNull(GraphQLInt) },
        trackingNo: { type: GraphQLString },
        trackingUrl: { type: GraphQLString },
    },
});

const VendorCustomerGroupInput = new GraphQLInputObjectType({
    name: 'VendorCustomerGroupInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        colorCode: { type: GraphQLString },
        isActive: { type: GraphQLInt },
        customerIds: { type: new GraphQLList(GraphQLInt) },
    },
});

const UpdateVendorUserNestedInput = new GraphQLInputObjectType({
    name: 'UpdateVendorUserNestedInput',
    fields: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
    },
});

const UpdateVendorSettingsNestedInput = new GraphQLInputObjectType({
    name: 'UpdateVendorSettingsNestedInput',
    fields: {
        storeName: { type: GraphQLString },
        storeEmail: { type: GraphQLString },
        storeMobileNo: { type: GraphQLString },
        siteName: { type: GraphQLString },
        businessName: { type: GraphQLString },
    },
});

const UpdateVendorProfileInput = new GraphQLInputObjectType({
    name: 'UpdateVendorProfileInput',
    fields: {
        contactPersonName: { type: GraphQLString },
        companyName: { type: GraphQLString },
        companyLocation: { type: GraphQLString },
        companyAddress1: { type: GraphQLString },
        companyAddress2: { type: GraphQLString },
        companyCity: { type: GraphQLString },
        companyState: { type: GraphQLString },
        companyDescription: { type: GraphQLString },
        companyMobileNumber: { type: GraphQLString },
        companyWebsite: { type: GraphQLString },
        user: { type: UpdateVendorUserNestedInput },
        settings: { type: UpdateVendorSettingsNestedInput },
    },
});

const VendorBannerInput = new GraphQLInputObjectType({
    name: 'VendorBannerInput',
    fields: {
        bannerId: { type: GraphQLInt },
        bannerGroupId: { type: GraphQLInt },
        title: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: GraphQLString },
        content: { type: GraphQLString },
        position: { type: GraphQLString },
        sortOrder: { type: GraphQLInt },
        isActive: { type: GraphQLInt },
    },
});

const VendorBannerPayloadType = new GraphQLObjectType({
    name: 'VendorBannerPayload',
    fields: {
        banner: { type: BannerType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorProductPayloadType = new GraphQLObjectType({
    name: 'VendorProductPayload',
    fields: {
        product: { type: VendorProductType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorStockPayloadType = new GraphQLObjectType({
    name: 'VendorStockPayload',
    fields: {
        sku: { type: SkuType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const DeletePayloadType = new GraphQLObjectType({
    name: 'DeletePayload',
    fields: {
        deletedId: { type: GraphQLInt },
        success: { type: new GraphQLNonNull(GraphQLBoolean) },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorOrderPayloadType = new GraphQLObjectType({
    name: 'VendorOrderPayload',
    fields: {
        vendorOrder: { type: VendorOrderType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorCustomerGroupPayloadType = new GraphQLObjectType({
    name: 'VendorCustomerGroupPayload',
    fields: {
        customerGroup: { type: CustomerGroupType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorProductRatingPayloadType = new GraphQLObjectType({
    name: 'VendorProductRatingPayload',
    fields: {
        rating: { type: ProductRatingType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

const VendorProfilePayloadType = new GraphQLObjectType({
    name: 'VendorProfilePayload',
    fields: {
        vendor: { type: VendorProfileType },
        userErrors: { type: new GraphQLNonNull(new GraphQLList(UserErrorType)) },
    },
});

export const vendorMutations = {
    vendorProductCreate: {
        type: VendorProductPayloadType,
        description: 'Create a new product owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(CreateVendorProductInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'create-product');
            const ds = getDataSource();
            const productService = Container.get(ProductService);
            const skuService = Container.get(SkuService);
            const vendorProductService = Container.get(VendorProductService);

            const existingSku = await skuService.findOne({ where: { skuName: input.sku } });
            if (existingSku) {
                return {
                    product: null,
                    userErrors: [{ field: ['input', 'sku'], message: `SKU "${input.sku}" already exists.` }],
                };
            }

            if (Number(input.price) <= 0) {
                return {
                    product: null,
                    userErrors: [{ field: ['input', 'price'], message: 'Product price must be greater than 0.' }],
                };
            }

            const newSku = new Sku();
            newSku.skuName = input.sku;
            newSku.price = String(input.price);
            newSku.quantity = input.quantity ?? 0;
            newSku.isActive = 1;
            newSku.vendorId = context.vendorId;
            const savedSku = await skuService.create(newSku);

            const slug = input.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
            const newProduct = new Product();
            newProduct.name = input.name;
            newProduct.sku = input.sku;
            newProduct.skuId = savedSku.id;
            newProduct.price = Number(input.price);
            newProduct.quantity = input.quantity ?? 1;
            newProduct.description = input.description || '';
            newProduct.upc = input.upc || '';
            newProduct.hsn = input.hsn || '';
            if (input.image) {
                newProduct.image = input.image;
                newProduct.imagePath = input.containerName || '';
            }
            newProduct.productSlug = slug;
            newProduct.stockStatusId = 1;
            newProduct.taxType = 0;
            newProduct.taxValue = 0;
            newProduct.shipping = 1;
            newProduct.hasTirePrice = 0;
            newProduct.hasStock = 0;
            newProduct.sortOrder = 1;
            newProduct.width = '0';
            newProduct.height = '0';
            newProduct.weight = '0';
            newProduct.length = '0';
            newProduct.dateAvailable = new Date();
            newProduct.keywords = `~${input.name}~`;
            newProduct.isActive = input.isActive ?? 1;
            newProduct.deleteFlag = 0;
            newProduct.owner = 2;
            newProduct.createdBy = context.vendorId;
            const savedProduct = await productService.create(newProduct);

            const vp = new VendorProducts();
            vp.productId = savedProduct.productId;
            vp.vendorId = context.vendorId;
            vp.sku_id = savedSku.id;
            vp.approvalFlag = 1;
            vp.approvedBy = context.userId;
            await vendorProductService.create(vp);

            if (Array.isArray(input.categoryIds)) {
                const ptcRepo = ds.getRepository(ProductToCategory);
                for (const categoryId of input.categoryIds) {
                    const ptc = new ProductToCategory();
                    ptc.productId = savedProduct.productId;
                    ptc.categoryId = categoryId;
                    ptc.isActive = 1;
                    await ptcRepo.save(ptc);
                }
            }

            if (input.image) {
                const imgRepo = ds.getRepository(ProductImage);
                const img = new ProductImage();
                img.productId = savedProduct.productId;
                img.image = input.image;
                img.containerName = input.containerName || '';
                img.defaultImage = 1;
                img.sortOrder = 1;
                img.isActive = 1;
                await imgRepo.save(img);
            }

            return { product: savedProduct, userErrors: [] };
        },
    },

    vendorProductUpdate: {
        type: VendorProductPayloadType,
        description: 'Update an existing product owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(UpdateVendorProductInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'edit-product');
            const ds = getDataSource();

            const ownership = await ds.getRepository(VendorProducts).findOne({
                where: { productId: input.productId, vendorId: context.vendorId },
            });
            if (!ownership) {
                return {
                    product: null,
                    userErrors: [{ field: ['input', 'productId'], message: 'Product not found or access denied.' }],
                };
            }

            const productRepo = ds.getRepository(Product);
            const product = await productRepo.findOne({ where: { productId: input.productId, deleteFlag: 0 } });
            if (!product) {
                return {
                    product: null,
                    userErrors: [{ field: ['input', 'productId'], message: 'Product not found.' }],
                };
            }

            if (input.name !== undefined) { product.name = input.name; }
            if (input.price !== undefined) { product.price = Number(input.price); }
            if (input.quantity !== undefined) { product.quantity = Number(input.quantity); }
            if (input.description !== undefined) { product.description = input.description; }
            if (input.upc !== undefined) { product.upc = input.upc; }
            if (input.hsn !== undefined) { product.hsn = input.hsn; }
            if (input.isActive !== undefined) { product.isActive = input.isActive; }
            if (input.isFeatured !== undefined) { product.isFeatured = input.isFeatured; }
            if (input.image !== undefined) { product.image = input.image; }
            if (input.containerName !== undefined) { product.imagePath = input.containerName; }
            product.modifiedBy = context.vendorId;

            const updated = await productRepo.save(product);

            if (product.skuId && (input.price !== undefined || input.quantity !== undefined)) {
                const skuRepo = ds.getRepository(Sku);
                const sku = await skuRepo.findOne({ where: { id: product.skuId } });
                if (sku) {
                    if (input.price !== undefined) { sku.price = String(input.price); }
                    if (input.quantity !== undefined) { sku.quantity = Number(input.quantity); }
                    await skuRepo.save(sku);
                }
            }

            if (Array.isArray(input.categoryIds)) {
                const ptcRepo = ds.getRepository(ProductToCategory);
                await ptcRepo.delete({ productId: product.productId });
                for (const categoryId of input.categoryIds) {
                    const ptc = new ProductToCategory();
                    ptc.productId = product.productId;
                    ptc.categoryId = categoryId;
                    ptc.isActive = 1;
                    await ptcRepo.save(ptc);
                }
            }

            if (input.image) {
                const imgRepo = ds.getRepository(ProductImage);
                const img = new ProductImage();
                img.productId = product.productId;
                img.image = input.image;
                img.containerName = input.containerName || '';
                img.defaultImage = 0;
                img.sortOrder = 1;
                img.isActive = 1;
                await imgRepo.save(img);
            }

            return { product: updated, userErrors: [] };
        },
    },

    vendorProductUpdateStock: {
        type: VendorStockPayloadType,
        description: 'Update inventory stock level for a SKU owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(UpdateVendorStockInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'update-stock');
            const ds = getDataSource();
            const skuRepo = ds.getRepository(Sku);

            const ownership = await ds.getRepository(VendorProducts)
                .createQueryBuilder('vp')
                .innerJoin('vp.product', 'p')
                .where('vp.vendorId = :vendorId', { vendorId: context.vendorId })
                .andWhere('(vp.sku_id = :skuId OR p.skuId = :skuId)', { skuId: input.skuId })
                .getOne();

            const sku = await skuRepo.findOne({ where: { id: input.skuId } });
            if (!sku || (!ownership && Number(sku.vendorId) !== context.vendorId)) {
                return {
                    sku: null,
                    userErrors: [{ field: ['input', 'skuId'], message: 'SKU not found or access denied.' }],
                };
            }

            sku.quantity = Number(input.quantity);
            if (input.outOfStockThreshold !== undefined) {
                sku.outOfStockThreshold = Number(input.outOfStockThreshold);
            }
            const updatedSku = await skuRepo.save(sku);

            await ds.getRepository(Product).update({ skuId: sku.id }, { quantity: Number(input.quantity) });

            return { sku: updatedSku, userErrors: [] };
        },
    },

    vendorProductDelete: {
        type: DeletePayloadType,
        description: 'Soft-delete a product owned by the authenticated Vendor.',
        args: {
            productId: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            const { productId } = args;
            requireVendorAuth(context, 'delete-product');
            const ds = getDataSource();

            const ownership = await ds.getRepository(VendorProducts).findOne({
                where: { productId, vendorId: context.vendorId },
            });
            if (!ownership) {
                return {
                    deletedId: null,
                    success: false,
                    userErrors: [{ field: ['productId'], message: 'Product not found or access denied.' }],
                };
            }

            await ds.getRepository(Product).update({ productId }, { deleteFlag: 1, modifiedBy: context.vendorId });
            return { deletedId: productId, success: true, userErrors: [] };
        },
    },

    vendorOrderCreate: {
        type: CreateVendorOrderPayloadType,
        description: 'Create an order for products owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(CreateVendorOrderInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'create-order');
            const ds = getDataSource();

            if (!Array.isArray(input.items) || input.items.length === 0) {
                return {
                    order: null,
                    vendorOrders: [],
                    userErrors: [{ field: ['input', 'items'], message: 'At least one order item is required.' }],
                };
            }

            const preparedItems: Array<{ product: Product; sku: Sku | null; quantity: number; unitPrice: number; total: number }> = [];
            let orderTotal = 0;

            for (const item of input.items) {
                if (!item.quantity || item.quantity <= 0) {
                    return {
                        order: null,
                        vendorOrders: [],
                        userErrors: [{ field: ['input', 'items'], message: `Quantity must be greater than 0 for productId ${item.productId}.` }],
                    };
                }

                const ownership = await ds.getRepository(VendorProducts).findOne({
                    where: { productId: item.productId, vendorId: context.vendorId },
                });
                const product = await ds.getRepository(Product).findOne({
                    where: { productId: item.productId, deleteFlag: 0 },
                });
                if (!ownership || !product) {
                    return {
                        order: null,
                        vendorOrders: [],
                        userErrors: [{ field: ['input', 'items'], message: `Product ${item.productId} not found or access denied.` }],
                    };
                }

                let sku: Sku | null = null;
                if (item.skuName) {
                    sku = await ds.getRepository(Sku).findOne({ where: { skuName: item.skuName } });
                } else if (product.skuId) {
                    sku = await ds.getRepository(Sku).findOne({ where: { id: product.skuId } });
                }

                const unitPrice = Number(sku ? sku.price : product.price);
                const lineTotal = unitPrice * Number(item.quantity);
                orderTotal += lineTotal;
                preparedItems.push({ product, sku, quantity: Number(item.quantity), unitPrice, total: lineTotal });
            }

            const vendorSetting = await ds.getRepository(VendorSettings).findOne({ where: { vendorId: context.vendorId } });
            const country = await ds.getRepository(Country).findOne({ where: { countryId: input.shippingCountryId } });
            const invoicePrefix = vendorSetting?.invoicePrefix || 'SPURT';

            const newOrder = new Order();
            newOrder.customerId = input.customerId ?? 0;
            newOrder.email = input.emailId;
            newOrder.telephone = Number(input.phoneNumber) || 0;
            newOrder.shippingFirstname = input.shippingFirstName;
            newOrder.shippingLastname = input.shippingLastName || '';
            newOrder.shippingAddress1 = input.shippingAddress1;
            newOrder.shippingCity = input.shippingCity;
            newOrder.shippingZone = input.shippingZone;
            newOrder.shippingPostcode = input.shippingPostCode;
            newOrder.shippingCountryId = input.shippingCountryId;
            newOrder.shippingCountry = country?.name || '';
            newOrder.paymentFirstname = input.shippingFirstName;
            newOrder.paymentLastname = input.shippingLastName || '';
            newOrder.paymentAddress1 = input.shippingAddress1;
            newOrder.paymentCity = input.shippingCity;
            newOrder.paymentZone = input.shippingZone;
            newOrder.paymentPostcode = input.shippingPostCode;
            newOrder.paymentCountryId = input.shippingCountryId;
            newOrder.paymentCountry = country?.name || '';
            newOrder.paymentMethod = String(input.paymentMethod ?? 1);
            newOrder.paymentStatus = 0;
            newOrder.orderStatusId = vendorSetting?.orderStatus ?? 1;
            newOrder.invoicePrefix = invoicePrefix;
            newOrder.total = orderTotal;
            newOrder.amount = orderTotal;
            newOrder.currencyCode = 'USD';
            newOrder.currencySymbolLeft = '$';
            newOrder.currencySymbolRight = '';
            newOrder.tenantId = context.vendorId;
            newOrder.isActive = 1;
            newOrder.poNumber = '';
            newOrder.mustShipBefore = moment().format('YYYY-MM-DD HH:mm:ss');
            newOrder.paymentMobileNumber = '0';
            newOrder.paymentRuleId = input.paymentMethod ?? 1;
            newOrder.shippingCostOverride = 0;
            newOrder.notes = input.notes || '';
            newOrder.createdByType = 'seller';
            newOrder.orderSource = 'shopping-cart';
            newOrder.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            newOrder.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');

            const savedOrder = await ds.getRepository(Order).save(newOrder);
            const odrDate = moment().format('YYYYMMDD');
            savedOrder.orderPrefixId = `${invoicePrefix}-${odrDate}${savedOrder.orderId}`;
            savedOrder.invoiceNo = `INV00${savedOrder.orderId}`;
            await ds.getRepository(Order).save(savedOrder);

            const createdVendorOrders: VendorOrders[] = [];
            let idx = 1;
            for (const line of preparedItems) {
                const op = new OrderProduct();
                op.orderId = savedOrder.orderId;
                op.productId = line.product.productId;
                op.orderProductPrefixId = `${invoicePrefix}-${odrDate}${savedOrder.orderId}${idx}` as any;
                op.name = line.product.name;
                op.model = line.product.name;
                op.skuName = line.sku?.skuName || line.product.sku || '';
                op.quantity = line.quantity;
                op.productPrice = line.unitPrice;
                op.basePrice = line.unitPrice;
                op.discountAmount = 0;
                op.discountedAmount = 0;
                op.taxType = line.product.taxType ?? 0;
                op.taxValue = line.product.taxValue ?? 0;
                op.total = line.total;
                op.orderStatusId = 1;
                op.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                op.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                const savedOp = await ds.getRepository(OrderProduct).save(op);

                const vo = new VendorOrders();
                vo.subOrderId = `${invoicePrefix}-${odrDate}${savedOrder.orderId}${context.vendorId}${idx}`;
                vo.vendorId = context.vendorId;
                vo.orderId = savedOrder.orderId;
                vo.orderProductId = savedOp.orderProductId;
                vo.total = line.total;
                vo.subOrderStatusId = 1;
                vo.commission = 0;
                vo.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                const savedVo = await ds.getRepository(VendorOrders).save(vo);
                createdVendorOrders.push(savedVo);
                idx++;
            }

            return {
                order: savedOrder,
                vendorOrders: createdVendorOrders,
                userErrors: [],
            };
        },
    },

    vendorOrderUpdateStatus: {
        type: VendorOrderPayloadType,
        description: 'Update sub-order status & tracking info for a VendorOrder owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(UpdateVendorOrderStatusInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, 'edit-order');
            const ds = getDataSource();
            const voRepo = ds.getRepository(VendorOrders);

            const vo = await voRepo.findOne({
                where: { vendorOrderId: input.vendorOrderId, vendorId: context.vendorId },
            });
            if (!vo) {
                return {
                    vendorOrder: null,
                    userErrors: [{ field: ['input', 'vendorOrderId'], message: 'Vendor order not found or access denied.' }],
                };
            }

            vo.subOrderStatusId = input.subOrderStatusId;
            if (input.trackingNo !== undefined) { vo.trackingNo = input.trackingNo; }
            if (input.trackingUrl !== undefined) { vo.trackingUrl = input.trackingUrl; }
            const updatedVo = await voRepo.save(vo);

            if (vo.orderProductId) {
                await ds.getRepository(OrderProduct).update(
                    { orderProductId: vo.orderProductId },
                    {
                        orderStatusId: input.subOrderStatusId,
                        ...(input.trackingNo !== undefined ? { trackingNo: input.trackingNo } : {}),
                        ...(input.trackingUrl !== undefined ? { trackingUrl: input.trackingUrl } : {}),
                    }
                );
            }

            return { vendorOrder: updatedVo, userErrors: [] };
        },
    },

    vendorCustomerGroupSave: {
        type: VendorCustomerGroupPayloadType,
        description: 'Create or update a CustomerGroup owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(VendorCustomerGroupInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context, input.id ? 'edit-customer-group' : 'create-customer-group');
            const repo = getDataSource().getRepository(CustomerGroup);

            let group: CustomerGroup;
            if (input.id) {
                const existing = await repo.findOne({ where: { id: input.id, vendorId: context.vendorId } });
                if (!existing) {
                    return {
                        customerGroup: null,
                        userErrors: [{ field: ['input', 'id'], message: 'Customer group not found or access denied.' }],
                    };
                }
                group = existing;
            } else {
                group = new CustomerGroup();
                group.vendorId = context.vendorId;
                group.isDelete = 0;
            }

            group.name = input.name;
            if (input.description !== undefined || !input.id) { group.description = input.description ?? ''; }
            if (input.colorCode !== undefined || !input.id) { group.colorCode = input.colorCode ?? '#000000'; }
            if (input.isActive !== undefined || !input.id) { group.isActive = input.isActive ?? 1; }

            const saved = await repo.save(group);

            if (Array.isArray(input.customerIds)) {
                const ctgRepo = getDataSource().getRepository(CustomerToGroup);
                await ctgRepo.delete({ customerGroupId: saved.id });
                for (const customerId of input.customerIds) {
                    const mapping = new CustomerToGroup();
                    mapping.customerGroupId = saved.id;
                    mapping.customerId = customerId;
                    mapping.isActive = 1;
                    await ctgRepo.save(mapping);
                }
            }

            return { customerGroup: saved, userErrors: [] };
        },
    },

    vendorCustomerGroupDelete: {
        type: DeletePayloadType,
        description: 'Delete a CustomerGroup owned by the authenticated Vendor.',
        args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            const { id } = args;
            requireVendorAuth(context, 'delete-customer-group');
            const repo = getDataSource().getRepository(CustomerGroup);
            const existing = await repo.findOne({ where: { id, vendorId: context.vendorId } });
            if (!existing) {
                return {
                    deletedId: null,
                    success: false,
                    userErrors: [{ field: ['id'], message: 'Customer group not found or access denied.' }],
                };
            }
            await repo.delete({ id, vendorId: context.vendorId });
            return { deletedId: id, success: true, userErrors: [] };
        },
    },

    vendorProductRatingToggleStatus: {
        type: VendorProductRatingPayloadType,
        description: 'Approve or hide a product rating on a product owned by the authenticated Vendor.',
        args: {
            ratingId: { type: new GraphQLNonNull(GraphQLInt) },
            isActive: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const ds = getDataSource();
            const ratingRepo = ds.getRepository(ProductRating);
            const rating = await ratingRepo.findOne({ where: { ratingId: args.ratingId } });
            if (!rating) {
                return {
                    rating: null,
                    userErrors: [{ field: ['ratingId'], message: 'Rating not found.' }],
                };
            }

            const ownership = await ds.getRepository(VendorProducts).findOne({
                where: { productId: rating.productId, vendorId: context.vendorId },
            });
            if (!ownership) {
                return {
                    rating: null,
                    userErrors: [{ field: ['ratingId'], message: 'Access denied for this product rating.' }],
                };
            }

            rating.isActive = args.isActive;
            const updated = await ratingRepo.save(rating);
            return { rating: updated, userErrors: [] };
        },
    },

    vendorProfileUpdate: {
        type: VendorProfilePayloadType,
        description: 'Update the authenticated Vendor profile details.',
        args: {
            input: { type: new GraphQLNonNull(UpdateVendorProfileInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const vendorRepo = getDataSource().getRepository(Vendor);
            const vendor = await vendorRepo.findOne({ where: { vendorId: context.vendorId, isDelete: 0 } });
            if (!vendor) {
                return {
                    vendor: null,
                    userErrors: [{ field: [], message: 'Vendor profile not found.' }],
                };
            }

            if (input.contactPersonName !== undefined) { vendor.contactPersonName = input.contactPersonName; }
            if (input.companyName !== undefined) { vendor.companyName = input.companyName; }
            if (input.companyLocation !== undefined) { vendor.companyLocation = input.companyLocation; }
            if (input.companyAddress1 !== undefined) { vendor.companyAddress1 = input.companyAddress1; }
            if (input.companyAddress2 !== undefined) { vendor.companyAddress2 = input.companyAddress2; }
            if (input.companyCity !== undefined) { vendor.companyCity = input.companyCity; }
            if (input.companyState !== undefined) { vendor.companyState = input.companyState; }
            if (input.companyDescription !== undefined) { vendor.companyDescription = input.companyDescription; }
            if (input.companyMobileNumber !== undefined) { vendor.companyMobileNumber = input.companyMobileNumber; }
            if (input.companyWebsite !== undefined) { vendor.companyWebsite = input.companyWebsite; }

            const saved = await vendorRepo.save(vendor);

            // Nested update on VendorUsers (e.g. phoneNumber, firstName, lastName)
            if (input.user && context.userId) {
                const userRepo = getDataSource().getRepository(VendorUsers);
                const vendorUser = await userRepo.findOne({ where: { id: context.userId, tenantId: context.vendorId } });
                if (vendorUser) {
                    if (input.user.firstName !== undefined) { vendorUser.firstName = input.user.firstName; }
                    if (input.user.lastName !== undefined) { vendorUser.lastName = input.user.lastName; }
                    if (input.user.phoneNumber !== undefined) { vendorUser.phoneNumber = input.user.phoneNumber; }
                    await userRepo.save(vendorUser);
                }
            }

            // Nested update on VendorSettings (e.g. storeMobileNo, storeName, storeEmail)
            if (input.settings) {
                const settingsRepo = getDataSource().getRepository(VendorSettings);
                const settings = await settingsRepo.findOne({ where: { vendorId: context.vendorId } });
                if (settings) {
                    if (input.settings.storeName !== undefined) { settings.storeName = input.settings.storeName; }
                    if (input.settings.storeEmail !== undefined) { settings.storeEmail = input.settings.storeEmail; }
                    if (input.settings.storeMobileNo !== undefined) { settings.storeMobileNo = input.settings.storeMobileNo; }
                    if (input.settings.siteName !== undefined) { settings.siteName = input.settings.siteName; }
                    if (input.settings.businessName !== undefined) { settings.businessName = input.settings.businessName; }
                    await settingsRepo.save(settings);
                }
            }

            return { vendor: saved, userErrors: [] };
        },
    },

    vendorBannerSave: {
        type: VendorBannerPayloadType,
        description: 'Create or update a Banner owned by the authenticated Vendor.',
        args: {
            input: { type: new GraphQLNonNull(VendorBannerInput) },
        },
        resolve: async (_parent: any, { input }: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const repo = getDataSource().getRepository(Banner);

            let banner: Banner;
            if (input.bannerId) {
                const existing = await repo.findOne({ where: { bannerId: input.bannerId, tenantId: context.vendorId } });
                if (!existing) {
                    return {
                        banner: null,
                        userErrors: [{ field: ['input', 'bannerId'], message: 'Banner not found or access denied.' }],
                    };
                }
                banner = existing;
            } else {
                banner = new Banner();
                banner.tenantId = context.vendorId;
                banner.viewPageCount = 0;
                banner.linkType = 1;
                banner.isMiniBanner = 0;
                banner.imageType = 1;
                if (input.bannerGroupId !== undefined) {
                    banner.bannerGroupId = input.bannerGroupId;
                }
                banner.containerName = '';
                banner.url = '';
            }

            banner.title = input.title;
            banner.link = input.link ?? banner.link ?? '';
            banner.content = input.content ?? banner.content ?? '';
            banner.position = input.position ?? banner.position ?? 'top';
            banner.sortOrder = input.sortOrder ?? banner.sortOrder ?? 1;
            banner.isActive = input.isActive ?? banner.isActive ?? 1;

            const saved = await repo.save(banner);
            return { banner: saved, userErrors: [] };
        },
    },

    vendorBannerDelete: {
        type: DeletePayloadType,
        description: 'Delete a Banner owned by the authenticated Vendor.',
        args: {
            bannerId: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (_parent: any, args: any, context: VendorGraphQLContext) => {
            requireVendorAuth(context);
            const repo = getDataSource().getRepository(Banner);
            const existing = await repo.findOne({ where: { bannerId: args.bannerId, tenantId: context.vendorId } });
            if (!existing) {
                return {
                    deletedId: null,
                    success: false,
                    userErrors: [{ field: ['bannerId'], message: 'Banner not found or access denied.' }],
                };
            }
            await repo.delete({ bannerId: args.bannerId, tenantId: context.vendorId });
            return { deletedId: args.bannerId, success: true, userErrors: [] };
        },
    },
};
