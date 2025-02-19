"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSettingsColumn1703138181638 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddSettingsColumn1703138181638 {
    up(queryRunner) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const todatColumn = [
                {
                    name: 'site_name',
                    type: 'VARCHAR',
                    length: '225',
                }, {
                    name: 'business_name',
                    type: 'VARCHAR',
                    length: '225',
                }, {
                    name: 'access_key',
                    type: 'TEXT',
                }, {
                    name: 'site_category',
                    type: 'TEXT',
                }, {
                    name: 'store_description',
                    type: 'TEXT',
                }, {
                    name: 'store_address1',
                    type: 'VARCHAR',
                    length: '225',
                }, {
                    name: 'store_address2',
                    type: 'VARCHAR',
                    length: '225',
                }, {
                    name: 'store_city',
                    type: 'VARCHAR',
                    length: '150',
                }, {
                    name: 'store_postal_code',
                    type: 'VARCHAR',
                    length: '50',
                }, {
                    name: 'store_secondary_language_name',
                    type: 'VARCHAR',
                    length: '50',
                }, {
                    name: 'currency_symbol',
                    type: 'VARCHAR',
                    length: '25',
                }, {
                    name: 'currency_format',
                    type: 'VARCHAR',
                    length: '25',
                }, {
                    name: 'date_format',
                    type: 'VARCHAR',
                    length: '25',
                }, {
                    name: 'time_format',
                    type: 'VARCHAR',
                    length: '25',
                }, {
                    name: 'default_country',
                    type: 'VARCHAR',
                    length: '25',
                }, {
                    name: 'country',
                    type: 'TEXT',
                }, {
                    name: 'pending_status',
                    type: 'INT',
                    length: '11',
                }, {
                    name: 'default_website',
                    type: 'INT',
                    length: '11',
                },
            ];
            for (const data of todatColumn) {
                const findColumn = yield queryRunner.hasColumn('settings', data.name);
                if (!findColumn) {
                    yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                        name: data.name,
                        type: data.type,
                        length: (_a = data.length) !== null && _a !== void 0 ? _a : data.length,
                        isPrimary: false,
                        isNullable: true,
                    }));
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSettingsColumn1703138181638 = AddSettingsColumn1703138181638;
//# sourceMappingURL=1703138181638-AddSettingsColumn.js.map