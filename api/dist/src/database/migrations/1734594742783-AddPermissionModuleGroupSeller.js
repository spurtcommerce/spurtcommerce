"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPermissionModuleGroupSeller1734594742783 = void 0;
const tslib_1 = require("tslib");
class AddPermissionModuleGroupSeller1734594742783 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM permission_module_group
                                WHERE module_group_id = 75`);
            yield queryRunner.query(`INSERT INTO permission_module_group
                                (module_group_id,name,slug_name,sort_order,created_date,modified_date)
                                VALUES (20,'Seller','seller',20,'2020-03-13 14:58:31','2024-11-25 08:26:08')`);
            yield queryRunner.query(`INSERT INTO permission_module
                                (module_id,name,slug_name,sort_order,module_group_id,created_date,modified_date)
                                VALUES
                                (88,'Create Seller','create-vendor',88,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (89,'Edit Seller','edit-vendor',89,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (90,'Delete Seller','delete-vendor',90,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (91,'Approve Seller','approve-vendor',91,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (92,'View Seller','view-vendor',92,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (93,'Export Seller','export-vendor',93,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (94,'Export All Seller','export-all-vendor',94,20,'2020-03-13 17:15:55','2020-03-13 17:15:55'),
                                (119,'List Seller','list-vendor',119,20,'2020-03-18 17:56:45','2020-03-18 17:56:45')`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPermissionModuleGroupSeller1734594742783 = AddPermissionModuleGroupSeller1734594742783;
//# sourceMappingURL=1734594742783-AddPermissionModuleGroupSeller.js.map