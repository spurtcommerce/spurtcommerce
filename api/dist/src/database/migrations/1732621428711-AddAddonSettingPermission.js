"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAddonSettingPermission1732621428711 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AddAddonSettingPermission1732621428711 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            const query = `
            INSERT INTO \`permission_module\` (\`created_by\`, \`created_date\`, \`modified_by\`, \`modified_date\`, \`module_id\`, \`name\`, \`slug_name\`, \`sort_order\`, \`module_group_id\`)
            VALUES (DEFAULT, ?, DEFAULT, DEFAULT, DEFAULT, ?, ?, ?, ?)
        `;
            // Run the query with parameters
            yield queryRunner.query(query, [
                currentDate,
                'Addons',
                'edit-addons',
                319,
                16, // module_group_id
            ]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddAddonSettingPermission1732621428711 = AddAddonSettingPermission1732621428711;
//# sourceMappingURL=1732621428711-AddAddonSettingPermission.js.map