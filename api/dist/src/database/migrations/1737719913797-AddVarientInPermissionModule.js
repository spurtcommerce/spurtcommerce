"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVarientInPermissionModule1737719913797 = void 0;
const tslib_1 = require("tslib");
class AddVarientInPermissionModule1737719913797 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO permission_module_group
                (module_group_id,name,slug_name,sort_order,created_date,modified_date)
                VALUES
                (64,'Variant','variants',69,'2022-06-09 04:52:14','2022-06-09 04:52:14');`);
            yield queryRunner.query(`INSERT INTO permission_module
                (module_id,name,slug_name,sort_order,module_group_id,created_date,modified_date)
                VALUES (227,'Add Variants','variant-add',244,64,'2022-06-09 04:52:14','2022-06-09 04:52:14'),
                (231,'Product Variant List','variant-product-list',251,64,'2022-06-09 04:52:14','2022-06-09 04:52:14');`);
            yield queryRunner.query(`UPDATE permission_module
                SET module_group_id = 77
                WHERE slug_name = 'buyer-address-list';`);
            yield queryRunner.query(`DELETE FROM permission_module_group
                WHERE slug_name IN ('buyer-address', 'product-answer');`);
            yield queryRunner.query(`UPDATE permission_module
                SET is_listed = 0
                WHERE slug_name = 'settlement-report-list';`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddVarientInPermissionModule1737719913797 = AddVarientInPermissionModule1737719913797;
//# sourceMappingURL=1737719913797-AddVarientInPermissionModule.js.map