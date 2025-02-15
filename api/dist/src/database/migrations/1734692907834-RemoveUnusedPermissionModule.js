"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUnusedPermissionModule1734692907834 = void 0;
const tslib_1 = require("tslib");
class RemoveUnusedPermissionModule1734692907834 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM permission_module_group WHERE module_group_id IN(78,79);`);
            yield queryRunner.query(`DELETE FROM permission_module WHERE module_id IN (349,350,328,353,354);`);
            yield queryRunner.query(`INSERT INTO permission_module_group
                                (module_group_id,name,slug_name,sort_order,created_date,modified_date)
                                VALUES
                                (50,'Sales Back Orders','sales-back-orders',46,'2021-07-06 14:58:10','2021-07-06 14:58:10'),
                                (51,'Sales Failed Order','sales-failed-order',47,'2021-07-06 14:58:10','2021-07-06 14:58:10');`);
            yield queryRunner.query(`INSERT INTO permission_module
                                (module_id,name,slug_name,sort_order,module_group_id,created_date,modified_date)
                                VALUES
                                (24,'View Buyer','view-buyer',24,77,'2020-03-13 15:40:56','2020-03-13 15:40:56'),
                                (140,'Back Order List','back-order-list',190,50,'2021-07-06 15:07:17','2021-07-06 15:07:17'),
                                (141,'Failed order list','failed-order-list',191,51,'2021-07-06 15:10:55','2021-07-06 15:10:55'),
                                (143,'View Failed Order Detail','view-failed-order-detail',193,51,'2021-07-06 15:15:58','2021-07-06 15:15:58'),
                                (144,'Move Failed Order To Main Order','move-failed-order-to-main-order',194,51,'2021-07-06 15:15:58','2021-07-06 15:15:58')`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveUnusedPermissionModule1734692907834 = RemoveUnusedPermissionModule1734692907834;
//# sourceMappingURL=1734692907834-RemoveUnusedPermissionModule.js.map