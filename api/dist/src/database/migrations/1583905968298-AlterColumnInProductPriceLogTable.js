"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInProductPriceLogTable1583905968298 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInProductPriceLogTable1583905968298 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `price` `price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_price` `special_price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_start_date` `special_start_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_end_date` `special_end_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_price` `discount_price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_start_date` `discount_start_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_end_date` `discount_end_date` Date DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `price` `price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_price` `special_price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_start_date` `special_start_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `special_end_date` `special_end_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_price` `discount_price` DECIMAL(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_start_date` `discount_start_date` Date DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_price_log` CHANGE `discount_end_date` `discount_end_date` Date DEFAULT NULL');
        });
    }
}
exports.AlterColumnInProductPriceLogTable1583905968298 = AlterColumnInProductPriceLogTable1583905968298;
//# sourceMappingURL=1583905968298-AlterColumnInProductPriceLogTable.js.map