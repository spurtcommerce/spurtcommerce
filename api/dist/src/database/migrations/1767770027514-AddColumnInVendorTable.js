"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorTable1767770027514 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorTable1767770027514 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const companyTypeExists = yield queryRunner.hasColumn('vendor', 'company_type');
            if (!companyTypeExists) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_type',
                    type: 'int',
                    isNullable: true,
                }));
            }
            const hasTable = yield queryRunner.hasTable('company_type');
            if (!hasTable) {
                yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS company_type (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                slug VARCHAR(200) NOT NULL UNIQUE,
                is_active TINYINT(1) DEFAULT 1,

                created_by INT DEFAULT NULL,
                created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                modified_by INT DEFAULT NULL,
                modified_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
                yield queryRunner.query(`
            INSERT INTO company_type (name, slug)
            VALUES
            ('Sole Proprietorship', 'sole-proprietorship'),
            ('Partnership Firm', 'partnership-firm'),
            ('Private Limited Company', 'private-limited-company'),
            ('Public Limited Company', 'public-limited-company'),
            ('Nonprofit Organization', 'nonprofit-organization'),
            ('One Person Company', 'one-person-company');
        `);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //
        });
    }
}
exports.AddColumnInVendorTable1767770027514 = AddColumnInVendorTable1767770027514;
//# sourceMappingURL=1767770027514-AddColumnInVendorTable.js.map