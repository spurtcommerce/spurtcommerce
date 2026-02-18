"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCategoryValidator = StoreCategoryValidator;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Setting_1 = require("../models/Setting");
const CategoryModel_1 = require("../models/CategoryModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
function StoreCategoryValidator(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const settingService = (0, typeormLoader_1.getDataSource)().getRepository(Setting_1.Settings);
        const origin = req.get('origin');
        const AccessKey = req.get('key');
        const siteData = yield settingService.findOne({
            where: {
                accessKey: AccessKey,
            },
        });
        if (!siteData) {
            return res.status(400).send({
                status: 0,
                message: `Couldn't Able to Find Configuration Or Invalid Key for the site ${origin} -- Contact Your Admin..!`,
            });
        }
        const error = [];
        const categories = [];
        let tempParentId = [];
        const siteSettingCategories = siteData.siteCategory.split(',');
        const categoryService = (0, typeormLoader_1.getDataSource)().getRepository(CategoryModel_1.Category);
        const siteCategories = yield categoryService.find({
            where: {
                categorySlug: (0, typeorm_1.In)(siteSettingCategories),
            },
        });
        for (const siteCategory of siteCategories) {
            tempParentId = [siteCategory.categoryId];
            categories.push(siteCategory);
            while (true) {
                const chlidCategory = yield categoryService.find({
                    where: {
                        parentInt: (0, typeorm_1.In)(tempParentId),
                    },
                });
                tempParentId = [];
                if ((chlidCategory === null || chlidCategory === void 0 ? void 0 : chlidCategory.length) === 0) {
                    break;
                }
                categories.push(...chlidCategory);
                tempParentId = chlidCategory.map(category => category.categoryId);
            }
        }
        const siteCategorySlugList = categories.map(category => `'${category.categorySlug}'`);
        const siteCategoryIds = categories.map(category => category.categoryId);
        const query = req.query;
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (key === 'categoryslug' || key === 'categorySlug') {
                    if (!siteCategorySlugList.includes(`'${value.toString()}'`) && value.toString() !== '') {
                        error.push(value);
                    }
                }
            }
        }
        if ((error === null || error === void 0 ? void 0 : error.length) > 0) {
            return res.status(400).send({
                status: 0,
                message: `Category ${error[0].toString()} is Not Allowed for this Site..! -- Contact Your Admin`,
            });
        }
        req.store = {
            Id: siteData.settingsId,
            siteCategoryIds,
            siteCategorySlugList,
        };
        next();
    });
}
//# sourceMappingURL=StoreCategoryValidatorMiddleware.js.map