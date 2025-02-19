"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrderFullFillmentStatus1727516617880 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableOrderFullFillmentStatus1727516617880 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'order_fulfillment_status',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'priority',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'parent_id',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'default_status',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_admin',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_vendor',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_buyer',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'is_api',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'color_code',
                        type: 'varchar',
                        length: '7',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true, // Nullable
                    },
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('order_fulfillment_status');
        });
    }
}
exports.CreateTableOrderFullFillmentStatus1727516617880 = CreateTableOrderFullFillmentStatus1727516617880;
//# sourceMappingURL=1727516617880-CreateTableOrderFullFillmentStatus.js.map