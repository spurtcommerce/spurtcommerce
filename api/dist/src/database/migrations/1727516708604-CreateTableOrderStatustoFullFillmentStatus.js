"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrderStatustoFullFillmentStatus1727516708604 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableOrderStatustoFullFillmentStatus1727516708604 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'order_status_to_fulfillment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'order_status_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'order_fulfillment_status_id',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }), true);
            // Add foreign key for order_status_id
            yield queryRunner.createForeignKey('order_status_to_fulfillment', new typeorm_1.TableForeignKey({
                columnNames: ['order_status_id'],
                referencedColumnNames: ['order_status_id'],
                referencedTableName: 'order_status',
                onDelete: 'CASCADE',
            }));
            // Add foreign key for order_fulfillment_status_id
            yield queryRunner.createForeignKey('order_status_to_fulfillment', new typeorm_1.TableForeignKey({
                columnNames: ['order_fulfillment_status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order_fulfillment_status',
                onDelete: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableOrderStatustoFullFillmentStatus1727516708604 = CreateTableOrderStatustoFullFillmentStatus1727516708604;
//# sourceMappingURL=1727516708604-CreateTableOrderStatustoFullFillmentStatus.js.map