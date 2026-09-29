import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddValuesInPermissionModelGroup1717216280646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO permission_module_group (module_group_id, name, slug_name, sort_order, created_by, created_date, modified_by, modified_date) VALUES
        (1, 'Order', 'order', 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (2, 'Product', 'product', 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (3, 'Categories', 'categories', 3, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (6, 'Customer', 'customer', 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (7, 'Customer Group', 'customer-group', 7, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (8, 'Pages', 'pages', 8, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (9, 'Banners', 'banners', 9, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (14, 'Setting Role', 'setting-role', 14, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (15, 'Setting Users', 'setting-users', 15, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (16, 'Setting General Settings', 'setting-general-settings', 16, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (17, 'Setting Personalize', 'setting-personalize', 17, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (18, 'Setting Site Setting', 'setting-site-setting', 18, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (19, 'Setting Zone', 'setting-zone', 19, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (20, 'Market Place Vendor', 'market-place-vendor', 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (21, 'Market Place Product', 'market-place-product', 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (22, 'Market Place Setting', 'market-place-setting', 22, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (23, 'Market Place Sales', 'market-place-sales', 23, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (24, 'Market Place Payment', 'market-place-payment', 24, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (25, 'Setting Currency', 'setting-currency', 25, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (26, 'Settings Tax', 'settings-tax', 26, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (27, 'Settings Country', 'settings-country', 27, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (28, 'Settings Language', 'settings-language', 28, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (29, 'Settings Order Status', 'settings-order-status', 29, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (30, 'Settings Stock Status', 'settings-stock-status', 30, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (31, 'Settings Email Template', 'settings-email-template', 31, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (32, 'Payments', 'payments', 32, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (34, 'Coupon', 'coupon', 34, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (36, 'Widgets', 'widgets', 63, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (37, 'Blogs', 'blogs', 35, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (38, 'Rating Review', 'rating-review', 5, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (39, 'Product Question', 'product-question', 64, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (40, 'Product Answer', 'product-answer', 65, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (41, 'Product Attribute', 'attribute', 68, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (42, 'Product Variant', 'variants', 69, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
        (43, 'Product Quotation', 'sales-quotation-request', 73, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
