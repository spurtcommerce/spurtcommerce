"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantProcess = variantProcess;
const tslib_1 = require("tslib");
const Variant_1 = require("./models/Variant");
const ProductVarientOptionImage_1 = require("./models/ProductVarientOptionImage");
const VariantValue_1 = require("./models/VariantValue");
const ProductVarient_1 = require("./models/ProductVarient");
const SkuModel_1 = require("../../src/api/core/models/SkuModel");
const ProductVarientOption_1 = require("./models/ProductVarientOption");
const ProductVarientOptionDetail_1 = require("./models/ProductVarientOptionDetail");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
function variantProcess(data, productId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const variantRepository = (0, typeormLoader_1.getDataSource)().getRepository(Variant_1.Variant);
        const variatsValueRepository = (0, typeormLoader_1.getDataSource)().getRepository(VariantValue_1.VariantValue);
        const productVariantRepository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarient_1.ProductVarient);
        const skuRepository = (0, typeormLoader_1.getDataSource)().getRepository(SkuModel_1.Sku);
        const productVariantOptionRepository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOption_1.ProductVarientOption);
        const productVarientOptionDetailRepository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOptionDetail_1.ProductVarientOptionDetail);
        const productVariantOptionImageRepository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOptionImage_1.ProductVarientOptionImage);
        const variantOptionData = data.variantOptions;
        const mappingData = yield variantOptionData.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const temp = value;
            const findVariant = yield variantData(temp.varianName);
            if (!findVariant) {
                const newVariant = new Variant_1.Variant();
                newVariant.name = value.varianName;
                newVariant.sortOrder = 1;
                const createVariant = yield variantRepository.save(newVariant);
                const newVariantValue = new VariantValue_1.VariantValue();
                newVariantValue.value = temp.variantValue;
                newVariantValue.variantId = createVariant.id;
                newVariantValue.sortOrder = 1;
                const createVariantValue = yield variatsValueRepository.save(newVariantValue);
                temp.variantId = createVariant.id;
                temp.variantValueId = createVariantValue.id;
            }
            else {
                const findVariantValue = yield variantVauleData(temp.variantValue, findVariant.id);
                temp.variantId = findVariant.id;
                if (!findVariantValue) {
                    const newVariantValue = new VariantValue_1.VariantValue();
                    newVariantValue.value = temp.variantValue;
                    newVariantValue.variantId = findVariant.id;
                    newVariantValue.sortOrder = 1;
                    const createVariantValue = yield variatsValueRepository.save(newVariantValue);
                    temp.variantValueId = createVariantValue.id;
                }
                else {
                    temp.variantValueId = findVariantValue.id;
                }
            }
            function variantData(variantNames) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = variantNames.toLowerCase();
                    const query = yield (0, typeormLoader_1.getDataSource)().getRepository(Variant_1.Variant).createQueryBuilder('variant');
                    query.where(`LOWER(variant.name) = ` + `'` + lowerValue + `'`);
                    return query.getOne();
                });
            }
            function variantVauleData(valueName, variantId) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const lowerValue = valueName.toLowerCase();
                    const query = yield (0, typeormLoader_1.getDataSource)().getRepository(VariantValue_1.VariantValue).createQueryBuilder('variantValue');
                    query.where(`LOWER(variantValue.value) = ` + `'` + lowerValue + `'`);
                    query.andWhere(`variantValue.variantId = ` + variantId);
                    return query.getOne();
                });
            }
            return temp;
        }));
        const result = yield Promise.all(mappingData);
        const variantName = [];
        const withProductData = [];
        for (const varient of result) {
            function findProdutVariant(variantId, productIds) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const query = yield (0, typeormLoader_1.getDataSource)().getRepository(ProductVarient_1.ProductVarient).createQueryBuilder('productVariant');
                    query.where(`productVariant.productId = ` + productIds);
                    query.andWhere(`productVariant.variantId = ` + variantId);
                    return query.getOne();
                });
            }
            const ifProductVariant = yield findProdutVariant(varient.variantId, productId);
            variantName.push(varient.variantValue);
            if (!ifProductVariant) {
                const newProductVarient = new ProductVarient_1.ProductVarient();
                newProductVarient.productId = productId;
                newProductVarient.variantId = varient.variantId;
                newProductVarient.isActive = 1;
                const createProductVariant = yield productVariantRepository.save(newProductVarient);
                varient.productVatiantId = createProductVariant.id;
                withProductData.push(varient);
            }
            else {
                varient.productVatiantId = ifProductVariant.id;
                withProductData.push(varient);
            }
        }
        const newSkus = new SkuModel_1.Sku();
        const find = yield skuRepository.findOne({ where: { skuName: data.variantSku } });
        if (find) {
            const errorResponse = {
                status: 0,
                message: 'Duplicate sku name, give some other name for varient',
            };
            return errorResponse;
        }
        // Create variant SKU
        newSkus.skuName = data.variantSku;
        newSkus.price = data.variantPrice;
        newSkus.quantity = data.variantQuantity ? data.variantQuantity : 1;
        newSkus.isActive = 1;
        newSkus.productId = productId;
        const saveSkus = yield skuRepository.save(newSkus);
        // Create product variant option
        const newProductVarientOption = new ProductVarientOption_1.ProductVarientOption();
        newProductVarientOption.productId = productId;
        newProductVarientOption.skuId = saveSkus.id;
        newProductVarientOption.varientName = variantName.toString();
        newProductVarientOption.isActive = 1;
        const val = yield productVariantOptionRepository.save(newProductVarientOption);
        const varientValue = [];
        // Create product variant option detail
        for (const varientOptionsValue of withProductData) {
            const newProductVarientOptionDetail = new ProductVarientOptionDetail_1.ProductVarientOptionDetail();
            newProductVarientOptionDetail.productVarientOptionId = val.id;
            newProductVarientOptionDetail.variantValueId = varientOptionsValue.variantValueId;
            newProductVarientOptionDetail.productVariantId = varientOptionsValue.productVatiantId;
            varientValue.push(newProductVarientOptionDetail);
        }
        yield productVarientOptionDetailRepository.save(varientValue);
        const imageData = data.variantImage;
        const varientOptionsImages = (_a = imageData === null || imageData === void 0 ? void 0 : imageData.split(',')) !== null && _a !== void 0 ? _a : [];
        const image = [];
        let i = 1;
        for (const varientOptionsImage of varientOptionsImages) {
            const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
            newProductVarientOptionImage.productVarientOptionId = val.id;
            newProductVarientOptionImage.image = varientOptionsImage;
            newProductVarientOptionImage.containerName = '';
            newProductVarientOptionImage.defaultImage = 0;
            newProductVarientOptionImage.sortOrder = i;
            image.push(newProductVarientOptionImage);
            i++;
        }
        yield productVariantOptionImageRepository.save(image);
        return productId;
    });
}
//# sourceMappingURL=BulkProductVariant.js.map