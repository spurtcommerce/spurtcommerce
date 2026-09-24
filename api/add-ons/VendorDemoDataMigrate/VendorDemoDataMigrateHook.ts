import moment from 'moment';
import { ILike, IsNull, QueryRunner } from 'typeorm';
import { getDataSource } from '../../src/loaders/typeormLoader';
import * as fs from 'fs';
import * as path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { aws_setup, env } from '../../src/env';
import * as bcrypt from 'bcrypt';

const s3Client = new S3Client({
    region: aws_setup.AWS_DEFAULT_REGION,
});

interface ProductInterface {
    slug: string;
    name: string;
    type: number;
    description: string;
    shortDescription: string;
    family: string;
    categories: any[];
    categoryTemplate: string;
    images: string;
    price: string;
    quantity: string;
    attributes: any[];
    variations: any[];
    categoryIds?: any;
    categoryName?: any;
    productHighlights: string;
    dateAvailable: string;
    banner: any;
    widget: any;
    shoppingCart: any;
    questionsAnswers: any;
    ratingAndReview: any;
    pricingGroup: any;
    productDiscount: number;
    productSpecial: number;
}

interface Variant {
    name: string;
    values: Array<{ name: string }>;
}

interface CustomerUserInterface {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    roleDescription: string;
    permission: string;
    isSuperCustomer: number;
}

interface PageGroupInterface {
    name: string;
    slug: string;
    pages: Array<{
        title: string;
        slug: string;
        content: string;
    }>;
}
interface CustomerInterface {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postcode: string;
    company: string;
    landmark?: string;
    customerGroup: any;
    customerUsers: CustomerUserInterface[];
    pageGroups: PageGroupInterface[];
}

interface SupportTicketInterface {
    category: string;
    subCategory: string;
    subject: string;
    description: string;
    userType: 'buyer' | 'seller';
    message: Array<{
        message: string;
        senderType: 'buyer' | 'seller';
    }>;
}

export interface BlogInterface {
    title: string;
    category: string;
    description: string;
    image: string;
}

export interface PricingGroupInterface {
    name: string;
    description: string;
    isDefault: number;
    price: string;
    maxQuantity: string;
}
export interface CustomerContactInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    description?: string;
    customerId: number;
    isActive: string; // "0" or "1"
    isDelete?: number; // default 0
    shippingFirstName: string;
    shippingLastName: string;
    shippingAddress1: string;
    shippingAddress2?: string;
    shippingCity: string;
    shippingCountryId: number;
    shippingZoneId: number;
    shippingPostcode: string;
    tenantId?: number;
}

export async function demoDataMigrate(data: any, vendorCountryId: number, vendorLanguageId: number, vendorCurrencyId: number): Promise<any> {
    const tenantId = data.vendorId;

    // Get the result with grouped variants
    const queryRunner: QueryRunner = getDataSource().createQueryRunner();
    const productVariantRepo = queryRunner.manager.getRepository('ProductVarient');
    const skuRepo = queryRunner.manager.getRepository('Sku');
    const productVarientOptionRepo = queryRunner.manager.getRepository('ProductVarientOption');
    const productVarientOptionDetailRepo = queryRunner.manager.getRepository('ProductVarientOptionDetail');
    const productRepo = queryRunner.manager.getRepository('Product');
    const productToCategoryRepo = queryRunner.manager.getRepository('ProductToCategory');
    const productVarientOptionImageRepo = queryRunner.manager.getRepository('ProductVarientOptionImage');
    const vendorProductRepo = queryRunner.manager.getRepository('VendorProducts');
    const productToSpecificationRepo = queryRunner.manager.getRepository('ProductToSpecification');
    const productSpecToAttrGroupRepo = queryRunner.manager.getRepository('ProductSpecToAttrGroup');
    const productSpecAttrGrouptoAttrRepo = queryRunner.manager.getRepository('ProductSpecAttrGrouptoAttr');
    const productSpecAttrGrpAttrToAttrValRepo = queryRunner.manager.getRepository('ProductSpecAttrGrpAttrToAttrVal');
    const attributeRepo = queryRunner.manager.getRepository('Attribute');
    const attributeValueRepo = queryRunner.manager.getRepository('AttributeValue');
    const productImageRepo = queryRunner.manager.getRepository('ProductImage');
    const bannerRepo = queryRunner.manager.getRepository('Banner');
    const widgetRepo = queryRunner.manager.getRepository('Widget');
    const widgetItemRepo = queryRunner.manager.getRepository('WidgetItem');
    const vendorSettingsRepo = queryRunner.manager.getRepository('VendorSettings');
    const vendorRepo = queryRunner.manager.getRepository('Vendor');
    const vendorCountryRepo = queryRunner.manager.getRepository('VendorCountry');
    const vendorLanguageRepo = queryRunner.manager.getRepository('VendorLanguage');
    const zoneRepo = queryRunner.manager.getRepository('Zone');
    // const vendorCurrencyRepo = queryRunner.manager.getRepository('VendorCurrency');
    const industryRepo = queryRunner.manager.getRepository('Industry');
    const customerRepo = queryRunner.manager.getRepository('Customer');
    const customerUserRepo = queryRunner.manager.getRepository('CustomerUsers');
    const customerUserGroupRepo = queryRunner.manager.getRepository('CustomerUserGroup');
    // const shoppingCartRepo = queryRunner.manager.getRepository('ShoppingCart');
    // const shoppingCartDetailsRepo = queryRunner.manager.getRepository('ShoppingCartDetail');
    const addressRepo = queryRunner.manager.getRepository('Address');
    // const orderRepo = queryRunner.manager.getRepository('Order');
    // const orderLogRepo = queryRunner.manager.getRepository('OrderLog');
    // const orderProductRepo = queryRunner.manager.getRepository('OrderProduct');
    // const orderProductLogRepo = queryRunner.manager.getRepository('OrderProductLog');
    const orderStatusRepo = queryRunner.manager.getRepository('OrderStatus');
    // const productTirePriceRepo = queryRunner.manager.getRepository('ProductTirePrice');
    const productSpecialRepo = queryRunner.manager.getRepository('ProductSpecial');
    const productDiscountRepo = queryRunner.manager.getRepository('ProductDiscount');
    // const vendorOrderRepo = queryRunner.manager.getRepository('VendorOrders');
    // const vendorOrderLogRepo = queryRunner.manager.getRepository('VendorOrderLog');
    // const vendorInvoiceRepo = queryRunner.manager.getRepository('VendorInvoice');
    // const vendorInvoiceItemRepo = queryRunner.manager.getRepository('VendorInvoiceItem');
    // const productStockAlertRepo = queryRunner.manager.getRepository('ProductStockAlert');
    // const stockLogRepo = queryRunner.manager.getRepository('StockLog');
    // const orderTotalRepo = queryRunner.manager.getRepository('OrderTotal');
    const productQuestionRepo = queryRunner.manager.getRepository('ProductQuestion');
    const productAnswerRepo = queryRunner.manager.getRepository('ProductAnswer');
    // const quoteRequestRepo = queryRunner.manager.getRepository('QuoteRequest');
    // const quoteRepo = queryRunner.manager.getRepository('Quote');
    const customerGroupRepo = queryRunner.manager.getRepository('CustomerGroup');
    const pageGroupRepo = queryRunner.manager.getRepository('PageGroup');
    const ticketCategoriesRepo = queryRunner.manager.getRepository('TicketCategories');
    const ticketsRepo = queryRunner.manager.getRepository('Tickets');
    const blogCategoryRepo = queryRunner.manager.getRepository('BlogCategory');
    const blogRepo = queryRunner.manager.getRepository('Blog');
    const vendorPriceGroupRepo = queryRunner.manager.getRepository('VendorPriceGroup');
    const vendorPriceGroupDetailRepo = queryRunner.manager.getRepository('VendorPriceGroupDetail');
    const vendorCustomerPriceRepo = queryRunner.manager.getRepository('VendorCustomerPrice');
    const vendorCustomerGroupPriceRepo = queryRunner.manager.getRepository('VendorCustomerGroupPrice');
    const vendorPriceGroupScheduleRepo = queryRunner.manager.getRepository('VendorPriceGroupSchedule');
    const productRatingRepo = queryRunner.manager.getRepository('ProductRating');
    const customerContactRepo = queryRunner.manager.getRepository('CustomerContact');
    const countryRepo = queryRunner.manager.getRepository('Country');
    const languageRepo = queryRunner.manager.getRepository('Language');
    const vendorTaxRepo = queryRunner.manager.getRepository('VendorTax');
    const taxRepo = queryRunner.manager.getRepository('Tax');
    const currencyRepo = queryRunner.manager.getRepository('Currency');
    // const orderStatusToFullfillmentRepo = queryRunner.manager.getRepository('OrderStatusToFullfillment');
    // const orderFulfillmentStatusRepository = queryRunner.manager.getRepository('OrderFullfillmentStatus');
    const vendorUserRepo = queryRunner.manager.getRepository('VendorUsers');
    const mSeoMetaRepo = queryRunner.manager.getRepository('MSeoMeta');
    const paymentRuleRepository = queryRunner.manager.getRepository('PaymentRule');
    const customerToGroupRepo = queryRunner.manager.getRepository('CustomerToGroup');

    // Upload image buffer to S3
    const uploadImageToS3 = async (key: string, body: Buffer, contentType: string): Promise<void> => {
        const command = new PutObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: key,
            Body: body,
            ContentEncoding: 'base64',
            ContentType: contentType,
        });

        await s3Client.send(command);
    };

    const uploadImagesFromDirectory = async (imageDir: string, vendorPrefixId: string, throwIfDirMissing: boolean = true) => {
        if (!fs.existsSync(imageDir)) {
            if (throwIfDirMissing) {
                throw new Error(`Image directory does not exist: ${imageDir}`);
            } else {
                return;
            }
        }

        const imageFiles = fs.readdirSync(imageDir);

        for (const fileName of imageFiles) {
            try {
                const extension = path.extname(fileName).slice(1).toLowerCase();

                if (!env.availImageTypes.split(',').includes(extension)) {
                    throw new Error(`Unsupported file type "${extension}" in image: ${fileName}`);
                }

                const filePath = path.join(imageDir, fileName);
                const stats = fs.statSync(filePath);
                const sizeInMB = stats.size / (1024 * 1024);

                if (sizeInMB > +env.imageUploadSize) {
                    throw new Error(`Image "${fileName}" exceeds max allowed size of ${+env.imageUploadSize}MB`);
                }
                const image2base64 = require('image-to-base64');
                const base64 = await image2base64(filePath);
                const buffer = Buffer.from(base64, 'base64');
                const s3Key = `${vendorPrefixId}/${fileName}`;
                await uploadImageToS3(s3Key, buffer, `image/${extension}`);
            } catch (err) {
                throw new Error(`Failed to upload ${fileName}: ${err}`);
            }
        }
    };
    await uploadImagesFromDirectory(`./demoData/images`, data.vendorPrefixId.toLowerCase());

    const defaultVendorSettings = async (countryId: number, languageId: number, currencyId: number) => {
        const vendorSettings: any = await vendorSettingsRepo.findOne({ where: { vendorId: tenantId } });
        const vendorData: any = await vendorRepo.findOne({ where: { vendorId: tenantId } });
        const vendorCountryArr = [];
        const vendorLanguageArr = [];
        const vendorTaxArr = [];

        const country = await countryRepo.find({});
        for (const countrydata of country) {
            const vendorCountryValue: any = {};
            vendorCountryValue.countryId = countrydata.countryId;
            vendorCountryValue.tenantId = tenantId;
            vendorCountryArr.push(vendorCountryValue);
        }
        await vendorCountryRepo.save(vendorCountryArr);

        const language = await languageRepo.find({});
        for (const languagedata of language) {
            const vendorLanguage: any = {};
            vendorLanguage.languageId = languagedata.languageId;
            vendorLanguage.tenantId = tenantId;
            vendorLanguageArr.push(vendorLanguage);
        }
        const savedVendorLanguage: any = await vendorLanguageRepo.save(vendorLanguageArr);
        const defaultLanguage: any = savedVendorLanguage.find(vendorLanguageData => vendorLanguageData.languageId === 57);

        const tax = await taxRepo.find({});
        for (const taxData of tax) {
            const vendorTax: any = {};
            vendorTax.taxId = taxData.taxId;
            vendorTax.tenantId = tenantId;
            vendorTaxArr.push(vendorTax);
        }
        await vendorTaxRepo.save(vendorTaxArr);

        const orderStatus: any = await orderStatusRepo.findOne({ where: { statusId: 1, tenantId } });
        vendorSettings.vendorId = tenantId;
        // vendorSettings.siteName = data.companyName;
        vendorSettings.siteName = 'spurtB2B';
        // vendorSettings.storeUrl = env.storeRedirectUrl.split('//')[0] + '//' + data.companyName + '.' + env.storeRedirectUrl.split('//')[1];
        vendorSettings.storeUrl = env.storeRedirectUrl;
        vendorData.companyDescription = 'SpurtB2B Cloud is a scalable, cloud-based B2B eCommerce platform designed to help enterprises build, manage, and grow effortlessly';
        vendorSettings.storeTitle = 'Spurtb2b Cloud';
        vendorSettings.businessName = `${data.companyName} market vendors`;
        vendorSettings.storeOwner = data.customer.firstName;
        vendorSettings.storeEmail = data.customer.email;
        vendorSettings.storeMobileNo = '9999888877';
        vendorSettings.copyrights = data.companyName;
        vendorSettings.storeAddressLine1 = 'No:4 , Kamaraj Colony,';
        vendorSettings.storeAddressLine2 = 'Chitlapakkam';
        vendorSettings.storeCity = 'Chennai';
        vendorSettings.invoiceLogoName = 'logo.jpg';
        vendorSettings.invoiceLogoPath = `${data.vendorPrefixId.toLowerCase()}/`;
        vendorSettings.storeLogoName = 'logo.jpg';
        vendorSettings.storeLogoPath = `${data.vendorPrefixId.toLowerCase()}/`;
        vendorData.emailLogoName = 'logo.jpg';
        vendorData.emailLogoPath = `${data.vendorPrefixId.toLowerCase()}/`;
        vendorSettings.invoicePrefix = 'Spurt';
        // const vendorCurrency: any = await currencyRepo.findOne({ where: { title: 'Rupees' } });
        // vendorSettings.storeCurrencyId = vendorCurrency.currencyId;
        // vendorSettings.currencySymbol = vendorCurrency.symbolLeft;
        // vendorData.personalizedSettings.timeZone = 'Asia/Kolkata';
        vendorData.personalizedSettings.dateFormat = {
            name: 'DD-MM-YYYY',
            value: 'DD-MM-YYYY',
        };
        vendorData.personalizedSettings.timeFormat = '12 hrs';

        vendorSettings.orderStatus = orderStatus.orderStatusId;
        // const vendorSecondaryLanguage: any = await vendorLanguageRepo.findOne({ where: { language: { name: 'French' }, tenantId }, relations: ['language'] });
        vendorSettings.storeLanguageId = defaultLanguage.id ?? 0;
        // vendorData.personalizedSettings.storeSecondaryLanguageId = vendorSecondaryLanguage.id ?? 0;
        // vendorSettings.defaultCountry = vendorCountry.id ?? 0;
        vendorData.metaTitle = 'Multi-Vendor Marketplace for Businesses | Shop & Sell Online';
        vendorData.metaTagDescription = 'multi-vendor eCommerce platform where businesses can register';
        vendorData.metaTagKeyword = 'multi vendor marketplace, business registration platform, online store, eCommerce marketplace';
        vendorData.facebook = 'https://www.facebook.com/spurtcommerce/';
        vendorData.twitter = 'https://x.com/Spurtcommerce';
        vendorData.instagram = 'https://www.instagram.com/spurtcommerce/';
        vendorData.youtube = 'https://www.youtube.com/channel/UCfq0-RDusnkNE9mjY-s2AmA';
        vendorData.linkedin = 'https://www.linkedin.com/company/spurtcommerce/';
        vendorSettings.isActive = 1;
        vendorSettings.isMaintenance = 0;
        vendorSettings.storeEmail = data.customer.email;
        vendorSettings.itemsPerPage = 10;
        vendorSettings.sellerLogoName = 'logo.jpg';
        vendorSettings.sellerLogoPath = `${data.vendorPrefixId.toLowerCase()}/`;
        vendorSettings.sellerLogo2 = 'spurtlogo2.jpg';
        vendorSettings.sellerLogo2Path = `${data.vendorPrefixId.toLowerCase()}/`;
        vendorSettings.storeZipcode = '600064';
        vendorSettings.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');

        const countryData = await vendorCountryRepo.findOne({ where: { countryId, tenantId } });
        const zone: any = await zoneRepo.findOne({ where: { countryId: countryData?.countryId } });
        vendorSettings.zoneId = zone?.zoneId ?? 0;
        vendorSettings.storeCountryId = countryData?.id;
        vendorSettings.defaultCountry = countryData?.id;
        const languageData = await vendorLanguageRepo.findOne({ where: { languageId, tenantId } });
        vendorSettings.storeLanguageId = languageData?.id;

        const getCurrency: any = await currencyRepo.findOne({ where: { currencyId } });
        vendorSettings.storeCurrencyId = getCurrency.currencyId;
        vendorSettings.currencySymbol = getCurrency?.symbolLeft ?? getCurrency?.symbolRight;

        const vendorUser = await vendorUserRepo.findOne({ where: { tenantId } });
        vendorUser.phoneNumber = '9876543210';
        vendorUser.address = 'No 12, Mount Road, Chennai, Tamil Nadu, India, 600002';
        vendorUser.avatar = 'spurtlogo2.jpg';
        vendorUser.avatarPath = `${data.vendorPrefixId.toLowerCase()}/`;

        // const fullfilledStatus = await orderFulfillmentStatusRepository.find({ where: { name: In(['Unfullfilled', 'Partially Fulfilled', 'Fulfilled', 'Out for Delivery']), tenantId } });
        // const fullfilledData = fullfilledStatus.map(status => {
        //     const orderToFullfillment: any = {};
        //     orderToFullfillment.orderStatusId = orderStatus.orderStatusId;
        //     orderToFullfillment.orderFulfillmentStatusId = status.id;
        //     return orderToFullfillment;
        // });

        // create payment rule for tenant
        const newPaymentRule: any = {};
        newPaymentRule.name = 'Money Order';
        newPaymentRule.tenantId = tenantId;
        newPaymentRule.createdBy = tenantId;
        newPaymentRule.instructions = 'Please make the full payment via money order before order dispatch.';
        newPaymentRule.slug = 'money-order';
        newPaymentRule.paymentMethodId = 2;

        await Promise.all([
            vendorSettingsRepo.save(vendorSettings),
            vendorRepo.save(vendorData),
            vendorUserRepo.save(vendorUser),
            // orderStatusToFullfillmentRepo.save(fullfilledData),
            paymentRuleRepository.save(newPaymentRule),
        ]);
    };
    await defaultVendorSettings(vendorCountryId, vendorLanguageId, vendorCurrencyId);

    const industry: any = await industryRepo.findOne({ where: { id: data.industryId } });
    if (!industry) {
        throw new Error(`Industry not found`);
    }
    await uploadImagesFromDirectory(`./demoData/IndustryData/${industry.name}Industry/images`, data.vendorPrefixId.toLowerCase());

    const industryFilePath = `./demoData/IndustryData/${industry.name}Industry/products.json`;
    const payload: any = JSON.parse(fs.readFileSync(industryFilePath, 'utf-8'));
    const commonPayload: any = JSON.parse(fs.readFileSync(`./demoData/CommonData.json`, 'utf-8'));

    const groupVariantOptions = (inputData: ProductInterface[]) => {
        const groupedVariants: Variant[] = [];

        inputData.map((item) => {
            item.variations.forEach(variant => {
                const options = [
                    { name: variant['Variant 1 name'], value: variant['Variant 1 value'] },
                    { name: variant['Variant 2 name'], value: variant['Variant 2 value'] },
                ];

                options.forEach(option => {
                    const existingVariant = groupedVariants.find(v => v.name === option.name);

                    if (existingVariant) {
                        const existingValue = existingVariant.values.find(v => v.name === option.value);
                        if (!existingValue) {
                            existingVariant.values.push({ name: option.value });
                        }
                    } else {
                        groupedVariants.push({
                            name: option.name,
                            values: [{ name: option.value }],
                        });
                    }
                });
            });
        });
        return groupedVariants;
    };

    const checkAndCreateAttributesAndSpecification = async (attributeQueryRunner: QueryRunner, checkAndCreateCategory: any): Promise<any> => {
        const attributeGroupRepo = attributeQueryRunner.manager.getRepository('AttributeGroup');
        const attributeToGroupRepo = attributeQueryRunner.manager.getRepository('AttributeToGroup');
        const specificationRepo = attributeQueryRunner.manager.getRepository('Specification');
        const specToGroupRepo = attributeQueryRunner.manager.getRepository('SpecificationToAttributeGroup');
        const specGroupToAttrRepo = attributeQueryRunner.manager.getRepository('SpecificationAttrGrpToAttribute');
        // const siteFilterRepo = attributeQueryRunner.manager.getRepository('SiteFilter');
        // const siteFilterCategoryRepo = attributeQueryRunner.manager.getRepository('SiteFilterCategory');
        // const siteFilterSectionRepo = attributeQueryRunner.manager.getRepository('SiteFilterSection');
        // const siteFilterSectionItemRepo = attributeQueryRunner.manager.getRepository('SiteFilterSectionItem');
        const specificationToCategoryRepo = attributeQueryRunner.manager.getRepository('SpecificationToCategory');

        const savedAttributes: any[] = [];
        let specificationDetails: any;
        // const categoryGroupMap = new Map();
        // Create Specification and link to group and attributes
        let specSaved: any = await specificationRepo.findOne({
            where: {
                name: 'Additional information',
                isActive: 1,
                tenantId,
            },
        });

        if (!specSaved) {
            const specification = specificationRepo.create({
                name: 'Additional information',
                isActive: 1,
                tenantId,
                slug: 'Additional information'.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, ''),
            });

            specSaved = await specificationRepo.save(specification);
        }
        specificationDetails = specSaved;
        for (const product of payload) {
            // const topCategory = product.categories?.[0]?.split('>').pop()?.trim()?.toLowerCase();
            const newlyCreatedAttributeIds: number[] = [];
            if (product.attributes.length) {
                for (const attribute of product.attributes) {
                    if (attribute) {
                        const rawName = attribute.name?.trim();
                        const normalizedName = rawName?.toLowerCase();

                        // Check for existing attribute
                        let attributeData: any = await attributeRepo.findOne({
                            where: {
                                name: ILike(normalizedName),
                                tenantId,
                            },
                        });

                        if (!attributeData) {
                            attributeData = attributeRepo.create({});
                        }

                        // Create if not exists
                        // if (!savedAttribute) {
                        // const newAttribute = attributeRepo.create({
                        attributeData.name = rawName;
                        attributeData.sortOrder = attribute.sortOrder;
                        attributeData.isMandatory = 0;
                        attributeData.type = 'Drop-down';
                        attributeData.useAsFilter = 1;
                        attributeData.defaultValue = attribute?.values[0];
                        attributeData.sectionName = '';
                        attributeData.label = rawName;
                        attributeData.description = attribute?.description;
                        attributeData.tenantId = tenantId;
                        // });

                        const savedAttribute = await attributeRepo.save(attributeData);
                        // }
                        newlyCreatedAttributeIds.push(savedAttribute.id);

                        // Handle attribute values
                        const existingValues: any = await attributeValueRepo.find({
                            where: { attributeId: savedAttribute.id },
                        });

                        if (existingValues.length) {
                            await attributeValueRepo.delete(existingValues);

                        }

                        const existingValueSet = new Set(
                            // existingValues.map((val) => val.value.trim().toLowerCase())
                        );

                        const newValues: string[] = [];
                        const attributeValuesToInsert: any[] = [];

                        for (const val of attribute.values) {
                            const trimmedValue = val?.trim();
                            if (!trimmedValue) {
                                continue;
                            }

                            const normalizedValue = trimmedValue.toLowerCase();

                            if (!existingValueSet.has(normalizedValue)) {
                                attributeValuesToInsert.push({
                                    attributeId: savedAttribute.id,
                                    value: trimmedValue,
                                });

                                existingValueSet.add(normalizedValue);
                                newValues.push(trimmedValue);
                            }
                        }

                        if (attributeValuesToInsert.length > 0) {
                            await attributeValueRepo.save(attributeValuesToInsert);
                        }

                        if (newValues.length > 0) {
                            const existingAttr = savedAttributes.find(
                                (a) => a.name?.toLowerCase() === rawName?.toLowerCase()
                            );

                            if (existingAttr) {
                                existingAttr.values.push(...newValues);
                            } else {
                                savedAttributes.push({ name: rawName, values: newValues });
                            }
                        }
                        const attrGroupName = attribute.attrGroupName?.trim();
                        const normalizedGroupName = attrGroupName;
                        //  Create static AttributeGroup and map attributes
                        let attributeGroup: any = await attributeGroupRepo.findOne({
                            where: {
                                name: `${normalizedGroupName} Attributes`,
                                tenantId,
                            },
                        });

                        if (!attributeGroup) {
                            attributeGroup = attributeGroupRepo.create({
                                name: `${normalizedGroupName} Attributes`,
                                sortOrder: 0,
                                tenantId,
                            });
                            attributeGroup = await attributeGroupRepo.save(attributeGroup);
                        }

                        attributeToGroupRepo.save({
                            attributeId: savedAttribute.id,
                            attributeGroupId: attributeGroup.id,
                            tenantId,
                        });

                        const specToGroup = specToGroupRepo.create({
                            specificationId: specSaved.id,
                            attributeGroupId: attributeGroup.id,
                            tenantId,
                        });

                        const specToGroupSaved: any = await specToGroupRepo.save(specToGroup);

                        specGroupToAttrRepo.save({
                            attributeId: savedAttribute.id,
                            specAttrGrpId: specToGroupSaved.id,
                            tenantId,
                        });
                    }
                    // //  Create static AttributeGroup and map attributes
                    // let attributeGroup: any = await attributeGroupRepo.findOne({
                    //     where: {
                    //         name: `${topCategory} Attributes`,
                    //         tenantId,
                    //     },
                    // });

                    // if (!attributeGroup) {
                    //     attributeGroup = attributeGroupRepo.create({
                    //         name: `${topCategory} Attributes`,
                    //         sortOrder: 0,
                    //         tenantId,
                    //     });
                    //     attributeGroup = await attributeGroupRepo.save(attributeGroup);
                    // }

                    // const groupMappings = newlyCreatedAttributeIds.map((attributeId) =>
                    //     attributeToGroupRepo.create({
                    //         attributeId,
                    //         attributeGroupId: attributeGroup.id,
                    //         tenantId,
                    //     })
                    // );

                    // if (groupMappings.length > 0) {
                    //     await attributeToGroupRepo.save(groupMappings);
                    // }

                    // // Create Specification and link to group and attributes
                    // let specSaved: any = await specificationRepo.findOne({
                    //     where: {
                    //         name: 'Additional information',
                    //         isActive: 1,
                    //         tenantId,
                    //     },
                    // });

                    // if (!specSaved) {
                    //     const specification = specificationRepo.create({
                    //         name: 'Additional information',
                    //         isActive: 1,
                    //         tenantId,
                    //         slug: 'Additional information'.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, ''),
                    //     });

                    //     specSaved = await specificationRepo.save(specification);
                    // }
                    // specificationDetails = specSaved;

                    // const specToGroup = specToGroupRepo.create({
                    //     specificationId: specSaved.id,
                    //     attributeGroupId: attributeGroup.id,
                    //     tenantId,
                    // });

                    // const specToGroupSaved: any = await specToGroupRepo.save(specToGroup);

                    // const specAttrLinks = newlyCreatedAttributeIds.map((attributeId) =>
                    //     specGroupToAttrRepo.create({
                    //         attributeId,
                    //         specAttrGrpId: specToGroupSaved.id,
                    //         tenantId,
                    //     })
                    // );

                    // if (specAttrLinks.length > 0) {
                    //     await specGroupToAttrRepo.save(specAttrLinks);
                    // }

                    // Site Filter flow
                    // const existingFilter = await siteFilterRepo.findOne({
                    //     where: { filterName: `${topCategory} SpecFilter` },
                    // });

                    // const filter: any = existingFilter
                    //     ? existingFilter
                    //     : await siteFilterRepo.save(siteFilterRepo.create({
                    //         filterName: `${topCategory} SpecFilter`,
                    //         tenantId,
                    //     }));

                    // Category mapping for site filter
                    for (const category of checkAndCreateCategory) {
                        for (const id of category.categoryIds ?? []) {
                            // const exists = await siteFilterCategoryRepo.findOne({
                            //     where: { categoryId: id, filterId: filter.id },
                            // });

                            // if (!exists) {
                            //     const newSiteFilterCategory = siteFilterCategoryRepo.create({
                            //         categoryId: id,
                            //         filterId: filter.id,
                            //     });
                            //     await siteFilterCategoryRepo.save(newSiteFilterCategory);
                            // }

                            const existsSpecCat = await specificationToCategoryRepo.findOne({
                                where: {
                                    categoryId: id,
                                    specificationId: specSaved.id,
                                },
                            });
                            if (!existsSpecCat) {
                                const specToCategory: any = {};
                                specToCategory.categoryId = id;
                                specToCategory.specificationId = specSaved.id;
                                await specificationToCategoryRepo.save(specToCategory);
                            }
                        }
                    }
                    // const existingSection = await siteFilterSectionRepo.findOne({
                    //     where: {
                    //         sectionName: attributeGroup.name,
                    //         filterId: filter.id,
                    //     },
                    // });
                    // if (!existingSection) {
                    //     // Section + items
                    //     const sectionSlug = attributeGroup.name.replace(/\s+/g, '-')
                    //         .replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '')
                    //         .toLowerCase();

                    //     const newSection = siteFilterSectionRepo.create({
                    //         // sectionId: section.sectionId,
                    //         sectionName: attributeGroup.name,
                    //         sectionSlug,
                    //         sectionType: 2,
                    //         filterId: filter.id,
                    //     });

                    //     const sectionData: any = await siteFilterSectionRepo.save(newSection);

                    // for (const productsData of payload) {
                    //     for (const attribute of productsData.attributes) {
                    //         for (const val of attribute.values) {
                    //             const itemSlug = val.replace(/\s+/g, '-')
                    //                 .replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '')
                    //                 .toLowerCase();

                    //             const newItem = siteFilterSectionItemRepo.create({
                    //                 itemName: val,
                    //                 itemSlug,
                    //                 filterSectionId: sectionData.id,
                    //             });

                    //             await siteFilterSectionItemRepo.save(newItem);
                    //         }
                    //     }
                    // }
                }
            }
        }
        return { savedAttributes, specificationDetails };
    };

    const checkAndCreateVariants = async (variantsData: Variant[], variantQueryRunner: QueryRunner) => {
        const variantService = variantQueryRunner.manager.getRepository('Variant');
        const variantValueService = variantQueryRunner.manager.getRepository('VariantValue');
        const variantNames = variantsData.map(v => v.name);
        const existingVariants: any[] = await variantService
            .createQueryBuilder('variant')
            .leftJoinAndSelect('variant.variantValue', 'variantValue')
            .where('variant.name IN (:...variantNames)', { variantNames })
            .andWhere('variant.tenantId =:tenantId', { tenantId })
            .getMany();

        const variantMap = existingVariants.reduce((map, variant) => {
            const variantValues = variant.variantValue.map(value => ({
                id: value.id,
                value: value.value,
            }));
            map[variant.name] = { id: variant.id, values: variantValues };
            return map;
        }, {});

        const valuesToCreate: any[] = [];
        let sortOrder = 0;
        let variantValueSortOrder = 0;
        for (const variant of variantsData) {
            const { name, values } = variant;

            if (!variantMap[name]) {
                const newVariant = {
                    name,
                    tenantId,
                    sortOrder,
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                const newVariantSave: any = await variantService.save(newVariant);
                sortOrder++;
                variantMap[name] = { id: newVariantSave.id, values: [] };
            }

            const existingValueNames = new Set(variantMap[name].values.map(v => v.value));
            for (const value of values) {
                const { name: valueName } = value;

                if (!existingValueNames.has(valueName)) {
                    valuesToCreate.push({
                        variantId: variantMap[name].id,
                        value: valueName,
                        sortOrder: variantValueSortOrder,
                        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    });
                    variantValueSortOrder++;
                }
            }

            const createdValues = await variantValueService.save(valuesToCreate);
            variantMap[name].values.push(...createdValues);

        }
        const result = variantsData.map(variant => {
            return {
                id: variantMap[variant.name].id,
                name: variant.name,
                values: variant.values.map(value => {
                    const existingValue = variantMap[variant.name].values.find(v => v.value === value.name);
                    return {
                        // tslint:disable-next-line:no-null-keyword
                        id: existingValue ? existingValue.id : null,
                        name: existingValue.value,
                    };
                }),
            };
        });
        return result;
    };

    const checkAndCreateFamilyAndCategory = async (payloadData: ProductInterface[], categoryQueryRunner: QueryRunner) => {
        const categoryRepo = categoryQueryRunner.manager.getRepository('Category');
        const categoryPathRepo = categoryQueryRunner.manager.getRepository('CategoryPath');
        const familyRepo = categoryQueryRunner.manager.getRepository('Family');

        const validate_category_slug = async (slug: string, id: number = 0, count: number = 0, tenantIdData: number): Promise<string> => {

            const checkSlug = async (slugValue: string, idValue: number, countValue: number = 0, tenantIdValue: number): Promise<number> => {
                if (countValue > 0) {
                    slugValue = slugValue + countValue;
                }
                const checkSlugData = async (checkSlugValue: string, checkId: number, checkTenantId: number): Promise<number> => {
                    const query = categoryRepo.createQueryBuilder('category');
                    query.where('category.category_slug = :slug', { slug: checkSlugValue });
                    query.andWhere('category.tenant_id = :tenantId', { tenantId: checkTenantId });
                    if (checkId > 0) {
                        query.andWhere('category.categoryId != :id', { id: checkId });
                    }
                    return query.getCount();
                };

                return await checkSlugData(slugValue, idValue, tenantIdValue);
            };

            const slugCount = await checkSlug(slug, id, count, tenantIdData);

            if (slugCount) {
                if (!count) {
                    count = 1;
                } else {
                    count++;
                }
                return await validate_category_slug(slug, id, count, tenantIdData);

            } else {
                if (count > 0) {
                    slug = slug + count;
                }
                return slug;
            }
        };

        const productsWithCategoryId: ProductInterface[] = [];
        for (const product of payloadData) {
            const categoryIds: any = [];
            const categoryName: any = [];
            let familyExist: any = await familyRepo
                .createQueryBuilder('family')
                .where('family.name =:name', { name: product.family })
                .andWhere('family.tenantId =:tenantId', { tenantId })
                .andWhere('family.isDelete = :isDelete', { isDelete: 0 })
                .getOne();

            if (!familyExist) {
                familyExist = await familyRepo.save({
                    name: product.family,
                    isActive: 1,
                    tenantId,
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                });
            }
            if (product.categories?.length) {
                for (const category of product.categories) {
                    const categoryUnSantizedList = category?.split('>');
                    const categories = categoryUnSantizedList.map((catUnSantized) => catUnSantized.trim());

                    let tempParentId: any = 0;
                    let tempCategoryName: any = '';

                    // tslint:disable-next-line:forin
                    for (const index in categories) {
                        const newCategoryName = categories[index];

                        const categoryExist: any = await categoryRepo
                            .createQueryBuilder('category')
                            .where('category.name =:name', { name: newCategoryName })
                            .andWhere('category.tenantId =:tenantId', { tenantId })
                            .andWhere('category.parentInt =:parentId', { parentId: tempParentId })
                            .getOne();
                        if (!categoryExist) {
                            const categoryData = newCategoryName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();

                            const slugName = await validate_category_slug(categoryData, 0, 0, tenantId);
                            const categoryDescription = product.categoryTemplate.replace('{{categoryName}}', newCategoryName.toLowerCase());
                            const categorySave: any = await categoryRepo.save(
                                {
                                    name: newCategoryName,
                                    parentInt: tempParentId,
                                    categorySlug: slugName,
                                    categoryDescription,
                                    isActive: 1,
                                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    tenantId,
                                    familyId: familyExist.id,
                                    industryId: data.industryId,
                                    sortOrder: 1,
                                }
                            );

                            const getAllPath: any = await categoryPathRepo.find({
                                where: { categoryId: tempParentId },
                                order: { level: 'ASC' },
                            });

                            let level = 0;
                            for (const pathData of getAllPath) {
                                const CategoryPathLoop: any = {};
                                CategoryPathLoop.categoryId = categorySave.categoryId;
                                CategoryPathLoop.pathId = pathData.pathId;
                                CategoryPathLoop.level = level;
                                CategoryPathLoop.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                                await categoryPathRepo.save(CategoryPathLoop);
                                level++;
                            }

                            const newCategoryPath: any = {};
                            newCategoryPath.categoryId = categorySave.categoryId;
                            newCategoryPath.pathId = categorySave.categoryId;
                            newCategoryPath.level = level;
                            newCategoryPath.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                            await categoryPathRepo.save(newCategoryPath);
                            tempParentId = categorySave.categoryId;
                            tempCategoryName = categorySave.name;
                        } else {
                            tempParentId = categoryExist.categoryId;
                            tempCategoryName = categoryExist.name;
                        }
                    }
                    categoryIds.push(tempParentId);
                    categoryName.push(tempCategoryName);
                }
                product.categoryIds = categoryIds;
                product.categoryName = categoryName;
                productsWithCategoryId.push({ ...product });
            } else {
                productsWithCategoryId.push({ ...product });
            }

        }
        return productsWithCategoryId;
    };

    const checkAndCreateCustomerUser = async (payloadData: CustomerInterface) => {
        const hashPassword = (password: string) => {
            return new Promise((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(hash);
                });
            });
        };

        const customerGroup: any = {};
        customerGroup.name = payloadData.customerGroup.name;
        customerGroup.description = payloadData.customerGroup.description ?? '';
        customerGroup.colorCode = '';
        customerGroup.vendorId = tenantId;
        customerGroup.isDelete = 0;
        customerGroup.isActive = 1;
        customerGroup.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const saveCustomerGroup = await customerGroupRepo.save(customerGroup);

        const newCustomer: any = {};
        newCustomer.firstName = payloadData.firstName;
        newCustomer.lastName = payloadData.lastName;
        newCustomer.username = payloadData.email;
        newCustomer.email = payloadData.email;
        newCustomer.siteId = 0;
        newCustomer.mobileNumber = payloadData.phoneNumber;
        newCustomer.tenantId = tenantId;
        newCustomer.isActive = 1;
        newCustomer.isVendor = 0;
        newCustomer.customerGroupId = saveCustomerGroup.id;
        const customerPassword = await hashPassword(payloadData.password);
        newCustomer.password = customerPassword;
        newCustomer.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const saveCustomer: any = await customerRepo.save(newCustomer);

        const customerToGroup: any = {};
        customerToGroup.customerId = saveCustomer.id;
        customerToGroup.customerGroupId = saveCustomerGroup.id;
        customerToGroup.isAvtive = 1;
        await customerToGroupRepo.save(customerToGroup);

        const customerUserGroup: any = await customerUserGroupRepo.findOne({ where: { tenantId, slug: 'buyer' } });
        const customerUser: any = {};
        customerUser.username = payloadData.email;
        customerUser.password = await hashPassword(payloadData.password);
        customerUser.firstName = payloadData.firstName;
        customerUser.lastName = payloadData.lastName;
        customerUser.email = payloadData.email;
        customerUser.phoneNumber = payloadData.phoneNumber;
        customerUser.isActive = 1;
        customerUser.deleteFlag = 0;
        customerUser.isSuperCustomer = 1;
        customerUser.customerUserGroupId = customerUserGroup.id;
        customerUser.customerId = saveCustomer.id;
        customerUser.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const saveCustomerUser = await customerUserRepo.save(customerUser);
        // const newShoppingCart: any = {
        //     customerId: saveCustomer.id,
        //     tenantId,
        //     name: 'Shopping List',
        // };
        // await shoppingCartRepo.save(newShoppingCart);
        const vendorCountry: any = await vendorCountryRepo.findOne({ where: { tenantId, country: { name: 'India' } }, relations: ['country'] });
        const zone: any = await zoneRepo.findOne({ where: { countryId: vendorCountry?.countryId } });
        const deliveryAddress: any = {
            firstName: payloadData.firstName,
            lastName: payloadData.lastName,
            customerId: saveCustomer.id,
            address1: payloadData.address1,
            address2: payloadData.address2,
            city: payloadData.city,
            state: payloadData.state ?? '',
            countryId: vendorCountry?.countryId ?? 0,
            zoneId: zone.zoneId ?? 0,
            postcode: payloadData.postcode,
            addressType: 0,
            company: data.company,
            landmark: payloadData.landmark,
            phoneNo: payloadData.phoneNumber,
            isDefault: 1,
            createdBy: saveCustomerUser.id,
            createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        await addressRepo.save(deliveryAddress);
        const billingAddress = {
            ...deliveryAddress,
            addressType: 1,
        };

        delete billingAddress.addressId;
        await addressRepo.save(billingAddress);
        const customerUserArray: any = [];
        if (payloadData.customerUsers.length) {
            for (const customerUserdetail of payloadData.customerUsers) {
                const customerUserValue: any = {};
                const slugName = customerUserdetail.role.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                let role: any = await customerUserGroupRepo.findOne({
                    where: [
                        {
                            slug: slugName,
                            tenantId,
                            customerId: IsNull(),
                        },
                        {
                            slug: slugName,
                            customerId: saveCustomer.id,
                        },
                    ],
                });
                if (!role) {
                    const newCustomerUserGroup: any = {};
                    newCustomerUserGroup.name = customerUserdetail.role;
                    newCustomerUserGroup.isActive = 1;
                    newCustomerUserGroup.slug = slugName;
                    newCustomerUserGroup.tenantId = tenantId;
                    newCustomerUserGroup.description = customerUserdetail?.roleDescription;
                    newCustomerUserGroup.permission = JSON.stringify(customerUserdetail?.permission);
                    newCustomerUserGroup.customerId = data?.customer?.id;
                    newCustomerUserGroup.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    role = await customerUserGroupRepo.save(newCustomerUserGroup);
                }
                customerUserValue.customerUserGroupId = role.id;
                customerUserValue.username = customerUserdetail.email;
                customerUserValue.password = await hashPassword(customerUserdetail.password);
                customerUserValue.firstName = customerUserdetail.firstName;
                customerUserValue.lastName = customerUserdetail.lastName;
                customerUserValue.email = customerUserdetail.email;
                customerUserValue.phoneNumber = customerUserdetail.phoneNumber;
                customerUserValue.isActive = 1;
                customerUserValue.deleteFlag = 0;
                customerUserValue.isSuperCustomer = 0;
                customerUserValue.customerId = saveCustomer.id;
                customerUserValue.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                customerUserArray.push(customerUserValue);
            }
            await customerUserRepo.save(customerUserArray);
        }
        saveCustomer.address = deliveryAddress;
        saveCustomer.customerUser = saveCustomerUser;
        return saveCustomer;
    };

    const createPageAndGroup = async (pageParams: [PageGroupInterface]) => {
        const newPageGroupArr: any = [];
        const lastGroup = await pageGroupRepo.findOne({
            where: { tenantId },
            order: { position: 'DESC' },
        });
        let position = lastGroup ? lastGroup.position + 1 : 1;
        for (const pageGroup of pageParams) {
            const newPageGroup: any = {};
            newPageGroup.groupName = pageGroup.name;
            newPageGroup.tenantId = tenantId;
            newPageGroup.isActive = 1;
            newPageGroup.position = position;
            newPageGroup.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            newPageGroup.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
            newPageGroup.page = pageGroup.pages.map((pageDetail) => {
                const page: any = {};
                page.title = pageDetail.title;
                page.slugName = pageDetail.slug;
                page.content = pageDetail.content ?? '';
                page.isActive = 1;
                page.tenantId = tenantId;
                page.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                page.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                return page;
            });
            newPageGroupArr.push(newPageGroup);
            position++;
        }
        await pageGroupRepo.save(newPageGroupArr);
    };
    createPageAndGroup(commonPayload.pageGroups);

    const addQuestionAndAnswer = async (productId: number, skuId: number, question: string, answer: string) => {
        const questionObj: any = {};
        questionObj.question = question;
        questionObj.productId = productId;
        questionObj.skuId = skuId;
        questionObj.type = 3;
        questionObj.referenceId = tenantId;
        questionObj.isActive = 1;
        const questionSaved = await productQuestionRepo.save(questionObj);
        const answerObj: any = {};
        answerObj.answer = answer;
        answerObj.questionId = +questionSaved.questionId;
        answerObj.type = 3;
        answerObj.referenceId = tenantId;
        answerObj.defaultAnswer = 0;
        answerObj.isActive = 1;
        await productAnswerRepo.save(answerObj);
    };

    // const createOrder = async (orderPayload: any) => {

    //     const findTirePrice = async (productId: number, skuId: string, quantity: number) => {

    //         const query: any = await productTirePriceRepo.createQueryBuilder('productTirePrice');
    //         query.select(['productTirePrice.price as price', 'productTirePrice.quantity as quantity', 'productTirePrice.productId as productId']);
    //         query.where('productTirePrice.productId = ' + productId);
    //         query.where('productTirePrice.skuId = ' + skuId);
    //         query.andWhere('productTirePrice.quantity <= ' + quantity);
    //         query.orderBy('productTirePrice.quantity', 'DESC');
    //         query.limit('1');
    //         return query.getRawOne();
    //     };

    //     const findSpecialPriceWithSku = async (productId: number, skuId: number, todaydate: string) => {

    //         const query: any = await productSpecialRepo.createQueryBuilder('productSpecial');
    //         query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd', 'productSpecial.skuId as skuId']);
    //         query.where('productSpecial.productId = ' + productId);
    //         query.andWhere('productSpecial.skuId = ' + skuId);
    //         query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', { todaydate });
    //         query.orderBy('productSpecial.priority', 'ASC');
    //         query.addOrderBy('productSpecial.price', 'ASC');
    //         query.limit('1');
    //         return query.getRawOne();
    //     };

    //     const findDiscountPricewithSku = async (productId: number, skuId: number, todaydate: string) => {

    //         const query: any = await productDiscountRepo.createQueryBuilder('productDiscount');
    //         query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
    //         query.where('productDiscount.productId = ' + productId);
    //         query.where('productDiscount.skuId = ' + skuId);
    //         query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', { todaydate });
    //         query.orderBy('productDiscount.priority', 'ASC');
    //         query.addOrderBy('productDiscount.price', 'ASC');
    //         query.limit('1');
    //         return query.getRawOne();
    //     };

    //     const vendorSetting: any = await vendorSettingsRepo.findOne({ where: { vendorId: tenantId } });
    //     const vendorData: any = await vendorRepo.findOne({ where: { vendorId: tenantId } });

    //     const dynamicData: any = {};
    //     const orderProducts: any = orderPayload;

    //     for (const val of orderProducts) {
    //         /// for find product price with tax , option price, special, discount and tire price /////
    //         let price: any;
    //         let taxType: any;
    //         let taxValue: any;
    //         let tirePrice = 0;
    //         let priceWithTax: any;
    //         const priceGroupDetailId = 0;
    //         const productTire: any = await productRepo.findOne({ where: { productId: val.productId } });
    //         taxType = productTire.taxType;
    //         taxValue = productTire.taxValue;
    //         const sku: any = await skuRepo.findOne({ where: { id: val.skuId } });
    //         if (sku) {
    //             if (!tirePrice) {
    //                 const findWithQty = await findTirePrice(val.productId, sku.id, val.quantity);
    //                 if (findWithQty) {
    //                     tirePrice = findWithQty.price;
    //                 } else {
    //                     const dateNow = new Date();
    //                     const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
    //                     const productSpecial = await findSpecialPriceWithSku(val.productId, sku.id, todaydate);
    //                     const productDiscount = await findDiscountPricewithSku(val.productId, sku.id, todaydate);
    //                     if (productSpecial) {
    //                         tirePrice = productSpecial.price;
    //                     } else if (productDiscount) {
    //                         tirePrice = productDiscount.price;
    //                     } else {
    //                         tirePrice = sku.price;
    //                     }
    //                 }
    //                 // }
    //             }
    //         } else {
    //             tirePrice = productTire.price;
    //         }
    //         if (taxType && taxType === 2) {
    //             const percentAmt = +tirePrice * (+taxValue / 100);
    //             priceWithTax = +tirePrice + +percentAmt;
    //         } else if (taxType && taxType === 1) {
    //             priceWithTax = +tirePrice + +taxValue;
    //         } else {
    //             priceWithTax = +tirePrice;
    //         }
    //         price = priceWithTax;
    //         ///// finding price from backend ends /////
    //         const obj: any = {};
    //         obj.skuPrice = sku ? sku.price : productTire.price;
    //         obj.skuId = sku ? sku.id : productTire.skuId;
    //         obj.price = price;
    //         obj.taxType = taxType;
    //         obj.taxValue = taxValue;
    //         obj.tirePrice = tirePrice;
    //         obj.productTire = productTire;
    //         obj.quantity = val.quantity;
    //         obj.priceGroupDetailId = priceGroupDetailId;
    //         dynamicData[sku.skuName] = obj;
    //     }

    //     const newOrder = {} as any;
    //     const newOrderTotal = {} as any;
    //     let orderProduct = [];
    //     let i;
    //     let n;
    //     let totalProductAmount;
    //     let totalAmount = 0;
    //     const productDetailData = [];

    //     newOrder.customerId = customerUserData.id;
    //     newOrder.email = customerUserData.emailId;
    //     newOrder.telephone = customerUserData.address.phoneNo;
    //     newOrder.shippingFirstname = customerUserData.firstName;
    //     newOrder.shippingLastname = customerUserData.lastName;
    //     newOrder.shippingAddress1 = customerUserData.address.address1;
    //     newOrder.shippingAddress2 = customerUserData.address.address2;
    //     newOrder.shippingCompany = vendorData.company ?? '';
    //     newOrder.shippingCity = customerUserData.address.city;
    //     newOrder.shippingZone = customerUserData.address.state;
    //     newOrder.shippingCountryId = customerUserData.address.countryId;
    //     const vendorCountryData: any = await vendorCountryRepo.findOne({
    //         where: {
    //             id: customerUserData.address.countryId,
    //         },
    //         relations: ['country'],
    //     });
    //     if (vendorCountryData) {
    //         newOrder.shippingCountry = vendorCountryData.country.name ?? '';
    //         newOrder.paymentCountry = vendorCountryData.country.name ?? '';
    //     }
    //     newOrder.shippingPostcode = customerUserData.address.postcode;
    //     newOrder.shippingAddressFormat = '';
    //     newOrder.paymentFirstname = customerUserData.firstName;
    //     newOrder.paymentLastname = customerUserData.lastName;
    //     newOrder.paymentAddress1 = customerUserData.address.address1;
    //     newOrder.paymentAddress2 = customerUserData.address.address2;
    //     newOrder.paymentMobileNumber = customerUserData.address.phoneNo;
    //     newOrder.paymentCompany = vendorData.company ?? '';
    //     newOrder.paymentCity = customerUserData.address.city;
    //     newOrder.paymentZone = customerUserData.address.state;
    //     newOrder.paymentPostcode = customerUserData.address.postcode;
    //     newOrder.paymentMethod = 0;
    //     newOrder.customerGstNo = '';
    //     newOrder.ip = '';
    //     newOrder.isActive = 1;
    //     const orderStatus: any = await orderStatusRepo.findOne({ where: { statusId: 1, tenantId } });
    //     newOrder.orderStatusId = orderStatus.orderStatusId ?? 0;
    //     newOrder.invoicePrefix = vendorSetting.invoicePrefix ?? '';
    //     const currency: any = await currencyRepo.findOne({ where: { currencyId: vendorSetting.storeCurrencyId } });
    //     newOrder.currencyCode = currency?.code ?? '';
    //     newOrder.currencyValue = currency?.value ?? null;
    //     newOrder.currencySymbolLeft = currency?.symbolLeft ?? '';
    //     newOrder.currencySymbolRight = currency?.symbolRight ?? '';
    //     newOrder.paymentAddressFormat = '';
    //     newOrder.tenantId = tenantId;
    //     newOrder.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //     newOrder.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //     newOrder.mustShipBefore = moment().add(10, 'days').format('YYYY-MM-DD');
    //     newOrder.poNumber = 'PO-' + Math.floor(100000 + Math.random() * 900000);
    //     newOrder.notes = '';
    //     newOrder.paymentRuleId = 1;
    //     newOrder.paymentTermId = 1;
    //     newOrder.createdByType = 'buyer';
    //     newOrder.orderSource = 3;
    //     const orderData: any = await orderRepo.save(newOrder);
    //     await orderLogRepo.save({ orderLogId: undefined, ...orderData });
    //     orderProduct = orderPayload;
    //     let j = 1;
    //     for (i = 0; i < orderProduct.length; i++) {
    //         ///// finding price from backend ends /////
    //         const skuVal: any = await skuRepo.findOne({ where: { id: orderProduct[i].skuId } });
    //         const productData: any = await productRepo.findOne({ where: { productId: orderProduct[i].productId } });

    //         orderProduct[i].skuName = skuVal.skuName;
    //         const dynamicPrices = dynamicData[orderProduct[i].skuName];
    //         const productDetails = {} as any;
    //         productDetails.productId = orderProduct[i].productId;
    //         const nwDate = new Date();
    //         const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
    //         productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + j;
    //         productDetails.name = productData.name;
    //         productDetails.orderId = orderData.orderId;
    //         productDetails.quantity = orderProduct[i].quantity;
    //         productDetails.productPrice = dynamicPrices.price;
    //         productDetails.basePrice = dynamicPrices.skuPrice;
    //         productDetails.discountAmount = parseFloat(dynamicPrices.skuPrice) - parseFloat(dynamicPrices.tirePrice);
    //         productDetails.discountedAmount = productDetails.discountAmount !== 0.00 ? dynamicPrices.tirePrice : '0.00';
    //         productDetails.taxType = dynamicPrices.taxType;
    //         productDetails.taxValue = dynamicPrices.taxValue;
    //         productDetails.total = +orderProduct[i].quantity * dynamicPrices.price;
    //         productDetails.model = dynamicPrices.productTire.name;
    //         productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
    //         productDetails.priceGroupDetailId = dynamicPrices.priceGroupDetailId;
    //         productDetails.orderStatusId = orderStatus.orderStatusId;
    //         productDetails.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //         productDetails.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //         const productInformation = await orderProductRepo.save(productDetails);
    //         await orderProductLogRepo.save(productInformation);
    //         // add rating and review
    //         const ratingAndReview = await productRatingRepo.findOne({ where: { product: orderProduct[i].productId, skuId: orderProduct[i].skuId, customerId: customerUserData.id, orderProductId: IsNull() } });
    //         if (ratingAndReview) {
    //             ratingAndReview.orderProductId = productInformation.orderProductId;
    //             await productRatingRepo.update(ratingAndReview.ratingId, ratingAndReview);
    //         }
    //         // Remove product from Cart..!
    //         const customerCartCondition = {} as any;
    //         customerCartCondition.productId = orderProduct[i].productId;
    //         customerCartCondition.customerId = orderData.customerId;

    //         // -- VEN
    //         if (tenantId !== 0) {
    //             const val: any = await vendorProductRepo.findOne({ where: { productId: orderProduct[i].productId, vendorId: tenantId } });
    //             if (val) {
    //                 const vendororders = {} as any;
    //                 vendororders.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + tenantId + j;
    //                 vendororders.vendorId = tenantId;
    //                 vendororders.orderId = orderData.orderId;
    //                 vendororders.orderProductId = productInformation.orderProductId;
    //                 vendororders.total = productDetails.total;
    //                 vendororders.subOrderStatusId = 1;
    //                 vendororders.commission = 0;
    //                 // const date = new Date();
    //                 vendororders.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                 vendororders.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                 const value = await vendorOrderRepo.save(vendororders);
    //                 const vendorOrderLog = {} as any;
    //                 vendorOrderLog.vendorOrderId = value.vendorOrderId;
    //                 vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + tenantId + j;
    //                 vendorOrderLog.vendorId = tenantId;
    //                 vendorOrderLog.orderId = orderData.orderId;
    //                 vendorOrderLog.subOrderStatusId = orderStatus.orderStatusId;
    //                 vendorOrderLog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                 vendorOrderLog.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');

    //                 await vendorOrderLogRepo.save(vendorOrderLog);

    //                 const getVendorInvoice = await vendorInvoiceRepo.findOne({ where: { vendorId: tenantId, orderId: orderData.orderId } });
    //                 if (!getVendorInvoice) {
    //                     const newVendorInvoice = {} as any;
    //                     newVendorInvoice.vendorId = tenantId;
    //                     newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
    //                     newVendorInvoice.orderId = orderData.orderId;
    //                     newVendorInvoice.email = customerUserData.email;
    //                     newVendorInvoice.total = 0;
    //                     newVendorInvoice.shippingFirstname = customerUserData.firstName;
    //                     newVendorInvoice.shippingLastname = customerUserData.lastName;
    //                     newVendorInvoice.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                     newVendorInvoice.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                     await vendorInvoiceRepo.save(newVendorInvoice);
    //                 }
    //                 const vendorInvoiceData: any = await vendorInvoiceRepo.findOne({ where: { vendorId: tenantId, orderId: orderData.orderId } });
    //                 vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
    //                 const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
    //                 vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);

    //                 await vendorInvoiceRepo.save(vendorInvoiceData);

    //                 const newVendorInvoiceItem = {} as any;
    //                 newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
    //                 newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
    //                 newVendorInvoiceItem.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                 newVendorInvoiceItem.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //                 await vendorInvoiceItemRepo.save(newVendorInvoiceItem);
    //             }
    //         }
    //         // for stock management
    //         if (productData.hasStock === 1) {
    //             const product: any = await skuRepo.findOne({ where: { skuName: productInformation.skuName } });
    //             product.quantity = +product.quantity - +productInformation.quantity;
    //             const prod: any = await skuRepo.save(product);
    //             if (productData.isSimplified === 0) {
    //                 const findSku: any = await skuRepo.findOne({ where: { skuName: productInformation.skuName } });
    //                 findSku.quantity = +findSku.quantity - +productInformation.quantity;
    //                 await skuRepo.save(findSku);
    //             }
    //             if (+prod.quantity <= +prod.notifyMinQuantity) {
    //                 const productStockAlert = {} as any;
    //                 productStockAlert.productId = productInformation.productId;
    //                 productStockAlert.skuName = productInformation.skuName;
    //                 productStockAlert.mailFlag = 1;
    //                 await productStockAlertRepo.save(productStockAlert);
    //             }
    //             const stockLog = {} as any;
    //             stockLog.productId = productInformation.productId;
    //             stockLog.orderId = orderData.orderId;
    //             stockLog.skuName = productInformation.skuName;
    //             stockLog.quantity = productInformation.quantity;
    //             stockLog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //             await stockLogRepo.save(stockLog);
    //         }
    //         let productImageDetail;
    //         productImageDetail = await productImageRepo.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
    //         productData.productInformationData = productInformation;
    //         productData.productImage = productImageDetail;
    //         totalProductAmount = await orderProductRepo.find({ where: { productId: orderProduct[i].productId, orderId: orderData.orderId, orderProductId: productInformation.orderProductId } });
    //         for (n = 0; n < totalProductAmount.length; n++) {
    //             totalAmount += +totalProductAmount[n].total;
    //         }
    //         productDetailData.push(productData);
    //         j++;
    //     }

    //     orderData.invoiceNo = 'INV00'.concat(orderData.orderId);
    //     const nowDate = new Date();
    //     const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
    //     orderData.orderPrefixId = vendorSetting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
    //     newOrderTotal.orderId = orderData.orderId;
    //     newOrderTotal.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //     newOrderTotal.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');

    //     orderData.amount = totalAmount;
    //     const shippingCostOverride = 10;
    //     orderData.total = totalAmount + shippingCostOverride;
    //     orderData.paymentStatus = 1;
    //     orderData.paymentFlag = 1;
    //     newOrderTotal.value = totalAmount + shippingCostOverride;
    //     await orderRepo.save(orderData);
    //     await orderTotalRepo.save(newOrderTotal);

    //     const order: any = await orderRepo.findOne({ where: { orderId: orderData.orderId } });
    //     order.productDetail = await orderProductRepo.find({ where: { orderId: orderData.orderId } }).then((val) => {
    //         const productImage = val.map(async (value: any) => {
    //             let image;
    //             image = await productImageRepo.findOne({ where: { productId: value.productId } });
    //             const temp: any = value;
    //             temp.image = image;
    //             return temp;
    //         });
    //         const results = Promise.all(productImage);
    //         return results;
    //     });
    // };

    const createTicket = async (ticketParams: [SupportTicketInterface]) => {
        for (const ticketData of ticketParams) {
            // create category
            let parentCategory = await ticketCategoriesRepo.findOne({
                where: {
                    categoryName: ticketData.category,
                    parentCategoryId: 0,
                    tenantId,
                },
            });
            if (!parentCategory) {
                const newTicketCategory: any = {};
                newTicketCategory.categoryName = ticketData.category;
                newTicketCategory.isActive = 1;
                newTicketCategory.parentCategoryId = 0;
                newTicketCategory.tenantId = tenantId;
                newTicketCategory.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                parentCategory = await ticketCategoriesRepo.save(newTicketCategory);
            }

            let subCategory = await ticketCategoriesRepo.findOne({
                where: {
                    categoryName: ticketData.subCategory,
                    parentCategoryId: parentCategory.id,
                    tenantId,
                },
            });

            if (!subCategory) {
                const newSubCategory: any = {};
                newSubCategory.categoryName = ticketData.subCategory;
                newSubCategory.isActive = 1;
                newSubCategory.parentCategoryId = parentCategory.id;
                newSubCategory.tenantId = tenantId;
                newSubCategory.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                subCategory = await ticketCategoriesRepo.save(newSubCategory);
            }

            const newTickets: any = {};
            newTickets.categoryId = parentCategory.id;
            newTickets.subCategoryId = subCategory.id;
            newTickets.refId = `TKT#${Date.now()}`;
            newTickets.subject = ticketData.subject;
            newTickets.description = ticketData.description;
            newTickets.status = 1;
            newTickets.userId = customerUserData.id;
            newTickets.userType = 'buyer';
            newTickets.customerUserId = customerUserData.customerUser.id;
            newTickets.tenantId = tenantId;
            newTickets.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');

            newTickets.ticketMessage = ticketData.message.map((messageData) => {
                const newTicketMessage: any = {};
                newTicketMessage.message = messageData.message;
                newTicketMessage.createdByType = messageData.senderType;
                newTicketMessage.senderId = messageData.senderType === 'buyer' ? customerUserData.id : tenantId;
                newTicketMessage.senderType = messageData.senderType;
                newTicketMessage.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                return newTicketMessage;
            });
            await ticketsRepo.save(newTickets);
        }
    };

    const createBlog = async (blogParams: [BlogInterface]) => {
        for (const blog of blogParams) {
            let blogCategory = await blogCategoryRepo.findOne({ where: { name: blog.category, tenantId } });
            if (!blogCategory) {
                const newCategory: any = {};
                newCategory.name = blog.category;
                newCategory.isActive = 1;
                newCategory.tenantId = tenantId;
                newCategory.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                blogCategory = await blogCategoryRepo.save(newCategory);
            }
            const newBlog: any = {};
            newBlog.title = blog.title;
            newBlog.categoryId = blogCategory.blogCategoryId;
            newBlog.description = blog.description ?? '';
            newBlog.isActive = 1;
            newBlog.image = blog.image ?? '';
            newBlog.imagePath = `${data.vendorPrefixId.toLowerCase()}/`;
            newBlog.createdBy = tenantId;
            newBlog.blogSlug = blog.title.trim().replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newBlog.tenantId = tenantId;
            newBlog.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await blogRepo.save(newBlog);
        }
    };

    const createPricingGroup = async (pricingGroupParams: PricingGroupInterface, skuId: number) => {
        const priceGroup = pricingGroupParams;
        const slugName = priceGroup.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase();
        let pricingGroup: any = await vendorPriceGroupRepo.findOne({ where: { slug: slugName, vendorId: tenantId } });
        if (!pricingGroup) {
            const newPriceGroup: any = {};
            newPriceGroup.name = priceGroup.name;
            newPriceGroup.slug = slugName;
            newPriceGroup.description = priceGroup.description ?? '';
            newPriceGroup.vendorId = tenantId;
            newPriceGroup.isDefault = priceGroup.isDefault;
            newPriceGroup.createdBy = tenantId;
            newPriceGroup.isDelete = 0;
            newPriceGroup.isActive = 1;
            newPriceGroup.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            pricingGroup = await vendorPriceGroupRepo.save(newPriceGroup);

        }

        const newVendorPriceGroupDetail: any = {};
        newVendorPriceGroupDetail.priceGroupId = pricingGroup.id;
        newVendorPriceGroupDetail.skuId = skuId;
        newVendorPriceGroupDetail.unitId = 1;
        newVendorPriceGroupDetail.price = priceGroup.price;
        newVendorPriceGroupDetail.maxQuantity = priceGroup.maxQuantity;
        newVendorPriceGroupDetail.isActive = 1;
        newVendorPriceGroupDetail.isDelete = 0;
        newVendorPriceGroupDetail.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const savePriceDetail = await vendorPriceGroupDetailRepo.save(newVendorPriceGroupDetail);

        const sellerBuyerPrice: any = {};
        sellerBuyerPrice.customerId = customerUserData.id;
        sellerBuyerPrice.priceGroupId = pricingGroup.id;
        sellerBuyerPrice.createdBy = tenantId;
        sellerBuyerPrice.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        await vendorCustomerPriceRepo.save(sellerBuyerPrice);

        const sellerBuyerGroupPrice: any = {};
        sellerBuyerGroupPrice.customerGroupId = customerUserData.customerGroupId;
        sellerBuyerGroupPrice.priceGroupId = pricingGroup.id;
        sellerBuyerGroupPrice.createdBy = tenantId;
        sellerBuyerGroupPrice.modifiedBy = tenantId;
        sellerBuyerGroupPrice.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        await vendorCustomerGroupPriceRepo.save(sellerBuyerGroupPrice);

        const newPriceGroupSchedule: any = {};
        newPriceGroupSchedule.priceGroupDetailId = savePriceDetail.id;
        newPriceGroupSchedule.startDate = moment().format('YYYY-MM-DD HH:mm:ss');
        newPriceGroupSchedule.endDate = moment().add(15, 'days').format('YYYY-MM-DD HH:mm:ss');
        newPriceGroupSchedule.isActive = 1;
        newPriceGroupSchedule.isDelete = 0;
        newPriceGroupSchedule.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        await vendorPriceGroupScheduleRepo.save(newPriceGroupSchedule);
    };

    const addCustomerContact = async (customerContacts: CustomerContactInterface[]) => {
        for (const customerContact of customerContacts) {
            const newCustomerContact: any = {};
            newCustomerContact.firstName = customerContact.firstName;
            newCustomerContact.lastName = customerContact.lastName;
            newCustomerContact.email = customerContact.email;
            newCustomerContact.phoneNumber = customerContact.phoneNumber;
            newCustomerContact.description = customerContact.description;
            newCustomerContact.customerId = customerUserData.id;
            newCustomerContact.isActive = customerContact.isActive;
            newCustomerContact.isDelete = 0;
            newCustomerContact.shippingAddress1 = customerContact.shippingAddress1;
            newCustomerContact.shippingAddress2 = customerContact.shippingAddress2;
            newCustomerContact.shippingCity = customerContact.shippingCity;
            newCustomerContact.shippingPostcode = customerContact.shippingPostcode;
            const vendorCountry: any = await vendorCountryRepo.findOne({ where: { tenantId, country: { name: 'India' } }, relations: ['country'] });
            const zone: any = await zoneRepo.findOne({ where: { countryId: vendorCountry?.countryId } });
            newCustomerContact.shippingCountryId = vendorCountry?.countryId;
            newCustomerContact.shippingZoneId = zone?.zoneId;
            newCustomerContact.shippingFirstName = customerContact.shippingFirstName;
            newCustomerContact.shippingLastName = customerContact.shippingLastName;
            newCustomerContact.tenantId = tenantId;
            newCustomerContact.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await customerContactRepo.save(newCustomerContact);
        }
    };

    const customerUserData = await checkAndCreateCustomerUser(commonPayload.customer);
    createTicket(commonPayload.supportTicket);
    createBlog(commonPayload.blog);
    addCustomerContact(commonPayload.contacts);

    const sanitizeText = (text: string): string => {
        return text.replace(/[^a-zA-Z0-9, ]/g, '').trim();
    };

    await queryRunner.startTransaction();
    try {
        const variants = groupVariantOptions(payload);
        const masterVariants = await checkAndCreateVariants(variants, queryRunner);
        const productsWithCategory = await checkAndCreateFamilyAndCategory(payload, queryRunner);
        const attributeAndSpec = await checkAndCreateAttributesAndSpecification(queryRunner, productsWithCategory);

        const validate_sku = async (slug: string, id: number = 0, count: number = 0): Promise<string> => {

            const checkSlug = async (slugValue: string, idValue: number, countValue: number = 0): Promise<number> => {
                if (countValue > 0) {
                    slugValue = slugValue + countValue;
                }
                const checkSlugData = async (checkSlugValue: string, checkId: number): Promise<number> => {
                    const query = skuRepo.createQueryBuilder('sku');
                    query.where('sku.sku_name = :slug', { slug: checkSlugValue });
                    if (checkId > 0) {
                        query.andWhere('sku.id != :id', { id: checkId });
                    }
                    return query.getCount();
                };

                return await checkSlugData(slugValue, idValue);
            };

            const slugCount = await checkSlug(slug, id, count);

            if (slugCount) {
                if (!count) {
                    count = 1;
                } else {
                    count++;
                }
                return await validate_sku(slug, id, count);

            } else {
                if (count > 0) {
                    slug = slug + count;
                }
                return slug;
            }
        };

        for (const product of productsWithCategory) {

            let skuValue: any = await skuRepo.find({ where: { skuName: product.slug.split('-').join('').toUpperCase() } });
            if (skuValue) {
                skuValue = await validate_sku(product.slug.split('-').join('').toUpperCase(), 0, 0);
            }
            const newSku = {
                price: product.price ? parseFloat(product.price).toFixed(2) : null,
                quantity: product.quantity ? product.quantity : null,
                skuName: skuValue,
                isActive: 1,
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            };

            const saveSku: any = await skuRepo.save(newSku);

            const rows: any = [];
            if (product?.categories?.length) {
                for (const category of product.categories) {
                    const name = '~' + category + '~';
                    rows.push(name);
                }
                rows.push('~' + product.name + '~');
            }
            const value = rows.toString();

            const newProduct = {
                name: product.name,
                description: product.description,
                productSlug: product.slug,
                sku: newSku.skuName,
                skuId: saveSku.id,
                quantity: product.quantity,
                taxType: 1,
                taxValue: 10,
                isActive: 1,
                isSpecification: product.type === 2 ? 0 : 1,
                price: product.price ? parseFloat(product.price).toFixed(2) : null,
                owner: 2,
                hasStock: 0,
                keywords: value,
                stockStatusId: 1,
                isSimplified: product.type !== 0 ? 1 : 0,
                dateAvailable: moment().format('YYYY-MM-DD'),
                createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                productHighlights: product.productHighlights,
            };

            const productSave: any = await productRepo.save(newProduct);

            const vendorProducts: any = {};
            vendorProducts.productId = productSave.productId;
            vendorProducts.vendorId = tenantId;
            vendorProducts.sku_id = productSave.skuId;
            vendorProducts.approvalFlag = 1;
            vendorProducts.approvedBy = 0;
            vendorProducts.approvedDate = undefined;
            vendorProducts.rejectReason = [];

            await vendorProductRepo.save(vendorProducts);
            if (product.images) {
                for (const image of product.images) {
                    const newProductImage: any = {};
                    newProductImage.productId = productSave.productId;
                    newProductImage.image = image;
                    newProductImage.containerName = `${data.vendorPrefixId.toLowerCase()}/`;
                    newProductImage.defaultImage = 1;
                    newProductImage.sortOrder = 1;
                    newProductImage.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    productImageRepo.save(newProductImage);
                }
            }

            if (product.categoryIds) {
                for (const id of product.categoryIds) {
                    const newProductToCategory: any = {};
                    newProductToCategory.productId = productSave.productId;
                    newProductToCategory.categoryId = id;
                    newProductToCategory.isActive = 1;
                    newProductToCategory.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    await productToCategoryRepo.save(newProductToCategory);
                }
            }

            // create seo
            const newSeo: any = {};
            newSeo.metaTagTitle = sanitizeText(product.name);
            newSeo.metaTagDescription = sanitizeText(product.name);
            newSeo.metaTagKeyword = sanitizeText(product.name);
            newSeo.refId = productSave.productId;
            newSeo.seoType = 'product';
            newSeo.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await mSeoMetaRepo.save(newSeo);

            // Product Discount
            if (product.productDiscount) {
                const discountData: any = {};
                discountData.productId = productSave.productId;
                discountData.quantity = 1;
                discountData.priority = 1;
                discountData.price = product.productDiscount;
                discountData.skuId = productSave.skuId;
                discountData.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                discountData.dateStart = moment().format('YYYY-MM-DD');
                discountData.dateEnd = moment().add(30, 'days').format('YYYY-MM-DD');
                await productDiscountRepo.save(discountData);
            }
            // Product Special
            if (product.productSpecial) {
                const specialPriceData: any = {};
                specialPriceData.productId = productSave.productId;
                specialPriceData.priority = 1;
                specialPriceData.price = product.productSpecial;
                specialPriceData.skuId = productSave.skuId;
                specialPriceData.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                specialPriceData.dateStart = moment().format('YYYY-MM-DD');
                specialPriceData.dateEnd = moment().add(30, 'days').format('YYYY-MM-DD');
                await productSpecialRepo.save(specialPriceData);
            }

            if (product.type === 0 || product.type === 1) {
                const specMapProduct = {
                    productId: productSave.productId,
                    specificationId: attributeAndSpec.specificationDetails.id,
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                };
                const savedSpecMap: any = await productToSpecificationRepo.save(specMapProduct);

                const savedSpecToAttrGroup: any = await productSpecToAttrGroupRepo.save({
                    productSpecId: savedSpecMap.id,
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                });

                const attributes = product.attributes || [];

                for (const attr of attributes) {
                    const attrEntity: any = await attributeRepo.findOne({
                        where: {
                            name: ILike(attr.name),
                            tenantId,
                        },
                    });

                    if (!attrEntity) {
                        continue;
                    }
                    const savedAttr: any = await productSpecAttrGrouptoAttrRepo.save({
                        attributeId: attrEntity.id,
                        productSpecAttrGrpId: savedSpecToAttrGroup.id,
                    });

                    for (const val of attr.values) {
                        const attrVal: any = await attributeValueRepo.findOne({
                            where: {
                                attributeId: attrEntity.id,
                                value: val,
                            },
                        });

                        if (!attrVal) {
                            continue;
                        }

                        await productSpecAttrGrpAttrToAttrValRepo.save({
                            attributeValueId: attrVal.id,
                            productSpecAttrGrpAttrId: savedAttr.id,
                            value: val,
                        });
                    }
                }
            }

            if (product.type === 0) {
                const productVariantsMaster: any[] = [];
                const productVariantByName = product.variations[0];

                for (let optionIndex = 1; optionIndex <= 3; optionIndex++) {
                    const optionName = `Variant ${optionIndex} name`;
                    if (productVariantByName[optionName]) {
                        const getVariantFromMaster = masterVariants.find((masterVariant) => masterVariant.name === productVariantByName[optionName]);
                        productVariantsMaster.push(getVariantFromMaster);
                    }
                }

                const productVarient: any[] = [];
                const productVariantDetails: any[] = [];
                for (const productVariant of productVariantsMaster) {
                    const newProductVariant: any = {};
                    newProductVariant.productId = productSave.productId;
                    newProductVariant.variantId = productVariant.id;
                    newProductVariant.isActive = 1;
                    productVarient.push(newProductVariant);
                }

                productVariantDetails.push(...await productVariantRepo.save(productVarient));

                let index = 0;
                const image: any[] = [];

                // product.variations.shift();

                for (const productVariant of product.variations) {
                    const uniqueVariantCode = product.slug.split('-').join('').toUpperCase() + (index + 1).toString();

                    const newVariantSku = {
                        skuName: uniqueVariantCode,
                        price: product.price ? parseFloat(product.price).toFixed(2) : null,
                        quantity: productVariant.quantity ? productVariant.quantity : 0,
                        isActive: productVariant.isActive,
                        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                        tenantId,
                    };
                    const saveSkuData: any = await skuRepo.save(newVariantSku);

                    const newProductVarientOption: any = {};
                    newProductVarientOption.productId = productSave.productId;
                    newProductVarientOption.skuId = saveSkuData.id;
                    newProductVarientOption.varientName = uniqueVariantCode;
                    newProductVarientOption.isActive = 1;
                    newProductVarientOption.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    const val = await productVarientOptionRepo.save(newProductVarientOption);

                    const newProductVarientOptionDetails: any[] = [];

                    for (let optionIndex = 1; optionIndex <= 3; optionIndex++) {
                        const optionName = `Variant ${optionIndex} name`;
                        const optionValue = `Variant ${optionIndex} value`;
                        if (productVariant[optionName]) {
                            const getVariantFromProductVariantsMaster = productVariantsMaster.find((productVariantMaster) => productVariantMaster.name === productVariant[optionName]);
                            const getVariantValueFromProductVariantsMaster = getVariantFromProductVariantsMaster.values.find((productVariantValue) => productVariantValue.name === productVariant[optionValue]);
                            newProductVarientOptionDetails.push({
                                variantValueId: getVariantValueFromProductVariantsMaster.id,
                                productVariantId: (productVariantDetails.find((productVariantDetail) => productVariantDetail.variantId === getVariantFromProductVariantsMaster.id)).id,
                            });
                        }
                    }

                    const varientValue: any[] = [];
                    for (const newProductVarientOptionDetail of newProductVarientOptionDetails) {
                        newProductVarientOptionDetail.productVarientOptionId = val.id;
                        newProductVarientOptionDetail.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        varientValue.push(newProductVarientOptionDetail);
                    }
                    await productVarientOptionDetailRepo.save(varientValue);

                    if (productVariant.images.length) {
                        const newProductVarientOptionImage: any = {};
                        newProductVarientOptionImage.productVarientOptionId = val.id;
                        newProductVarientOptionImage.image = productVariant.images[0];
                        newProductVarientOptionImage.containerName = `${data.vendorPrefixId.toLowerCase()}/`;
                        newProductVarientOptionImage.defaultImage = 1;
                        newProductVarientOptionImage.sortOrder = 1;
                        newProductVarientOptionImage.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                        image.push(newProductVarientOptionImage);
                    }
                    index++;
                }
                await productVarientOptionImageRepo.save(image);
            }

            if (product.banner) {
                const bannerDetail = product.banner;
                const newBanner: any = {};
                newBanner.title = bannerDetail.title;
                newBanner.content = bannerDetail.content;
                newBanner.tenantId = tenantId;
                newBanner.linkType = 2;
                newBanner.link = product.slug;
                newBanner.position = bannerDetail.position;
                newBanner.isActive = 1;
                const bannerImages = [];
                bannerDetail.bannerImages.forEach(async (subImage) => {
                    const newBannerImage: any = {};
                    newBannerImage.imageName = subImage.image;
                    newBannerImage.imagePath = `${data.vendorPrefixId.toLowerCase()}/`;
                    newBannerImage.isPrimary = subImage.isPrimary;
                    bannerImages.push(newBannerImage);
                });
                newBanner.bannerImages = bannerImages;
                newBanner.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                await bannerRepo.save(newBanner);
            }

            if (product.widget) {
                const widgetDetail = product.widget;
                const widgetName = widgetDetail.title;
                const slugData = widgetName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                let widgetValue: any = await widgetRepo.createQueryBuilder('widget')
                    // .select(['widget.widget_id as widgetId', 'widget.widget_slug_name as widgetSlugName', 'widget.widget_title as widgetTitle'])
                    .where('widget.widgetSlugName = :value', { value: slugData })
                    .andWhere('widget.tenantId =:tenantId', { tenantId })
                    .getOne();
                if (!widgetValue) {
                    widgetValue = await widgetRepo.save({
                        widgetSlugName: slugData,
                        widgetTitle: widgetName,
                        widgetLongTitle: widgetDetail.widgetLongTitle ?? widgetName,
                        ShowHomePageWidget: 1,
                        widgetDescription: widgetDetail.content,
                        widgetLinkType: 2,
                        position: widgetDetail.position,
                        isActive: 1,
                        tenantId,
                        metaTagTitle: widgetName,
                        metaTagKeyword: widgetName,
                        metaTagDescription: widgetName,
                        createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    });
                }
                // Add ref item
                const newItem: any = {};
                newItem.widgetId = widgetValue.widgetId;
                newItem.refId = productSave.productId;
                newItem.createdDate = moment().format('YYYY-MM-DD HH:mm:ss'),
                    await widgetItemRepo.save(newItem);
            }
            // if (product.shoppingCart) {
            //     let getCustomerCartGroup: any = await shoppingCartRepo.findOne({ where: { name: product.shoppingCart.name, tenantId, customerId: customerUserData.id } });
            //     if (!getCustomerCartGroup) {
            //         const newShoppingCart: any = {};
            //         newShoppingCart.name = product.shoppingCart.name;
            //         newShoppingCart.isDefault = product.shoppingCart.isDefault;
            //         newShoppingCart.notes = product.shoppingCart.notes;
            //         newShoppingCart.customerId = customerUserData.id;
            //         newShoppingCart.tenantId = tenantId;
            //         newShoppingCart.createdBy = customerUserData.customerUser.id;
            //         newShoppingCart.createdByType = 'buyer';
            //         newShoppingCart.customerUserId = customerUserData.customerUser.id;
            //         getCustomerCartGroup = await shoppingCartRepo.save(newShoppingCart);
            //     }

            //     const addShoppingCartDetail: any = {};
            //     addShoppingCartDetail.productId = productSave.productId;
            //     addShoppingCartDetail.quantity = 2;
            //     addShoppingCartDetail.price = productSave.price;
            //     addShoppingCartDetail.skuId = productSave.skuId;
            //     addShoppingCartDetail.shoppingCartId = getCustomerCartGroup.id;
            //     await shoppingCartDetailsRepo.save(addShoppingCartDetail);
            //     // await createOrder(addShoppingCartDetail);
            // }

            if (product.type !== 0) {
                if (product.questionsAnswers) {
                    addQuestionAndAnswer(productSave.productId, productSave.skuId, product.questionsAnswers.question, product.questionsAnswers.answer);
                }
                if (product.pricingGroup) {
                    createPricingGroup(product.pricingGroup, productSave.skuId);
                }
                if (product.ratingAndReview) {
                    const newRating: any = {};
                    newRating.review = product.ratingAndReview.review;
                    newRating.rating = product.ratingAndReview.rating;
                    newRating.productId = productSave.productId;
                    newRating.skuId = productSave.skuId;
                    newRating.customerId = customerUserData.id;
                    newRating.firstName = customerUserData.firstName;
                    newRating.lastName = customerUserData.lastName;
                    newRating.email = customerUserData.email;
                    newRating.isActive = 1;
                    newRating.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    await productRatingRepo.save(newRating);
                }
            }
        }

        // const shoppingCartData: any = await shoppingCartRepo
        //     .createQueryBuilder('shoppingCart')
        //     .innerJoinAndSelect('shoppingCart.shoppingCartDetail', 'shoppingCartDetail')
        //     .where('shoppingCart.customerId = :customerId', { customerId: customerUserData.id })
        //     .andWhere('shoppingCart.tenantId = :tenantId', { tenantId })
        //     .andWhere('shoppingCart.isOrdered = :isOrdered', { isOrdered: 0 })
        //     .getMany();
        // for (const cartDetail of shoppingCartData) {

        //     // RFQ --
        //     const newRfq: any = {};
        //     newRfq.firstName = customerUserData.firstName;
        //     newRfq.lastName = customerUserData.lastName;
        //     newRfq.customerId = customerUserData.id;
        //     newRfq.emailAddress = customerUserData.email;
        //     newRfq.phoneNumber = customerUserData.customerUser.phoneNumber;
        //     newRfq.company = customerUserData.address.company;
        //     newRfq.doNotShipLaterThan = moment().add(15, 'days').format('YYYY/MM/DD');
        //     newRfq.poNumber = `PO${Date.now()}`;
        //     newRfq.tenantId = tenantId;
        //     newRfq.role = 'Buyer';
        //     newRfq.customerUserId = payload.customerUserId;
        //     newRfq.statusId = 8;
        //     newRfq.createdByType = 'buyer';
        //     newRfq.createdBy = customerUserData.customerUser.id;
        //     newRfq.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        //     const newRfqDetails: any = [];
        //     cartDetail.shoppingCartDetail.forEach((detailVal) => {
        //         const newRfqDetail: any = {};
        //         newRfqDetail.listedPrice = detailVal.price;
        //         newRfqDetail.notes = cartDetail.notes ?? '';
        //         newRfqDetail.productId = detailVal.productId;
        //         newRfqDetail.quantity = detailVal.quantity;
        //         newRfqDetail.skuId = detailVal.skuId;
        //         newRfqDetail.targetPrice = +detailVal.price * 0.9;
        //         newRfqDetail.createdBy = customerUserData.customerUser.id;
        //         newRfqDetail.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        //         newRfqDetails.push(newRfqDetail);
        //     });
        //     newRfq.quoteRequestDetail = newRfqDetails;
        //     const savedRfq: any = await quoteRequestRepo.save(newRfq);
        //     const quoteRequestNo = `#${savedRfq.id.toString().padStart(6, '0')}`;
        //     await quoteRequestRepo.update(savedRfq.id, { quoteRequestNo });

        //     // Quotes --
        //     const newQuote: any = {};
        //     newQuote.quoteRequestId = savedRfq.id;
        //     newQuote.tenantId = tenantId;
        //     newQuote.poNumber = savedRfq.poNumber;
        //     newQuote.statusId = 8;
        //     newQuote.validUntil = moment().add(15, 'days').format('YYYY/MM/DD');
        //     newQuote.customerId = customerUserData.id;
        //     newQuote.notes = cartDetail.notes ?? '';
        //     newQuote.createdBy = customerUserData.customerUser.id;
        //     newQuote.paymentTermId = 0;
        //     newQuote.shippingCostOverride = 10;
        //     newQuote.doNotShipLaterThan = moment().add(15, 'days').format('YYYY/MM/DD');
        //     newQuote.customerUserId = customerUserData.customerUser.id;
        //     newQuote.paymentRuleId = 2;
        //     newQuote.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        //     newQuote.quoteDetails = cartDetail.shoppingCartDetail.map((detail) => {
        //         return {
        //             productId: detail.productId,
        //             skuId: detail.skuId,
        //             quantity: detail.quantity,
        //             listedPrice: detail.price,
        //             offeredPrice: +detail.price * 0.95,
        //             notes: '',
        //             createdBy: customerUserData.customerUser.id,
        //             createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        //         };
        //     });
        //     const savedQuote = await quoteRepo.save(newQuote);
        //     const quoteNo = `#${savedQuote.id.toString().padStart(6, '0')}`;
        //     await quoteRepo.update(savedQuote.id, { quoteNo });

        //     await Promise.all(
        //         Array.from({ length: 2 }, () => createOrder(cartDetail.shoppingCartDetail))
        //     );
        // }

        // Mark original shopping carts as ordered to show them in closed shopping list
        // command below for to show shopping carts list in open shopping list and complete shopping list
        // const shoppingDatas: any = await shoppingCartRepo
        //     .createQueryBuilder('shoppingCart')
        //     .where('shoppingCart.customerId = :customerId', { customerId: customerUserData.id })
        //     .andWhere('shoppingCart.isOrdered = :isOrdered', { isOrdered: 0 })
        //     .getMany();
        // if (shoppingDatas.length > 1) {
        //     const updateShoppingCart = shoppingDatas[1];
        //     updateShoppingCart.isOrdered = 1;
        //     await shoppingCartRepo.save(updateShoppingCart);
        // }
        // await shoppingCartRepo.update(
        //     { customerId: customerUserData.id, tenantId, isOrdered: 0 },
        //     { isOrdered: 1 }
        // );

        // Commented out to prevent duplicate shopping cart names in seller panel
        // The closed shopping list should show the original carts that were ordered, not duplicates
        // const shoppingCartOrderData = shoppingCartData.map((cartValue) => {
        //     return {
        //         ...cartValue,
        //         id: undefined,
        //         isOrdered: 1,
        //         shoppingCartDetail: cartValue.shoppingCartDetail?.map((detail) => ({
        //             ...detail,
        //             id: undefined,
        //         })) || [],
        //     };
        // });

        // shoppingCartRepo.save(shoppingCartOrderData);
        await queryRunner.commitTransaction();
        return true;
    } catch (err: any) {
        await queryRunner.rollbackTransaction();
        console.log('demo migration error', err);
        return err;
    }
}
