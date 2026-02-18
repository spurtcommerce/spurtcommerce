"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorPriceGroupScheduleTable1715864129249 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorPriceGroupScheduleTable1715864129249 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_pric_grp_sched_vendor_pric_grp_dets_pric_grp_dets_idx',
            columnNames: ['price_group_detail_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vendor_price_group_detail',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_price_group_schedule',
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
                        name: 'price_group_detail_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'start_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'end_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        length: '11',
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
                    {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable('vendor_price_group_schedule');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('vendor_price_group_schedule');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('price_group_detail_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateVendorPriceGroupScheduleTable1715864129249 = CreateVendorPriceGroupScheduleTable1715864129249;
//# sourceMappingURL=1715864129249-CreateVendorPriceGroupScheduleTable.js.map