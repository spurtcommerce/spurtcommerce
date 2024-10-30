"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTriggerFunctionsForProductHighlights1718187816848 = void 0;
const tslib_1 = require("tslib");
class AddTriggerFunctionsForProductHighlights1718187816848 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TRIGGER before_product_insert
            BEFORE INSERT ON product
            FOR EACH ROW
            BEGIN
                IF NEW.product_highlights IS NULL THEN
                    SET NEW.product_highlights = '[]';
                END IF;
            END;
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DROP TRIGGER IF EXISTS before_product_insert;
        `);
        });
    }
}
exports.AddTriggerFunctionsForProductHighlights1718187816848 = AddTriggerFunctionsForProductHighlights1718187816848;
//# sourceMappingURL=1718187816848-AddTriggerFunctionsForProductHighlights.js.map