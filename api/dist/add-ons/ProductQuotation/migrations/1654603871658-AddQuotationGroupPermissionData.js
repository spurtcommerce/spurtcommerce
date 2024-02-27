"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuotationGroupPermissionData1654603871658 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddQuotationGroupPermissionData1654603871658 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"sales-quotation-request"');
            const ProductQuotationPermissionSeed = [];
            if ((exist.length === 0)) {
                const ProductQuotationPermissionGroupSeed = [
                    {
                        name: 'Product Quotation',
                        slugName: 'sales-quotation-request',
                        sortOrder: '73',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                const val = yield (0, typeorm_1.getRepository)('PermissionModuleGroup').save(ProductQuotationPermissionGroupSeed);
                if (val) {
                    ProductQuotationPermissionSeed.push({
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product Quotation List',
                        slugName: 'product-quotation-list',
                        sortOrder: '264',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Update Quotation Available Status',
                        slugName: 'update-quotation-status',
                        sortOrder: '265',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    }, {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product Quotation Detail',
                        slugName: 'update-quotation-status',
                        sortOrder: '266',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    });
                    yield (0, typeorm_1.getRepository)('PermissionModule').save(ProductQuotationPermissionSeed);
                }
            }
            else {
                ProductQuotationPermissionSeed.push({
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Product Quotation List',
                    slugName: 'product-quotation-list',
                    sortOrder: '264',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Update Quotation Available Status',
                    slugName: 'update-quotation-status',
                    sortOrder: '265',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                }, {
                    moduleGroupId: exist[0].moduleGroupId,
                    name: 'Product Quotation Detail',
                    slugName: 'update-quotation-status',
                    sortOrder: '266',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                });
                yield (0, typeorm_1.getRepository)('PermissionModule').save(ProductQuotationPermissionSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddQuotationGroupPermissionData1654603871658 = AddQuotationGroupPermissionData1654603871658;
//# sourceMappingURL=1654603871658-AddQuotationGroupPermissionData.js.map