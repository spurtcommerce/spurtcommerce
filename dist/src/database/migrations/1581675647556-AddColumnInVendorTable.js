"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorTable1581675647556 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorTable1581675647556 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'contact_person_name');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'contact_person_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('vendor', 'designation');
            if (!ifExist1) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'designation',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('vendor', 'company_address1');
            if (!ifExist2) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_address1',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('vendor', 'company_address2');
            if (!ifExist3) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_address2',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist4 = yield queryRunner.hasColumn('vendor', 'company_city');
            if (!ifExist4) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_city',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist5 = yield queryRunner.hasColumn('vendor', 'company_state');
            if (!ifExist5) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_state',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist6 = yield queryRunner.hasColumn('vendor', 'company_country_id');
            if (!ifExist6) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_country_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist7 = yield queryRunner.hasColumn('vendor', 'pincode');
            if (!ifExist7) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'pincode',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist8 = yield queryRunner.hasColumn('vendor', 'company_mobile_number');
            if (!ifExist8) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_mobile_number',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist9 = yield queryRunner.hasColumn('vendor', 'company_email_id');
            if (!ifExist9) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_email_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist10 = yield queryRunner.hasColumn('vendor', 'company_website');
            if (!ifExist10) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_website',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist11 = yield queryRunner.hasColumn('vendor', 'company_gst_number');
            if (!ifExist11) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_gst_number',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist12 = yield queryRunner.hasColumn('vendor', 'company_pan_number');
            if (!ifExist12) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_pan_number',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist13 = yield queryRunner.hasColumn('vendor', 'payment_information');
            if (!ifExist13) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'payment_information',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor', 'contact_person_name');
            yield queryRunner.dropColumn('vendor', 'company_address2');
            yield queryRunner.dropColumn('vendor', 'company_address1');
            yield queryRunner.dropColumn('vendor', 'company_city');
            yield queryRunner.dropColumn('vendor', 'company_state');
            yield queryRunner.dropColumn('vendor', 'company_country_id');
            yield queryRunner.dropColumn('vendor', 'pincode');
            yield queryRunner.dropColumn('vendor', 'company_mobile_number');
            yield queryRunner.dropColumn('vendor', 'company_email_id');
            yield queryRunner.dropColumn('vendor', 'company_website');
            yield queryRunner.dropColumn('vendor', 'company_gst_number');
            yield queryRunner.dropColumn('vendor', 'company_pan_number');
            yield queryRunner.dropColumn('vendor', 'payment_information');
        });
    }
}
exports.AddColumnInVendorTable1581675647556 = AddColumnInVendorTable1581675647556;
//# sourceMappingURL=1581675647556-AddColumnInVendorTable.js.map