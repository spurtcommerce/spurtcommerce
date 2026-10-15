import moment from 'moment';
import { IsNull, QueryRunner } from 'typeorm';
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
    const skuRepo = queryRunner.manager.getRepository('Sku');
    const productRepo = queryRunner.manager.getRepository('Product');
    const productToCategoryRepo = queryRunner.manager.getRepository('ProductToCategory');
    const vendorProductRepo = queryRunner.manager.getRepository('VendorProducts');
    const productImageRepo = queryRunner.manager.getRepository('ProductImage');
    const bannerRepo = queryRunner.manager.getRepository('Banner');
    const widgetRepo = queryRunner.manager.getRepository('Widget');
    const widgetItemRepo = queryRunner.manager.getRepository('WidgetItem');
    const vendorSettingsRepo = queryRunner.manager.getRepository('VendorSettings');
    const vendorRepo = queryRunner.manager.getRepository('Vendor');
    const vendorCountryRepo = queryRunner.manager.getRepository('VendorCountry');
    const vendorLanguageRepo = queryRunner.manager.getRepository('VendorLanguage');
    const zoneRepo = queryRunner.manager.getRepository('Zone');
    const industryRepo = queryRunner.manager.getRepository('Industry');
    const customerRepo = queryRunner.manager.getRepository('Customer');
    const customerUserRepo = queryRunner.manager.getRepository('CustomerUsers');
    const customerUserGroupRepo = queryRunner.manager.getRepository('CustomerUserGroup');
    const addressRepo = queryRunner.manager.getRepository('Address');
    const orderStatusRepo = queryRunner.manager.getRepository('OrderStatus');
    const productSpecialRepo = queryRunner.manager.getRepository('ProductSpecial');
    const productDiscountRepo = queryRunner.manager.getRepository('ProductDiscount');
    const customerGroupRepo = queryRunner.manager.getRepository('CustomerGroup');
    const pageGroupRepo = queryRunner.manager.getRepository('PageGroup');
    const blogCategoryRepo = queryRunner.manager.getRepository('BlogCategory');
    const blogRepo = queryRunner.manager.getRepository('Blog');
    const customerContactRepo = queryRunner.manager.getRepository('CustomerContact');
    const countryRepo = queryRunner.manager.getRepository('Country');
    const languageRepo = queryRunner.manager.getRepository('Language');
    const vendorTaxRepo = queryRunner.manager.getRepository('VendorTax');
    const taxRepo = queryRunner.manager.getRepository('Tax');
    const currencyRepo = queryRunner.manager.getRepository('Currency');
    const vendorUserRepo = queryRunner.manager.getRepository('VendorUsers');
    const mSeoMetaRepo = queryRunner.manager.getRepository('MSeoMeta');
    const paymentRuleRepository = queryRunner.manager.getRepository('PaymentRule');
    const customerToGroupRepo = queryRunner.manager.getRepository('CustomerToGroup');
    const orderRepo = queryRunner.manager.getRepository('Order');
    const orderLogRepo = queryRunner.manager.getRepository('OrderLog');
    const orderProductRepo = queryRunner.manager.getRepository('OrderProduct');
    const orderProductLogRepo = queryRunner.manager.getRepository('OrderProductLog');
    const orderTotalRepo = queryRunner.manager.getRepository('OrderTotal');
    const vendorOrderRepo = queryRunner.manager.getRepository('VendorOrders');
    const vendorOrderLogRepo = queryRunner.manager.getRepository('VendorOrderLog');
    const vendorInvoiceRepo = queryRunner.manager.getRepository('VendorInvoice');
    const vendorInvoiceItemRepo = queryRunner.manager.getRepository('VendorInvoiceItem');
    const stockLogRepo = queryRunner.manager.getRepository('StockLog');

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
        vendorSettings.siteName = 'spurtB2C';
        // vendorSettings.storeUrl = env.storeRedirectUrl.split('//')[0] + '//' + data.companyName + '.' + env.storeRedirectUrl.split('//')[1];
        vendorSettings.storeUrl = env.storeRedirectUrl;
        vendorData.companyDescription = 'SpurtB2c is a scalable, cloud-based B2C eCommerce platform designed to help enterprises build, manage, and grow effortlessly';
        vendorSettings.storeTitle = 'Spurtb2C';
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

        let saveCustomer: any = await customerRepo.findOne({ where: { email: payloadData.email, tenantId } });
        if (saveCustomer) {
            const existingAddress = await addressRepo.findOne({ where: { customerId: saveCustomer.id, addressType: 0 } });
            const existingCustomerUser = await customerUserRepo.findOne({ where: { customerId: saveCustomer.id } });
            saveCustomer.address = existingAddress;
            saveCustomer.customerUser = existingCustomerUser;
            return saveCustomer;
        }

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
        saveCustomer = await customerRepo.save(newCustomer);

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
    await createPageAndGroup(commonPayload.pageGroups);

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
    await createBlog(commonPayload.blog);
    await addCustomerContact(commonPayload.contacts);

    const sanitizeText = (text: string): string => {
        return text.replace(/[^a-zA-Z0-9, ]/g, '').trim();
    };

    const createOrdersForProducts = async (
        orderProductsList: Array<{ productId: number; skuId: number; skuName: string; name: string; price: number; quantity: number; hasStock?: number; taxType?: number; taxValue?: number }>,
        customerData: any,
        vSettings: any,
        vData: any
    ) => {
        if (!orderProductsList || orderProductsList.length === 0) {
            return;
        }

        let orderStatus: any = await orderStatusRepo.findOne({ where: { statusId: 1, tenantId } });
        if (!orderStatus) {
            orderStatus = await orderStatusRepo.findOne({ where: { tenantId } });
        }
        if (!orderStatus) {
            orderStatus = await orderStatusRepo.findOne({ where: { defaultStatus: 1 } });
        }
        if (!orderStatus) {
            orderStatus = await orderStatusRepo.findOne({});
        }

        let currency: any = await currencyRepo.findOne({ where: { currencyId: vSettings?.storeCurrencyId } });
        if (!currency) {
            currency = await currencyRepo.findOne({});
        }

        const vendorCountryData: any = await vendorCountryRepo.findOne({
            where: { tenantId },
            relations: ['country'],
        });

        const createDemoOrder = async (
            items: Array<{ productId: number; skuId: number; skuName: string; name: string; price: number; quantity: number; hasStock?: number; taxType?: number; taxValue?: number }>,
            daysAgo: number = 0
        ) => {
            const orderDateMoment = moment().subtract(daysAgo, 'days');
            const orderDateStr = orderDateMoment.format('YYYY-MM-DD HH:mm:ss');
            const odrDate = orderDateMoment.format('YYYYMMDD');

            const newOrder = {} as any;
            newOrder.customerId = customerData?.id || 1;
            newOrder.firstname = customerData?.firstName || 'Demo';
            newOrder.lastname = customerData?.lastName || 'Buyer';
            newOrder.email = customerData?.email || 'buyer@spurtcommerce.com';
            newOrder.telephone = customerData?.address?.phoneNo || 9876543210;
            newOrder.shippingFirstname = customerData?.firstName || 'Demo';
            newOrder.shippingLastname = customerData?.lastName || 'Buyer';
            newOrder.shippingAddress1 = customerData?.address?.address1 || '123 Demo Street';
            newOrder.shippingAddress2 = customerData?.address?.address2 || '';
            newOrder.shippingCompany = vData?.company || '';
            newOrder.shippingCity = customerData?.address?.city || 'Chennai';
            newOrder.shippingZone = customerData?.address?.state || 'Tamil Nadu';
            newOrder.shippingCountryId = customerData?.address?.countryId || 99;
            newOrder.shippingZoneId = customerData?.address?.zoneId || 0;
            newOrder.shippingCountry = vendorCountryData?.country?.name || 'India';
            newOrder.shippingPostcode = customerData?.address?.postcode || '600001';
            newOrder.shippingAddressFormat = '';
            newOrder.shippingMethod = 'Standard Delivery';
            newOrder.paymentFirstname = customerData?.firstName || 'Demo';
            newOrder.paymentLastname = customerData?.lastName || 'Buyer';
            newOrder.paymentAddress1 = customerData?.address?.address1 || '123 Demo Street';
            newOrder.paymentAddress2 = customerData?.address?.address2 || '';
            newOrder.paymentMobileNumber = customerData?.address?.phoneNo || '9876543210';
            newOrder.paymentCompany = vData?.company || '';
            newOrder.paymentCity = customerData?.address?.city || 'Chennai';
            newOrder.paymentZone = customerData?.address?.state || 'Tamil Nadu';
            newOrder.paymentCountry = vendorCountryData?.country?.name || 'India';
            newOrder.paymentCountryId = customerData?.address?.countryId || 99;
            newOrder.paymentZoneId = customerData?.address?.zoneId || 0;
            newOrder.paymentPostcode = customerData?.address?.postcode || '600001';
            newOrder.paymentMethod = '1';
            newOrder.customerGstNo = '';
            newOrder.ip = '127.0.0.1';
            newOrder.isActive = 1;
            newOrder.backOrders = 0;
            newOrder.paymentProcess = 0;
            newOrder.paymentStatus = 1;
            newOrder.paymentFlag = 1;
            newOrder.orderStatusId = orderStatus?.orderStatusId ?? 1;
            newOrder.invoicePrefix = vSettings?.invoicePrefix || 'Spurt';
            newOrder.currencyCode = currency?.code || 'INR';
            newOrder.currencyValue = currency?.value || 1;
            newOrder.currencySymbolLeft = currency?.symbolLeft || '₹';
            newOrder.currencySymbolRight = currency?.symbolRight || '';
            newOrder.tenantId = tenantId;
            newOrder.createdDate = orderDateStr;
            newOrder.modifiedDate = orderDateStr;
            newOrder.mustShipBefore = moment(orderDateMoment).add(10, 'days').format('YYYY-MM-DD');
            newOrder.poNumber = 'PO-' + Math.floor(100000 + Math.random() * 900000);
            newOrder.notes = 'Demo Order';
            newOrder.paymentRuleId = 1;
            newOrder.paymentTermId = 1;
            newOrder.createdByType = 'buyer';
            newOrder.orderSource = 'shopping-cart';
            newOrder.shippingCostOverride = 10;
            newOrder.amount = 0;
            newOrder.total = 0;

            const savedOrder: any = await orderRepo.save(newOrder);

            savedOrder.invoiceNo = 'INV00'.concat(savedOrder.orderId);
            savedOrder.orderPrefixId = (vSettings?.invoicePrefix || 'Spurt').concat('-' + odrDate + savedOrder.orderId);
            await orderRepo.save(savedOrder);

            await orderLogRepo.save({ ...savedOrder, orderLogId: undefined });

            let orderTotalAmount = 0;
            let j = 1;
            for (const item of items) {
                const itemQty = item.quantity || 1;
                const itemPrice = +item.price || 0;
                const itemTotal = itemQty * itemPrice;
                orderTotalAmount += itemTotal;

                const productDetails: any = {};
                productDetails.productId = item.productId;
                productDetails.orderProductPrefixId = (savedOrder.invoicePrefix || 'Spurt').concat('-' + odrDate + savedOrder.orderId) + j;
                productDetails.name = item.name;
                productDetails.orderId = savedOrder.orderId;
                productDetails.quantity = itemQty;
                productDetails.productPrice = itemPrice;
                productDetails.basePrice = itemPrice;
                productDetails.discountAmount = 0;
                productDetails.discountedAmount = 0;
                productDetails.taxType = item.taxType || 1;
                productDetails.taxValue = item.taxValue || 10;
                productDetails.total = itemTotal;
                productDetails.model = item.name;
                productDetails.skuName = item.skuName || '';
                productDetails.priceGroupDetailId = 0;
                productDetails.orderStatusId = orderStatus?.orderStatusId ?? 1;
                productDetails.isActive = 1;
                productDetails.createdDate = orderDateStr;
                productDetails.modifiedDate = orderDateStr;

                const savedOrderProduct: any = await orderProductRepo.save(productDetails);
                await orderProductLogRepo.save({ ...savedOrderProduct, orderProductLogId: undefined });

                // Vendor Order
                const vendorOrder: any = {};
                vendorOrder.subOrderId = (savedOrder.invoicePrefix || 'Spurt').concat('-' + odrDate + savedOrder.orderId) + tenantId + j;
                vendorOrder.vendorId = tenantId;
                vendorOrder.orderId = savedOrder.orderId;
                vendorOrder.orderProductId = savedOrderProduct.orderProductId;
                vendorOrder.total = itemTotal;
                vendorOrder.subOrderStatusId = orderStatus?.orderStatusId ?? 1;
                vendorOrder.commission = 0;
                vendorOrder.createdDate = orderDateStr;
                vendorOrder.modifiedDate = orderDateStr;
                const savedVendorOrder: any = await vendorOrderRepo.save(vendorOrder);

                // Vendor Order Log
                const vendorOrderLog: any = {};
                vendorOrderLog.vendorOrderId = savedVendorOrder.vendorOrderId;
                vendorOrderLog.subOrderId = savedVendorOrder.subOrderId;
                vendorOrderLog.vendorId = tenantId;
                vendorOrderLog.orderId = savedOrder.orderId;
                vendorOrderLog.subOrderStatusId = orderStatus?.orderStatusId ?? 1;
                vendorOrderLog.total = itemTotal;
                vendorOrderLog.createdDate = orderDateStr;
                vendorOrderLog.modifiedDate = orderDateStr;
                await vendorOrderLogRepo.save(vendorOrderLog);

                // Vendor Invoice
                let vendorInvoiceData: any = await vendorInvoiceRepo.findOne({ where: { vendorId: tenantId, orderId: savedOrder.orderId } });
                if (!vendorInvoiceData) {
                    const newVendorInvoice: any = {};
                    newVendorInvoice.vendorId = tenantId;
                    newVendorInvoice.invoicePrefix = savedOrder.invoicePrefix || 'Spurt';
                    newVendorInvoice.invoiceNo = 'TEMP';
                    newVendorInvoice.orderId = savedOrder.orderId;
                    newVendorInvoice.email = customerData?.email || 'buyer@spurtcommerce.com';
                    newVendorInvoice.total = 0;
                    newVendorInvoice.shippingFirstname = customerData?.firstName || 'Demo';
                    newVendorInvoice.shippingLastname = customerData?.lastName || 'Buyer';
                    newVendorInvoice.createdDate = orderDateStr;
                    newVendorInvoice.modifiedDate = orderDateStr;
                    vendorInvoiceData = await vendorInvoiceRepo.save(newVendorInvoice);
                }
                vendorInvoiceData.total = (+vendorInvoiceData.total || 0) + itemTotal;
                const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                await vendorInvoiceRepo.save(vendorInvoiceData);

                const newVendorInvoiceItem: any = {};
                newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                newVendorInvoiceItem.orderProductId = savedOrderProduct.orderProductId;
                newVendorInvoiceItem.createdDate = orderDateStr;
                newVendorInvoiceItem.modifiedDate = orderDateStr;
                await vendorInvoiceItemRepo.save(newVendorInvoiceItem);

                // Stock log
                if (item.hasStock === 1) {
                    const skuRecord: any = await skuRepo.findOne({ where: { skuName: savedOrderProduct.skuName } });
                    if (skuRecord) {
                        skuRecord.quantity = Math.max(0, (+skuRecord.quantity || 0) - itemQty);
                        await skuRepo.save(skuRecord);
                    }
                    const stockLog: any = {};
                    stockLog.productId = savedOrderProduct.productId;
                    stockLog.orderId = savedOrder.orderId;
                    stockLog.skuName = savedOrderProduct.skuName;
                    stockLog.quantity = itemQty;
                    stockLog.createdDate = orderDateStr;
                    await stockLogRepo.save(stockLog);
                }

                j++;
            }

            // Finalize order amount and total
            savedOrder.amount = orderTotalAmount;
            savedOrder.total = orderTotalAmount + (+savedOrder.shippingCostOverride || 0);
            await orderRepo.save(savedOrder);

            const newOrderTotal: any = {};
            newOrderTotal.orderId = savedOrder.orderId;
            newOrderTotal.value = savedOrder.total;
            newOrderTotal.createdDate = orderDateStr;
            newOrderTotal.modifiedDate = orderDateStr;
            await orderTotalRepo.save(newOrderTotal);
        };

        const p1 = orderProductsList[0];
        const p2 = orderProductsList[1] || orderProductsList[0];
        const p3 = orderProductsList[2] || orderProductsList[0];

        // Order 1: 3 days ago
        await createDemoOrder([{ ...p1, quantity: 1 }], 3);

        // Order 2: 1 day ago
        await createDemoOrder([{ ...p2, quantity: 2 }], 1);

        // Order 3: today
        await createDemoOrder([
            { ...p1, quantity: 1 },
            { ...p3, quantity: 1 },
        ], 0);
    };

    const existingVendorProductCount = await vendorProductRepo.count({ where: { vendorId: tenantId } });
    const existingVendorOrderCount = await vendorOrderRepo.count({ where: { vendorId: tenantId } });

    if (existingVendorProductCount > 0 && existingVendorOrderCount > 0) {
        console.log(`[DemoMigrate] Products and orders already exist for vendor ${tenantId}. Skipping.`);
        return true;
    }

    if (existingVendorProductCount > 0 && existingVendorOrderCount === 0) {
        console.log(`[DemoMigrate] Products exist (${existingVendorProductCount}) but orders are missing for vendor ${tenantId}. Generating demo orders...`);
        const vSettings: any = await vendorSettingsRepo.findOne({ where: { vendorId: tenantId } });
        const vData: any = await vendorRepo.findOne({ where: { vendorId: tenantId } });

        const existingVendorProducts: any = await vendorProductRepo.find({
            where: { vendorId: tenantId },
            relations: ['product', 'sku'],
        });

        const productsForOrder = existingVendorProducts.map((vp: any) => ({
            productId: vp.productId,
            skuId: vp.sku_id || vp.sku?.id,
            skuName: vp.sku?.skuName || vp.product?.sku || '',
            name: vp.product?.name || 'Product',
            price: +(vp.sku?.price || vp.product?.price || 100),
            quantity: 1,
            hasStock: vp.product?.hasStock || 0,
            taxType: vp.product?.taxType || 1,
            taxValue: vp.product?.taxValue || 10,
        }));

        await queryRunner.startTransaction();
        try {
            await createOrdersForProducts(productsForOrder, customerUserData, vSettings, vData);
            await queryRunner.commitTransaction();
            console.log(`[DemoMigrate] Successfully created demo orders for existing vendor ${tenantId}.`);
            return true;
        } catch (err: any) {
            await queryRunner.rollbackTransaction();
            console.error('[DemoMigrate] Error creating demo orders:', err);
            return err;
        }
    }

    await queryRunner.startTransaction();
    try {
        const productsWithCategory = await checkAndCreateFamilyAndCategory(payload, queryRunner);

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

        const createdProducts: any[] = [];
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

            createdProducts.push({
                productId: productSave.productId,
                skuId: productSave.skuId,
                skuName: newSku.skuName,
                name: product.name,
                price: +(product.price || 100),
                quantity: +(product.quantity || 10),
                hasStock: productSave.hasStock,
                taxType: productSave.taxType,
                taxValue: productSave.taxValue,
            });
            if (product.images) {
                for (const image of product.images) {
                    const newProductImage: any = {};
                    newProductImage.productId = productSave.productId;
                    newProductImage.image = image;
                    newProductImage.containerName = `${data.vendorPrefixId.toLowerCase()}/`;
                    newProductImage.defaultImage = 1;
                    newProductImage.sortOrder = 1;
                    newProductImage.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    await productImageRepo.save(newProductImage);
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
                newItem.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                await widgetItemRepo.save(newItem);
            }
        }

        const vSettings: any = await vendorSettingsRepo.findOne({ where: { vendorId: tenantId } });
        const vData: any = await vendorRepo.findOne({ where: { vendorId: tenantId } });
        await createOrdersForProducts(createdProducts, customerUserData, vSettings, vData);

        await queryRunner.commitTransaction();
        return true;
    } catch (err: any) {
        await queryRunner.rollbackTransaction();
        console.log('demo migration error', err);
        return err;
    }
}
