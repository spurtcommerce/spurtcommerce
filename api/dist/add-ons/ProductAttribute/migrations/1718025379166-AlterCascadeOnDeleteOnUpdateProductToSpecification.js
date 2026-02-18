"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_prd_to_spec_product_product_id',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_prd_to_spec_spec_specification_id',
            columnNames: ['specification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specification',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('product_to_specification', 'fk_prd_to_spec_product_product_id');
            yield queryRunner.dropForeignKey('product_to_specification', 'fk_prd_to_spec_spec_specification_id');
            yield queryRunner.createForeignKey('product_to_specification', this.tableForeignKey);
            yield queryRunner.createForeignKey('product_to_specification', this.tableForeignKey2);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166 = AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166;
//# sourceMappingURL=1718025379166-AlterCascadeOnDeleteOnUpdateProductToSpecification.js.map