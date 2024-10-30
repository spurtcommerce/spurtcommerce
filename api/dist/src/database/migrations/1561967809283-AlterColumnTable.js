"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnTable1561967809283 = void 0;
const tslib_1 = require("tslib");
class AlterColumnTable1561967809283 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `order_log` CHANGE `order_prefix_id` `order_prefix_id` VARCHAR(255) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `settings` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `country` CHANGE `address_format` `address_format` TEXT DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_product` CHANGE `total` `total` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_product` CHANGE `product_price` `product_price` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_total` CHANGE `value` `value` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order` CHANGE `total` `total` decimal(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `customer` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `order_log` CHANGE `order_prefix_id` `order_prefix_id` VARCHAR(255) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `settings` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `country` CHANGE `address_format` `address_format` TEXT DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_product` CHANGE `total` `total` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_product` CHANGE `product_price` `product_price` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order_total` CHANGE `value` `value` decimal(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `order` CHANGE `total` `total` decimal(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `customer` CHANGE `zone_id` `zone_id` VARCHAR(255) DEFAULT NULL');
        });
    }
}
exports.AlterColumnTable1561967809283 = AlterColumnTable1561967809283;
//# sourceMappingURL=1561967809283-AlterColumnTable.js.map