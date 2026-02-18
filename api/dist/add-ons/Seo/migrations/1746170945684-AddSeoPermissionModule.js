"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeoPermissionModule1746170945684 = void 0;
const tslib_1 = require("tslib");
class AddSeoPermissionModule1746170945684 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const [permissionGroup] = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = "seo"');
            // Insert all permissions in a single query
            yield queryRunner.query(`
            INSERT INTO permission_module (module_group_id, name, slug_name, sort_order, created_date, modified_date)
            VALUES
              (?, 'Product', 'product-seo', 310, ?, ?),
              (?, 'Pages', 'pages-seo', 311, ?, ?),
              (?, 'Category', 'category-seo', 312, ?, ?),
              (?, 'Blog', 'blog-seo', 313, ?, ?),
              (?, 'Site Map', 'site-map-seo', 314, ?, ?)
          `, [
                permissionGroup.module_group_id, now, now,
                permissionGroup.module_group_id, now, now,
                permissionGroup.module_group_id, now, now,
                permissionGroup.module_group_id, now, now,
                permissionGroup.module_group_id, now, now,
            ]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSeoPermissionModule1746170945684 = AddSeoPermissionModule1746170945684;
//# sourceMappingURL=1746170945684-AddSeoPermissionModule.js.map