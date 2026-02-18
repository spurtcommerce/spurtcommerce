"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationEnquiryToServiceTable1560937885319 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationEnquiryToServiceTable1560937885319 {
    constructor() {
        this.serviceToEnquiryForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_service_enquiry_tbl_service',
            columnNames: ['service_id'],
            referencedColumnNames: ['service_id'],
            referencedTableName: 'service',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('service_enquiry');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.serviceToEnquiryForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('service_enquiry');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.serviceToEnquiryForeignKeys);
            }
        });
    }
}
exports.AddRelationEnquiryToServiceTable1560937885319 = AddRelationEnquiryToServiceTable1560937885319;
//# sourceMappingURL=1560937885319-AddRelationEnquiryToServiceTable.js.map