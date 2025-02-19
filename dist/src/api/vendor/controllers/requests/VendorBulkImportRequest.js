"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorBulkImport = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const pluginLoader_1 = require("../../../../loaders/pluginLoader");
const SkuService_1 = require("../../../core/services/SkuService");
const CategoryService_1 = require("../../../core/services/CategoryService");
require("reflect-metadata");
const VendorGroupCategoryService_1 = require("../../../core/services/VendorGroupCategoryService");
let VendorBulkImport = class VendorBulkImport {
    constructor(skuService, categoryService, vendorGroupCategoryService) {
        this.skuService = skuService;
        this.categoryService = categoryService;
        this.vendorGroupCategoryService = vendorGroupCategoryService;
        this.validationConfig = {
            Quantity: 'Quantity value should be numeric format',
            Price: 'Price value should be numeric format',
            Tax: 'Tax value should be numeric format',
            Manufacturer_Status: 'Manufacturer_Status value should be numeric format',
            Stock_Status_Id: 'Stock_Status_Id value should be numeric format',
            Required_Shipping: 'Required_Shipping value should be numeric format',
            Height: 'Height value should be numeric format',
            Weight: 'Weight value should be numeric format',
            Width: 'Width value should be numeric format',
            Length: 'Length value should be numeric format',
            Package_Cost: 'Package_Cost value should be numeric format',
            Shipping_Cost: 'Shipping_Cost value should be numeric format',
            VendorId: 'VendorId value should be numeric format',
            Variant_Quantity: 'Variant_Quantity value should be numeric format',
            Variant_OriginalPrice: 'Variant_OriginalPrice value should be numeric format',
            Variant_Price: 'Variant_Price value should be numeric format',
            Has_Tire_Price: 'Has_Tire_Price value should be numeric format',
            // Add more fields as needed
        };
        this.catageryValidation = {
            Sort_Order: 'The Sort_Order value should be numeric format',
            Status: 'The Status value should be in numeric format',
            Status_Value: 'The status value should be either 1 or 0 (1 -> Active, 0 -> In-Active)',
            Parent_Category: 'The Parent_Category value should be in numeric format',
        };
    }
    bulkImportRequest(filterName, inputData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let totalDiscount = 0;
            let totalSpecial = 0;
            let totalTire = 0;
            const productArr = [];
            for (const fName of filterName) {
                const tempObj = {};
                const variantOption = [];
                const attributeDats = [];
                const discount = [];
                const specialPrice = [];
                const tirePriceData = [];
                const categoryDatas = [];
                const productVideo = [];
                let i = 0;
                for (const data of inputData) {
                    const variantOptionObj = {};
                    // Request from 0th index values
                    if (fName === data.Name && i === 0) {
                        tempObj.SKU = data.SKU;
                        tempObj.UPC = data.UPC;
                        tempObj.HSN = data.HSN;
                        tempObj.Quantity = data.Quantity;
                        tempObj.Price = data.Price;
                        tempObj.Tax = data.Tax;
                        tempObj.DateAvailable = data.DateAvailable;
                        tempObj.Name = data.Name;
                        tempObj.Description = data.Description;
                        tempObj.Model = data.Model;
                        tempObj.Condition = data.Condition;
                        tempObj.ManufacturerName = data.Manufacturer_Name;
                        tempObj.ManufacturerImage = data.Manufacturer_Image;
                        tempObj.ManufacturerStatus = data.Manufacturer_Status;
                        tempObj.StockStatusId = data.Stock_Status_Id;
                        tempObj.MetaTagTitle = data.MetaTagTitle;
                        tempObj.MetaTagDescription = data.MetaTagDescription;
                        tempObj.MetaTagKeyword = data.MetaTagKeyword;
                        tempObj.ProductSlug = data.ProductSlug;
                        tempObj.Images = data.Images;
                        tempObj.CategoryName = data.CategoryName;
                        tempObj.CategorySortOrder = data.CategorySortOrder;
                        tempObj.RelatedProductId = data.RelatedProductId;
                        tempObj.Required_Shipping = data.Required_Shipping;
                        tempObj.Height = data.Height;
                        tempObj.Weight = data.Weight;
                        tempObj.Width = data.Width;
                        tempObj.Length = data.Length;
                        tempObj.PackageCost = data.Package_Cost;
                        tempObj.ShippingCost = data.Shipping_Cost;
                        tempObj.VendorId = data.VendorId;
                        const videoArr = data.Video_Link;
                        if (videoArr) {
                            if (videoArr.includes(',')) {
                                const splitVideoArr = videoArr.split(',');
                                productVideo.push(...splitVideoArr);
                            }
                            else {
                                productVideo.push(data.Video_Link);
                            }
                        }
                        variantOptionObj.variantSku = data.Variant_sku;
                        variantOptionObj.variantQuantity = data.Variant_Quantity;
                        variantOptionObj.variantImage = data.Variant_Image;
                        variantOptionObj.variantPrice = data.Variant_Price;
                        variantOptionObj.variantOriginalPrice = data.Variant_OriginalPrice;
                        // Discount price
                        let m = 1;
                        while (m >= 1) {
                            if ('Discount_Priority_' + m in data === true && 'Discount_Priority_' + m !== '') {
                                if (data['Discount_Priority_' + m] !== '') {
                                    const discountValues = {};
                                    discountValues.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    discountValues.discountQuantity = +data['Discount_Quantity_' + m] ? +data['Discount_Quantity_' + m] : undefined;
                                    discountValues.discountPriority = +data['Discount_Priority_' + m] ? +data['Discount_Priority_' + m] : undefined;
                                    discountValues.discountPrice = +data['Discount_Price_' + m] ? +data['Discount_Price_' + m] : undefined;
                                    discountValues.discountStartDate = data['Discount_Date_Start_' + m] ? data['Discount_Date_Start_' + m] : undefined;
                                    discountValues.discountEndDate = data['Discount_Date_End_' + m] ? data['Discount_Date_End_' + m] : undefined;
                                    discount.push(discountValues);
                                }
                                m++;
                                totalDiscount++;
                            }
                            else {
                                m = 0;
                            }
                        }
                        // special price
                        let l = 1;
                        while (l >= 1) {
                            if ('Product_Special_Priority_' + l in data === true && 'Product_Special_Priority_' + l !== '') {
                                if (data['Product_Special_Priority_' + l] !== '') {
                                    const specialPriceValue = {};
                                    specialPriceValue.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    specialPriceValue.priority = (_a = data['Product_Special_Priority_' + l]) !== null && _a !== void 0 ? _a : undefined;
                                    specialPriceValue.price = (_b = data['Product_Special_Price_' + l]) !== null && _b !== void 0 ? _b : undefined;
                                    specialPriceValue.startDate = (_c = data['Product_Special_Start_Date_' + l]) !== null && _c !== void 0 ? _c : undefined;
                                    specialPriceValue.customerGroupId = (_d = data['Product_Special_Customer_Group_Id_' + l]) !== null && _d !== void 0 ? _d : undefined;
                                    specialPriceValue.endDate = (_e = data['Product_Special_End_Date_' + l]) !== null && _e !== void 0 ? _e : undefined;
                                    specialPrice.push(specialPriceValue);
                                }
                                l++;
                                totalSpecial++;
                            }
                            else {
                                l = 0;
                            }
                        }
                        // tire price
                        let q = 1;
                        while (q >= 1) {
                            if ('Product_Tire_Quantity_' + q in data === true && 'Product_Tire_Quantity_' + q !== '') {
                                if (data['Product_Tire_Quantity_' + q] !== '') {
                                    const tirePrice = {};
                                    tirePrice.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    tirePrice.quantity = (_f = data['Product_Tire_Quantity_' + q]) !== null && _f !== void 0 ? _f : undefined;
                                    tirePrice.price = (_g = data['Product_Tire_Price_' + q]) !== null && _g !== void 0 ? _g : undefined;
                                    tirePriceData.push(tirePrice);
                                }
                                q++;
                                totalTire++;
                            }
                            else {
                                q = 0;
                            }
                        }
                        // Category Request
                        let n = 1;
                        while (n >= 1) {
                            if ('Category' + n in data === true && 'Category' + n + '_Sort_Order' !== '') {
                                if (data['Category' + n] !== '') {
                                    const categoryObj = {};
                                    categoryObj.category = data['Category' + n];
                                    categoryObj.sortOrder = data['Category' + n + '_Sort_Order'];
                                    categoryDatas.push(categoryObj);
                                }
                                n++;
                            }
                            else {
                                n = 0;
                            }
                        }
                        // Attribute
                        let k = 1;
                        while (k >= 1) {
                            if ('Attribute_Name_' + k in data === true && 'Attribute_Name_' + k !== '') {
                                if (data['Attribute_Name_' + k] !== '') {
                                    const arrributeObj = {};
                                    arrributeObj.attributeGroup = data['Attribute_Group_' + k];
                                    arrributeObj.attributeName = data['Attribute_Name_' + k];
                                    arrributeObj.attributeValue = data['Attribute_Value_' + k];
                                    attributeDats.push(arrributeObj);
                                }
                                k++;
                            }
                            else {
                                k = 0;
                            }
                        }
                        const variantOptions = [];
                        let j = 1;
                        // Variant option
                        while (j >= 1) {
                            if ('Variant_Name' + j in data === true) {
                                const variantOptionsObj = {};
                                variantOptionsObj.varianName = (_h = data['Variant_Name' + j]) !== null && _h !== void 0 ? _h : undefined;
                                variantOptionsObj.variantValue = (_j = data['Variant_Value' + j]) !== null && _j !== void 0 ? _j : undefined;
                                variantOptions.push(variantOptionsObj);
                                j++;
                            }
                            else {
                                j = 0;
                            }
                        }
                        variantOptionObj.variantOptions = variantOptions;
                        variantOption.push(variantOptionObj);
                        i++;
                    }
                    else if (fName === data.Name && i > 0) {
                        let j = 1;
                        variantOptionObj.variantSku = data.Variant_sku;
                        variantOptionObj.variantQuantity = data.Variant_Quantity;
                        variantOptionObj.variantImage = data.Variant_Image;
                        variantOptionObj.variantPrice = data.Variant_Price;
                        variantOptionObj.variantOriginalPrice = data.Variant_OriginalPrice;
                        const variantOptions = [];
                        while (j >= 1) {
                            if ('Variant_Name' + j in data === true) {
                                const variantOptionsObj = {};
                                variantOptionsObj.varianName = data['Variant_Name' + j] ? data['Variant_Name' + j] : undefined;
                                variantOptionsObj.variantValue = data['Variant_Value' + j] ? data['Variant_Value' + j] : undefined;
                                variantOptions.push(variantOptionsObj);
                                j++;
                            }
                            else {
                                j = 0;
                            }
                        }
                        variantOptionObj.variantOptions = variantOptions;
                        if (variantOptionObj.skuName !== '') {
                            variantOption.push(variantOptionObj);
                        }
                        i = i++;
                        const videoArr = data.Video_Link;
                        if (videoArr !== '' && videoArr) {
                            if (videoArr.includes(',')) {
                                const splitVideoArr = videoArr.split(',');
                                productVideo.push(...splitVideoArr);
                            }
                            else {
                                productVideo.push(data.Video_Link);
                            }
                        }
                        // product discount
                        let m = 1;
                        while (m >= 1) {
                            if ('Discount_Priority_' + m in data === true && 'Discount_Priority_' + m !== '') {
                                if (data['Discount_Priority_' + m] !== '') {
                                    const discountValues = {};
                                    discountValues.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    // discountValues.discountQuantity = +data['Discount_Quantity_' + m] ?? undefined;
                                    // discountValues.discountPriority = +data['Discount_Priority_' + m] ?? undefined;
                                    // discountValues.discountPrice = +data['Discount_Price_' + m] ?? undefined;
                                    discountValues.discountStartDate = (_k = data['Discount_Date_Start_' + m]) !== null && _k !== void 0 ? _k : undefined;
                                    discountValues.discountEndDate = (_l = data['Discount_Date_End_' + m]) !== null && _l !== void 0 ? _l : undefined;
                                    discount.push(discountValues);
                                }
                                m++;
                            }
                            else {
                                m = 0;
                            }
                        }
                        // product special price
                        let l = 1;
                        while (l >= 1) {
                            if ('Product_Special_Priority_' + l in data === true && 'Product_Special_Priority_' + l !== '') {
                                if (data['Product_Special_Priority_' + l] !== '') {
                                    const specialPriceValue = {};
                                    specialPriceValue.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    specialPriceValue.priority = (_m = data['Product_Special_Priority_' + l]) !== null && _m !== void 0 ? _m : undefined;
                                    specialPriceValue.price = (_o = data['Product_Special_Price_' + l]) !== null && _o !== void 0 ? _o : undefined;
                                    specialPriceValue.startDate = (_p = data['Product_Special_Start_Date_' + l]) !== null && _p !== void 0 ? _p : undefined;
                                    specialPriceValue.customerGroupId = (_q = data['Product_Special_Customer_Group_Id_' + l]) !== null && _q !== void 0 ? _q : undefined;
                                    specialPriceValue.endDate = (_r = data['Product_Special_End_Date_' + l]) !== null && _r !== void 0 ? _r : undefined;
                                    specialPrice.push(specialPriceValue);
                                }
                                l++;
                            }
                            else {
                                l = 0;
                            }
                        }
                        // tire price
                        let k = 1;
                        while (k >= 1) {
                            if ('Product_Tire_Quantity_' + k in data === true && 'Product_Tire_Quantity_' + k !== '') {
                                if (data['Product_Tire_Quantity_' + k] !== '') {
                                    const tirePrice = {};
                                    tirePrice.sku = data.Variant_sku ? (pluginLoader_1.pluginModule.includes('ProductVariants') ? data.Variant_sku : data.SKU) : data.SKU;
                                    tirePrice.quantity = (_s = data['Product_Tire_Quantity_' + k]) !== null && _s !== void 0 ? _s : undefined;
                                    tirePrice.price = (_t = data['Product_Tire_Price_' + k]) !== null && _t !== void 0 ? _t : undefined;
                                    tirePriceData.push(tirePrice);
                                }
                                k++;
                            }
                            else {
                                k = 0;
                            }
                        }
                    }
                }
                tempObj.category = categoryDatas;
                tempObj.variant = variantOption;
                tempObj.attribute = attributeDats;
                tempObj.productDiscount = discount;
                tempObj.productSpecialPrice = specialPrice;
                tempObj.productTirePrice = tirePriceData;
                tempObj.video = productVideo;
                tempObj.totalDiscountLength = totalDiscount;
                tempObj.totalSpecialLength = totalSpecial;
                tempObj.totalTireLength = totalTire;
                totalDiscount = 0;
                totalSpecial = 0;
                totalTire = 0;
                productArr.push(tempObj);
            }
            return productArr;
        });
    }
    validateAndFormatData(data, vendorGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requiredFields = ['SKU', 'Quantity', 'Price', 'DateAvailable', 'Name', 'Images', 'Category1', 'Description'];
            const result = [];
            // For checking error occur or not
            let errorStatus = false;
            for (const jsonValue of data) {
                const errors = [];
                // category validation
                const categories1 = jsonValue.Category1.split('>');
                const categoryLength = categories1.length;
                const checkCategory = yield this.categoryService.findOne({ where: { name: (categories1[categoryLength - 1]).trimStart() } });
                if (!checkCategory) {
                    errors.push('Invalid category');
                    errorStatus = true;
                }
                else {
                    const vendorGroup = yield this.vendorGroupCategoryService.findOne({ where: { vendorGroupId, categoryId: checkCategory.categoryId } });
                    if (!vendorGroup) {
                        errors.push('Invalid category');
                        errorStatus = true;
                    }
                }
                const categories2 = jsonValue.Category1.split('>');
                const categoryLength2 = categories1.length;
                const checkCategory2 = yield this.categoryService.findOne({ where: { name: (categories2[categoryLength2 - 1]).trimStart() } });
                if (!checkCategory2) {
                    errors.push('Invalid category');
                    errorStatus = true;
                }
                else {
                    const vendorGroup2 = yield this.vendorGroupCategoryService.findOne({ where: { vendorGroupId, categoryId: checkCategory2.categoryId } });
                    if (!vendorGroup2) {
                        errors.push('Invalid category');
                        errorStatus = true;
                    }
                }
                const findSku = yield this.skuService.findOne({ where: { skuName: jsonValue.SKU } });
                if (findSku) {
                    errors.push('duplicate SKU name. give some other name');
                    errorStatus = true;
                }
                if (jsonValue.Variant_sku && jsonValue.Variant_sku !== '') {
                    const findVariantSku = yield this.skuService.findOne({ where: { skuName: jsonValue.Variant_sku } });
                    if (findVariantSku) {
                        errors.push('duplicate Variant_sku name. give some other name');
                        errorStatus = true;
                    }
                }
                const findSkuFromExcel = yield data.find(item => item.SKU === jsonValue.SKU && item.Name !== jsonValue.Name);
                if (findSkuFromExcel) {
                    errors.push('Duplicate SKU in your Uploaded file');
                    errorStatus = true;
                }
                // add discount price into validationConfig
                let m = 1;
                while (m >= 1) {
                    if ('Discount_Priority_' + m in jsonValue === true && jsonValue['Discount_Priority_' + m] !== '') {
                        if ('Discount_Quantity_' + m in jsonValue === true && jsonValue['Discount_Quantity_' + m] !== '') {
                            this.validationConfig[`Discount_Quantity_${m}`] = `Discount_Quantity_${m} value should be numeric format`;
                        }
                        this.validationConfig[`Discount_Priority_${m}`] = `Discount_Priority_${m} value should be numeric format`;
                        if ('Discount_Price' + m in jsonValue === true && jsonValue['Discount_Price' + m] !== '') {
                            this.validationConfig[`Discount_Price_${m}`] = `Discount_Price_${m} value should be numeric format`;
                        }
                        m++;
                    }
                    else {
                        m = 0;
                    }
                }
                // add special price into validationConfig
                let l = 1;
                while (l >= 1) {
                    if ('Product_Special_Priority_' + l in jsonValue === true && jsonValue['Product_Special_Priority_' + l] !== '') {
                        this.validationConfig[`Product_Special_Priority_${l}`] = `Product_Special_Priority_${l} value should be numeric format`;
                        if ('Product_Special_Price_' + l in jsonValue === true && jsonValue['Product_Special_Price_' + l] !== '') {
                            this.validationConfig[`Product_Special_Price_${l}`] = `Product_Special_Price_${l} value should be numeric format`;
                        }
                        if ('Product_Special_Customer_Group_Id_' + l in jsonValue === true && jsonValue['Product_Special_Customer_Group_Id_' + l] !== '') {
                            this.validationConfig[`Product_Special_Customer_Group_Id_${l}`] = `Product_Special_Customer_Group_Id_${l} value should be numeric format`;
                        }
                        l++;
                    }
                    else {
                        l = 0;
                    }
                }
                // tire price
                let q = 1;
                while (q >= 1) {
                    if ('Product_Tire_Quantity_' + q in jsonValue === true && jsonValue['Product_Tire_Quantity_' + q] !== '') {
                        this.validationConfig[`Product_Tire_Quantity_${q}`] = `Product_Tire_Quantity_${q} value should be numeric format`;
                        if ('Product_Tire_Price_' + q in jsonValue === true && jsonValue['Product_Tire_Price_' + q] !== '') {
                            this.validationConfig[`Product_Tire_Price_${q}`] = `Product_Tire_Price_${q} value should be numeric format`;
                        }
                        q++;
                    }
                    else {
                        q = 0;
                    }
                }
                // Category Request
                let n = 1;
                while (n >= 1) {
                    if ('Category' + n in jsonValue === true && typeof jsonValue['Category' + n] === 'number') {
                        errors.push(`${'Category' + n} value should be Varchar(String) format`);
                        n++;
                    }
                    else {
                        n = 0;
                    }
                }
                const intTypeField = Object.keys(this.validationConfig);
                for (const requiredValue of requiredFields) {
                    if (!jsonValue.hasOwnProperty(requiredValue)) {
                        errors.push(`Missing ${requiredValue} field`);
                        errorStatus = true;
                    }
                    else if ((requiredValue === 'Name' && jsonValue.Name === '') || (requiredValue === 'Price' && jsonValue.Price === '')) {
                        errors.push(`Missing ${requiredValue} value`);
                    }
                }
                for (const intValues of intTypeField) {
                    if (jsonValue.hasOwnProperty(intValues) && typeof jsonValue[intValues] !== 'number' && jsonValue[intValues] !== '') {
                        errors.push(this.validationConfig[intValues]);
                        errorStatus = true;
                    }
                }
                jsonValue.Error = errors.length > 0 ? errors.join(',') : '';
                result.push(jsonValue);
            }
            const resultData = { data: result, errorStatus };
            return resultData;
        });
    }
    categoryValidationAndFormatData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requiredFields = ['Category_Name', 'Sort_Order', 'Status'];
            const result = [];
            let errorStatus = false;
            for (const jsonValue of data) {
                const errors = [];
                const intTypeField = Object.keys(this.catageryValidation);
                // Validate the required fields and values
                for (const requiredValue of requiredFields) {
                    if (!jsonValue.hasOwnProperty(requiredValue)) {
                        errors.push(`Missing ${requiredValue} field`);
                        errorStatus = true;
                    }
                    else if (jsonValue[requiredValue] === '') {
                        errors.push(`Missing ${requiredValue} value`);
                    }
                }
                // Validate integer values
                for (const intValues of intTypeField) {
                    if (jsonValue.hasOwnProperty(intValues) && typeof jsonValue[intValues] !== 'number' && jsonValue[intValues] !== '') {
                        errors.push(this.catageryValidation[intValues]);
                        errorStatus = true;
                    }
                }
                // Validate status
                if ((jsonValue.hasOwnProperty('Status') && jsonValue.Status > 1) || (jsonValue.hasOwnProperty('Status') && jsonValue.Status < 0)) {
                    errors.push(this.catageryValidation.Status_Value);
                    errorStatus = true;
                }
                // Validate Parent Category Id
                if (jsonValue.hasOwnProperty('Parent_Category') && typeof jsonValue.Parent_Category === 'number') {
                    const ifParentCategory = yield this.categoryService.findOne({ where: { categoryId: jsonValue.Parent_Category } });
                    if (!ifParentCategory) {
                        errors.push('Invalid Parent_Category');
                    }
                }
                jsonValue.Error = errors.length > 0 ? errors.join(',') : '';
                result.push(jsonValue);
            }
            const resultData = { data: result, errorStatus };
            return resultData;
        });
    }
};
VendorBulkImport = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [SkuService_1.SkuService,
        CategoryService_1.CategoryService,
        VendorGroupCategoryService_1.VendorGroupCategoryService])
], VendorBulkImport);
exports.VendorBulkImport = VendorBulkImport;
//# sourceMappingURL=VendorBulkImportRequest.js.map