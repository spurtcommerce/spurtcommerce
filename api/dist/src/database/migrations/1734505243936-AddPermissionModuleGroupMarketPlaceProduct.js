"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPermissionModuleGroupMarketPlaceProduct1734505243936 = void 0;
const tslib_1 = require("tslib");
class AddPermissionModuleGroupMarketPlaceProduct1734505243936 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO permission_module_group
                                (module_group_id,name,slug_name,sort_order,created_date,modified_date)
                                VALUES (21,'Market Place Product','market-place-product',21,'2020-03-13 14:58:31','2020-03-13 14:58:31')`);
            yield queryRunner.query(`INSERT INTO permission_module
                                (module_id,name,slug_name,sort_order,module_group_id,created_date,modified_date)
                                VALUES
                                (97,'Approve Market Place Product','approve-market-place-product',97,21,'2020-03-13 17:30:24','2020-03-13 17:30:24'),
                                (99,'Export Market Place Product','export-market-place-product',99,21,'2020-03-13 17:30:24','2020-03-13 17:30:24'),
                                (100,'Export All Market Place Product','export-all-market-place-product',100,21,'2020-03-13 17:30:24','2020-03-13 17:30:24'),
                                (120,'List Market Place Product','list-market-place-product',120,21,'2020-03-18 17:58:42','2020-03-18 17:58:42')`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPermissionModuleGroupMarketPlaceProduct1734505243936 = AddPermissionModuleGroupMarketPlaceProduct1734505243936;
//# sourceMappingURL=1734505243936-AddPermissionModuleGroupMarketPlaceProduct.js.map