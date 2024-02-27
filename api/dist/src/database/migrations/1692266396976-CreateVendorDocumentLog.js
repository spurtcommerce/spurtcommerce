"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorDocumentLog1692266396976 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorDocumentLog1692266396976 {
    constructor() {
        this.tableName = 'vendor_document_log';
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'document_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'reason',
                        type: 'VARCHAR',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable(this.tableName);
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.tableName, true);
        });
    }
}
exports.CreateVendorDocumentLog1692266396976 = CreateVendorDocumentLog1692266396976;
//# sourceMappingURL=1692266396976-CreateVendorDocumentLog.js.map