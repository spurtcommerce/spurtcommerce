"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIndexProductRelatedTable1566206489111 = void 0;
const tslib_1 = require("tslib");
class CreateIndexProductRelatedTable1566206489111 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `priority` (`priority`)');
            yield queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `date_start` (`date_start`)');
            yield queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `date_end` (`date_end`)');
            yield queryRunner.query('ALTER TABLE `product_discount` ADD INDEX `price` (`price`)');
            yield queryRunner.query('ALTER TABLE `product_image` ADD INDEX `default_image` (`default_image`)');
            yield queryRunner.query('ALTER TABLE `product` ADD INDEX `manufacturer_id` (`manufacturer_id`)');
            yield queryRunner.query('ALTER TABLE `product` ADD INDEX `condition` (`condition`)');
            yield queryRunner.query('ALTER TABLE `product` ADD INDEX `today_deals` (`today_deals`)');
            yield queryRunner.query('ALTER TABLE `product` ADD INDEX `is_featured` (`is_featured`)');
            yield queryRunner.query('ALTER TABLE `product` ADD INDEX `is_active` (`is_active`)');
            yield queryRunner.query('ALTER TABLE `product_special` ADD INDEX `date_end` (`date_end`)');
            yield queryRunner.query('ALTER TABLE `product_special` ADD INDEX `start_end` (`date_end`)');
            yield queryRunner.query('ALTER TABLE `product_special` ADD INDEX `priority` (`priority`)');
            yield queryRunner.query('ALTER TABLE `product_special` ADD INDEX `price` (`price`)');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex('product', 'manufacturer_id');
            yield queryRunner.dropIndex('product', 'condition');
            yield queryRunner.dropIndex('product', 'is_featured');
            yield queryRunner.dropIndex('product', 'today_deals');
            yield queryRunner.dropIndex('product_image', 'default_image');
            yield queryRunner.dropIndex('product_discount', 'date_start');
            yield queryRunner.dropIndex('product_discount', 'date_end');
            yield queryRunner.dropIndex('product_discount', 'priority');
            yield queryRunner.dropIndex('product_discount', 'price');
            yield queryRunner.dropIndex('product_option_value', 'product_option_id');
            yield queryRunner.dropIndex('product_special', 'date_start');
            yield queryRunner.dropIndex('product_special', 'date_end');
            yield queryRunner.dropIndex('product_special', 'priority');
            yield queryRunner.dropIndex('product_special', 'price');
        });
    }
}
exports.CreateIndexProductRelatedTable1566206489111 = CreateIndexProductRelatedTable1566206489111;
//# sourceMappingURL=1566206489111-CreateIndexProductRelatedTable.js.map